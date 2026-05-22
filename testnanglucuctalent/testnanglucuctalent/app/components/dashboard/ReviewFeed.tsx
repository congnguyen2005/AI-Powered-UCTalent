'use client';

import ReviewCard from './ReviewCard';

interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface ReviewFeedProps {
  reviews: Review[];
  loading: boolean;
}

export default function ReviewFeed({ reviews, loading }: ReviewFeedProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-slate-700/20 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Review Feed</h2>
      {reviews.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          No reviews yet. Connect your business to get started.
        </div>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
    </div>
  );
}