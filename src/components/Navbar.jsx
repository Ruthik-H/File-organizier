import React from 'react';
import { Search, Moon, Sun, FolderKanban } from 'lucide-react';

export default function Navbar({ darkMode, toggleTheme, searchQuery, onSearchChange }) {
    return (
        <nav className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-50 transition-colors duration-300">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                    <FolderKanban className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight font-sans">
                    FileOrganizer
                </span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-8 relative">
                <Search className="w-4 h-4 absolute left-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-all"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </nav>
    );
}

