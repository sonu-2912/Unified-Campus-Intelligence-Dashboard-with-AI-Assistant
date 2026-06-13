const events = [
  { id: 1, name: "TechFest 2026 - Hackathon", type: "tech", club: "Computer Science Society", date: "2026-06-10", time: "9:00 AM - 9:00 PM", venue: "Main Auditorium", description: "24-hour hackathon. Build innovative solutions. Teams of 2-4. Prizes worth ₹50,000.", registrationLink: "#", spotsLeft: 15 },
  { id: 2, name: "AI/ML Workshop - Intro to LLMs", type: "workshop", club: "AI Club", date: "2026-06-09", time: "2:00 PM - 5:00 PM", venue: "Lab 301, CS Block", description: "Hands-on workshop on Large Language Models. Bring your laptop. Prerequisites: Basic Python.", registrationLink: "#", spotsLeft: 8 },
  { id: 3, name: "Annual Cultural Night", type: "cultural", club: "Cultural Committee", date: "2026-06-14", time: "6:00 PM - 10:00 PM", venue: "Open Air Theatre", description: "Music, dance, drama performances. Food stalls available. Free entry for all students.", registrationLink: null, spotsLeft: null },
  { id: 4, name: "Resume Building Workshop", type: "workshop", club: "Placement Cell", date: "2026-06-08", time: "10:00 AM - 12:00 PM", venue: "Seminar Hall 2", description: "Learn to craft the perfect resume. Bring your current resume for review. Industry experts as mentors.", registrationLink: "#", spotsLeft: 30 },
  { id: 5, name: "Inter-College Cricket Tournament", type: "sports", club: "Sports Committee", date: "2026-06-12", time: "8:00 AM - 6:00 PM", venue: "College Cricket Ground", description: "T20 format. 8 colleges participating. Cheer for our team!", registrationLink: null, spotsLeft: null },
  { id: 6, name: "Photography Walk", type: "cultural", club: "Photography Club", date: "2026-06-08", time: "5:30 PM - 7:30 PM", venue: "Meet at Main Gate", description: "Golden hour campus photography walk. Best photos featured in college magazine. Open to all.", registrationLink: "#", spotsLeft: 20 },
  { id: 7, name: "Web Development Bootcamp - Day 1", type: "workshop", club: "GDG on Campus", date: "2026-06-11", time: "3:00 PM - 6:00 PM", venue: "Lab 201, CS Block", description: "3-day bootcamp on React & Next.js. Day 1: React fundamentals. Laptop required.", registrationLink: "#", spotsLeft: 5 },
  { id: 8, name: "Debate Competition", type: "cultural", club: "Literary Society", date: "2026-06-09", time: "11:00 AM - 1:00 PM", venue: "Seminar Hall 1", description: "Topic: 'AI in Education - Boon or Bane?' Teams of 2. Registration mandatory.", registrationLink: "#", spotsLeft: 12 },
  { id: 9, name: "Blood Donation Camp", type: "social", club: "NSS Unit", date: "2026-06-13", time: "9:00 AM - 3:00 PM", venue: "College Health Center", description: "Annual blood donation drive. Free health checkup for donors. Refreshments provided.", registrationLink: "#", spotsLeft: null },
  { id: 10, name: "Startup Pitch Night", type: "tech", club: "Entrepreneurship Cell", date: "2026-06-15", time: "5:00 PM - 8:00 PM", venue: "Conference Hall", description: "Pitch your startup idea to a panel of investors and mentors. Top 3 get incubation support.", registrationLink: "#", spotsLeft: 10 },
  { id: 11, name: "Yoga & Meditation Session", type: "wellness", club: "Wellness Committee", date: "2026-06-08", time: "6:30 AM - 7:30 AM", venue: "College Lawn", description: "Start your day with yoga. Mats provided. Open to faculty and students.", registrationLink: null, spotsLeft: null },
  { id: 12, name: "Movie Screening - Interstellar", type: "cultural", club: "Film Club", date: "2026-06-13", time: "7:00 PM - 10:00 PM", venue: "Mini Auditorium", description: "Classic sci-fi movie screening with discussion. Popcorn provided!", registrationLink: null, spotsLeft: null },
  { id: 13, name: "Competitive Programming Contest", type: "tech", club: "Coding Club", date: "2026-06-10", time: "4:00 PM - 7:00 PM", venue: "Online (HackerRank)", description: "Individual contest. 5 problems in 3 hours. Top performers get certificates and goodies.", registrationLink: "#", spotsLeft: null },
  { id: 14, name: "Guest Lecture: Quantum Computing", type: "academic", club: "Physics Department", date: "2026-06-11", time: "10:00 AM - 11:30 AM", venue: "Lecture Hall 1", description: "Prof. Arun Sharma from IISc on 'Quantum Computing: Present and Future'. Open to all.", registrationLink: null, spotsLeft: null },
  { id: 15, name: "Club Fair - New Semester Recruitments", type: "social", club: "Student Council", date: "2026-06-16", time: "10:00 AM - 4:00 PM", venue: "College Quadrangle", description: "All clubs recruiting new members. Visit stalls, talk to club heads, sign up!", registrationLink: null, spotsLeft: null },
];

export const toolDefinitions = [
  {
    name: "getUpcomingEvents",
    description: "Get upcoming campus events for the next 7 days including tech fests, workshops, cultural events, and club activities.",
    parameters: { type: "object", properties: {}, required: [] }
  },
  {
    name: "searchEvents",
    description: "Search campus events by name, type (tech, workshop, cultural, sports, social, wellness, academic), or club name.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query - event name, type, or club name" }
      },
      required: ["query"]
    }
  },
  {
    name: "getEventDetails",
    description: "Get detailed information about a specific campus event by its ID.",
    parameters: {
      type: "object",
      properties: {
        eventId: { type: "number", description: "The ID of the event" }
      },
      required: ["eventId"]
    }
  }
];

export function handleTool(name, args) {
  switch (name) {
    case "getUpcomingEvents": {
      const now = new Date();
      const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const upcoming = events.filter(e => {
        const d = new Date(e.date);
        return d >= now && d <= weekLater;
      });
      upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
      return { events: upcoming, total: upcoming.length };
    }
    case "searchEvents": {
      const q = (args.query || "").toLowerCase();
      const results = events.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q) ||
        e.club.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
      return { results, total: results.length };
    }
    case "getEventDetails": {
      const event = events.find(e => e.id === args.eventId);
      if (!event) return { error: "Event not found" };
      return event;
    }
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export function getWidgetData() {
  const now = new Date();
  const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcoming = events
    .filter(e => new Date(e.date) >= now && new Date(e.date) <= weekLater)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    upcoming: upcoming.slice(0, 5),
    totalUpcoming: upcoming.length,
    todayEvents: events.filter(e => e.date === now.toISOString().split("T")[0]),
    categories: [...new Set(events.map(e => e.type))]
  };
}
