# Capzion - Audio Transcription App

Capzion is a web application that allows users to upload audio files and transcribe them into text. The app provides the option to download the transcription as a `.txt` file. It leverages the Deepgram API for accurate and efficient audio transcription.

## Features

- Upload audio files for transcription.
- Transcribe audio files into text using the Deepgram API.
- Download the transcription as a `.txt` file.
- User-friendly interface with file management options.
- Real-time feedback with loading indicators and success/error notifications.

## Technologies Used

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Next.js (Server Actions)
- **API**: Deepgram API
- **State Management**: React Hooks
- **Notifications**: Sonner
- **File Handling**: Blob and URL APIs

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/capzion.git
   cd capzion


2. Run npm install command:
   ```bash
   npm install

3.Create a .env file in the root directory and add the following environment variable:
   ```bash
   DEEPGRAM_API_KEY=your_deepgram_api_key

4.Start the development server:


