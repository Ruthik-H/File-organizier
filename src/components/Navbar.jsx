import React from 'react';
import { Search, Moon, Sun, FolderKanban } from 'lucide-react';

export default function Navbar({ darkMode, toggleTheme, searchQuery, onSearchChange }) {
    return (
        <nav className="h-20 bg-white border-b-4 border-pink-400 flex items-center justify-between px-6 sticky top-0 z-10 shadow-lg" style={{
            borderImage: 'linear-gradient(90deg, #ff6b9d, #ffa726, #66bb6a, #42a5f5, #ab47bc) 1',
            borderImageSlice: 1
        }}>
            {/* Logo */}
            <div className="flex items-center gap-3 animate-bounce-in">
                <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 p-3 rounded-2xl shadow-xl transform hover:rotate-12 transition-transform duration-300 animate-pulse-glow">
                    <FolderKanban className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-gradient-rainbow" style={{ fontFamily: "'Pacifico', cursive" }}>
                    FileOrganizer
                </span>
            </div>

            {/* Search Bar - Functional */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative animate-fade-in">
                <Search className="w-5 h-5 absolute left-4 text-pink-500 animate-wiggle" />
                <input
                    type="text"
                    placeholder="Search files or folders..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-pink-50 to-purple-50 border-3 border-pink-300 rounded-full text-base focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none text-gray-700 placeholder-pink-400 transition-all font-medium shadow-md hover:shadow-lg"
                    style={{ fontFamily: "'Fredoka', sans-serif" }}
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:scale-110 transition-transform shadow-lg hover:shadow-xl animate-float"
                    aria-label="Toggle Theme"
                >
                    <Sun className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 animate-pulse-glow" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    RH
                </div>
            </div>
        </nav>
    );
}
