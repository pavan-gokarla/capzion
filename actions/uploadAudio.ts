"use server"

import { transcribeFile } from "@/lib/speech-to-text";

export async function uploadAudio(file: File): Promise<{ success: boolean, message: string }> {
    return await transcribeFile(file);
}