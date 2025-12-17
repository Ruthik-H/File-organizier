import React from 'react';
import { History, FileText, Image, Music, Video, Archive, Code, File } from 'lucide-react';

const icons = {
    Images: Image,
    Documents: FileText,
    Audio: Music,
    Videos: Video,
    Archives: Archive,
    Executables: File,
    Code: Code,
    Others: File
};

export default function ActivityLog({ activities }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-teal-500" />
                    Recent Activity
                </h3>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                    {activities.length} items
                </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {activities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                        <History className="w-12 h-12 mb-2 opacity-20" />
                        <p className="text-sm">No recent activity</p>
                    </div>
                ) : (
                    activities.map((activity, index) => {
                        const Icon = icons[activity.category] || File;
                        return (
                            <div
                                key={index}
                                className="group flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                            >
                                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center flex-shrink-0 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                                        {activity.fileName}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
                                            Moved to {activity.category}
                                        </span>
                                        <span className="text-xs text-gray-400">Just now</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
