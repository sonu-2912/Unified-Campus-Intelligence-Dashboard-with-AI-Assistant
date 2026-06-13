const faculty = [
  { id: 1, name: "Dr. Anand Verma", department: "Computer Science", designation: "Professor & HOD", subjects: ["Data Structures", "Algorithms", "Theory of Computation"], email: "anand.verma@campus.edu", phone: "+91-9876543201", cabin: "CS Block, Room 301", officeHours: { day: "Mon, Wed", time: "2:00 PM - 4:00 PM" } },
  { id: 2, name: "Dr. Meera Iyer", department: "Computer Science", designation: "Associate Professor", subjects: ["Machine Learning", "Artificial Intelligence", "Deep Learning"], email: "meera.iyer@campus.edu", phone: "+91-9876543202", cabin: "CS Block, Room 305", officeHours: { day: "Tue, Thu", time: "10:00 AM - 12:00 PM" } },
  { id: 3, name: "Dr. Rajesh Gupta", department: "Computer Science", designation: "Assistant Professor", subjects: ["Database Management", "Web Technologies", "Cloud Computing"], email: "rajesh.gupta@campus.edu", phone: "+91-9876543203", cabin: "CS Block, Room 210", officeHours: { day: "Mon, Fri", time: "3:00 PM - 5:00 PM" } },
  { id: 4, name: "Dr. Sunita Rao", department: "Computer Science", designation: "Associate Professor", subjects: ["Operating Systems", "Computer Networks", "Cybersecurity"], email: "sunita.rao@campus.edu", phone: "+91-9876543204", cabin: "CS Block, Room 308", officeHours: { day: "Wed, Fri", time: "11:00 AM - 1:00 PM" } },
  { id: 5, name: "Dr. Arun Sharma", department: "Electronics & Communication", designation: "Professor & HOD", subjects: ["Digital Electronics", "VLSI Design", "Embedded Systems"], email: "arun.sharma@campus.edu", phone: "+91-9876543205", cabin: "ECE Block, Room 401", officeHours: { day: "Tue, Thu", time: "2:00 PM - 4:00 PM" } },
  { id: 6, name: "Dr. Kavita Nair", department: "Electronics & Communication", designation: "Assistant Professor", subjects: ["Signal Processing", "Communication Systems", "Antenna Design"], email: "kavita.nair@campus.edu", phone: "+91-9876543206", cabin: "ECE Block, Room 205", officeHours: { day: "Mon, Wed", time: "10:00 AM - 12:00 PM" } },
  { id: 7, name: "Dr. Prakash Joshi", department: "Mathematics", designation: "Professor & HOD", subjects: ["Linear Algebra", "Calculus", "Probability & Statistics"], email: "prakash.joshi@campus.edu", phone: "+91-9876543207", cabin: "Science Block, Room 102", officeHours: { day: "Mon, Thu", time: "9:00 AM - 11:00 AM" } },
  { id: 8, name: "Dr. Neha Kapoor", department: "Mathematics", designation: "Associate Professor", subjects: ["Discrete Mathematics", "Numerical Methods", "Optimization"], email: "neha.kapoor@campus.edu", phone: "+91-9876543208", cabin: "Science Block, Room 105", officeHours: { day: "Wed, Fri", time: "2:00 PM - 4:00 PM" } },
  { id: 9, name: "Dr. Vikram Malhotra", department: "Mechanical Engineering", designation: "Professor & HOD", subjects: ["Engineering Mechanics", "Thermodynamics", "Fluid Mechanics"], email: "vikram.malhotra@campus.edu", phone: "+91-9876543209", cabin: "ME Block, Room 301", officeHours: { day: "Tue, Fri", time: "10:00 AM - 12:00 PM" } },
  { id: 10, name: "Dr. Deepa Menon", department: "Physics", designation: "Associate Professor", subjects: ["Quantum Mechanics", "Optics", "Solid State Physics"], email: "deepa.menon@campus.edu", phone: "+91-9876543210", cabin: "Science Block, Room 201", officeHours: { day: "Mon, Wed", time: "3:00 PM - 5:00 PM" } },
  { id: 11, name: "Dr. Sanjay Tiwari", department: "Electrical Engineering", designation: "Professor & HOD", subjects: ["Electric Circuits", "Power Systems", "Control Systems"], email: "sanjay.tiwari@campus.edu", phone: "+91-9876543211", cabin: "EE Block, Room 401", officeHours: { day: "Tue, Thu", time: "11:00 AM - 1:00 PM" } },
  { id: 12, name: "Dr. Ritu Agarwal", department: "Information Technology", designation: "Associate Professor", subjects: ["Software Engineering", "Data Mining", "Computer Graphics"], email: "ritu.agarwal@campus.edu", phone: "+91-9876543212", cabin: "IT Block, Room 302", officeHours: { day: "Mon, Fri", time: "10:00 AM - 12:00 PM" } },
];

export const toolDefinitions = [
  {
    name: "searchFaculty",
    description: "Search for faculty members by name, department, or subject they teach.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Faculty name, department, or subject to search for" }
      },
      required: ["query"]
    }
  },
  {
    name: "getFacultyByDepartment",
    description: "Get all faculty members in a specific department.",
    parameters: {
      type: "object",
      properties: {
        department: { type: "string", description: "Department name (e.g. Computer Science, Mathematics, Physics)" }
      },
      required: ["department"]
    }
  },
  {
    name: "getOfficeHours",
    description: "Get the office hours and contact details of a specific faculty member by their ID.",
    parameters: {
      type: "object",
      properties: {
        facultyId: { type: "number", description: "The ID of the faculty member" }
      },
      required: ["facultyId"]
    }
  }
];

export function handleTool(name, args) {
  switch (name) {
    case "searchFaculty": {
      const q = (args.query || "").toLowerCase();
      const results = faculty.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.department.toLowerCase().includes(q) ||
        f.subjects.some(s => s.toLowerCase().includes(q)) ||
        f.designation.toLowerCase().includes(q)
      );
      return { results, total: results.length };
    }
    case "getFacultyByDepartment": {
      const dept = (args.department || "").toLowerCase();
      const results = faculty.filter(f => f.department.toLowerCase().includes(dept));
      return { results, total: results.length };
    }
    case "getOfficeHours": {
      const f = faculty.find(f => f.id === args.facultyId);
      if (!f) return { error: "Faculty not found" };
      return { name: f.name, cabin: f.cabin, officeHours: f.officeHours, email: f.email, phone: f.phone };
    }
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export function getWidgetData() {
  const departments = [...new Set(faculty.map(f => f.department))];
  return {
    totalFaculty: faculty.length,
    departments: departments.length,
    featured: faculty.slice(0, 4).map(f => ({ id: f.id, name: f.name, department: f.department, designation: f.designation, subjects: f.subjects.slice(0, 2) })),
    departmentList: departments
  };
}
