import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react'

const FEATURED_POST = {
  id: 1,
  title: "How to Pass BECE with Good Grades in 2026",
  excerpt: "Learn how to study well, understand the syllabus, and build good habits to get the best grades in your BECE.",
  category: "Exam Strategies",
  date: "Oct 12, 2025",
  readTime: "8 min read",
  image: "/images/blog/premium_teen_boy_1774182622819.png"
}

const BLOG_POSTS = [
  {
    id: 2,
    slug: 'generate-mock-exams-bece-wassce',
    title: "Generate Your Own Mock Exams to Pass BECE and WASSCE",
    excerpt: "Learn how to create your own practice tests to fix your weak points and improve your final WAEC grades.",
    category: "Study Materials",
    date: "Nov 02, 2025",
    readTime: "6 min read",
    image: "/images/blog/premium_teens_studying_1774182637760.png"
  },
  {
    id: 3,
    slug: 'top-10-repeated-science-questions',
    title: "Top 10 Most Repeated Science Questions",
    excerpt: "We analyzed the last 10 years of Integrated Science past questions. Here are the topics you absolutely must know.",
    category: "Study Materials",
    date: "Sep 15, 2025",
    readTime: "12 min read",
    image: "/images/blog/premium_jhs_girl_1774182651640.png"
  },
  {
    id: 4,
    slug: 'manage-time-mathematics-paper-2',
    title: "How to Manage Time During Mathematics Paper 2",
    excerpt: "Many students fail to complete the math paper due to poor time management. Learn how to allocate your time effectively.",
    category: "Exam Strategies",
    date: "Aug 30, 2025",
    readTime: "6 min read",
    image: "/images/blog/premium_teen_reading_1774182665441.png"
  },
  {
    id: 5,
    slug: 'parents-guide-mock-exams',
    title: "Parent's Guide: Supporting Your Ward During Mock Exams",
    excerpt: "Standardized mock exams can be stressful. Discover practical ways parents can offer mental and academic support.",
    category: "For Parents",
    date: "Jul 22, 2025",
    readTime: "9 min read",
    image: "/images/blog/premium_parent_studying_1774182862359.png"
  },
  {
    id: 6,
    slug: 'memorize-history-dates-effectively',
    title: "How to Memorize History Dates Effectively",
    excerpt: "History doesn't have to be boring. Use these proven memory techniques to recall important dates during your exams.",
    category: "Study Tips",
    date: "Jul 10, 2025",
    readTime: "4 min read",
    image: "/images/blog/premium_history_boy_1774182883063.png"
  },
  {
    id: 7,
    slug: 'bece-school-selection-guide',
    title: "BECE School Selection: What You Need to Know",
    excerpt: "A comprehensive guide on selecting the right Senior High Schools to maximize your chances of CSSPS placement.",
    category: "News & Updates",
    date: "Jun 05, 2025",
    readTime: "15 min read",
    image: "/images/blog/premium_school_group_1774182905108.png"
  },
  {
    id: 8,
    slug: 'waec-marking-scheme-bece-wassce',
    title: "The WAEC Marking Scheme: What Students Should Know",
    excerpt: "Learn how WAEC examiners grade your papers so you can avoid simple mistakes and get better marks.",
    category: "Exam Strategies",
    date: "May 14, 2025",
    readTime: "8 min read",
    image: "/images/blog/premium_exam_paper_1774185447186.png"
  }
]

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-900 flex flex-col font-body selection:bg-gold-500/30">
      <Helmet>
        <title>Blog & Insights | AnyStudents</title>
        <meta name="description" content="Stay updated with the latest exam strategies, BECE and WASSCE news, and study tips from AnyStudents." />
      </Helmet>

      <Navbar />

      <main className="flex-1 flex flex-col relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
        
        {/* Background glow effects */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-gold-400/20 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 font-semibold text-sm mb-6 shadow-[0_0_15px_rgba(245,180,0,0.1)]">
            <BookOpen size={16} />
            Our Blog & Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-6">
            Master Your Exams with <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-200">Expert Tips</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Discover actionable study strategies, latest WAEC news, and comprehensive guides designed to help you excel.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-24">
          <h2 className="text-2xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">Featured Story</h2>
          <Link to="/blog/passing-bece-2026" className="group block relative rounded-3xl overflow-hidden bg-brand-800/50 backdrop-blur-sm border border-white/10 hover:border-gold-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,180,0,0.15)] flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative overflow-hidden h-64 lg:h-auto">
              <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={FEATURED_POST.image} 
                alt={FEATURED_POST.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center relative">
              <div className="flex items-center gap-4 mb-6 text-sm">
                <span className="px-3 py-1.5 rounded-md bg-gold-400 text-brand-900 font-bold tracking-wide uppercase text-xs shadow-md">
                  {FEATURED_POST.category}
                </span>
                <span className="text-white/50 flex items-center gap-1.5"><Calendar size={14}/> {FEATURED_POST.date}</span>
                <span className="text-white/50 flex items-center gap-1.5"><Clock size={14}/> {FEATURED_POST.readTime}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 group-hover:text-gold-400 transition-colors leading-tight">
                {FEATURED_POST.title}
              </h3>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                {FEATURED_POST.excerpt}
              </p>
              <div className="flex items-center gap-2 text-gold-400 font-bold group-hover:gap-3 transition-all self-start pb-1 border-b-2 border-transparent group-hover:border-gold-400">
                Read Full Article <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Posts Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-display font-bold text-white">Latest Articles</h2>
            <button className="text-white/60 hover:text-white flex items-center gap-1 text-sm font-semibold transition-colors">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map(post => (
              <Link to={post.slug ? `/blog/${post.slug}` : "#"} key={post.id} className="group flex flex-col rounded-2xl bg-brand-800/40 backdrop-blur-sm border border-white/5 hover:bg-brand-800 hover:border-gold-500/30 transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-500/10 cursor-pointer">
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md text-gold-400 font-bold text-xs border border-white/10 shadow-lg">
                      {post.category}
                    </span>
                  </div>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900 to-transparent opacity-80" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={13}/> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={13}/> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-gold-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-[15px] mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-gold-400 font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Read more <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
