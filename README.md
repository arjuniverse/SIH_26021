🐝 Honey Chain — KVIC Honey Traceability & Smart Beekeeping

AI + IoT + Blockchain + QR Platform for Rural Beekeepers

A Smart India Hackathon (SIH) prototype designed to improve honey traceability, hive monitoring, quality assurance, and transparency across the honey supply chain.

The platform connects rural beekeepers, laboratories, administrators, and consumers through a unified digital ecosystem powered by simulated IoT sensor data, AI-driven alerts, blockchain-inspired traceability, and QR-based honey verification.

🚀 Run Locally
Prerequisites
Node.js ≥ 22 — required for the built-in node:sqlite module.
npm — included with Node.js.
No separate PostgreSQL server or external blockchain service is required.
Step 1: Install Dependencies

Run the following command from the project root to install dependencies for the root project, backend, and frontend.

bash
npm run install:all

Step 2: Start the Application

Launch both the frontend and backend development servers together.

bash
npm run dev


Once the servers start, access the application at the following URLs.

Service	URL	Description
Frontend	http://localhost:5173	Web application and dashboards
Backend	http://localhost:8787	REST API and application services
Alternative: Run Each Server Separately

If you prefer to start the frontend and backend independently, open two terminal windows.

Terminal 1 — Backend
bash
node backend/src/server.js


Backend API: http://localhost:8787

Terminal 2 — Frontend
bash
cd frontend
npm run dev


Frontend application: http://localhost:5173

Note: The frontend proxies /api requests to http://localhost:8787, as configured in frontend/vite.config.js. The backend automatically seeds demo data and starts the IoT simulator on startup.
🧭 Application Portals & Features

Honey Chain provides dedicated portals for different participants in the honey supply chain.

🐝 1. Beekeeper Dashboard

Route: /beekeeper

Provides beekeepers with a centralized dashboard to monitor hives, review alerts, and manage honey production activities.

🎯 2. Guided 14-Step Demo

Route: /beekeeper/flow

A guided demonstration workflow showcasing the platform's key features step by step. It is designed to simplify project demonstrations during Smart India Hackathon presentations and judging.

🌡️ 3. Live Hive Monitoring

Route: /beekeeper/hives/:id

Displays detailed hive information, live simulated sensor readings, charts, and hive stress simulation tools to demonstrate IoT-based hive monitoring.

🍯 4. Honey Batches & Traceability Passport

Routes:

/batches
/batch/HC-KA-2026-000127

Enables users to explore honey batches and their traceability records, demonstrating how honey can be tracked throughout the supply chain.

🧪 5. Laboratory Quality Module

Route: /lab

Provides a dedicated interface for laboratory-related quality checks and honey quality assurance workflows.

📱 6. Consumer QR Verification

Route: /consumer

Demonstrates how consumers can verify honey product information through a QR-based digital verification experience.

🏛️ 7. KVIC Command Centre

Route: /admin

Provides an administrative interface for centralized oversight of beekeeping activities, honey batches, and traceability workflows.

🛒 8. Honey Marketplace

Route: /market

Showcases a digital marketplace experience connecting honey producers and consumers.

🎙️ 9. Multilingual Voice Assistant

Route: /assistant

Provides a voice-assistant interface supporting:

English
हिन्दी (Hindi)
ಕನ್ನಡ (Kannada)

The assistant demonstrates how multilingual interaction can make digital tools more accessible to rural beekeepers.

⚙️ Live Simulation & Technical Capabilities

The prototype provides an interactive, stateful demonstration rather than a collection of static screens.

Key Features
IoT Simulation: Simulated hive telemetry updates approximately every 4 seconds.
AI-Based Alerts: Alerts are generated based on incoming simulated sensor readings.
Blockchain-Inspired Traceability: Events are recorded in a hash-chained ledger to demonstrate tamper-evident record keeping.
Persistent Local Storage: Application data is stored in backend/data/honeychain.db.
End-to-End Workflows: Dedicated portals demonstrate beekeeper operations, laboratory checks, batch traceability, consumer verification, and administration.
Offline-First Mobile Approach: The mobile beekeeper layer uses a local sync queue to demonstrate offline operation and later synchronization.

These capabilities allow the prototype to demonstrate the intended system workflow without requiring external infrastructure.

🧰 Useful Development Commands

Run the following commands from the project root.

Build the Frontend
bash
npm run build


Creates a production build of the frontend.

Start Only the Frontend
bash
npm run dev:frontend

Start Only the Backend
bash
npm run dev:backend

🔄 Reset Demo Data

To reset the local database and regenerate demo data, stop the running servers first.

PowerShell (Windows)
powershell
Remove-Item -Recurse -Force backend/data

Bash (Linux/macOS)
bash
rm -rf backend/data


Restart the application afterward. The backend will recreate its demo data during startup.

Warning: Deleting backend/data removes the local database and any data stored there. Back up anything you want to preserve before resetting it.
🖼️ Presentation Assets

The project includes architecture diagram assets for presentations and demonstrations.

HoneyChain-Architecture.html — HTML version of the system architecture diagram.
HoneyChain-Architecture.png — PNG version suitable for presentation slides.

The architecture diagram is designed for a 16:9 presentation layout, making it suitable for Smart India Hackathon slides and project demonstrations.

🏗️ Production Architecture vs. Runnable Prototype

The reference production architecture illustrates a technology stack built around Django REST Framework, PostgreSQL, and Hyperledger Fabric.

The runnable prototype uses a lightweight local implementation instead.

Architecture Comparison
Component	Reference Architecture	Runnable Prototype
Backend	Django REST Framework	Node.js + Express
Database	PostgreSQL	Built-in SQLite via node:sqlite
Ledger	Hyperledger Fabric	Hash-chained event ledger
Hive Telemetry	IoT infrastructure	Simulated sensor readings
Mobile Experience	Offline-capable mobile layer	Offline-first approach with a local sync queue
Why This Approach?

The prototype preserves the core demonstration workflows while reducing setup complexity.

Runs locally without a separate database server.
Demonstrates traceability through a hash-chained ledger.
Simulates IoT telemetry without requiring physical sensor hardware.
Provides interactive portals for different stakeholders.
Supports demonstrations without requiring a live Hyperledger Fabric deployment.

The production architecture describes the intended system design, while the runnable prototype provides a practical implementation for development and demonstration.

🎯 Project Objective

Honey Chain aims to demonstrate how Artificial Intelligence, the Internet of Things, QR verification, and blockchain-inspired traceability can work together to improve transparency, quality assurance, and digital accessibility in the honey supply chain.

By connecting beekeepers, laboratories, administrators, and consumers, the platform illustrates a digital approach to improving honey traceability and supporting rural beekeeping communities.

📌 Quick Reference
Item	Details
Project Name	Honey Chain
Initiative	Smart India Hackathon
Domain	Smart Beekeeping and Honey Traceability
Technologies	AI, IoT, QR, Blockchain-Inspired Ledger
Backend	Node.js + Express
Database	SQLite (node:sqlite)
Frontend	Vite-based frontend
Minimum Node.js Version	22
Frontend Port	5173
Backend Port	8787
Local Database	backend/data/honeychain.db

Honey Chain — Bringing transparency, traceability, and smart technology to every drop of honey.
