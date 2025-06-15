
# Health Supplement Suggestion App

A full-stack application that provides personalized health supplement recommendations based on age and health goals, powered by AI.


## Features

- **User Input**: Collects age and health goal (Energy, Sleep, Focus)
- **AI-Powered Suggestions**: Generates personalized supplement recommendations
- **Type-Safe**: Built with TypeScript for both frontend and backend


## Tech Stack

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js + Express
- TypeScript
- Hugging Face Inference API (Mistral 7B)
- Alternative local AI via Ollama

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- (Optional) Ollama for local AI

### 1. Clone the Repository
```bash
git clone https://github.com/ketdev-og/Suggestions-App.git
cd Suggestions-App
```

### 2. Setup Backend
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Open the .env file and add your API keys
nano .env  # or use your preferred text editor

# Start the development server
npm run dev
```

### 3. Setup Frontend
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Server ENV example
```bash
PORT=5000
HUGGINGFACE_API_KEY=your_api_key_here
```
