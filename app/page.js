"use client";
import { useAuth } from "./components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LibraryWidget from "./components/LibraryWidget";
import CafeteriaWidget from "./components/CafeteriaWidget";
import EventsWidget from "./components/EventsWidget";
import AcademicsWidget from "./components/AcademicsWidget";
import FacultyWidget from "./components/FacultyWidget";
import NoticesWidget from "./components/NoticesWidget";
import ChatAssistant from "./components/ChatAssistant";

export default function Home() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Campus Intelligence</h1>
                <p className="text-xs text-gray-500">Your unified campus dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:block">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </span>
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-800">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.department} | {user.year}</div>
                </div>
                <button
                  onClick={logout}
                  className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(" ")[0]}!</h2>
          <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening on campus today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LibraryWidget />
          <CafeteriaWidget />
          <EventsWidget />
          <AcademicsWidget />
          <FacultyWidget />
          <NoticesWidget />
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Need help? Ask CampusAI</h2>
              <p className="text-sm text-blue-100">
                Click the chat button in the bottom-right corner to ask about library books, cafeteria menus, events, academics, faculty, or notices.
              </p>
            </div>
          </div>
        </div>
      </main>

      <ChatAssistant />
    </div>
  );
}
