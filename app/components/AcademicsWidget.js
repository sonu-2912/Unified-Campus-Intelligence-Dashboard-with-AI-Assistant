"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AcademicsWidget() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/academics").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <WidgetSkeleton />;

  function daysUntil(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((d - today) / (1000 * 60 * 60 * 24));
  }

  function urgencyColor(days) {
    if (days <= 1) return "text-red-600 bg-red-50";
    if (days <= 3) return "text-orange-600 bg-orange-50";
    return "text-blue-600 bg-blue-50";
  }

  return (
    <Link href="/academics" className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-indigo-200 transition-all group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Academics</h2>
      </div>

      {data.nextExam && (
        <div className="bg-indigo-50 rounded-lg p-3 mb-4">
          <div className="text-xs text-indigo-600 font-medium mb-1">Next Exam</div>
          <div className="text-sm font-medium text-indigo-900">{data.nextExam.subject}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-indigo-600">{data.nextExam.date}</span>
            <span className="text-xs text-indigo-400">{data.nextExam.time}</span>
          </div>
          <div className="text-xs text-indigo-500 mt-1">{data.nextExam.venue} | {data.totalUpcomingExams} exams total</div>
        </div>
      )}

      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Upcoming Deadlines</h3>
        <div className="space-y-2">
          {data.urgentDeadlines.map(d => {
            const days = daysUntil(d.dueDate);
            const color = urgencyColor(days);
            return (
              <div key={d.id} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-800 truncate">{d.title}</div>
                  <div className="text-xs text-gray-400">{d.course}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ml-2 shrink-0 font-medium ${color}`}>
                  {days === 0 ? "Today!" : days === 1 ? "Tomorrow" : `${days} days`}
                </span>
              </div>
            );
          })}
        </div>
        {data.totalDeadlines > 3 && (
          <div className="text-xs text-gray-400 mt-2">+{data.totalDeadlines - 3} more deadlines</div>
        )}
      </div>

      {data.nextHoliday && (
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Next Holiday</span>
            <div className="text-right">
              <div className="text-gray-800 font-medium">{data.nextHoliday.name}</div>
              <div className="text-xs text-gray-400">{data.nextHoliday.date}</div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

function WidgetSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-xl" />
        <div className="h-5 w-24 bg-gray-200 rounded" />
      </div>
      <div className="h-20 bg-gray-100 rounded-lg mb-4" />
      <div className="space-y-2">
        {[1, 2, 3].map(i => <div key={i} className="h-10 bg-gray-100 rounded" />)}
      </div>
    </div>
  );
}
