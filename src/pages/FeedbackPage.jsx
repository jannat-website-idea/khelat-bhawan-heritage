import React, { useState } from 'react';
import { Star, MessageSquare, ExternalLink, CheckCircle, Send, Heart, Award, Sparkles } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AlpanaDivider from '../components/AlpanaDivider';

export default function FeedbackPage({ lang, content }) {
  const t = content[lang];
  const rev = t.reviews;
  const isBn = lang === 'bn';

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitType: 'Heritage Visit',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          title={isBn ? 'দর্শক প্রতিক্রিয়া ও পর্যালোচনা' : 'Visitor Voices & Reviews'}
          subtitle={isBn 
            ? '১৮৪৫ সাল থেকে খেলাৎ ভবনের পুণ্যভূমিতে আগত গবেষক, ভক্তবৃন্দ ও অতিথিদের প্রত্যক্ষ অভিজ্ঞতা' 
            : 'Authentic reflections and verified Google reviews from scholars, devotees, patrons, and guests experiencing 175+ years of living heritage.'}
        />

        {/* Featured Google Reviews Grid */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <p className="heritage-kicker">{isBn ? 'নির্বাচিত পর্যালোচনা' : 'Featured Google Reviews'}</p>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
              {isBn ? 'দর্শনার্থীদের চোখে খেলাৎ ভবন' : 'Reflections of Grandeur & Living Heritage'}
            </h2>
            <AlpanaDivider className="my-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rev.items.map((item) => (
              <a
                key={item.id}
                href={rev.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 rounded-sm bg-card border border-border hover:border-accent/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Headline */}
                  <h4 className="font-serif text-lg font-semibold text-foreground mb-3 leading-snug group-hover:text-accent transition-colors">
                    “{item.title}”
                  </h4>

                  {/* Review Text */}
                  <p className="text-sm text-foreground/80 font-body leading-relaxed mb-6">
                    {item.review}
                  </p>
                </div>

                {/* Reviewer Meta Footer */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 text-accent font-serif font-bold flex items-center justify-center text-sm">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-serif font-semibold text-foreground text-sm leading-tight">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Private Feedback / Message Section */}
        <section className="mb-16 p-8 md:p-12 rounded-sm bg-card border border-border shadow-lg">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="heritage-kicker">{isBn ? 'সরাসরি মতামত' : 'Direct Message'}</p>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {isBn ? 'ট্রাস্টি ও সমন্বয়কারী দলকে আপনার মতামত জানান' : 'Share Your Reflections With The Trustees'}
              </h3>
              <p className="text-xs text-muted-foreground font-body mt-2">
                {isBn 
                  ? 'আপনার প্রতিটি মতামত আমাদের কাছে ঐতিহ্য সংরক্ষণের অনুপ্রেরণা।' 
                  : 'We value every reflection and suggestion from our devotees, guests, and cultural visitors.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-sm bg-accent/10 border border-accent/30 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-accent mx-auto" />
                <h4 className="font-serif text-xl font-semibold text-foreground">
                  {isBn ? 'আপনার মূল্যবান মতামতের জন্য ধন্যবাদ!' : 'Thank You for Sharing Your Experience!'}
                </h4>
                <p className="text-xs text-muted-foreground font-body max-w-md mx-auto">
                  {isBn 
                    ? 'আপনার প্রতিক্রিয়া গৃহীত হয়েছে। আপনি চাইলে আপনার অভিজ্ঞতা সরাসরি গুগলেও প্রকাশ করতে পারেন।' 
                    : 'Your reflection has been sent to our estate coordinators. Please consider also leaving a review on our Google profile.'}
                </p>
                <div className="pt-2">
                  <a
                    href={rev.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground text-xs uppercase tracking-widest font-body font-semibold rounded-sm hover:bg-matte-red transition-all"
                  >
                    <span>{rev.writeReviewBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {isBn ? 'আপনার নাম *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isBn ? 'যেমন: সত্যজিৎ সেন' : 'e.g. Satyajit Sen'}
                      className="w-full px-4 py-2.5 rounded-sm bg-background border border-border focus:border-accent outline-none text-xs text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {isBn ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-sm bg-background border border-border focus:border-accent outline-none text-xs text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {isBn ? 'দর্শনের উপলক্ষ' : 'Visit / Occasion Type'}
                    </label>
                    <select
                      value={formData.visitType}
                      onChange={(e) => setFormData({ ...formData, visitType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-sm bg-background border border-border focus:border-accent outline-none text-xs text-foreground"
                    >
                      <option value="Heritage Architecture Tour">{isBn ? 'ঐতিহাসিক স্থাপত্য দর্শন' : 'Heritage Architecture Tour'}</option>
                      <option value="Durga Puja Devotion">{isBn ? 'দুর্গাপূজা ও আধ্যাত্মিক দর্শন' : 'Durga Puja Devotion'}</option>
                      <option value="Classical Music Baithak">{isBn ? 'শাস্ত্রীয় সঙ্গীত আসর' : 'Classical Music Baithak'}</option>
                      <option value="Wedding / Event Venue">{isBn ? 'বিবাহ / অনুষ্ঠান ভেন্যু' : 'Wedding / Event Venue'}</option>
                      <option value="Photography / Film Shoot">{isBn ? 'ফটোগ্রাফি ও চলচ্চিত্রায়ন' : 'Photography / Film Shoot'}</option>
                      <option value="General Heritage Visitor">{isBn ? 'সাধারণ দর্শনার্থী' : 'General Heritage Visitor'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {isBn ? 'আপনার অভিজ্ঞতা রেটিং' : 'Your Rating'}
                    </label>
                    <div className="flex items-center gap-1.5 py-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              (hoverRating || rating) >= star
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted-foreground/40'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-muted-foreground ml-2 font-body font-semibold">
                        {rating} / 5 Stars
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {isBn ? 'আপনার পর্যালোচনা ও বার্তা *' : 'Your Review / Reflections *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isBn ? 'খেলাৎ ভবন পরিদর্শন সম্পর্কিত আপনার অভিজ্ঞতা লিখুন...' : 'Share your impressions, memorable moments, or feedback regarding Khelat Bhawan...'}
                    className="w-full px-4 py-2.5 rounded-sm bg-background border border-border focus:border-accent outline-none text-xs text-foreground leading-relaxed resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-accent text-accent-foreground text-xs uppercase tracking-widest font-body font-semibold rounded-sm hover:bg-matte-red transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isBn ? 'মতামত জমা দিন' : 'Submit Private Feedback'}</span>
                  </button>

                  <a
                    href={rev.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-accent font-body inline-flex items-center gap-1.5"
                  >
                    <span>{isBn ? 'সরাসরি গুগলে পোস্ট করতে চান?' : 'Want to post publicly on Google?'}</span>
                    <strong className="text-accent underline">{isBn ? 'এখানে ক্লিক করুন' : 'Click here'}</strong>
                    <ExternalLink className="w-3 h-3 text-accent" />
                  </a>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Live Google Reviews Summary Card (Moved to bottom of page) */}
        <section className="p-8 md:p-10 rounded-sm bg-gradient-to-br from-card via-card/95 to-secondary border border-border shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="w-20 h-20 rounded-full bg-white shadow-md border border-border flex items-center justify-center flex-shrink-0 p-3">
                <svg className="w-12 h-12" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="text-3xl font-serif font-bold text-foreground">{rev.rating}</span>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-body">/ {rev.maxRating}</span>
                </div>
                <h3 className="font-serif text-lg text-foreground font-medium">
                  {isBn ? 'গুগল ব্যবসায়িক পর্যালোচনা — খেলাৎ ভবন পাথুরিয়াঘাটা রাজবাড়ি' : 'Google Verified Rating — Khelat Bhavan Pathuriaghata Rajbari'}
                </h3>
                <p className="text-xs text-muted-foreground font-body mt-0.5">
                  {isBn ? '১৫০+ যাচাইকৃত গুগল পর্যালোচনা ও প্রত্যক্ষ ভক্তবৃন্দের মতামত' : 'Based on 150+ verified Google visitor reviews & historical accounts'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={rev.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent text-accent-foreground text-xs uppercase tracking-widest font-body font-semibold rounded-sm hover:bg-matte-red transition-all shadow-sm flex items-center gap-2"
              >
                <span>{rev.writeReviewBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={rev.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 border border-border bg-card text-foreground text-xs uppercase tracking-widest font-body font-semibold rounded-sm hover:border-accent hover:text-accent transition-all flex items-center gap-2"
              >
                <span>{rev.readGoogleBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
