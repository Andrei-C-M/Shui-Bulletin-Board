import { client } from "../../services/db.mjs";
import { formatDate } from "../../utils/formatDate.mjs";
import { sendResponse } from "../../utils/responses/index.mjs";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
    try {
        const { username } = event.pathParameters;

        if(!username) return sendResponse(400, { error: "username missing" })

        const command = new QueryCommand({
            TableName: process.env.TABLE_NAME,
            IndexName: "userTimelineIndex",
            KeyConditionExpression: "username = :uname",
            ExpressionAttributeValues: {
                ":uname": { S: username }
            },
            ScanIndexForward: false,
        });

        const result = await client.send(command);

        const messages = result.Items.map((item) => ({
            messageId: item.messageId.S,
            username: item.username.S,
            text: item.text.S,
            createdAt: formatDate(item.createdAt.S),
            modifiedAt: item.modifiedAt ? formatDate(item.modifiedAt.S) : null,
        }));

        return sendResponse(200, {
            success: true,
            messages,
        })

    } catch (error) {
       return sendResponse(500, {
        error: error.message,
       }); 
    }
};