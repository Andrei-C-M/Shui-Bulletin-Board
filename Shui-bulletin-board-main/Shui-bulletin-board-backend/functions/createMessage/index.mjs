import { sendResponse } from "../../utils/responses/index.mjs"
import { PutItemCommand } from "@aws-sdk/client-dynamodb"
import { client } from "../../services/db.mjs"
import { generateId } from "../../utils/generateId.mjs"
import { formatDate } from "../../utils/formatDate.mjs";

export const handler = async (event) => {
    try {
        const { username, text } = JSON.parse(event.body);

        if(!username || !text) return sendResponse(400, {error: "Både namn och text måste uppges"});

        const createdAt = new Date().toISOString();
        const messageId = generateId();

        const command = new PutItemCommand({
            TableName: process.env.TABLE_NAME,
            Item: {
                messageId: { S: messageId },
                username: { S: username },
                text: { S: text },
                globalPk: { S: "MESSAGES" },
                createdAt: { S: createdAt },
            }
        });

        await client.send(command);

        return sendResponse(201, {
            success: true,
            message: "Message added",
            data: { 
                messageId, 
                username, 
                text,
                createdAt: formatDate(createdAt), 
            },
        });

    } catch (error) {
        return sendResponse(500, { error: error.message })
    };
};