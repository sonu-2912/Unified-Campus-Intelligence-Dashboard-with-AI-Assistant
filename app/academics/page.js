"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AcademicsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("exams");
  const [handbookSearch, setHandbookSearch] = useState("");
  const [handbookResults, setHandbookResults] = useState(null);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => { fetch("/api/academics").then(r => r.json()).then(setData); }, []);
  useEffect(() => {
    if (!handbookSearch.trim()) { setHandbookResults(null); return; }
    const t = setTimeout(() => {
      fetch(`/api/academics/handbook?q=${encodeURIComponent(handbookSearch)}`).then(r => r.json()).then(setHandbookResults);
    }, 300);
    return () => clearTimeout(t);
  }, [handbookSearch]);

  if (loading || !user || !data) return <PageSkeleton />;

  const tabs = [
    { id: "exams", label: "Exams", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { id: "deadlines", label: "Deadlines", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "holidays", label: "Holidays", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { id: "handbook", label: "Handbook", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  ];

  function daysUntil(dateStr) {
    const d = new Date(dateStr + "T00:00:00"); const today = new Date(); today.setHours(0,0,0,0);
    return Math.ceil((d - today) / 86400000);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Academics</h1>
              <p className="text-xs text-gray-500">Exams, deadlines, holidays &amp; handbook</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} /></svg>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "exams" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <h2 className="text-lg font-semibold">Exam Schedule</h2>
              <p className="text-sm opacity-80">{data.totalUpcomingExams} upcoming exams</p>
            </div>
            <div className="divide-y divide-gray-100">
              {data.nextExam && (() => {
                const allExams = [data.nextExam];
                return allExams.map(exam => (
                  <div key={exam.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{exam.subject}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{exam.code} | {exam.type}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-3 py-1 rounded-full font-medium ${daysUntil(exam.date) <= 3 ? "bg-red-100 text-red-700" : daysUntil(exam.date) <= 7 ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                          {daysUntil(exam.date) === 0 ? "Today!" : `${daysUntil(exam.date)} days`}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>{exam.date}</span>
                      <span>{exam.time}</span>
                      <span>{exam.venue}</span>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {activeTab === "deadlines" && (
          <div className="space-y-3">
            {data.urgentDeadlines.map(d => (
              <div key={d.id} className={`bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition-all ${d.status === "urgent" ? "border-red-200" : "border-gray-100"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{d.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{d.course} | {d.type}</p>
                  </div>
                  <div className={`text-xs px-3 py-1 rounded-full font-medium ${daysUntil(d.dueDate) <= 1 ? "bg-red-100 text-red-700" : daysUntil(d.dueDate) <= 3 ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                    {daysUntil(d.dueDate) === 0 ? "Due Today!" : daysUntil(d.dueDate) === 1 ? "Tomorrow" : `${daysUntil(d.dueDate)} days left`}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400">Due: {d.dueDate}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "holidays" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <h2 className="text-lg font-semibold">Academic Calendar</h2>
              <p className="text-sm opacity-80">Holidays &amp; vacations</p>
            </div>
            <div className="divide-y divide-gray-100">
              {data.nextHoliday && (
                <div className="p-5 bg-green-50">
                  <div className="text-xs text-green-600 font-medium mb-1">Next Holiday</div>
                  <h3 className="text-base font-semibold text-green-900">{data.nextHoliday.name}</h3>
                  <p className="text-sm text-green-700 mt-0.5">{data.nextHoliday.date} | {daysUntil(data.nextHoliday.date)} days away</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "handbook" && (
          <div>
            <div className="relative mb-6">
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" value={handbookSearch} onChange={e => setHandbookSearch(e.target.value)} placeholder="Search handbook (e.g. attendance, grading, hostel, fees...)" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800" />
            </div>
            <div className="space-y-4">
              {(handbookResults?.results || []).map(entry => (
                <div key={entry.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{entry.topic}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{entry.content}</p>
                </div>
              ))}
              {handbookSearch && handbookResults?.total === 0 && <p className="text-center text-gray-400 py-8">No handbook entries found.</p>}
              {!handbookSearch && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <p className="text-gray-500 text-sm">Search for topics like attendance, grading, exams, hostel, fees, placement...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function PageSkeleton() {
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>;
}
