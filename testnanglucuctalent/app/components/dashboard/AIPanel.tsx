'use client';

export default function AIPanel() {
  return (
    <div className="space-y-4">
      <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🤖</span> AI Assistant
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-slate-700/30 rounded-lg">
            <p className="text-sm text-slate-300 mb-2">Sentiment Status</p>
            <p className="text-2xl font-bold text-green-400">75% Positive</p>
          </div>

          <div className="p-4 bg-slate-700/30 rounded-lg">
            <p className="text-sm text-slate-300 mb-2">Pending Responses</p>
            <p className="text-2xl font-bold text-yellow-400">5</p>
          </div>

          <div className="p-4 bg-slate-700/30 rounded-lg">
            <p className="text-sm text-slate-300 mb-2">Crisis Detection</p>
            <p className="text-sm text-green-300">No threats detected</p>
          </div>

          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
            View AI Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}