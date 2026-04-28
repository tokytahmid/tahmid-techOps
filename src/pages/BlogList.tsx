import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firebaseService } from '../services/firebaseService';
import { motion } from 'motion/react';
import { Calendar, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  createdAt?: any;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    firebaseService.getBlogPosts()
      .then(data => {
        if (data) setPosts(data as BlogPost[]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog posts:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Recent';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <section className="py-20 md:py-32 min-h-screen">
      <div className="container mx-auto px-5 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-accent-orange mb-4">
            <span className="h-[2px] w-8 bg-accent-orange"></span>
            <span className="uppercase tracking-[2px] text-sm font-semibold">Our Thoughts</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Latest <span className="text-accent-orange">Articles</span></h2>
          <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
            Exploring the intersection of network engineering, system administration, and modern web development.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-orange"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-surface rounded-2xl overflow-hidden border border-border group hover:border-accent-orange/50 transition-colors flex flex-col"
              >
                {post.imageUrl && (
                  <Link to={`/blog/${post.id}`} className="block h-56 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }}
                    />
                  </Link>
                )}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
                    <Calendar size={16} className="text-accent-orange" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <Link to={`/blog/${post.id}`} className="block mb-4">
                    <h3 className="text-2xl font-bold text-text-main group-hover:text-accent-orange transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-text-muted mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-accent-orange font-medium hover:text-white transition-colors mt-auto w-fit"
                  >
                    Read Article <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.article>
            ))}
            
            {posts.length === 0 && !loading && (
              <div className="col-span-full py-12 text-center text-text-muted bg-surface rounded-xl border border-border">
                No blog posts found. Check back soon!
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
