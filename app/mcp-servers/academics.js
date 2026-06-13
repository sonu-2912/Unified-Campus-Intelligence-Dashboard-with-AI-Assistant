const examSchedule = [
  { id: 1, subject: "Data Structures & Algorithms", code: "CS301", date: "2026-06-20", time: "9:00 AM - 12:00 PM", venue: "Exam Hall A", type: "End Semester" },
  { id: 2, subject: "Database Management Systems", code: "CS302", date: "2026-06-22", time: "9:00 AM - 12:00 PM", venue: "Exam Hall B", type: "End Semester" },
  { id: 3, subject: "Operating Systems", code: "CS303", date: "2026-06-24", time: "9:00 AM - 12:00 PM", venue: "Exam Hall A", type: "End Semester" },
  { id: 4, subject: "Computer Networks", code: "CS304", date: "2026-06-26", time: "2:00 PM - 5:00 PM", venue: "Exam Hall C", type: "End Semester" },
  { id: 5, subject: "Software Engineering", code: "CS305", date: "2026-06-28", time: "9:00 AM - 12:00 PM", venue: "Exam Hall B", type: "End Semester" },
  { id: 6, subject: "Mathematics III", code: "MA201", date: "2026-06-30", time: "9:00 AM - 12:00 PM", venue: "Exam Hall D", type: "End Semester" },
  { id: 7, subject: "Machine Learning (Lab)", code: "CS306L", date: "2026-06-18", time: "10:00 AM - 1:00 PM", venue: "Lab 301", type: "Practical" },
  { id: 8, subject: "Web Technologies (Lab)", code: "CS307L", date: "2026-06-19", time: "2:00 PM - 5:00 PM", venue: "Lab 201", type: "Practical" },
];

const deadlines = [
  { id: 1, title: "DSA Assignment 5 - Graph Algorithms", course: "CS301", dueDate: "2026-06-09", type: "assignment", status: "pending" },
  { id: 2, title: "DBMS Mini Project Submission", course: "CS302", dueDate: "2026-06-12", type: "project", status: "pending" },
  { id: 3, title: "OS Lab Report - Memory Management", course: "CS303", dueDate: "2026-06-10", type: "lab-report", status: "pending" },
  { id: 4, title: "CN Assignment 4 - Socket Programming", course: "CS304", dueDate: "2026-06-11", type: "assignment", status: "pending" },
  { id: 5, title: "SE Project Phase 2 - Design Document", course: "CS305", dueDate: "2026-06-15", type: "project", status: "pending" },
  { id: 6, title: "ML Course Project Presentation", course: "CS306", dueDate: "2026-06-14", type: "presentation", status: "pending" },
  { id: 7, title: "Mathematics III Problem Set 6", course: "MA201", dueDate: "2026-06-08", type: "assignment", status: "urgent" },
  { id: 8, title: "Internship Report Submission", course: "General", dueDate: "2026-06-20", type: "report", status: "pending" },
];

const holidays = [
  { date: "2026-06-15", name: "Eid ul-Adha (tentative)", type: "public" },
  { date: "2026-07-01", name: "Summer Vacation Begins", type: "vacation" },
  { date: "2026-07-31", name: "Summer Vacation Ends", type: "vacation" },
  { date: "2026-08-15", name: "Independence Day", type: "public" },
  { date: "2026-08-19", name: "Janmashtami", type: "public" },
  { date: "2026-10-02", name: "Gandhi Jayanti", type: "public" },
  { date: "2026-10-12", name: "Dussehra", type: "public" },
  { date: "2026-11-01", name: "Diwali", type: "public" },
  { date: "2026-11-15", name: "Guru Nanak Jayanti", type: "public" },
  { date: "2026-12-25", name: "Christmas", type: "public" },
];

