import { client } from "../../services/db.mjs";
import { formatDate } from "../../utils/formatDate.mjs";
import { sendResponse } from "../../utils/responses/index.mjs";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
    try {
        const command = new QueryCommand({
            TableName: process.env.TABLE_NAME,
            IndexName: "globalTimelineIndex",
            KeyConditionExpression: "globalPk = :gpk",
            ExpressionAttributeValues: {
                ":gpk": { S: "MESSAGES" }
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