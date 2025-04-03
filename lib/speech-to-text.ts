"use server";
import { createClient } from "@deepgram/sdk";
import dotenv from "dotenv";

dotenv.config();

export const transcribeFile = async (file: File) => {
    try {
        // Convert the file to a buffer
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Initialize the Deepgram client
        const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

        // Transcribe the file directly from the buffer
        const { result } = await deepgram.listen.prerecorded.transcribeFile(fileBuffer, {
            model: "nova-3",
            smart_format: true,
        });

        return {
            success: true,
            message: result!.results.channels[0].alternatives[0].transcript,
        };
    } catch (error) {
        console.error("Error transcribing file:", error);
        return {
            success: false,
            message: "Transcribing the file failed. Please try again.",
        };
    }
};


