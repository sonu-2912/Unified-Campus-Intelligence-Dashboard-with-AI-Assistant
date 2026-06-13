"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const DEFAULT_STUDENTS = [
  { id: "student1", password: "pass123", name: "Rahul Sharma", department: "Computer Science", year: "3rd Year", rollNo: "CS21B1045" },
  { id: "student2", password: "pass123", name: "Priya Patel", department: "Electronics & Communication", year: "2nd Year", rollNo: "EC22B1023" },
  { id: "student3", password: "pass123", name: "Arjun Kumar", department: "Mechanical Engineering", year: "4th Year", rollNo: "ME20B1012" },
  { id: "student4", password: "pass123", name: "Sneha Reddy", department: "Information Technology", year: "3rd Year", rollNo: "IT21B1034" },
  { id: "student5", password: "pass123", name: "Vikram Singh", department: "Electrical Engineering", year: "2nd Year", rollNo: "EE22B1056" },
];

function getStoredStudents() {
  if (typeof window === "undefined") return DEFAULT_STUDENTS;
  const stored = localStorage.getItem("campus_students");
  if (stored) {
    try { return JSON.parse(stored); } catch {}
  }
  localStorage.setItem("campus_students", JSON.stringify(DEFAULT_STUDENTS));
  return DEFAULT_STUDENTS;
}

function saveStudents(students) {
  localStorage.setItem("campus_students", JSON.stringify(students));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("campus_user");
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
    setLoading(false);
  }, []);

  function login(studentId, password) {
    const students = getStoredStudents();
    const student = students.find(s => s.id === studentId && s.password === password);
    if (!student) return { success: false, error: "Invalid student ID or password" };
    const userData = { id: student.id, name: student.name, department: student.department, year: student.year, rollNo: student.rollNo };
    localStorage.setItem("campus_user", JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  }

  function register({ studentId, password, name, department, year }) {
    const students = getStoredStudents();
    if (students.find(s => s.id === studentId)) {
      return { success: false, error: "Student ID already exists" };
    }
    const deptCodes = { "Computer Science": "CS", "Electronics & Communication": "ECE", "Mechanical Engineering": "ME", "Electrical Engineering": "EE", "Information Technology": "IT", "Civil Engineering": "CE" };
    const code = deptCodes[department] || "ST";
    const rollNo = `${code}${new Date().getFullYear().toString().slice(-2)}B${String(students.length + 1).padStart(4, "0")}`;
    const newStudent = { id: studentId, password, name, department, year, rollNo };
    students.push(newStudent);
    saveStudents(students);
    return { success: true };
  }

  function logout() {
    localStorage.removeItem("campus_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
