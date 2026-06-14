# Campus Intelligence Dashboard

A unified campus dashboard with an AI-powered assistant that lets students access library books, cafeteria menus, campus events, academic schedules, faculty directory, and notices — all from one place.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3-orange)

## Features

- **6 Independent MCP Servers** — Library, Cafeteria, Events, Academics, Faculty, Notices — each serving data independently with no single database
- **AI Chat Assistant (CampusAI)** — Natural language queries routed to the right MCP server(s) via LLM tool/function calling
- **Unified Dashboard** — All campus info at a glance with interactive widgets
- **Detail Pages** — Click any widget to explore full data with search, filters, and expandable cards
- **Student Authentication** — Login/logout with personalized dashboard greeting
- **Real-time Data** — No web scraping; each MCP server serves live data on demand

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) + Tailwind CSS 4 |
| MCP Servers | Node.js modules (in-process, no separate services needed) |
| AI Integration | Groq API (free tier) with LLaMA 3.3 70B — tool/function calling |
| Data | Realistic mock JSON data (no external DB) |
| Deployment | Vercel-compatible |

## Architecture

```
┌─────────────────────────────────────┐
│         Next.js Frontend            │
│  ┌─────────┐  ┌──────────────────┐  │
│  │Dashboard │  │  AI Chat Panel   │  │
│  │ Widgets  │  │  (Groq/LLaMA)   │  │
│  └─────────┘  └──────────────────┘  │
└──────────┬──────────────┬───────────┘
           │              │
     API Routes     /api/chat (AI + tool calling)
           │              │
           ▼              ▼
  ┌────────────────────────────────────┐
  │       MCP Server Layer             │
  │  ┌────────┐ ┌─────────┐ ┌──────┐  │
  │  │Library │ │Cafeteria│ │Events│  │
  │  └────────┘ └─────────┘ └──────┘  │
  │  ┌────────┐ ┌─────────┐ ┌──────┐  │
  │  │Academic│ │ Faculty │ │Notice│  │
  │  └────────┘ └─────────┘ └──────┘  │
  └────────────────────────────────────┘
```

## MCP Servers

| Server | Tools | Data |
|---|---|---|
| **Library** | `searchBooks`, `checkAvailability`, `getPopularBooks`, `getLibraryHours` | 20 books with availability, location, subjects |
| **Cafeteria** | `getTodayMenu`, `getWeekMenu`, `getCafeteriaTimings`, `searchMenu` | Full 7-day menu with prices, calories, dietary tags |
| **Events** | `getUpcomingEvents`, `searchEvents`, `getEventDetails` | 15 events (hackathons, workshops, cultural, sports) |
| **Academics** | `getExamSchedule`, `getDeadlines`, `getHolidays`, `searchHandbook` | Exam schedules, deadlines, holidays, handbook policies |
| **Faculty** | `searchFaculty`, `getFacultyByDepartment`, `getOfficeHours` | 12 faculty across 7 departments |
| **Notices** | `getRecentNotices`, `searchNotices` | 10 campus notices (exams, fees, placements, etc.) |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A free Groq API key

### Setup

```bash
# Clone the repository
git clone https://github.com/sonu-2912/Unified-Campus-Intelligence-Dashboard-with-AI-Assistant.git
cd Unified-Campus-Intelligence-Dashboard-with-AI-Assistant

# Install dependencies
npm install

# Set up environment variables
echo "GROQ_API_KEY=gsk_your_key_here" > .env.local
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks
`npm`, for example: `npm.cmd install` and `npm.cmd run dev`.

The dashboard pages work without a Groq API key. The key is required for
CampusAI chat responses.

### Get a Free Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (free, no credit card required)
3. Go to **API Keys** in the sidebar
4. Click **Create API Key**
5. Copy the key (starts with `gsk_...`) into your `.env.local`

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Login Credentials

| Student ID | Password | Name | Department |
|---|---|---|---|
| student1 | pass123 | Rahul Sharma | Computer Science |
| student2 | pass123 | Priya Patel | Electronics & Communication |
| student3 | pass123 | Arjun Kumar | Mechanical Engineering |
| student4 | pass123 | Sneha Reddy | Information Technology |
| student5 | pass123 | Vikram Singh | Electrical Engineering |

## Pages

| Page | Route | Description |
|---|---|---|
| Login | `/login` | Student authentication |
| Dashboard | `/` | All 6 widgets at a glance + AI chat button |
| Library | `/library` | Full book catalog, search, filters, library hours |
| Cafeteria | `/cafeteria` | Weekly menu, day selector, veg/non-veg filter |
| Events | `/events` | All events with type filters, expandable details |
| Academics | `/academics` | Exams, deadlines, holidays, searchable handbook |
| Faculty | `/faculty` | Directory with department filters, office hours |
| Notices | `/notices` | Announcements with category/priority filters |

## AI Chat Examples

Try these queries with the CampusAI assistant:

- "What's for lunch today?"
- "Any tech events this week?"
- "Search books on algorithms"
- "When are the exams?"
- "Who teaches Machine Learning?"
- "Any important notices?"
- "What's the attendance policy?"
- "Is the library open on Sunday?"

## Demo Video Flow

1. Introduce the project as one dashboard for library, cafeteria, events,
   academics, faculty, and campus notices.
2. Sign in with `student1` and `pass123`, then show the personalized dashboard.
3. Open Library and search for `algorithms`.
4. Open Cafeteria and demonstrate the day and dietary filters.
5. Briefly show event filters, academic tabs, faculty search, and notice
   priorities.
6. Open CampusAI and ask:
   - "What's for lunch today?"
   - "When are the exams and are there any important notices?"
7. Explain that the app uses Next.js, six independent campus data modules,
   and Groq tool calling. The current prototype uses realistic mock data that
   can later be replaced by institutional databases or APIs.

## Project Structure

```
app/
├── page.js                          # Dashboard (protected)
├── login/page.js                    # Login page
├── library/page.js                  # Library detail page
├── cafeteria/page.js                # Cafeteria detail page
├── events/page.js                   # Events detail page
├── academics/page.js                # Academics detail page
├── faculty/page.js                  # Faculty detail page
├── notices/page.js                  # Notices detail page
├── components/
│   ├── AuthProvider.js              # Auth context (login/logout)
│   ├── ChatAssistant.js             # Floating AI chat panel
│   ├── LibraryWidget.js             # Dashboard widget
│   ├── CafeteriaWidget.js
│   ├── EventsWidget.js
│   ├── AcademicsWidget.js
│   ├── FacultyWidget.js
│   └── NoticesWidget.js
├── mcp-servers/
│   ├── library.js                   # Library MCP server + mock data
│   ├── cafeteria.js                 # Cafeteria MCP server + mock data
│   ├── events.js                    # Events MCP server + mock data
│   ├── academics.js                 # Academics MCP server + mock data
│   ├── faculty.js                   # Faculty MCP server + mock data
│   └── notices.js                   # Notices MCP server + mock data
└── api/
    ├── chat/route.js                # AI endpoint (Groq + tool calling)
    ├── library/route.js             # Widget data API
    ├── library/search/route.js      # Search API
    ├── cafeteria/route.js
    ├── events/route.js
    ├── events/search/route.js
    ├── academics/route.js
    ├── academics/handbook/route.js
    ├── faculty/route.js
    ├── faculty/search/route.js
    ├── notices/route.js
    └── notices/search/route.js
```
