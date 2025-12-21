import React, { useState } from 'react';
import { UploadCloud, FolderOpen, ArrowRight, File } from 'lucide-react';

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
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col justify-center text-center">

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Organize Your Files
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Select a folder path or drop files directly to organize them instantly.
                </p>
            </div>

            {/* Drag and Drop Zone */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`relative mb-8 p-12 border-2 border-dashed rounded-xl transition-all duration-200 ${isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
            >
                <div className="flex flex-col items-center">
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                        <UploadCloud className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {isDragging ? 'Drop files here!' : 'Drag and drop files here'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        or select a folder path below
                    </p>
                </div>
            </div>

            {/* Input Area for folder path */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FolderOpen className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleOrganize()}
                        placeholder="Enter folder path (e.g., C:\Downloads)"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                    />
                </div>
                <button
                    onClick={handleOrganize}
                    disabled={loading || !path.trim()}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Start Organizing
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                    )}
                </button>
            </div>

            {/* Status Message */}
            {status && (
                <div className={`mt-6 p-4 rounded-lg text-sm font-medium ${status.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                    }`}>
                    {status.message}
                </div>
            )}
        </div>
    );
}
