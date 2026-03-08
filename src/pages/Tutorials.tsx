import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code2, Database, LayoutTemplate } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tutorials = [
    {
        id: 'html-css',
        title: 'HTML & CSS Basics',
        description: 'Learn the foundational languages of the Web. Build your first web pages.',
        icon: LayoutTemplate,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        id: 'javascript',
        title: 'JavaScript Deep Dive',
        description: 'Master JavaScript from basic syntax to advanced ES6+ features.',
        icon: Code2,
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10'
    },
    {
        id: 'react',
        title: 'React Fundamentals',
        description: 'Build interactive UIs with components, state, and props in React.',
        icon: BookOpen,
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10'
    },
    {
        id: 'sql',
        title: 'SQL Databases',
        description: 'Learn relational database concepts, querying, and schema design.',
        icon: Database,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10'
    }
];

const Tutorials = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-6 max-w-7xl animate-fade-in">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Structured Learning Paths</h1>
                <p className="text-muted-foreground w-[60%]">
                    Follow our curated, W3Schools-style tutorials designed to take you from beginner to advanced.
                    Read concepts, interact with code snippets, and master new skills.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((topic) => (
                    <Card
                        key={topic.id}
                        className="cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group"
                        onClick={() => navigate(`/tutorials/${topic.id}`)}
                    >
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className={`p-3 rounded-xl ${topic.bg}`}>
                                <topic.icon className={`w-6 h-6 ${topic.color}`} />
                            </div>
                            <div className="flex flex-col">
                                <CardTitle className="group-hover:text-orange-400 transition-colors">{topic.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm leading-relaxed">
                                {topic.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Tutorials;
