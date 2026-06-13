"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LibraryWidget() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/library").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <WidgetSkeleton />;

  return (
    <Link href="/library" className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Library</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-700">{data.totalBooks}</div>
          <div className="text-xs text-blue-600">Total</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-700">{data.availableCount}</div>
          <div className="text-xs text-green-600">Available</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-700">{data.checkedOutCount}</div>
          <div className="text-xs text-orange-600">Checked Out</div>
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Popular Books</h3>
        <div className="space-y-2">
          {data.popularBooks.slice(0, 3).map(book => (
            <div key={book.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-800 truncate flex-1">{book.title}</span>
              <span className="text-green-600 text-xs ml-2 shrink-0">{book.copies} copies</span>
            </div>
          ))}
        </div>
      </div>

      {data.checkedOutBooks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Due Back Soon</h3>
          <div className="space-y-1">
            {data.checkedOutBooks.slice(0, 2).map((book, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 truncate flex-1">{book.title}</span>
                <span className="text-orange-600 text-xs ml-2 shrink-0">{book.dueBack}</span>
              </div>
            ))}
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
        <div className="h-5 w-20 bg-gray-200 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg" />)}
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map(i => <div key={i} className="h-4 bg-gray-100 rounded" />)}
      </div>
    </div>
  );
}
