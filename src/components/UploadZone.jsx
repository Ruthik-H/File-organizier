import React from 'react';
import { UploadCloud, FolderOpen, ArrowRight } from 'lucide-react';

export default function UploadZone({ path, setPath, handleOrganize, loading, status }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center transition-colors">
            <div className="max-w-xl mx-auto">
                <div className="mb-6 relative group cursor-pointer inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                    <div className="relative w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto">
                        <UploadCloud className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Organize Your Files
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Enter the folder path below to automatically sort files into categories.
                </p>

                {/* Input Area acting like a "zone" */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                    <div className="relative bg-white dark:bg-gray-900 rounded-xl p-2 flex items-center border border-gray-200 dark:border-gray-700">
                        <FolderOpen className="w-6 h-6 text-gray-400 ml-3" />
                        <input
                            type="text"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleOrganize()}
                            placeholder="Paste folder path here (e.g., C:\Downloads)"
                            className="flex-1 px-4 py-3 bg-transparent text-gray-800 dark:text-gray-100 outline-none text-base placeholder-gray-400"
                        />
                        <button
                            onClick={handleOrganize}
                            disabled={loading || !path.trim()}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
                        >
                            {loading ? 'Processing...' : (
                                <>
                                    Start
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Status Message */}
                {status && (
                    <div className={`mt-6 p-4 rounded-xl text-sm font-medium animate-fade-in ${status.type === 'success'
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800'
                        }`}>
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
}
