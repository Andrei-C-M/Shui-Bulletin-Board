import { sendResponse } from "../../utils/responses/index.mjs"
import { client } from "../../services/db.mjs";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { formatDate } from "../../utils/formatDate.mjs";

export const handler = async (event) => {
    try {
        const messageId = event.pathParameters.id;
        if(!messageId) return sendResponse(400, { error: "Missing messageId" });

        const { username, text } = JSON.parse(event.body);
        if(!username || !text) return sendResponse(400, {error: "Both name and text required" });

        const modifiedAt = new Date().toISOString();

        const command =new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                messageId: { S: messageId }
            },
            UpdateExpression:
                "SET username = :username, #t = :t, modifiedAt = :modifiedAt",
            ConditionExpression: "attribute_exists(messageId)",
            ExpressionAttributeValues: {
                ":username": { S: username },
                ":t": { S: text },
                ":modifiedAt": { S: modifiedAt }
            },
            ExpressionAttributeNames: {
                "#t": "text"
            },
            ReturnValues: "ALL_NEW",
        });

        const result = await client.send(command);

        return sendResponse(200, {
            success: true,
            message: "Message updated",
            data: { 
                messageId, 
                username, 
                text,
                modifiedAt: formatDate(modifiedAt),
            }
        });

    } catch (error) {
        return sendResponse(500, {
            error: error.message 
        });
    };
};