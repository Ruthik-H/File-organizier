import React from 'react';
import { Search, Moon, Sun, FolderKanban } from 'lucide-react';

export default function Navbar({ darkMode, toggleTheme, searchQuery, onSearchChange }) {
    return (
        <nav className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-lg shadow-md">
                    <FolderKanban className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                    FileOrganizer
                </span>
            </div>

            {/* Search Bar - Functional */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
                <Search className="w-4 h-4 absolute left-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search files or folders..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 transition-all"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                    aria-label="Toggle Theme"
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer shadow-md hover:shadow-lg transition-shadow">
                    RH
                </div>
            </div>
        </nav>
    );
}
