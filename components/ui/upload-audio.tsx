
import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { uploadAudio } from "@/actions/uploadAudio"

import { FileUpload } from './file-upload'
import { Button } from './button'
import { toast } from 'sonner';

const FileManage = () => {
    const [file, setFile] = useState<File | null>(null)
    const [transcriptFile, setTranscriptFile] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="upload-audio">
            {
                file ? (
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex justify-around ">
                        <p className="text-slate-400">File uploaded: {file.name}</p>
                        <Button onClick={() => {
                            setFile(null)
                        }} className='bg-slate-300/50 cursor-pointer ' >Remove</Button>
                    </div>
                ) : (
                    <FileUpload onChange={(files) => setFile(files[0])} />
                )
            }

            <div className="flex justify-center mt-8">
                <Button className={!file || loading ? "cursor-wait" : "cursor-pointer"} disabled={!file} onClick={async () => {

                    setLoading(true)
                    const transcript = await uploadAudio(file!)
                    if (transcript && typeof transcript === "object" && !transcript.success) {
                        toast.error("Transcripting the files failed. Please try again.")
                        setLoading(false)
                        return
                    }
                    setLoading(false)
                    setTranscriptFile(transcript.message)
                    toast.success("Transcripting the file was successful.")
                    setFile(null)
                }}>
                    {
                        loading ? <ClipLoader color="black" size={20} /> : "Upload"
                    }
                </Button>
            </div>
            {
                transcriptFile && (
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mt-8 flex justify-around ">
                        <p className="text-slate-400">Transcript file: {transcriptFile}</p>
                        <Button onClick={async () => {
                            setTranscriptFile(null)
                        }} className='bg-slate-300/50 cursor-pointer ' >Remove</Button>
                    </div>
                )
            }
        </div>
    )
}

export default FileManage