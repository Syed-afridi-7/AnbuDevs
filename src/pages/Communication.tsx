import React, { useState } from 'react';
import { MessageSquare, User, BookOpen, Mic, Star, ChevronRight, CheckCircle } from 'lucide-react';

const introductions = [
    {
        title: "Self Introduction (Fresher)",
        template: `Good morning/afternoon,\n\nMy name is [Your Name], and I'm from [Your City]. I completed my [Degree] in [Branch] from [College Name] with a CGPA of [X.X].\n\nDuring my studies, I developed strong skills in [Skill 1], [Skill 2], and [Skill 3]. I have worked on projects like [Project 1] and [Project 2], which helped me understand [concept] in depth.\n\nIn my free time, I enjoy [Hobby 1] and [Hobby 2], which help me stay creative and focused.\n\nI am passionate about [Field] and eager to contribute to your organization. Thank you for this opportunity.`,
    },
    {
        title: "Self Introduction (Experienced)",
        template: `Good morning/afternoon,\n\nI'm [Name], with [X] years of experience in [Domain/Field]. Currently, I am working as [Role] at [Company], where I [Key Responsibility].\n\nPrior to this, I worked at [Previous Company] where I [Achievement]. My core expertise is in [Skill 1], [Skill 2], and [Skill 3].\n\nI have successfully delivered [Key Project] which resulted in [Outcome/Impact].\n\nI'm looking for opportunities to grow and take on challenging roles. Thank you.`,
    },
];

const grammarTopics = [
    { title: "Tenses", icon: "⏰", desc: "Present, Past, Future - Simple, Continuous, Perfect", content: ["Simple Present: He/She/It + Verb(s) — He eats", "Simple Past: Subject + V2 — She played", "Simple Future: Subject + will + V1 — They will go", "Present Continuous: Subject + am/is/are + V-ing", "Past Perfect: Subject + had + V3"] },
    { title: "Articles", icon: "📝", desc: "a, an, the — When and how to use", content: ["'A' — before consonant sounds: a book, a car", "'An' — before vowel sounds: an apple, an hour", "'The' — specific/known noun: the sun, the teacher", "No article — proper nouns, general concepts: India, love"] },
    { title: "Prepositions", icon: "🔗", desc: "in, on, at, by, with, from, to...", content: ["In — enclosed space/long time: in the box, in 2024", "On — surface/specific day: on the table, on Monday", "At — specific point/time: at the door, at 5pm", "By — agent/deadline: by tomorrow, by Ravi"] },
    { title: "Subject-Verb Agreement", icon: "✅", desc: "Matching subjects with correct verbs", content: ["Singular subject → singular verb: She runs fast", "Plural subject → plural verb: They run fast", "Collective noun → singular: The team is ready", "Either/Neither → singular: Either of them is correct"] },
];

const interviewTips = [
    { tip: "Research the company thoroughly before the interview", icon: "🔍" },
    { tip: "Use STAR method (Situation, Task, Action, Result) for behavioral questions", icon: "⭐" },
    { tip: "Prepare 3-5 questions to ask the interviewer", icon: "❓" },
    { tip: "Dress professionally and arrive 10-15 minutes early", icon: "👔" },
    { tip: "Maintain eye contact and positive body language", icon: "👀" },
    { tip: "Use clear, structured answers. Avoid fillers (um, uh)", icon: "🎤" },
    { tip: "Highlight achievements with specific metrics", icon: "📊" },
    { tip: "Follow up with a thank-you email within 24 hours", icon: "📧" },
];

const commonQuestions = [
    { q: "Tell me about yourself.", hint: "Use the self intro template. Keep it 90 seconds. Focus on education → skills → projects → career goals." },
    { q: "What are your strengths?", hint: "Choose 2-3 relevant strengths. Back each with a concrete example. E.g., 'Problem-solving: I debugged a critical issue in...'" },
    { q: "What is your greatest weakness?", hint: "Choose a real weakness you're working on. Show growth: 'I used to struggle with time management. I now use...'" },
    { q: "Why should we hire you?", hint: "Match your skills to job requirements. 'I bring [skill], [skill], and [achievement] which align perfectly with this role.'" },
    { q: "Where do you see yourself in 5 years?", hint: "Show ambition but alignment. 'I aim to grow into a [senior role] while contributing to [company goal].'" },
];

