CareerPath – Audio‑First Career Exploration Platform
An EdTech web application designed to help 12th standard students explore career streams, courses, exams, and opportunities through a multilingual, audio‑first interface.

✨ Features
- Stream Exploration: Discover Science, Commerce, Arts, and Vocational paths
- Course Browser: Detailed information about courses, eligibility, fees, and career opportunities
- Career Quiz: 10‑question quiz to find your ideal career stream
- Resources: Entrance exams, scholarships, and top colleges
- Audio Support: Text‑to‑speech for accessibility across 8 Indian languages
- Responsive Design: Works on mobile, tablet, and desktop

🛠 Tech Stack
- Frontend: Next.js 15, React, TypeScript, Tailwind CSS
- Backend: Next.js API Routes (REST)
- Data: JSON‑based (no database required)
- Deployment: Docker containerized / Local npm

🏗 Architecture
High‑Level Flow
- Frontend (Next.js)
- Provides UI for stream selection, quiz, course browsing, and resources.
- Integrates text‑to‑speech for audio guidance.
- Backend (API Routes)
- Handles quiz logic, course data, resources, and feedback.
- Serves JSON responses to frontend.
- Data Layer
- JSON files store course details, quiz questions, and resource information.
- No external database required.
- Deployment
- Runs locally with npm or containerized with Docker Compose.
Diagram (add image here in repo)
[ Student Browser ]
        |
        v
[ Frontend (Next.js) ] ---> [ Backend API Routes ]
        |                           |
        v                           v
[ Audio (TTS) ]              [ JSON Data Layer ]


👉 Save this diagram as docs/architecture.png and embed in README:
![Architecture Diagram](docs/architecture.png)



🚀 Quick Start
Using Docker (Recommended)
# Build and run with Docker Compose
docker compose up --build

# Access the application
http://localhost:3000


Local Development
# Install dependencies
npm install

# Run development server
npm run dev

# Access the application
http://localhost:3000



🔗 API Endpoints
|  |  |  | 
| /api/courses |  | ?stream=science | 
| /api/quiz |  |  | 
| /api/quiz/submit |  |  | 
| /api/resources |  |  | 
| /api/feedback |  |  | 
| /api/audio |  |  | 



📂 Project Structure
├── app/                    # Next.js App Router pages
│   ├── api/                # REST API endpoints
│   ├── courses/            # Course explorer page
│   ├── feedback/           # Feedback form
│   ├── quiz/               # Career quiz
│   ├── resources/          # Resources page
│   └── streams/            # Stream selection
├── components/             # React components
├── data/                   # JSON data files
├── lib/                    # Utilities and types
├── Dockerfile
├── docker-compose.yml
└── docs/architecture.png   # Architecture diagram



⚖️ Ethics & Safety
- No personal data collection
- No professional advice provided
- Informational and exploratory only
- Disclaimer included about professional counseling

🏆 Hackathon Compliance
- EdTech domain focus
- No authentication/payments
- Fully containerized (Docker)
- Easy to test and modify
- Includes architecture diagram and README summary

📜 License
MIT
