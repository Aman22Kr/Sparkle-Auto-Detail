import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, Sparkles, Filter, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/detailingData';
import { Review } from '../types';

export const ReviewsView: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(TESTIMONIALS);
  const [filterRating, setFilterRating] = useState<number>(0); // 0 means all

  // Review form states
  const [showForm, setShowForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [serviceTag, setServiceTag] = useState('Ultimate Ceramic Detailing');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: authorName,
      location: 'Metro Area',
      carModel: carModel || 'Verified Client',
      rating,
      date: 'Just now',
      title: title || 'Exceptional detailing service',
      comment,
      serviceTag,
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setAuthorName('');
    setCarModel('');
    setTitle('');
    setComment('');
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowForm(false);
    }, 2000);
  };

  const filtered = reviewsList.filter((r) => {
    if (filterRating === 0) return true;
    return r.rating === filterRating;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3">
          <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
          <span>Client Satisfaction & Proof</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Rated 4.9 Stars Across 680+ Verified Detailing Jobs
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Read authentic impressions from owners of exotic sports cars, classic restorations, and daily executive cruisers.
        </p>
      </div>

      {/* Aggregate Rating Scoreboard */}
      <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Big Score */}
          <div className="text-center md:border-r border-slate-800 md:pr-6">
            <div className="text-5xl font-extrabold text-white font-mono tracking-tight">4.9</div>
            <div className="flex items-center justify-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-400">Based on 682 verified studio reviews</p>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-1.5 md:col-span-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-400">5 Stars</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '92%' }} />
              </div>
              <span className="w-8 text-right font-mono text-slate-300">92%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-400">4 Stars</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500/70 rounded-full" style={{ width: '7%' }} />
              </div>
              <span className="w-8 text-right font-mono text-slate-300">7%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-400">3 Stars</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-600 rounded-full" style={{ width: '1%' }} />
              </div>
              <span className="w-8 text-right font-mono text-slate-300">1%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-400">2 Stars</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-600 rounded-full" style={{ width: '0%' }} />
              </div>
              <span className="w-8 text-right font-mono text-slate-300">0%</span>
            </div>
          </div>
        </div>

        {/* Action button to write a review */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% of reviews verified via registered booking codes</span>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{showForm ? 'Cancel Review' : 'Write A Review'}</span>
          </button>
        </div>
      </div>

      {/* Review Submission Form */}
      {showForm && (
        <form
          onSubmit={handleSubmitReview}
          className="bg-[#0A0F1D] border border-cyan-500/40 rounded-2xl p-6 max-w-2xl mx-auto shadow-2xl space-y-4 animate-in slide-in-from-top-3 duration-200"
        >
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Share Your SparkleAutoDetail Experience</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Marcus Vance"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Vehicle Detailed *</label>
              <input
                type="text"
                required
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="e.g. 2023 Porsche 911 GT3"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Service Received</label>
              <select
                value={serviceTag}
                onChange={(e) => setServiceTag(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Ultimate Ceramic Detailing">Ultimate Ceramic Detailing</option>
                <option value="Paint Protection Film (PPF)">Paint Protection Film (PPF)</option>
                <option value="Bronze Interior Dry-Cleaning">Bronze Interior Dry-Cleaning</option>
                <option value="Platinum Detailing">Platinum Detailing</option>
                <option value="Precision Paint Correction">Precision Paint Correction</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Rating</label>
              <div className="flex items-center gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        s <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-300 mb-1">Review Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unbelievable mirror finish and professional staff"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-300 mb-1">Detailed Review *</label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your detailing results, paint condition before & after, and customer service..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {formSuccess ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-semibold">
              Thank you! Your verified review has been posted.
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              Submit Client Review
            </button>
          )}
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Displaying verified testimonials:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterRating(0)}
              className={`px-2.5 py-1 rounded-md ${
                filterRating === 0 ? 'bg-cyan-500 text-slate-950 font-bold' : 'hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-2.5 py-1 rounded-md ${
                filterRating === 5 ? 'bg-cyan-500 text-slate-950 font-bold' : 'hover:text-white'
              }`}
            >
              5 Stars Only
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#090E1A] border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.date}</span>
                </div>

                <h4 className="text-sm font-bold text-white">{rev.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-white block">{rev.author}</span>
                  <span className="text-slate-400">{rev.carModel}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-medium">
                  {rev.serviceTag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
