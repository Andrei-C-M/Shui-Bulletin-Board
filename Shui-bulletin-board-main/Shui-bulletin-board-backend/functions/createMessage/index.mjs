// Importerar hjälpfunktioner för att skicka HTTP-respons
import { sendResponse } from "../../utils/responses/index.mjs";

// Importerar DynamoDB-kommandot för att lägga till ett objekt
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

// Importerar konfigurerad DynamoDB-klient
import { client } from "../../services/db.mjs";

// Importerar funktion för att generera unika ID:n
import { generateId } from "../../utils/generateId.mjs";

// Importerar funktion för att formatera datum
import { formatDate } from "../../utils/formatDate.mjs";

// Huvudfunktion som körs när Lambda triggas
export const handler = async (event) => {
    try {
        // Parsar inkommande JSON-data från eventet
        const { username, text } = JSON.parse(event.body);

        // Validerar att både användarnamn och text finns med
        if (!username || !text) {
            return sendResponse(400, {
                error: "Både namn och text måste uppges"
            });
        }

        // Skapar ett tidsstämpel och ett unikt meddelande-ID
        const createdAt = new Date().toISOString();
        const messageId = generateId();

        // Skapar ett DynamoDB-kommando för att lägga till meddelandet
        const command = new PutItemCommand({
            TableName: process.env.TABLE_NAME, // Hämtar tabellnamn från miljövariabler
            Item: {
                messageId: { S: messageId },     // Unikt ID för meddelandet
                username: { S: username },       // Användarnamn
                text: { S: text },               // Själva meddelandetexten
                globalPk: { S: "MESSAGES" },     // Partition key för att gruppera meddelanden
                createdAt: { S: createdAt },     // Tidsstämpel när meddelandet skapades
            }
        });

        // Skickar kommandot till DynamoDB
        await client.send(command);

        // Returnerar en lyckad respons med formaterad data
        return sendResponse(201, {
            success: true,
            message: "Message added",
            data: {
                messageId,
                username,
                text,
                createdAt: formatDate(createdAt), // Formaterar datum till läsbar form
            },
        });

    } catch (error) {
        // Fångar fel och returnerar ett felmeddelande
        return sendResponse(500, { error: error.message });
    }
};
