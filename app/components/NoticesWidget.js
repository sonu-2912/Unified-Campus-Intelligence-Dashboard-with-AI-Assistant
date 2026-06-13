"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NoticesWidget() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/notices").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <WidgetSkeleton />;

  const priorityStyles = {
    urgent: "bg-red-100 text-red-700",
    high: "bg-orange-100 text-orange-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-gray-100 text-gray-600",
  };

  function timeAgo(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const now = new Date();
    const days = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  }

  return (
    <Link href="/notices" className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-amber-200 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Notices</h2>
        </div>
        {data.urgentCount > 0 && (
          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
            {data.urgentCount} important
          </span>
        )}
      </div>

      <div className="space-y-3">
        {data.recent.map(notice => (
          <div key={notice.id} className="border border-gray-50 rounded-lg p-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-sm font-medium text-gray-900 leading-tight flex-1">{notice.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${priorityStyles[notice.priority]}`}>
                {notice.priority}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{notice.postedBy}</span>
              <span>&middot;</span>
              <span>{timeAgo(notice.date)}</span>
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
        {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg" />)}
      </div>
    </div>
  );
}