const Communication = () => {
    const [activeTab, setActiveTab] = useState<'intro' | 'grammar' | 'interview'>('intro');
    const [expandedGrammar, setExpandedGrammar] = useState<string | null>(null);
    const [expandedQ, setExpandedQ] = useState<string | null>(null);

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-xl font-bold text-foreground">Communication Skills 💬</h2>
                <p className="text-sm text-muted-foreground">Master English basics and ace your placement interviews</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
                {[
                    { key: 'intro', label: 'Self Introduction', icon: User },
                    { key: 'grammar', label: 'Grammar Basics', icon: BookOpen },
                    { key: 'interview', label: 'Interview Prep', icon: Mic },
                ].map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key as 'intro' | 'grammar' | 'interview')}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === key
                            ? 'border-orange-500 text-orange-400'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <Icon size={14} /> {label}
                    </button>
                ))}
            </div>

            {/* Tab: Self Introduction */}
            {activeTab === 'intro' && (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Practice these templates and personalize them for your interviews.</p>
                    {introductions.map((intro, i) => (
                        <div key={i} className="bg-card border border-border rounded-2xl p-6 space-y-3">
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <User size={16} className="text-orange-400" /> {intro.title}
                            </h3>
                            <div className="bg-muted/50 rounded-xl p-4 font-mono text-xs text-foreground whitespace-pre-wrap leading-relaxed">
                                {intro.template}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigator.clipboard.writeText(intro.template)}
                                    className="text-xs px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-colors"
                                >
                                    📋 Copy Template
                                </button>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Star size={11} className="text-yellow-400" /> Replace [brackets] with your details
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tab: Grammar */}
            {activeTab === 'grammar' && (
                <div className="space-y-3">
                    {grammarTopics.map((topic) => (
                        <div key={topic.title} className="bg-card border border-border rounded-xl overflow-hidden">
                            <button
                                onClick={() => setExpandedGrammar(expandedGrammar === topic.title ? null : topic.title)}
                                className="w-full flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors text-left"
                            >
                                <span className="text-2xl">{topic.icon}</span>
                                <div className="flex-1">
                                    <div className="font-medium text-foreground">{topic.title}</div>
                                    <div className="text-xs text-muted-foreground">{topic.desc}</div>
                                </div>
                                <ChevronRight size={16} className={`text-muted-foreground transition-transform ${expandedGrammar === topic.title ? 'rotate-90' : ''}`} />
                            </button>
                            {expandedGrammar === topic.title && (
                                <div className="px-4 pb-4 border-t border-border">
                                    <ul className="space-y-2 mt-3">
                                        {topic.content.map((line, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                                                <span className="text-foreground font-mono text-xs">{line}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Tab: Interview Prep */}
            {activeTab === 'interview' && (
                <div className="space-y-6">
                    {/* Tips */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">💡 Interview Tips</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {interviewTips.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl">
                                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                                    <p className="text-xs text-foreground">{item.tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Common Questions */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">🎯 Common Interview Questions</h3>
                        <div className="space-y-2">
                            {commonQuestions.map((item) => (
                                <div key={item.q} className="bg-card border border-border rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setExpandedQ(expandedQ === item.q ? null : item.q)}
                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-foreground">{item.q}</span>
                                        <ChevronRight size={14} className={`text-muted-foreground transition-transform flex-shrink-0 ${expandedQ === item.q ? 'rotate-90' : ''}`} />
                                    </button>
                                    {expandedQ === item.q && (
                                        <div className="px-4 pb-4 border-t border-border">
                                            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{item.hint}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Communication;
