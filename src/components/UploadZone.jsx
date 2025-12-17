import React, { useState } from 'react';
import { UploadCloud, FolderOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function UploadZone({ path, setPath, handleOrganize, handleFileUpload, loading, status }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-pink-200 text-center transition-all hover:shadow-pink-200 animate-bounce-in" style={{
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #fff0f8 50%, #f0f9ff 100%)'
        }}>
            <div className="max-w-xl mx-auto">
                <div className="mb-6 relative group cursor-pointer inline-block">
                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition duration-300 animate-pulse-glow"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto border-4 border-pink-300 shadow-xl transform hover:scale-110 transition-all animate-float">
                        <UploadCloud className="w-12 h-12 text-pink-500 animate-wiggle" />
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-gradient-rainbow mb-3 animate-fade-in" style={{ fontFamily: "'Pacifico', cursive" }}>
                    Organize Your Files
                </h2>
                <p className="text-lg text-purple-600 mb-8 font-medium" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    ✨ Drag, drop & watch the magic happen! ✨
                </p>

                {/* Drag and Drop Zone */}
                <div
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`relative mb-6 p-10 border-4 border-dashed rounded-3xl transition-all duration-300 ${isDragging
                            ? 'border-pink-500 bg-gradient-to-br from-pink-100 to-purple-100 scale-105 shadow-2xl animate-rainbow-border'
                            : 'border-pink-300 hover:border-purple-400 bg-gradient-to-br from-pink-50 to-purple-50'
                        } fun-hover`}
                >
                    <div className="text-center">
                        {isDragging ? (
                            <Sparkles className="w-16 h-16 mx-auto mb-4 text-pink-500 animate-spin" />
                        ) : (
                            <UploadCloud className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-float" />
                        )}
                        <p className="text-xl font-bold mb-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                            <span className="text-gradient-rainbow">
                                {isDragging ? '🎉 Drop files here! 🎉' : '📁 Drag and drop files here'}
                            </span>
                        </p>
                        <p className="text-base text-purple-500 font-medium" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                            Files will be magically organized by type!
                        </p>
                    </div>
                </div>

                {/* Input Area for folder path */}
                <div className="relative group mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300 animate-pulse-glow"></div>
                    <div className="relative bg-white rounded-2xl p-3 flex items-center border-4 border-pink-200 shadow-lg hover:shadow-xl transition-all">
                        <FolderOpen className="w-7 h-7 text-pink-500 ml-2 animate-wiggle" />
                        <input
                            type="text"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleOrganize()}
                            placeholder="Or paste folder path here (e.g., C:\Downloads)"
                            className="flex-1 px-4 py-3 bg-transparent text-gray-800 outline-none text-lg placeholder-purple-400 font-medium"
                            style={{ fontFamily: "'Fredoka', sans-serif" }}
                        />
                        <button
                            onClick={handleOrganize}
                            disabled={loading || !path.trim()}
                            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2 shimmer-button transform hover:scale-105"
                            style={{ fontFamily: "'Fredoka', sans-serif" }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Start Magic!
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Status Message */}
                {status && (
                    <div className={`p-4 rounded-2xl text-base font-bold animate-bounce-in border-4 ${status.type === 'success'
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-400 shadow-lg shadow-green-200'
                            : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-400 shadow-lg shadow-red-200'
                        }`} style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        {status.type === 'success' ? '✨ ' : '⚠️ '}
                        {status.message}
                        {status.type === 'success' ? ' ✨' : ''}
                    </div>
                )}
            </div>
        </div>
    );
}
