import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/codelab': 'Code Lab',
    '/aptitude': 'Aptitude Hub',
    '/communication': 'Communication',
    '/learn': 'Learn',
    '/leaderboard': 'Leaderboard',
    '/streak': 'My Streak',
};

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const getTitle = () => {
        const path = location.pathname;
        if (pageTitles[path]) return pageTitles[path];
        if (path.startsWith('/path/')) return 'Role Path';
        if (path.startsWith('/codelab/')) return 'Code Lab';
        if (path.startsWith('/aptitude/')) return 'Aptitude Hub';
        return 'SkillForge 2.0';
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                mobileOpen={mobileMenuOpen}
                onMobileClose={() => setMobileMenuOpen(false)}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar
                    onMobileMenuToggle={() => setMobileMenuOpen(true)}
                    title={getTitle()}
                />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
