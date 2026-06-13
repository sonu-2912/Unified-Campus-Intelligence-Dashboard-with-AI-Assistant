const notices = [
  { id: 1, title: "End Semester Exam Schedule Released", category: "examination", date: "2026-06-05", priority: "high", content: "The end semester examination schedule for all departments has been published. Exams begin June 18 (practicals) and June 20 (theory). Students must collect their hall tickets from the exam section by June 15.", postedBy: "Controller of Examinations" },
  { id: 2, title: "Last Date for Fee Payment - June 10", category: "fees", date: "2026-06-03", priority: "urgent", content: "This is a reminder that the last date for semester fee payment is June 10, 2026. Late fee of Rs. 100/day will apply after the deadline. Pay online through the student portal or at the accounts office.", postedBy: "Accounts Department" },
  { id: 3, title: "Campus Placement Drive - TCS & Infosys", category: "placement", date: "2026-06-06", priority: "high", content: "TCS and Infosys will be conducting on-campus recruitment on June 18-19. Eligible: Final year students with CGPA >= 7.0 and no active backlogs. Register on the placement portal by June 12.", postedBy: "Training & Placement Cell" },
  { id: 4, title: "Library Books Return Before Exams", category: "library", date: "2026-06-04", priority: "medium", content: "All students are requested to return borrowed library books before June 15. Students with pending books will not be issued hall tickets for end semester exams.", postedBy: "Central Library" },
  { id: 5, title: "Hostel Room Allocation for Next Semester", category: "hostel", date: "2026-06-02", priority: "medium", content: "Hostel room allocation for the next academic semester (Aug 2026) will begin on July 15. Current hostelers must fill the preference form on the student portal by July 10.", postedBy: "Chief Warden" },
  { id: 6, title: "Summer Internship Report Submission", category: "academic", date: "2026-06-05", priority: "high", content: "Students who completed summer internships must submit their internship report and completion certificate to their respective department offices by June 20, 2026.", postedBy: "Academic Section" },
  { id: 7, title: "Anti-Ragging Awareness Week - June 9-13", category: "general", date: "2026-06-06", priority: "medium", content: "Anti-ragging awareness week will be observed from June 9-13. All students must attend at least one awareness session. Schedule has been posted on department notice boards.", postedBy: "Anti-Ragging Committee" },
  { id: 8, title: "Wi-Fi Password Reset - June 8", category: "it", date: "2026-06-06", priority: "low", content: "Campus Wi-Fi passwords will be reset on June 8 as part of routine security maintenance. New credentials can be collected from the IT helpdesk or generated via the student portal.", postedBy: "IT Department" },
  { id: 9, title: "Blood Donation Camp - Volunteers Needed", category: "general", date: "2026-06-07", priority: "low", content: "The NSS unit is organizing a blood donation camp on June 13. Student volunteers are needed for registration and coordination. Interested students may contact the NSS coordinator.", postedBy: "NSS Unit" },
  { id: 10, title: "Project Expo Registration Open", category: "academic", date: "2026-06-07", priority: "medium", content: "Registration for the annual Project Expo 2026 is now open. Teams of 2-4 students can register on the event portal. Last date: June 14. Best projects will receive certificates and prizes.", postedBy: "Student Activities Cell" },
];

export const toolDefinitions = [
  {
    name: "getRecentNotices",
    description: "Get recent campus notices and announcements including exam dates, fee reminders, placement drives, and general announcements.",
    parameters: { type: "object", properties: {}, required: [] }
  },
  {
    name: "searchNotices",
    description: "Search campus notices by keyword, category (examination, fees, placement, library, hostel, academic, general, it), or priority (urgent, high, medium, low).",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword, category, or priority to search for" }
      },
      required: ["query"]
    }
  }
];

export function handleTool(name, args) {
  switch (name) {
    case "getRecentNotices": {
      const sorted = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));
      return { notices: sorted, total: sorted.length };
    }
    case "searchNotices": {
      const q = (args.query || "").toLowerCase();
      const results = notices.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        n.priority.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.postedBy.toLowerCase().includes(q)
      );
      return { results, total: results.length };
    }
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export function getWidgetData() {
  const sorted = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));
  const urgent = notices.filter(n => n.priority === "urgent" || n.priority === "high");
  return {
    recent: sorted.slice(0, 4),
    totalNotices: notices.length,
    urgentCount: urgent.length,
    categories: [...new Set(notices.map(n => n.category))]
  };
}
