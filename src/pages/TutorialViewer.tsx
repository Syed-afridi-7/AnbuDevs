import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup
} from "@/components/ui/resizable";
import { Editor } from '@monaco-editor/react';
import { Play, ChevronLeft, BookOpen, CheckCircle2, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const defaultHtml = `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    transition: background-color 0.5s ease;
  }
  h1 {
    color: #f97316;
  }
  button {
    padding: 10px 20px;
    background: #f97316;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s;
  }
  button:hover {
    transform: scale(1.05);
  }
</style>
</head>
<body>

  <h1>Hello World!</h1>
  <p>Interactive Playground</p>
  <button onclick="changeColor()">Click Me!</button>

  <script>
    function changeColor() {
      const colors = ['#f8fafc', '#fef08a', '#bbf7d0', '#bfdbfe', '#fbcfe8'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.style.backgroundColor = randomColor;
    }
  </script>

</body>
</html>`;

const TutorialViewer = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    // Using sonner or standard toast depending on setup. Let's assume standard useToast exists.
    // Wait, use-toast might not be fully implemented, we'll try catching errors or just mock it.
    // In App.tsx I saw: import { Toaster } from "@/components/ui/toaster"; and Sonner.

    const [code, setCode] = useState(defaultHtml);
    const [previewContent, setPreviewContent] = useState(defaultHtml);

    const runCode = () => {
        setPreviewContent(code);
        // Simple alert if toast fails or just ignore it.
    };

    const markComplete = () => {
        alert("Tutorial Completed! You've earned 50 XP.");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* Top action bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate('/tutorials')} className="gap-2">
                        <ChevronLeft size={16} /> Back to Tutorials
                    </Button>
                    <div className="h-4 w-px bg-border"></div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <BookOpen size={16} className="text-orange-500" />
                        Introduction to HTML & CSS
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2" onClick={markComplete}>
                        <CheckCircle2 size={16} className="text-green-500" /> Mark Complete
                    </Button>
                </div>
            </div>

            <ResizablePanelGroup direction="horizontal" className="flex-1">
                {/* Left Panel: Tutorial Reader (W3Schools Style) */}
                <ResizablePanel defaultSize={35} minSize={20} className="bg-card flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                        <article className="prose prose-sm dark:prose-invert max-w-none">
                            <h1 className="text-2xl font-bold mb-4 text-foreground">HTML Basics</h1>
                            <p className="text-muted-foreground text-sm mb-6">Learn how to create a basic web page.</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3 text-foreground">The HTML Skeleton</h2>
                            <p className="text-foreground">Every HTML document requires a foundational structure. It starts with the <code>&lt;!DOCTYPE html&gt;</code> declaration, followed by the <code>&lt;html&gt;</code> element, which contains <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code>.</p>

                            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                <h3 className="text-orange-500 font-semibold mb-2">Try It Yourself!</h3>
                                <p className="text-sm mb-0 text-foreground">Modify the code in the editor on the right to see the live preview dynamically update.</p>
                            </div>

                            <h2 className="text-xl font-semibold mt-6 mb-3 text-foreground">Adding Styles (CSS)</h2>
                            <p className="text-foreground">You can add styles internally using the <code>&lt;style&gt;</code> tag within the <code>&lt;head&gt;</code>. Change the background color, fonts, and more!</p>

                            <h2 className="text-xl font-semibold mt-6 mb-3 text-foreground">Adding Interactivity (JavaScript)</h2>
                            <p className="text-foreground">Using the <code>&lt;script&gt;</code> tag, you can define functions that run when users click buttons, hover over text, or type in inputs.</p>
                        </article>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle className="bg-border" />

                {/* Right Panel: Interactive Playground */}
                <ResizablePanel defaultSize={65}>
                    <ResizablePanelGroup direction="vertical">
                        {/* Top: Editor */}
                        <ResizablePanel defaultSize={60} className="bg-[#1e1e1e] flex flex-col border-b border-border">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d]">
                                <div className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                                    <Code2 size={14} className="text-blue-400" /> index.html
                                </div>
                                <Button size="sm" onClick={runCode} className="h-7 bg-green-600 hover:bg-green-700 text-white gap-1 text-xs">
                                    <Play size={14} /> Run Code
                                </Button>
                            </div>
                            <div className="flex-1 relative">
                                <Editor
                                    height="100%"
                                    language="html"
                                    theme="vs-dark"
                                    value={code}
                                    onChange={(val) => setCode(val || '')}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        wordWrap: 'on',
                                        padding: { top: 16 },
                                        scrollBeyondLastLine: false,
                                    }}
                                />
                            </div>
                        </ResizablePanel>

                        <ResizableHandle withHandle className="bg-border" />

                        {/* Bottom: Live Preview */}
                        <ResizablePanel defaultSize={40} className="bg-white flex flex-col relative">
                            <div className="absolute top-0 left-0 w-full px-4 py-1.5 bg-gray-100 border-b border-gray-200 z-10 flex items-center justify-between">
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Preview</div>
                            </div>
                            <iframe
                                title="Live Preview"
                                className="w-full h-full border-none flex-1 mt-7"
                                srcDoc={previewContent}
                                sandbox="allow-scripts"
                            />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>

            </ResizablePanelGroup>
        </div>
    );
};

export default TutorialViewer;
