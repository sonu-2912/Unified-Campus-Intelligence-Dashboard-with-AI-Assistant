"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FacultyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [searchResults, setSearchResults] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);
  useEffect(() => { fetch("/api/faculty?full=1").then(r => r.json()).then(setData); }, []);
  useEffect(() => {
    if (!search.trim()) { setSearchResults(null); return; }
    const t = setTimeout(() => {
      fetch(`/api/faculty/search?q=${encodeURIComponent(search)}`).then(r => r.json()).then(setSearchResults);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  if (loading || !user || !data) return <PageSkeleton />;

  const faculty = searchResults?.results || data.featured;
  const filtered = deptFilter === "all" ? faculty : faculty.filter(f => f.department === deptFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Faculty Directory</h1>
              <p className="text-xs text-gray-500">{data.totalFaculty} members across {data.departments} departments</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, subject, or department..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800" />
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button onClick={() => setDeptFilter("all")} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${deptFilter === "all" ? "bg-teal-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>All Departments</button>
          {data.departmentList.map(d => (
            <button key={d} onClick={() => setDeptFilter(d)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${deptFilter === d ? "bg-teal-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>{d}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(f => (
            <div key={f.id} onClick={() => setExpandedId(expandedId === f.id ? null : f.id)} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {f.name.split(" ").slice(-1)[0][0]}{f.name.split(" ").slice(-2)[0]?.[0] || ""}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900">{f.name}</h3>
                  <p className="text-sm text-gray-500">{f.designation}</p>
                  <p className="text-xs text-teal-600 mt-1">{f.department}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(f.subjects || []).map((s, i) => (
                      <span key={i} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              {expandedId === f.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {f.email && <div><span className="text-gray-400 text-xs">Email</span><div className="text-gray-700">{f.email}</div></div>}
                  {f.phone && <div><span className="text-gray-400 text-xs">Phone</span><div className="text-gray-700">{f.phone}</div></div>}
                  {f.cabin && <div><span className="text-gray-400 text-xs">Cabin</span><div className="text-gray-700">{f.cabin}</div></div>}
                  {f.officeHours && <div><span className="text-gray-400 text-xs">Office Hours</span><div className="text-gray-700">{f.officeHours.day}, {f.officeHours.time}</div></div>}
                </div>
              )}
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-12">No faculty found.</p>}
      </main>
    </div>
  );
}

function PageSkeleton() {
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" /></div>;
}
