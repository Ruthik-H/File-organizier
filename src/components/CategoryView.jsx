import React, { useState } from 'react';
import { ArrowLeft, Trash2, FileText, Image, Music, Video, Archive, Code, File, Sparkles } from 'lucide-react';

const icons = {
    Images: Image,
    Documents: FileText,
    Audio: Music,
    Videos: Video,
    Archives: Archive,
    Code: Code,
    Executables: File,
    Others: File
};

export default function CategoryView({ category, files, onBack, onDelete, folderPath }) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const Icon = icons[category] || File;

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = (filename) => {
        if (deleteConfirm === filename) {
            onDelete(category, filename);
            setDeleteConfirm(null);
        } else {
            setDeleteConfirm(filename);
            setTimeout(() => setDeleteConfirm(null), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 transition-colors" style={{ backgroundAttachment: 'fixed' }}>
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 animate-bounce-in">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-3 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 shadow-xl animate-float">
                                <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-gradient-rainbow" style={{ fontFamily: "'Pacifico', cursive" }}>
                                    {category}
                                </h1>
                                <p className="text-lg text-purple-600 font-medium flex items-center gap-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                                    <Sparkles className="w-4 h-4" />
                                    {files.length} magical files
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Files Grid */}
                {files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border-4 border-pink-200 shadow-xl animate-float" style={{
                        backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #fff0f8 100%)'
                    }}>
                        <Icon className="w-20 h-20 text-pink-300 mb-4 animate-wiggle" />
                        <p className="text-xl font-bold text-purple-500" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                            No files in this category yet! 📁
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl p-5 border-4 border-pink-200 hover:border-purple-300 hover:shadow-2xl transition-all group fun-hover shadow-lg animate-fade-in"
                                style={{
                                    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #fff0f8 100%)',
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-400 shadow-md group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-800 truncate text-lg" title={file.name} style={{ fontFamily: "'Fredoka', sans-serif" }}>
                                                {file.name}
                                            </p>
                                            <p className="text-sm text-purple-500 font-medium" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                                                {formatSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(file.name)}
                                        className={`p-3 rounded-xl transition-all transform hover:scale-110 shadow-md ${deleteConfirm === file.name
                                                ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white scale-110 animate-wiggle'
                                                : 'bg-gradient-to-r from-pink-100 to-purple-100 hover:from-red-400 hover:to-rose-400 text-pink-600 hover:text-white'
                                            }`}
                                        title={deleteConfirm === file.name ? 'Click again to confirm!' : 'Delete file'}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="text-sm text-purple-400 font-medium bg-purple-50 rounded-xl p-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                                    📅 {formatDate(file.modified)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