const handbookEntries = [
  { id: 1, topic: "Attendance Policy", content: "Minimum 75% attendance is mandatory for all courses. Students below 75% will be debarred from end-semester exams. Medical leave requires a certificate submitted within 3 days." },
  { id: 2, topic: "Grading System", content: "The university follows a 10-point CGPA system. Grades: S(10), A(9), B(8), C(7), D(6), E(5), F(0). Minimum passing grade is E. CGPA is calculated as weighted average of all semester GPAs." },
  { id: 3, topic: "Library Rules", content: "Students can borrow up to 4 books at a time. Loan period is 14 days, renewable once. Late fine: ₹2 per day per book. Reference books cannot be taken home." },
  { id: 4, topic: "Exam Rules", content: "Students must carry their ID card to all exams. No electronic devices allowed. Exam starts sharp at scheduled time - latecomers allowed up to 30 minutes. No leaving before 1 hour." },
  { id: 5, topic: "Hostel Rules", content: "In-time for hostels is 9:30 PM on weekdays, 10:30 PM on weekends. Overnight outings require prior written permission from warden. Guests must register at reception." },
  { id: 6, topic: "Fee Structure", content: "Semester fee: ₹55,000 (Tuition) + ₹15,000 (Hostel) + ₹5,000 (Other charges). Fee payment deadline: Within 15 days of semester start. Late fee: ₹100 per day." },
  { id: 7, topic: "Placement Policy", content: "Students with active backlogs are not eligible for campus placements. Maximum 2 offers allowed per student. Dream company policy: students with offers below ₹6 LPA can sit for higher packages." },
  { id: 8, topic: "Anti-Ragging Policy", content: "Ragging in any form is strictly prohibited and is a criminal offense. Complaints can be filed through the anti-ragging helpline (toll-free) or anti-ragging committee. Penalties range from suspension to expulsion." },
  { id: 9, topic: "Research & Publications", content: "Students publishing papers in recognized journals/conferences can earn up to 2 extra credits. Faculty co-authorship is required. Publication incentive: ₹5,000 for international conferences, ₹2,000 for national." },
  { id: 10, topic: "Leave Policy", content: "Medical leave: up to 15 days per semester with valid certificate. Personal leave: 3 days per semester (must be applied 2 days in advance). On-duty leave for events requires HOD approval." },
];

export const toolDefinitions = [
  {
    name: "getExamSchedule",
    description: "Get the upcoming exam schedule including dates, times, venues, and exam types (end semester, practical).",
    parameters: { type: "object", properties: {}, required: [] }
  },
  {
    name: "getDeadlines",
    description: "Get upcoming assignment, project, and report submission deadlines.",
    parameters: { type: "object", properties: {}, required: [] }
  },
  {
    name: "getHolidays",
    description: "Get the academic calendar holidays and vacation dates.",
    parameters: { type: "object", properties: {}, required: [] }
  },
  {
    name: "searchHandbook",
    description: "Search the academic handbook for rules, policies, and guidelines on topics like attendance, grading, exams, hostel, fees, placement, etc.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Topic to search for in the academic handbook" }
      },
      required: ["query"]
    }
  }
];

export function handleTool(name, args) {
  switch (name) {
    case "getExamSchedule": {
      const upcoming = examSchedule
        .filter(e => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      return { exams: upcoming, total: upcoming.length };
    }
    case "getDeadlines": {
      const upcoming = deadlines
        .filter(d => new Date(d.dueDate) >= new Date())
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      return { deadlines: upcoming, total: upcoming.length };
    }
    case "getHolidays":
      return { holidays };
    case "searchHandbook": {
      const q = (args.query || "").toLowerCase();
      const results = handbookEntries.filter(e =>
        e.topic.toLowerCase().includes(q) || e.content.toLowerCase().includes(q)
      );
      return { results, total: results.length };
    }
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export function getWidgetData() {
  const now = new Date();
  const upcomingExams = examSchedule
    .filter(e => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const urgentDeadlines = deadlines
    .filter(d => new Date(d.dueDate) >= now)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const nextHoliday = holidays.find(h => new Date(h.date) >= now);

  return {
    nextExam: upcomingExams[0] || null,
    totalUpcomingExams: upcomingExams.length,
    urgentDeadlines: urgentDeadlines.slice(0, 3),
    totalDeadlines: urgentDeadlines.length,
    nextHoliday
  };
}
