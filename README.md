<div align="center">
  <img src="https://picsum.photos/seed/vanguard-os/800/300?blur=1" alt="Vanguard OS Banner" style="border-radius: 1rem; margin-bottom: 20px;" />
  
  # VANGUARD: Tactical Fitness OS
  
  **Bridging the gap between physical exertion and video game mechanics.**

  [![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
  [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
</div>

<br />

## 🪐 The Pitch

Most fitness applications are generic, static, and fundamentally boring. **VANGUARD OS** is a mini-project built to completely rethink the fitness tracking UX. Designed as a "Tactical Operating System," it transforms routine exercise logs into an immersive, sci-fi gamified loop. 

This isn't just a UI shell—it features a robust **real-time database architecture** and a live **in-app economy** that directly rewards physiological output.

---

## ⚡ Core Systems (The Architecture)

### 1. The Bio-Credit Economy (Full-Stack Loop)
Unlike standard CRUD apps, VANGUARD utilizes a closed-loop virtual economy.
* **Generate:** Execute workouts in the *Active Deployment HUD*. Training telemetry translates directly to currency (1 Min = 10 Bio-Credits).
* **Sync:** Firestore triggers Cloud Functions and `onSnapshot` listeners to immediately patch the user's encrypted database log.
* **Requisition:** Spend Bio-Credits in the *Supply Drop* to unlock simulated tactical gear, which structurally renders into your *Operator Arsenal* using array unions.

### 2. High-Fidelity Tactical UI (Frontend Engineering)
This project rejects standard component libraries. Every interaction is experiential.
* **Advanced Motion:** Utilizes `framer-motion` for complex physics, state transitions, and staggered renders (e.g., radial spotlight hover effects tracked globally to `clientX/Y`).
* **Sensory HUD:** The *Active Deployment* screen simulates real-time biometrics (BPM, Strain output, Heart Rate visualizers) mimicking video game telemetry.
* **Granular Aesthetics:** CRT-scanlines, chromatic aberration text effects, monospace typography, and a persistent dark-mode tactical palette.

### 3. Serverless Integration 
* Sub-200ms real-time data sync powered by **Firebase Firestore**.
* Secure **Google OAuth** authentication mapped to strict `uid` document models.
* Dynamic payload routing without full page reloads.

---

## 🛠 Tech Stack

- **Framework:** React 18 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom thematic config)
- **Animation:** Motion (formerly Framer Motion)
- **Backend & Auth:** Firebase / Firestore
- **Icons:** Lucide React

---

## 🚀 The Data Flow (How It Works)

1. **`App.tsx` (Root System):** Handles Auth State and secures routes. Allocates a one-time "Signing Bonus" of BC to new Operators upon successful Neural Sync.
2. **`Train.tsx` (Command Center):** Generates algorithmic training protocols. Captures user-submitted duration and commits telemetry logs to Firestore.
3. **`Shop.tsx` (Supply Drop):** Listens to live BC balance via `onSnapshot`. Evaluates purchase permissions dynamically against React state, handles spending transactions safely using Firestore's `increment(-X)`.
4. **`Profile.tsx` (The Arsenal):** Pulls the operator's array of successfully acquired gear, mapping the gamified progress visually.

---

## 💻 Getting Started (Local Deployment)

Clone the system and instantiate the local environment:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/vanguard-tactical-os.git

# 2. Install dependencies
npm install

# 3. Setup Environment Variables
# Create a .env file and add your Firebase configurations
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
...

# 4. Initialize Local Server
npm run dev
```

---

## 🔮 Future Roadmap (Expansions)

While scoped as a complete mini-project currently, potential future vectors for VANGUARD include:
- [ ] **The "Ghost Protocol":** Race against a simulated ghost of your past highest-performing workout utilizing continuous async queries.
- [ ] **Neural Vision:** Implement TensorFlow.js bounding boxes to actively evaluate movement symmetry via webcam during deployments.

---

> *"Exertion is the currency. The software is merely the ledger."* 
> 
> Designed & Engineered by **[Your Name/Handle]**
