"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EventsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchResults, setSearchResults] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => { fetch("/api/events").then(r => r.json()).then(setData); }, []);
  useEffect(() => {
    if (!search.trim()) { setSearchResults(null); return; }
    const t = setTimeout(() => {
      fetch(`/api/events/search?q=${encodeURIComponent(search)}`).then(r => r.json()).then(setSearchResults);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  if (loading || !user || !data) return <PageSkeleton />;

  const events = searchResults?.results || data.upcoming;
  const types = data.categories || [];
  const filtered = typeFilter === "all" ? events : events.filter(e => e.type === typeFilter);

  const typeColors = {
    tech: "from-purple-500 to-indigo-600", workshop: "from-blue-500 to-cyan-600", cultural: "from-pink-500 to-rose-600",
    sports: "from-green-500 to-emerald-600", social: "from-yellow-500 to-amber-600", wellness: "from-teal-500 to-cyan-600", academic: "from-indigo-500 to-violet-600"
  };
  const typeBadge = {
    tech: "bg-purple-100 text-purple-700", workshop: "bg-blue-100 text-blue-700", cultural: "bg-pink-100 text-pink-700",
    sports: "bg-green-100 text-green-700", social: "bg-yellow-100 text-yellow-700", wellness: "bg-teal-100 text-teal-700", academic: "bg-indigo-100 text-indigo-700"
  };

  function formatDate(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date(); today.setHours(0,0,0,0);
    const diff = Math.floor((d - today) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Campus Events</h1>
              <p className="text-xs text-gray-500">{data.totalUpcoming} upcoming events</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800" />
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button onClick={() => setTypeFilter("all")} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${typeFilter === "all" ? "bg-purple-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>All</button>
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all capitalize ${typeFilter === t ? "bg-purple-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>{t}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(event => (
            <div key={event.id} onClick={() => setExpandedId(expandedId === event.id ? null : event.id)} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer">
              <div className={`h-2 bg-gradient-to-r ${typeColors[event.type] || "from-gray-400 to-gray-500"}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{event.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{event.club}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${typeBadge[event.type] || "bg-gray-100 text-gray-600"}`}>{event.type}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {event.venue}
                  </span>
                </div>
                {event.spotsLeft !== null && event.spotsLeft <= 15 && (
                  <div className="mt-2 text-xs text-red-500 font-medium">{event.spotsLeft} spots left!</div>
                )}
                {expandedId === event.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-gray-400 py-12">No events found.</p>}
        </div>
      </main>
    </div>
  );
}

function PageSkeleton() {
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>;
}
