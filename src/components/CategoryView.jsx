import React, { useState } from 'react';
import { ArrowLeft, Trash2, FileText, Image, Music, Video, Archive, Code, File, Download } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                                <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{category}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{files.length} files</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Files Grid */}
                {files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <Icon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No files in this category</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                                            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 dark:text-white truncate" title={file.name}>
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(file.name)}
                                        className={`p-2 rounded-lg transition-all ${deleteConfirm === file.name
                                                ? 'bg-red-500 text-white'
                                                : 'hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500'
                                            }`}
                                        title={deleteConfirm === file.name ? 'Click again to confirm' : 'Delete file'}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-xs text-gray-400 dark:text-gray-500">
                                    Modified: {formatDate(file.modified)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
