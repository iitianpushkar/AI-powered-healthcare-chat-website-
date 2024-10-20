# AI Healthcare Chat Website

This repository contains an AI-powered healthcare chat system that allows users to interact with different specialized doctors. The system uses a React frontend, a Node.js backend, and a RAG (Retrieval-Augmented Generation) model pipeline powered by the Gemini API for question-answering leveraging Pathway framework for data processing. 

## Setup Instructions

### Prerequisites
1. **Docker**: Ensure Docker is installed on your machine. If not, install it from [here](https://docs.docker.com/get-docker/).
2. **Node.js and npm**: Make sure you have Node.js and npm installed. You can download them from [here](https://nodejs.org/).

### Clone the Repository

First, clone the repository from the given URL:
git clone `https://github.com/iitianpushkar/AI-powered-healthcare-chat-website-.git`
`cd AI-powered-healthcare-chat-website-`
Steps to Run the Project
The project consists of three parts: the frontend, the backend server, and the LLM pipeline. Open three separate terminals and follow the instructions below for each part.

Terminal 1: Frontend Setup
Navigate to the frontend directory:
```
cd frontend
npm install
```
Run the frontend development server:
```
npm run dev
```

Terminal 2: Backend Server Setup
Navigate to the backend-server directory:
```
cd backend-server
Install the dependencies:
npm install
Start the backend server:
npm start
```

Terminal 3: LLM Pipeline Setup
Navigate to the LLM directory:
`cd llm`
Create a .env file and add your Gemini API key:
```
Build the Docker image:
docker build -t raggem .
Run the Docker container:
docker run -v "${PWD}/data:/app/data" -p 8000:8000 raggem
```
This will start the RAG-based question-answering system on `http://localhost:5173`.
You can find demo video link here: `https://x.com/0xPushkar/status/1840724930893398152`
