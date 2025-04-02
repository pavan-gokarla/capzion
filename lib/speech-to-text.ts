"use server"
require('dotenv').config()

import { createClient } from "@deepgram/sdk";
import { log } from "console";
import fs from "fs";



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

        return {
            success: true,
            message: result!.results.channels[0].alternatives[0].transcript,
        };
    } catch (error) {
        log("error", error)
    }

    return {
        success: false,
        message: "Transcripting the file failed. Please try again.",
    }

    // return result!.results.channels[0].alternatives[0].transcript;   
};


