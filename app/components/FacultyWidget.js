"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function FacultyWidget() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/faculty").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <WidgetSkeleton />;

  return (
    <Link href="/faculty" className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-teal-200 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Faculty</h2>
        </div>
        <div className="text-right">
          <span className="text-sm text-teal-600 font-medium">{data.totalFaculty} members</span>
          <div className="text-xs text-gray-400">{data.departments} depts</div>
        </div>
      </div>

      <div className="space-y-3">
        {data.featured.map(f => (
          <div key={f.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center shrink-0 text-teal-700 font-medium text-sm">
              {f.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900">{f.name}</div>
              <div className="text-xs text-gray-500">{f.designation}</div>
              <div className="text-xs text-teal-600 mt-0.5">{f.subjects.join(", ")}</div>
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}

function WidgetSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-xl" />
        <div className="h-5 w-20 bg-gray-200 rounded" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
