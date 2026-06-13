"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EventsWidget() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/events").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <WidgetSkeleton />;

  const typeColors = {
    tech: "bg-purple-100 text-purple-700",
    workshop: "bg-blue-100 text-blue-700",
    cultural: "bg-pink-100 text-pink-700",
    sports: "bg-green-100 text-green-700",
    social: "bg-yellow-100 text-yellow-700",
    wellness: "bg-teal-100 text-teal-700",
    academic: "bg-indigo-100 text-indigo-700",
  };

  function formatDate(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.floor((d - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  return (
    <Link href="/events" className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-purple-200 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Events</h2>
        </div>
        <span className="text-sm text-purple-600 font-medium">{data.totalUpcoming} upcoming</span>
      </div>

      {data.todayEvents?.length > 0 && (
        <div className="bg-purple-50 rounded-lg p-3 mb-4">
          <div className="text-sm font-medium text-purple-800">
            {data.todayEvents.length} event{data.todayEvents.length > 1 ? "s" : ""} today!
          </div>
        </div>
      )}

      <div className="space-y-3">
        {data.upcoming.map(event => (
          <div key={event.id} className="border border-gray-50 rounded-lg p-3">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-sm font-medium text-gray-900 leading-tight flex-1">{event.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ml-2 shrink-0 ${typeColors[event.type] || "bg-gray-100 text-gray-600"}`}>
                {event.type}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{formatDate(event.date)}</span>
              <span>{event.time}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">{event.venue}</div>
            {event.spotsLeft !== null && event.spotsLeft <= 15 && (
              <div className="text-xs text-red-500 mt-1">{event.spotsLeft} spots left!</div>
            )}
          </div>
        ))}
      </div>

      {data.upcoming.length === 0 && (
        <div className="text-center text-gray-400 text-sm py-4">No upcoming events this week</div>
      )}
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
        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-lg" />)}
      </div>
    </div>
  );
}
