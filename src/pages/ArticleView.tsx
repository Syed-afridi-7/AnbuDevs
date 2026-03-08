import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Flame, Clock, Share2, BookmarkPlus } from 'lucide-react';

const ArticleView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    return (
        <div className="min-h-full bg-background">
            {/* Header Banner */}
            <div className="bg-card border-b border-border py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <Button variant="ghost" size="sm" onClick={() => navigate('/articles')} className="mb-6 -ml-3 text-muted-foreground hover:text-foreground">
                        <ChevronLeft size={16} /> Back to Articles
                    </Button>

                    <div className="flex gap-2 mb-4">
                        <span className="bg-orange-500/10 text-orange-500 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
                            System Design
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-6">
                        An in-depth guide to {id?.replace(/-/g, ' ')}
                    </h1>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                SI
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-foreground">Sona Incubation</div>
                                <div className="flex gap-2 text-xs text-muted-foreground">
                                    <span>Oct 15, 2024</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> 8 min read</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-border text-muted-foreground">
                                <Share2 size={14} />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-border text-muted-foreground">
                                <BookmarkPlus size={14} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content Area */}
            <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 relative">
                {/* Social / Action floating bar (desktop) */}
                <div className="hidden lg:flex flex-col gap-4 sticky top-24 h-max py-4">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-orange-400">
                        <Flame size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted text-muted-foreground hover:text-blue-400">
                        <Share2 size={20} />
                    </Button>
                </div>

                {/* Prose Content */}
                <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none flex-1">
                    <p className="lead text-lg text-muted-foreground leading-relaxed">
                        In this guide, we will explore the fundamental concepts you need to know about this topic. Whether you are interviewing for a FAANG company or just want to level up your engineering skills.
                    </p>

                    <h2>Core Concepts</h2>
                    <p>
                        When building scalable systems, there are a few core rules to keep in mind. First, always measure before optimizing. Second, stateless services are easier to scale horizontally than stateful ones.
                    </p>

                    <pre className="bg-[#1e1e1e] p-4 rounded-xl border border-border/50 overflow-x-auto">
                        <code className="text-sm font-mono text-gray-300">
                            {`function scalableService(req, res) {
  // Stateless implementation
  const data = processRequest(req);
  return res.status(200).json(data);
}`}
                        </code>
                    </pre>

                    <h2>Real-world Example</h2>
                    <p>
                        During a recent system design interview at Google, the interviewer asked how to implement a rate limiter. The naive approach was a token bucket. But when dealing with distributed systems, we need to consider Redis or Memcached to share state across nodes.
                    </p>

                    <blockquote>
                        "Premature optimization is the root of all evil" - Donald Knuth.
                    </blockquote>

                    <p>
                        This principle applies directly to how we structure React components or backend microservices. Start monolithic if it's faster to validate the business logic, and break it down when scaling requires it.
                    </p>
                </article>
            </div>
        </div>
    );
};

export default ArticleView;
