"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NoticesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [searchResults, setSearchResults] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => { fetch("/api/notices?full=1").then(r => r.json()).then(setData); }, []);
  useEffect(() => {
    if (!search.trim()) { setSearchResults(null); return; }
    const t = setTimeout(() => {
      fetch(`/api/notices/search?q=${encodeURIComponent(search)}`).then(r => r.json()).then(setSearchResults);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  if (loading || !user || !data) return <PageSkeleton />;

  const notices = searchResults?.results || data.recent;
  const filtered = catFilter === "all" ? notices : notices.filter(n => n.category === catFilter);

  const priorityStyles = {
    urgent: "bg-red-500 text-white", high: "bg-orange-100 text-orange-700",
    medium: "bg-yellow-100 text-yellow-700", low: "bg-gray-100 text-gray-600"
  };
  const catColors = {
    examination: "from-indigo-500 to-purple-600", fees: "from-red-500 to-rose-600",
    placement: "from-green-500 to-emerald-600", library: "from-blue-500 to-cyan-600",
    hostel: "from-amber-500 to-orange-600", academic: "from-violet-500 to-purple-600",
    general: "from-gray-500 to-slate-600", it: "from-cyan-500 to-blue-600"
  };

  function timeAgo(dateStr) {
    const d = new Date(dateStr + "T00:00:00"); const now = new Date();
    const days = Math.floor((now - d) / 86400000);
    if (days === 0) return "Today"; if (days === 1) return "Yesterday"; return `${days} days ago`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Campus Notices</h1>
              <p className="text-xs text-gray-500">{data.totalNotices} notices | {data.urgentCount} important</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="relative mb-6">
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notices..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800" />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button onClick={() => setCatFilter("all")} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${catFilter === "all" ? "bg-amber-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>All</button>
          {data.categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap capitalize ${catFilter === c ? "bg-amber-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>{c}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(notice => (
            <div key={notice.id} onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer">
              <div className={`h-1.5 bg-gradient-to-r ${catColors[notice.category] || "from-gray-400 to-gray-500"}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{notice.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                      <span>{notice.postedBy}</span>
                      <span>&middot;</span>
                      <span>{timeAgo(notice.date)}</span>
                      <span className="capitalize bg-gray-100 px-2 py-0.5 rounded-full">{notice.category}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium shrink-0 ${priorityStyles[notice.priority]}`}>{notice.priority}</span>
                </div>
                {expandedId === notice.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed">{notice.content}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-gray-400 py-12">No notices found.</p>}
        </div>
      </main>
    </div>
  );
}

function PageSkeleton() {
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" /></div>;
}
