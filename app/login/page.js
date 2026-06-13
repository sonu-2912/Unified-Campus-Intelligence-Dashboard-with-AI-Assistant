"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";

const DEPARTMENTS = [
  "Computer Science",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Information Technology",
  "Civil Engineering",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function LoginPage() {
  const { login, register, user } = useAuth();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [year, setYear] = useState(YEARS[0]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  if (user) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (isRegister) {
      if (!name.trim()) { setError("Please enter your full name"); setIsLoading(false); return; }
      if (password.length < 4) { setError("Password must be at least 4 characters"); setIsLoading(false); return; }
      const result = register({ studentId, password, name: name.trim(), department, year });
      if (result.success) {
        setSuccess("Account created! You can now sign in.");
        setIsRegister(false);
        setName("");
        setPassword("");
      } else {
        setError(result.error);
      }
    } else {
      const result = login(studentId, password);
      if (result.success) {
        router.push("/");
      } else {
        setError(result.error);
      }
    }
    setIsLoading(false);
  }

  function switchMode() {
    setIsRegister(!isRegister);
    setError("");
    setSuccess("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Campus Intelligence</h1>
          <p className="text-gray-500 mt-1">{isRegister ? "Create your student account" : "Sign in to your student dashboard"}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                placeholder={isRegister ? "Choose a student ID" : "Enter your student ID"}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={isRegister ? "Choose a password" : "Enter your password"}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {isRegister && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
                  >
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
                  >
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}
            {success && (
              <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-xl">{success}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50"
            >
              {isLoading ? (isRegister ? "Creating account..." : "Signing in...") : (isRegister ? "Create Account" : "Sign In")}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button onClick={switchMode} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              {isRegister ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
