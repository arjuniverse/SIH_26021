🐝 Honey Chain — KVIC Honey Traceability & Smart Beekeeping

An AI + IoT + Blockchain + QR-based platform for rural beekeepers

A Smart India Hackathon (SIH) prototype designed to improve honey traceability, hive monitoring, quality assurance, and transparency across the honey supply chain.

The platform connects beekeepers, laboratories, administrators, and consumers through a unified digital ecosystem. It combines simulated IoT sensor data, AI-driven hive alerts, blockchain-inspired traceability, and QR-based honey verification.

🚀 Run Locally
Prerequisites
Node.js ≥ 22 — required for the built-in node:sqlite module.
npm — included with Node.js.
No separate PostgreSQL database or external blockchain service is required.
1. Install Dependencies

Run the following command from the project root to install dependencies for the root project, backend, and frontend:

bash
npm run install:all

2. Start the Application

Launch both the frontend and backend development servers together:

bash
npm run dev


Once the servers start, access the application at the following URLs:

Service	URL	Description
Frontend	http://localhost:5173	Main web application and dashboards
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

Note: The frontend automatically proxies /api requests to http://localhost:8787, as configured in frontend/vite.config.js. On startup, the backend initializes demo data and launches the IoT simulator.
🧭 Application Portals & Features

Honey Chain provides dedicated portals for different participants in the honey supply chain.

🐝 1. Beekeeper Dashboard

Route: /beekeeper

Provides beekeepers with a centralized dashboard to monitor their hives, review alerts, and manage honey production activities.

🎯 2. Guided 14-Step Demonstration

Route: /beekeeper/flow

A guided demonstration workflow showcasing the platform's key features step by step, making it suitable for Smart India Hackathon presentations and judging.

🌡️ 3. Live Hive Monitoring

Route: /beekeeper/hives/:id

Displays detailed hive information, live simulated sensor readings, charts, and hive stress simulation tools to demonstrate IoT-based monitoring.

🍯 4. Honey Batches & Traceability Passport

Routes:

/batches
/batch/HC-KA-2026-000127

Enables users to explore honey batches and their traceability records, illustrating how honey can be tracked through different stages of the supply chain.

🧪 5. Laboratory Quality Module

Route: /lab

Provides a dedicated interface for laboratory-related quality checks and the demonstration of honey quality assurance workflows.

📱 6. Consumer QR Verification

Route: /consumer

Demonstrates how consumers can verify honey product information through a QR-based digital verification experience.

🏛️ 7. KVIC Command Centre

Route: /admin

Provides an administrative interface for demonstrating centralized oversight of beekeeping activities and honey traceability.

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

The prototype is designed to provide an interactive, stateful demonstration rather than a collection of static screens.

IoT simulation: Simulated hive telemetry updates approximately every 4 seconds.
AI-based alerts: Alerts are generated against incoming simulated readings.
Blockchain-inspired traceability: Events are recorded in a hash-chained ledger to demonstrate tamper-evident record keeping.
Persistent local storage: Application data is stored in backend/data/honeychain.db.
End-to-end workflows: Dedicated portals demonstrate beekeeper operations, laboratory checks, batch traceability, consumer verification, and administration.

These capabilities allow the prototype to demonstrate the intended system workflow without requiring external infrastructure.

🧰 Useful Development Commands

Run these commands from the project root.

bash
# Build the frontend for production
npm run build

# Start only the frontend
npm run dev:frontend

# Start only the backend
npm run dev:backend

Reset Demo Data

To reset the local database and regenerate demo data, stop the running servers first.

PowerShell (Windows):

powershell
Remove-Item -Recurse -Force backend/data


Bash (Linux/macOS):

bash
rm -rf backend/data


Restart the application afterward. The backend will recreate its demo data during startup.

Warning: Removing backend/data deletes the local database and any data stored there. Back up anything you want to preserve before resetting it.
🖼️ Presentation Assets

The project includes architecture diagram assets for presentations and demonstrations:

HoneyChain-Architecture.html — HTML version of the system architecture diagram.
HoneyChain-Architecture.png — PNG version suitable for presentation slides.

The diagram is designed for a 16:9 presentation layout, making it suitable for Smart India Hackathon slides and project demonstrations.

🏗️ Production Architecture vs. Runnable Prototype

The reference production architecture illustrates a stack built around:

Django REST Framework — backend API framework.
PostgreSQL — relational database.
Hyperledger Fabric — permissioned blockchain infrastructure.

The runnable prototype uses a lightweight local implementation instead:

Component	Reference Architecture	Runnable Prototype
Backend	Django REST Framework	Node.js + Express
Database	PostgreSQL	Built-in SQLite via node:sqlite
Ledger	Hyperledger Fabric	Hash-chained event ledger
Hive telemetry	IoT infrastructure	Simulated sensor readings
Beekeeper mobile experience	Offline-capable mobile layer	Offline-first approach with a local sync queue

This approach preserves the core demonstration workflows while reducing setup complexity. The prototype can run locally without requiring a separate database server or blockchain deployment.

Project goal: Demonstrate how AI, IoT, QR verification, and tamper-evident traceability can work together to improve transparency, quality assurance, and digital accessibility in the honey supply chain.
