"use server"
dotenv.config();

import { createClient } from "@deepgram/sdk";
import fs from "fs";
import dotenv from 'dotenv';



export const transcribeFile = async (file: File) => {


    try {
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync("recording.mp3", fileBuffer);
        const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
            fs.readFileSync("recording.mp3"),

            {
                model: "nova-3",
                smart_format: true,
            }
        );
        console.log(error);
        return {
            success: true,
            message: result!.results.channels[0].alternatives[0].transcript,
        };
    } catch (error) {
        console.log("Error transcribing file:", error);
    }

    return {
        success: false,
        message: "Transcripting the file failed. Please try again.",
    }

    // return result!.results.channels[0].alternatives[0].transcript;   
};


