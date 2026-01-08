# Career Path Explorer with Gentle Voice Guidance

An **EdTech web application** designed to help higher secondary (12th standard) students explore career areas, courses, and exams through a **multilingual, audio‑first interface** with gentle voice guidance.

---

## 🌐 Web Link
https://v0-student-course-selection.vercel.app/

---

## ✨ Features
- **Stream Exploration**: Discover Science, Commerce, Arts, and Vocational paths  
- **Course Browser**: Detailed information about courses, eligibility, fees, and career opportunities  
- **Career Quiz**: 4–10 interest‑based questions to suggest suitable streams  
- **Resources**: Entrance exams, scholarships, and top colleges  
- **Audio Support**: Text‑to‑speech guidance in 8 Indian languages  
- **Voice Behavior**:  
  - Gentle, minimal voice guidance  
  - Triggered only after clicking the voice symbol  
  - Speaks once per section (welcome, areas, questions, results)  
  - Includes **Mute Voice** toggle  
- **Responsive Design**: Works on mobile, tablet, and desktop  

---

## 🛠 Tech Stack
- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS  
- **Backend**: Node.js + Express (via Next.js API Routes)  
- **Data**: JSON‑based document storage (no relational DB)  
- **Voice**: Browser Speech Synthesis API with language selection  
- **Deployment**: Local npm / Docker containerized / Vercel frontend hosting  

---

## 🔄 Workflow – How It Works
1. **Landing Page**  
   - Title, description, and “Start Career Exploration” button  
   - Voice gives a short welcome (only after clicking the voice symbol)  

2. **Student Details Page**  
   - Collects grade and broad interests (predefined options)  
   - Name is optional  
   - Voice guidance triggered only when symbol is clicked  

3. **Career Areas Page**  
   - Shows areas (Science, Business, Arts, Vocational)  
   - Voice reads a short explanation once per area (on demand)  

4. **Interest Questions**  
   - 4–5 questions based on selected areas  
   - Voice reads each question once (only after clicking the symbol)  
   - Answers stored for suggestions  

5. **Suggestions Page**  
   - Recommended courses and entrance exams displayed  
   - **Courses**: name, description, comparisons, fees  
   - **Exams**: name, upcoming date, fees, importance  
   - Voice summarizes suggestions once (on demand)  

6. **Session Storage**  
   - Each exploration session stored as a JSON document:  
     - Selected interests  
     - Answers given  
     - Suggested courses and exams (with fees, dates, comparisons)  
   - Simple retrieval via API  

---

## 🏗 Architecture

### High‑Level Flow
- **Frontend (Next.js)**  
  - UI for stream selection, quiz, course browsing, and resources  
  - Integrates text‑to‑speech for audio guidance  

- **Backend (API Routes)**  
  - Handles quiz logic, course data, resources, and feedback  
  - Serves JSON responses to frontend  

- **Data Layer**  
  - JSON files store course details, quiz questions, and resource information  
  - No external database required  

- **Deployment**  
  - Runs locally with npm or containerized with Docker Compose  
  - Frontend deployed on Vercel  

### Diagram (add image here in repo)


[ Student Browser ] | v [ Frontend (Next.js) ] ---> [ Backend API Routes ] |                           | v                           v [ Audio (TTS) ]              [ JSON Data Layer ]

👉 Save this diagram as `docs/architecture.png` and embed in README:
```markdown
![Architecture Diagram](docs/architecture.png)



🚀 Quick Start
Local Development
# Install dependencies
npm install

# Run development server
npm run dev

# Access the application
http://localhost:3000


Using Docker (Optional)
# Build and run with Docker Compose
docker compose up --build

# Access the application
http://localhost:3000



🔗 API Endpoints
|  |  |  | 
| /api/courses |  | ?stream=science | 
| /api/exams |  |  | 
| /api/questions |  |  | 
| /api/session |  |  | 
| /api/session/:id |  |  | 
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
├── Dockerfile              # Optional Docker setup
├── docker-compose.yml      # Optional Docker setup
└── docs/architecture.png   # Architecture diagram



📦 Submission Packaging & Delivery
For the Build Phase submission, the project was prepared and shared via Google Drive as required.
Steps Followed
- Convert GitHub Repository to ZIP
- Clicked the green Code button → selected Download ZIP
- Or compressed the local repo folder into a .zip file
- Prepare Google Drive Folder
- Created CareerPath_BuildPhase folder in Google Drive
- Uploaded:
- Zipped project file (CareerPath.zip)
- Architecture diagram (docs/architecture.png)
- README.md (features, tech stack, run instructions)
- Demo video link (Vimeo) in Demo_Link.txt
- Generate Shareable Link
- Right‑clicked folder → Get link → set to Anyone with the link
- Copied public link
✅ Deliverables Submitted
- Google Drive Folder Link → zipped code, README, diagram, demo link
- GitHub Repo Link → with README and architecture diagram
- Vimeo Link → prototype demo with voiceover

⚖️ Ethics & Safety
- No personal data collection
- No professional advice provided
- Informational and exploratory only
- Disclaimer included about professional counseling

🏆 Hackathon Compliance
- EdTech domain focus
- No authentication/payments
- JSON document storage (no relational DB)
- Clear architecture diagram and README summary
- Easy to test and modify
- Frontend deployed on Vercel, backend runs locally/Docker

📜 License
MIT




