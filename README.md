# CareerPath - Audio-First Career Exploration Platform

An EdTech web application helping 12th standard students explore career streams, courses, exams, and opportunities through a multilingual, audio-first interface.

## Features

- **Stream Exploration**: Discover Science, Commerce, Arts, and Vocational paths
- **Course Browser**: Detailed information about courses, eligibility, fees, and career opportunities
- **Career Quiz**: 10-question quiz to find your ideal career stream
- **Resources**: Information about entrance exams, scholarships, and top colleges
- **Audio Support**: Text-to-speech for accessibility across 8 Indian languages
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (REST)
- **Data**: JSON-based (no database required)
- **Deployment**: Docker containerized

## Quick Start

### Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker compose up --build

# Access the application
open http://localhost:3000
```

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Access the application
open http://localhost:3000
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/courses` | GET | Get all courses (optional: `?stream=science`) |
| `/api/quiz` | GET | Get quiz questions |
| `/api/quiz/submit` | POST | Submit quiz answers, get recommendation |
| `/api/resources` | GET | Get exams, scholarships, colleges |
| `/api/feedback` | POST | Submit user feedback |
| `/api/audio` | GET | Text-to-speech placeholder |

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # REST API endpoints
│   ├── courses/           # Course explorer page
│   ├── feedback/          # Feedback form
│   ├── quiz/              # Career quiz
│   ├── resources/         # Resources page
│   └── streams/           # Stream selection
├── components/            # React components
├── data/                  # JSON data files
├── lib/                   # Utilities and types
├── Dockerfile
└── docker-compose.yml
```

## Ethics & Safety

- No personal data collection
- No professional advice provided
- Informational and exploratory only
- Includes disclaimer about professional counseling

## Hackathon Compliance

Built for Build2Break hackathon with:
- EdTech domain focus
- No authentication/payments
- Fully containerized
- Easy to test and modify

## License

MIT
