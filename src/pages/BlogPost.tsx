import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { firebaseService } from '../services/firebaseService';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  createdAt?: any;
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    
    firebaseService.getBlogPost(id)
      .then(data => {
        if (data) setPost(data as BlogPost);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog post:', err);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Recent';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-orange"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
        <h2 className="text-3xl font-bold text-text-main mb-4">Post Not Found</h2>
        <p className="text-text-muted mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="px-6 py-3 bg-accent-orange text-white rounded-lg hover:bg-opacity-90 transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="py-20 md:py-32 min-h-screen">
      <Helmet>
        <title>{post.title} | KT Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`blog, ${post.title.toLowerCase().split(' ').join(', ')}, tech, IT infrastructure`} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="container mx-auto px-5 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-accent-orange transition-colors mb-10">
            <ArrowLeft size={18} />
            <span>Back to all articles</span>
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-2 text-text-muted mb-6">
              <Calendar size={18} className="text-accent-orange" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-main leading-tight mb-8">
              {post.title}
            </h1>
            
            {post.imageUrl && (
              <div className="rounded-2xl overflow-hidden aspect-video border border-border">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }}
                />
              </div>
            )}
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-a:text-accent-orange hover:prose-a:text-white prose-img:rounded-xl">
             {/* Formatting basic text paragraphs for now. A proper markdown renderer could be used if input allows it */}
             {post.content.split('\n\n').map((paragraph, index) => (
               <p key={index} className="text-text-muted leading-relaxed mb-6">
                 {paragraph}
               </p>
             ))}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
