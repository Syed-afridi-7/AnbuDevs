import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getProblemById } from '@/data/problems';
import { Play, Send, ChevronLeft, Terminal, CheckCircle2, XCircle, RotateCcw, Copy, Maximize2, Minimize2, BookOpen, Tag } from 'lucide-react';

const LANGUAGES = [
    { key: 'python', label: 'Python', monacoLang: 'python' },
    { key: 'javascript', label: 'JavaScript', monacoLang: 'javascript' },
    { key: 'java', label: 'Java', monacoLang: 'java' },
    { key: 'cpp', label: 'C++', monacoLang: 'cpp' },
    { key: 'c', label: 'C', monacoLang: 'c' },
];

const MOCK_OUTPUTS: Record<string, { passed: boolean; output: string; time: string; memory: string }[]> = {
    pass: [
        { passed: true, output: '[0, 1]', time: '52ms', memory: '14.2 MB' },
        { passed: true, output: '[1, 2]', time: '48ms', memory: '14.1 MB' },
    ],
    fail: [
        { passed: false, output: 'Wrong Answer\nExpected: [0, 1]\nGot: [1, 0]', time: '60ms', memory: '13.9 MB' },
    ],
};

const ProblemEditorPage = () => {
    const { id } = useParams<{ id: string }>();
    const problem = getProblemById(Number(id));
    const [lang, setLang] = useState('python');
    const [code, setCode] = useState(problem?.starterCode['python'] ?? '# Write your code here');
    const [tab, setTab] = useState<'description' | 'hints'>('description');
    const [consoleTab, setConsoleTab] = useState<'testcase' | 'output'>('testcase');
    const [running, setRunning] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState<null | 'pass' | 'fail'>(null);
    const [leftPanelWidth, setLeftPanelWidth] = useState(40); // %
    const [consoleHeight, setConsoleHeight] = useState(30); // %
    const [consoleOpen, setConsoleOpen] = useState(false);

    if (!problem) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                Problem not found.{' '}
                <Link to="/codelab" className="text-orange-400 ml-2 hover:underline">Back to Code Lab</Link>
            </div>
        );
    }

    const handleLangChange = (newLang: string) => {
        setLang(newLang);
        setCode(problem.starterCode[newLang] ?? `// ${newLang} code here`);
    };

    const handleRun = () => {
        setRunning(true);
        setConsoleOpen(true);
        setConsoleTab('output');
        setTimeout(() => {
            setRunning(false);
            setResult(Math.random() > 0.3 ? 'pass' : 'fail');
        }, 1500);
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setRunning(true);
        setConsoleOpen(true);
        setConsoleTab('output');
        setTimeout(() => {
            setRunning(false);
            setResult('pass');
        }, 2000);
    };

    const diffClass = problem.difficulty === 'Easy' ? 'text-green-400' : problem.difficulty === 'Medium' ? 'text-orange-400' : 'text-red-400';
    const outputs = result ? MOCK_OUTPUTS[result] : [];

    return (
        <div className="flex flex-col h-[calc(100vh-56px)] bg-background">
            {/* Top bar */}
            <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-card/90 flex-shrink-0">
                <Link to="/codelab" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm">
                    <ChevronLeft size={16} /> Code Lab
                </Link>
                <span className="text-border">|</span>
                <span className="text-sm font-medium text-foreground">{problem.id}. {problem.title}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${problem.difficulty === 'Easy' ? 'badge-easy' : problem.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>
                    {problem.difficulty}
                </span>
                <div className="ml-auto flex items-center gap-2">
                    <select
                        value={lang}
                        onChange={(e) => handleLangChange(e.target.value)}
                        className="text-xs px-2 py-1.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                    >
                        {LANGUAGES.map((l) => <option key={l.key} value={l.key}>{l.label}</option>)}
                    </select>
                    <button
                        onClick={handleRun}
                        disabled={running}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-muted border border-border text-foreground hover:border-green-500/50 hover:text-green-400 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Play size={13} /> {running ? 'Running...' : 'Run'}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={running}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Send size={13} /> Submit
                    </button>
                </div>
            </div>

            {/* Split Panels */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel: Problem Description */}
                <div
                    className="border-r border-border overflow-hidden flex flex-col"
                    style={{ width: `${leftPanelWidth}%`, minWidth: '280px' }}
                >
                    {/* Problem Tabs */}
                    <div className="flex gap-1 px-4 pt-2 pb-0 border-b border-border bg-card flex-shrink-0">
                        {[
                            { key: 'description', label: 'Description', icon: BookOpen },
                            { key: 'hints', label: 'Tags & Hints', icon: Tag },
                        ].map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setTab(key as 'description' | 'hints')}
                                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 -mb-px transition-colors ${tab === key ? 'border-orange-500 text-orange-400' : 'border-transparent text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Icon size={12} /> {label}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-y-auto flex-1 p-5 custom-scrollbar">
                        {tab === 'description' && (
                            <div className="space-y-5">
                                <div>
                                    <h1 className="text-base font-bold text-foreground mb-1">{problem.id}. {problem.title}</h1>
                                    <p className={`text-xs font-medium ${diffClass}`}>{problem.difficulty}</p>
                                </div>
                                <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">{problem.description}</div>

                                {problem.examples.map((ex, i) => (
                                    <div key={i} className="bg-muted/50 rounded-xl p-4 space-y-2 border border-border">
                                        <div className="text-xs font-bold text-foreground uppercase tracking-wider">Example {i + 1}</div>
                                        <div className="font-mono text-xs space-y-1">
                                            <div><span className="text-muted-foreground">Input:</span> <span className="text-foreground">{ex.input}</span></div>
                                            <div><span className="text-muted-foreground">Output:</span> <span className="text-green-400">{ex.output}</span></div>
                                            {ex.explanation && <div className="text-muted-foreground"><span className="font-semibold">Explanation:</span> {ex.explanation}</div>}
                                        </div>
                                    </div>
                                ))}

                                <div className="space-y-2">
                                    <div className="text-xs font-bold text-foreground uppercase tracking-wider">Constraints</div>
                                    <ul className="space-y-1">
                                        {problem.constraints.map((c, i) => (
                                            <li key={i} className="text-xs font-mono text-muted-foreground flex gap-2">
                                                <span className="text-orange-400">•</span> {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {tab === 'hints' && (
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Tags</div>
                                    <div className="flex flex-wrap gap-2">
                                        {problem.tags.map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 text-xs bg-muted border border-border rounded-full text-muted-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Category</div>
                                    <span className="px-3 py-1.5 text-xs bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 font-medium">
                                        {problem.category}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Acceptance Rate</div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${problem.acceptance}%` }} />
                                        </div>
                                        <span className="text-xs text-muted-foreground">{problem.acceptance}%</span>
                                    </div>
                                </div>
                                <div className="bg-muted/50 rounded-xl p-4 border border-border">
                                    <div className="text-xs font-bold text-foreground mb-2">💡 Approach Hint</div>
                                    <p className="text-xs text-muted-foreground">
                                        Think about the time complexity of a brute-force approach first. Then consider if you can use a Hash Map or Two Pointers technique to optimize it to O(n).
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Editor + Console */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Monaco Editor */}
                    <div className={`flex-1 overflow-hidden transition-all`} style={{ minHeight: consoleOpen ? '55%' : '100%' }}>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-muted/30 border-b border-border flex-shrink-0">
                            <span className="text-xs text-muted-foreground font-mono">solution.{lang === 'python' ? 'py' : lang === 'javascript' ? 'js' : lang === 'java' ? 'java' : lang === 'cpp' ? 'cpp' : 'c'}</span>
                            <div className="ml-auto flex gap-1">
                                <button onClick={() => setCode(problem.starterCode[lang] ?? '')} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Reset">
                                    <RotateCcw size={12} />
                                </button>
                                <button onClick={() => navigator.clipboard.writeText(code)} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Copy">
                                    <Copy size={12} />
                                </button>
                                <button onClick={() => setConsoleOpen(!consoleOpen)} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Toggle Console">
                                    <Terminal size={12} />
                                </button>
                            </div>
                        </div>
                        <Editor
                            height="100%"
                            language={LANGUAGES.find(l => l.key === lang)?.monacoLang ?? 'python'}
                            value={code}
                            onChange={(v) => setCode(v ?? '')}
                            theme="vs-dark"
                            options={{
                                fontSize: 13,
                                fontFamily: 'JetBrains Mono, monospace',
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                lineNumbers: 'on',
                                roundedSelection: true,
                                padding: { top: 12 },
                                automaticLayout: true,
                            }}
                        />
                    </div>

                    {/* Console Panel */}
                    {consoleOpen && (
                        <div className="border-t border-border bg-card flex flex-col" style={{ height: '40%' }}>
                            <div className="flex items-center gap-1 px-4 py-1.5 border-b border-border flex-shrink-0">
                                {[
                                    { key: 'testcase', label: 'Test Case' },
                                    { key: 'output', label: 'Output' },
                                ].map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => setConsoleTab(key as 'testcase' | 'output')}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${consoleTab === key ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                                <button onClick={() => setConsoleOpen(false)} className="ml-auto p-1 rounded hover:bg-muted text-muted-foreground">
                                    <Minimize2 size={12} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                {consoleTab === 'testcase' && (
                                    <div className="space-y-3">
                                        {problem.examples.slice(0, 2).map((ex, i) => (
                                            <div key={i} className="space-y-1">
                                                <div className="text-xs text-muted-foreground">Case {i + 1}:</div>
                                                <div className="font-mono text-xs bg-muted/50 rounded-lg p-2 text-foreground border border-border">{ex.input}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {consoleTab === 'output' && (
                                    <div className="space-y-3">
                                        {running ? (
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
                                                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" /> Running test cases...
                                            </div>
                                        ) : result ? (
                                            outputs.map((out, i) => (
                                                <div key={i} className={`rounded-xl p-3 border text-xs font-mono space-y-1 ${out.passed ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                                                    <div className={`flex items-center gap-1.5 font-semibold ${out.passed ? 'text-green-400' : 'text-red-400'}`}>
                                                        {out.passed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                                        {out.passed ? 'Passed' : 'Failed'} — Case {i + 1}
                                                    </div>
                                                    <div className="text-foreground">{out.output}</div>
                                                    <div className="text-muted-foreground">{out.time} | {out.memory}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-muted-foreground">Run your code to see output</p>
                                        )}
                                        {submitted && result === 'pass' && !running && (
                                            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-xs text-green-400 font-semibold flex items-center gap-2">
                                                <CheckCircle2 size={14} /> Solution Accepted! 🎉
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProblemEditorPage;
