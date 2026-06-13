"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CafeteriaWidget() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/cafeteria").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <WidgetSkeleton />;

  const mealOrder = ["breakfast", "lunch", "dinner"];
  const currentMeal = data.nextMeal?.meal?.toLowerCase().split(" ")[0] || "lunch";

  return (
    <Link href="/cafeteria" className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-orange-200 transition-all group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v2H3V3zm0 4h18v14H3V7zm4 4h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Cafeteria</h2>
          <p className="text-xs text-gray-500 capitalize">{data.today}</p>
        </div>
      </div>

      {data.nextMeal && (
        <div className="bg-orange-50 rounded-lg p-3 mb-4">
          <div className="text-sm font-medium text-orange-800">
            Next: {data.nextMeal.meal} at {data.nextMeal.time}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {mealOrder.map(meal => {
          const items = data.menu?.[meal];
          if (!items) return null;
          return (
            <div key={meal}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-700 capitalize">{meal}</h3>
                <span className="text-xs text-gray-400">
                  {data.timings[meal]?.start} - {data.timings[meal]?.end}
                </span>
              </div>
              <div className="space-y-1">
                {items.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        item.type === "veg" ? "bg-green-500" : item.type === "vegan" ? "bg-emerald-500" : "bg-red-500"
                      }`} />
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                    <span className="text-gray-500 text-xs">&#8377;{item.price}</span>
                  </div>
                ))}
                {items.length > 2 && (
                  <div className="text-xs text-gray-400">+{items.length - 2} more items</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
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
      <div className="h-12 bg-gray-100 rounded-lg mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-1">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-3 bg-gray-100 rounded" />
            <div className="h-3 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
