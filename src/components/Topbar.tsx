import React, { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface TopbarProps {
    onMobileMenuToggle: () => void;
    title?: string;
}

const Topbar: React.FC<TopbarProps> = ({ onMobileMenuToggle, title = 'Dashboard' }) => {
    return (
        <header className="sticky top-0 z-30 flex items-center h-14 px-4 gap-4 bg-card border-b border-border/60 shadow-sm">
            {/* Mobile menu button */}
            <button
                className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground"
                onClick={onMobileMenuToggle}
            >
                <Menu size={20} />
            </button>

            {/* Title */}
            <h1 className="text-sm font-semibold text-foreground hidden sm:block">{title}</h1>

            {/* Search */}
            <div className="flex-1 max-w-xs mx-auto lg:mx-0">
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                    <input
                        type="text"
                        placeholder="Search problems, topics..."
                        className="w-full pl-8 pr-4 py-1.5 text-xs bg-muted rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-orange-500/50 text-foreground placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
                {/* Streak */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <span className="text-sm">🔥</span>
                    <span className="text-xs font-bold text-orange-400">7 days</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
                </button>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                    SF
                </div>
            </div>
        </header>
    );
};

export default Topbar;
