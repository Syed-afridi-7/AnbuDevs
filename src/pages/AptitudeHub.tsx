import React, { useState, useEffect, useRef } from 'react';
import { aptitudeQuestions, aptitudeCategories, aptitudeSubCategories, AptitudeQuestion } from '@/data/aptitude';
import { Timer, CheckCircle, XCircle, ChevronRight, BarChart2, RefreshCw, Filter } from 'lucide-react';

const AptitudeHub = () => {
    const [category, setCategory] = useState('All');
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [quizFinished, setQuizFinished] = useState(false);
    const [results, setResults] = useState<{ q: AptitudeQuestion; chosen: number | null; correct: boolean }[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const questions = aptitudeQuestions.filter(q => category === 'All' || q.category === category);

    useEffect(() => {
        if (quizStarted && !answered && !quizFinished) {
            timerRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        clearInterval(timerRef.current!);
                        handleAnswer(null);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizStarted, currentQ, answered]);

    const handleAnswer = (idx: number | null) => {
        if (answered) return;
        clearInterval(timerRef.current!);
        setSelected(idx);
        setAnswered(true);
        const q = questions[currentQ];
        const correct = idx === q.answer;
        if (correct) setScore(s => s + 1);
        setResults(r => [...r, { q, chosen: idx, correct }]);
    };

    const nextQuestion = () => {
        if (currentQ + 1 >= questions.length) {
            setQuizFinished(true);
        } else {
            setCurrentQ(c => c + 1);
            setSelected(null);
            setAnswered(false);
            setTimeLeft(60);
        }
    };

    const resetQuiz = () => {
        setQuizStarted(false);
        setCurrentQ(0);
        setSelected(null);
        setAnswered(false);
        setScore(0);
        setTimeLeft(60);
        setQuizFinished(false);
        setResults([]);
    };

    if (quizFinished) {
        const pct = Math.round((score / questions.length) * 100);
        return (
            <div className="p-6 max-w-2xl mx-auto space-y-6">
                <div className="bg-card border border-border rounded-2xl p-8 text-center">
                    <div className={`text-6xl mb-4`}>{pct >= 70 ? '🎉' : pct >= 40 ? '🤔' : '😅'}</div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">Quiz Complete!</h2>
                    <p className="text-muted-foreground mb-4">You scored {score} out of {questions.length}</p>
                    <div className={`text-5xl font-bold mb-6 ${pct >= 70 ? 'text-green-400' : pct >= 40 ? 'text-orange-400' : 'text-red-400'}`}>
                        {pct}%
                    </div>
                    <button onClick={resetQuiz} className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                        <RefreshCw size={16} /> Try Again
                    </button>
                </div>
                <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Review Answers</h3>
                    {results.map((r, i) => (
                        <div key={i} className={`bg-card border rounded-xl p-4 ${r.correct ? 'border-green-500/30' : 'border-red-500/30'}`}>
                            <div className="flex items-start gap-3">
                                {r.correct ? <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" /> : <XCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />}
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-2">{r.q.question}</p>
                                    <p className="text-xs text-green-400">✓ {r.q.options[r.q.answer]}</p>
                                    {!r.correct && r.chosen !== null && <p className="text-xs text-red-400">✗ {r.q.options[r.chosen]}</p>}
                                    <p className="text-xs text-muted-foreground mt-1">{r.q.explanation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (quizStarted) {
        const q = questions[currentQ];
        const timerPct = (timeLeft / 60) * 100;
        return (
            <div className="p-6 max-w-2xl mx-auto space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Question {currentQ + 1} / {questions.length}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">Score: {score}</span>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border ${timeLeft <= 10 ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-orange-500/20 bg-orange-500/10 text-orange-400'}`}>
                            <Timer size={14} />
                            <span className="text-xs font-bold font-mono">{String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>

                {/* Timer bar */}
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 10 ? 'bg-red-500' : 'bg-orange-500'}`}
                        style={{ width: `${timerPct}%` }}
                    />
                </div>

                {/* Question */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${q.difficulty === 'Easy' ? 'badge-easy' : q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>
                            {q.difficulty}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{q.category}</span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{q.subCategory}</span>
                    </div>

                    <p className="text-foreground font-medium whitespace-pre-line">{q.question}</p>

                    <div className="grid grid-cols-1 gap-3 mt-2">
                        {q.options.map((opt, i) => {
                            let cls = "p-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ";
                            if (!answered) {
                                cls += "border-border bg-muted/50 text-foreground hover:border-orange-500/40 hover:bg-orange-500/5";
                            } else if (i === q.answer) {
                                cls += "border-green-500/50 bg-green-500/10 text-green-400";
                            } else if (i === selected) {
                                cls += "border-red-500/50 bg-red-500/10 text-red-400";
                            } else {
                                cls += "border-border bg-muted/50 text-muted-foreground opacity-50";
                            }
                            return (
                                <button key={i} className={cls} onClick={() => handleAnswer(i)}>
                                    <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                                </button>
                            );
                        })}
                    </div>

                    {answered && (
                        <div className="mt-4 p-3 bg-muted/50 rounded-xl border border-border">
                            <p className="text-xs font-semibold text-foreground mb-1">Explanation</p>
                            <p className="text-xs text-muted-foreground">{q.explanation}</p>
                        </div>
                    )}
                </div>

                {answered && (
                    <button onClick={nextQuestion} className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                        {currentQ + 1 >= questions.length ? 'View Results' : 'Next Question'} <ChevronRight size={16} />
                    </button>
                )}
            </div>
        );
    }

    // Start screen
    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h2 className="text-xl font-bold text-foreground">Aptitude Hub 🧠</h2>
                <p className="text-sm text-muted-foreground">IndiaBix-style quizzes with timer, MCQs, and detailed explanations</p>
            </div>

            {/* Category Filter */}
            <div className="flex gap-3 flex-wrap">
                {['All', 'Quantitative', 'Logical'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${category === cat
                            ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                            : 'bg-card border-border text-muted-foreground hover:border-orange-500/20'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Questions', value: aptitudeQuestions.length, color: 'text-orange-400' },
                    { label: 'Quantitative', value: aptitudeQuestions.filter(q => q.category === 'Quantitative').length, color: 'text-blue-400' },
                    { label: 'Logical', value: aptitudeQuestions.filter(q => q.category === 'Logical').length, color: 'text-purple-400' },
                    { label: 'Avg. Time', value: '60s / Q', color: 'text-green-400' },
                ].map((s) => (
                    <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
                        <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Topic cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { title: 'Time & Work', icon: '⏱️', count: 2, cat: 'Quantitative' },
                    { title: 'Percentages', icon: '📊', count: 1, cat: 'Quantitative' },
                    { title: 'Profit & Loss', icon: '💰', count: 1, cat: 'Quantitative' },
                    { title: 'Speed & Distance', icon: '🚀', count: 1, cat: 'Quantitative' },
                    { title: 'Number Series', icon: '🔢', count: 1, cat: 'Logical' },
                    { title: 'Coding-Decoding', icon: '🔐', count: 1, cat: 'Logical' },
                    { title: 'Syllogism', icon: '🧩', count: 1, cat: 'Logical' },
                    { title: 'Direction Sense', icon: '🧭', count: 1, cat: 'Logical' },
                    { title: 'Blood Relations', icon: '👨‍👩‍👧', count: 1, cat: 'Logical' },
                ].map((topic) => (
                    <div key={topic.title} className="card-hover bg-card border border-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-orange-500/30">
                        <div className="text-3xl">{topic.icon}</div>
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground">{topic.title}</div>
                            <div className="text-xs text-muted-foreground">{topic.cat} • {topic.count} questions</div>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                ))}
            </div>

            {/* Start Quiz Button */}
            <div className="flex justify-center pt-4">
                <button
                    onClick={() => { setQuizStarted(true); setCurrentQ(0); setScore(0); setResults([]); }}
                    disabled={questions.length === 0}
                    className="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50"
                >
                    Start Quiz ({questions.length} Questions) <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default AptitudeHub;
