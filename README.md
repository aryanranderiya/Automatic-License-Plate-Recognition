# Automatic License Plate Recognition (ALPR) using AI

## Overview
This project was developed as part of the **Student Research Program at PDEU**. It is an AI-powered **Automatic License Plate Recognition (ALPR) system** that leverages computer vision and machine learning to detect and recognize vehicle license plates.

## Features
- **Real-Time License Plate Detection**: Uses AI models to detect and extract license plate numbers from images or video feeds.
- **Optical Character Recognition (OCR)**: Converts detected plate images into readable text.
- **Database Management**: Stores recognized license plate data in MongoDB for record-keeping and analysis.
- **Web-Based Interface**: User-friendly dashboard for monitoring and managing recognized plates.

## Technology Stack
### Backend
- **Node.js** with **Express.js** for API development
- **MongoDB** for database storage

### Frontend
- **React.js** (Vite) for a fast and interactive UI
- **Tailwind CSS** for responsive styling

## Project Structure
### Backend
```
|-- backend/
    |-- models/           # MongoDB schema definitions
    |-- routes/           # API routes
    |-- controllers/      # Business logic for ALPR
    |-- utils/            # Helper functions
    |-- .env              # Environment variables
    |-- package.json      # Backend dependencies
    |-- server.js         # Express server setup
```

### Frontend
```
|-- frontend/
    |-- assets/           # Static assets (images, icons, etc.)
    |-- components/       # React components
    |-- lib/              # Utility functions
    |-- App.tsx           # Main application entry
    |-- index.css         # Global styles
    |-- main.tsx          # React application entry
    |-- vite-env.d.ts     # Vite environment configuration
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/aryanranderiya/Automatic-License-Plate-Recognition.git
   ```

2. Install dependencies:
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Configure environment variables for MongoDB and API keys.

4. Start the backend server:
   ```sh
   cd backend
   npm start
   ```

5. Start the frontend:
   ```sh
   cd frontend
   npm run dev
   ```

## Usage
- Upload an image or provide a video feed to detect and recognize license plates.
- View recognized plates with timestamps in the web dashboard.
- Search and filter records in the database.

## Contributors
- **Aryan Randeriya** ([GitHub](https://github.com/aryanranderiya) | [LinkedIn](https://linkedin.com/in/aryanranderiya))
- **Dev Patel** ([GitHub](https://github.com/dev-eloper-365))
- **Dev Harwani** ([GitHub](https://github.com/HarwaniDev))

## License
This project is open-source and available under the **MIT License**.
