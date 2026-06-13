"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LibraryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    fetch("/api/library?full=1").then(r => r.json()).then(setData);
  }, []);

  useEffect(() => {
    if (!search.trim()) { setSearchResults(null); return; }
    const timeout = setTimeout(() => {
      fetch(`/api/library/search?q=${encodeURIComponent(search)}`).then(r => r.json()).then(setSearchResults);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  if (loading || !user) return null;
  if (!data) return <PageSkeleton title="Library" />;

  const books = searchResults?.results || data.popularBooks;
  const filtered = filter === "all" ? books : filter === "available" ? books.filter(b => b.available) : books.filter(b => !b.available);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Campus Library</h1>
                <p className="text-xs text-gray-500">{data.totalBooks} books in catalog</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Books" value={data.totalBooks} color="blue" />
          <StatCard label="Available" value={data.availableCount} color="green" />
          <StatCard label="Checked Out" value={data.checkedOutCount} color="orange" />
          <StatCard label="Subjects" value={[...new Set(data.popularBooks?.map(b => b.subject) || [])].length} color="purple" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Library Hours</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.entries(data.hours).map(([day, h]) => (
              <div key={day} className="bg-blue-50 rounded-xl p-3 text-center">
                <div className="text-xs font-medium text-blue-800 capitalize mb-1">{day}</div>
                <div className="text-xs text-blue-600">{h.open}</div>
                <div className="text-xs text-blue-600">{h.close}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by title, author, or subject..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              />
            </div>
            <div className="flex gap-2">
              {["all", "available", "checked out"].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {searchResults && <p className="text-sm text-gray-500 mb-4">{searchResults.total} result{searchResults.total !== 1 ? "s" : ""} found</p>}

          <div className="space-y-3">
            {filtered.map(book => (
              <div key={book.id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <div className={`w-12 h-16 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 ${book.available ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-gray-400 to-gray-500"}`}>
                  {book.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{book.subject}</span>
                    <span className="text-xs text-gray-400">{book.location}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {book.available ? (
                    <div>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Available</span>
                      <p className="text-xs text-gray-400 mt-1">{book.copies} copies</p>
                    </div>
                  ) : (
                    <div>
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Checked Out</span>
                      {book.dueBack && <p className="text-xs text-gray-400 mt-1">Due: {book.dueBack}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No books found matching your search.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = { blue: "from-blue-500 to-blue-600", green: "from-green-500 to-green-600", orange: "from-orange-500 to-orange-600", purple: "from-purple-500 to-purple-600" };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-2xl p-5 text-white`}>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm opacity-80 mt-1">{label}</div>
    </div>
  );
}

function PageSkeleton({ title }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading {title}...</p>
      </div>
    </div>
  );
}
