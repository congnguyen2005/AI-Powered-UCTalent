'use client';

import { useState } from 'react';

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    text: string;
    author: string;
    date: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    priority: 'low' | 'medium' | 'high' | 'critical';
  };
}

const sentimentColors = {
  positive: 'bg-green-500/20 border-green-500/50 text-green-300',
  neutral: 'bg-slate-500/20 border-slate-500/50 text-slate-300',
  negative: 'bg-red-500/20 border-red-500/50 text-red-300',
};

const priorityColors = {
  low: 'bg-blue-500/20',
  medium: 'bg-yellow-500/20',
  high: 'bg-orange-500/20',
  critical: 'bg-red-500/20',
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const [showAI, setShowAI] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const generateAIResponse = async () => {
    setLoadingAI(true);
    try {
      const response = await fetch('/api/ai/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId: review.id, reviewText: review.text }),
      });
      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error('Failed to generate response:', error);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div
      className={`p-6 rounded-lg border border-slate-700 ${priorityColors[review.priority]}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{'⭐'.repeat(review.rating)}</span>
            <h3 className="text-lg font-semibold text-white">{review.author}</h3>
          </div>
          <p className="text-sm text-slate-400">{review.date}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full border text-sm font-medium ${sentimentColors[review.sentiment]}`}
        >
          {review.sentiment}
        </div>
      </div>

      <p className="text-slate-300 mb-4">{review.text}</p>

      {!showAI && (
        <button
          onClick={() => {
            setShowAI(true);
            generateAIResponse();
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
        >
          Generate AI Response
        </button>
      )}

      {showAI && (
        <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          {loadingAI ? (
            <p className="text-slate-300">Generating response...</p>
          ) : (
            <>
              <p className="text-slate-300 mb-4">{aiResponse}</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition">
                  Approve
                </button>
                <button className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm transition">
                  Edit & Approve
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}