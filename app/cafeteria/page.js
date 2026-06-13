"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CafeteriaPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [dietFilter, setDietFilter] = useState("all");
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    fetch("/api/cafeteria?full=1").then(r => r.json()).then(d => {
      setData(d);
      setSelectedDay(d.today);
    });
  }, []);

  if (loading || !user || !data) return <PageSkeleton />;

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const currentDayMenu = data.weekMenu?.[selectedDay] || data.menu;
  const mealIcons = { breakfast: "7:30 - 9:30 AM", lunch: "12:00 - 2:30 PM", dinner: "7:00 - 9:30 PM" };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Campus Cafeteria</h1>
                <p className="text-xs text-gray-500">Weekly menu &amp; timings</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {data.nextMeal && (
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 text-white mb-6">
            <div className="text-sm opacity-80">Next Meal</div>
            <div className="text-2xl font-bold mt-1">{data.nextMeal.meal}</div>
            <div className="text-sm opacity-80 mt-1">Starts at {data.nextMeal.time}</div>
          </div>
        )}

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {days.map(day => (
            <button key={day} onClick={() => setSelectedDay(day)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all capitalize ${selectedDay === day ? "bg-orange-600 text-white shadow-md" : day === data.today ? "bg-orange-100 text-orange-700" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {day.slice(0, 3)} {day === data.today && selectedDay !== day ? "(Today)" : ""}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {["all", "veg", "non-veg", "vegan"].map(f => (
            <button key={f} onClick={() => setDietFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${dietFilter === f ? "bg-orange-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
              {f !== "all" && <span className={`w-2 h-2 rounded-full ${f === "veg" ? "bg-green-500" : f === "vegan" ? "bg-emerald-500" : "bg-red-500"}`} />}
              <span className="capitalize">{f}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["breakfast", "lunch", "dinner"].map(meal => {
            const items = currentDayMenu?.[meal] || [];
            const filtered = dietFilter === "all" ? items : items.filter(i => i.type === dietFilter);
            return (
              <div key={meal} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`p-4 ${meal === "breakfast" ? "bg-gradient-to-r from-yellow-400 to-orange-400" : meal === "lunch" ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-gradient-to-r from-indigo-500 to-purple-600"} text-white`}>
                  <h3 className="font-semibold capitalize text-lg">{meal}</h3>
                  <p className="text-sm opacity-80">{mealIcons[meal]}</p>
                </div>
                <div className="p-4 space-y-3">
                  {filtered.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full shrink-0 ${item.type === "veg" ? "bg-green-500" : item.type === "vegan" ? "bg-emerald-500" : "bg-red-500"}`} />
                        <div>
                          <div className="text-sm font-medium text-gray-800">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.calories} cal</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">&#8377;{item.price}</div>
                    </div>
                  ))}
                  {filtered.length === 0 && <p className="text-center text-gray-400 text-sm py-4">No {dietFilter} items</p>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Cafeteria Timings</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(data.timings).map(([meal, t]) => (
              <div key={meal} className="bg-orange-50 rounded-xl p-4 text-center">
                <div className="text-sm font-medium text-orange-800 capitalize">{meal}</div>
                <div className="text-xs text-orange-600 mt-1">{t.start} - {t.end}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
