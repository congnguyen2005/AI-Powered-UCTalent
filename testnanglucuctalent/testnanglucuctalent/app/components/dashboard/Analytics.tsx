'use client';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm mb-2">Total Reviews</p>
          <p className="text-3xl font-bold text-white">1,234</p>
          <p className="text-green-400 text-sm mt-2">↑ 12% this month</p>
        </div>

        <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm mb-2">Avg Rating</p>
          <p className="text-3xl font-bold text-white">4.6</p>
          <p className="text-green-400 text-sm mt-2">⭐ Excellent</p>
        </div>

        <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm mb-2">Response Rate</p>
          <p className="text-3xl font-bold text-white">92%</p>
          <p className="text-green-400 text-sm mt-2">↑ 5% improvement</p>
        </div>

        <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-sm mb-2">AI Suggestions</p>
          <p className="text-3xl font-bold text-white">156</p>
          <p className="text-blue-400 text-sm mt-2">Used this month</p>
        </div>
      </div>

      <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600">
        <h3 className="text-lg font-semibold text-white mb-4">Sentiment Timeline</h3>
        <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400">
          [Chart would render here with chart library]
        </div>
      </div>
    </div>
  );
}