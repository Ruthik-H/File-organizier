import React, { useEffect, useRef } from 'react';
import { History, FileText, Image, Music, Video, Archive, Code, File, Trash2, FolderPlus, Move } from 'lucide-react';

const categoryIcons = {
    Images: Image,
    Documents: FileText,
    Audio: Music,
    Videos: Video,
    Archives: Archive,
    Executables: File,
    Code: Code,
    Others: File
};

const actionIcons = {
    moved: Move,
    deleted: Trash2,
    created: FolderPlus,
    uploaded: Move
};

const actionColors = {
    moved: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    deleted: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
    created: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    uploaded: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
};

export default function ActivityLog({ activities, searchQuery }) {
    const logRef = useRef(null);

    useEffect(() => {
        // Auto-scroll to bottom when new activity is added
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [activities]);

    const formatTime = (timestamp) => {
        const now = new Date();
        const activityTime = new Date(timestamp);
        const diffMs = now - activityTime;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;

        return activityTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Filter activities based on search query
    const filteredActivities = activities.filter(activity =>
        !searchQuery ||
        activity.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-500" />
                    Recent Activity
                </h3>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                    {filteredActivities.length} items
                </span>
            </div>

            <div ref={logRef} className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {filteredActivities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                        <History className="w-12 h-12 mb-2 opacity-20" />
                        <p className="text-sm">
                            {searchQuery ? 'No matching activities' : 'No recent activity'}
                        </p>
                    </div>
                ) : (
                    filteredActivities.map((activity, index) => {
                        const CategoryIcon = categoryIcons[activity.category] || File;
                        const ActionIcon = actionIcons[activity.action] || Move;
                        const actionColor = actionColors[activity.action] || actionColors.moved;

                        return (
                            <div
                                key={index}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700 animate-fade-in"
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${actionColor} group-hover:scale-110 transition-transform`}>
                                    <CategoryIcon className="w-5 h-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                                        {activity.fileName}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <span className={`text-xs px-2 py-0.5 rounded ${actionColor}`}>
                                            <ActionIcon className="w-3 h-3 inline mr-1" />
                                            {activity.action === 'moved' && `Moved to ${activity.category}`}
                                            {activity.action === 'deleted' && `Deleted from ${activity.category}`}
                                            {activity.action === 'created' && `Created ${activity.category}`}
                                            {activity.action === 'uploaded' && `Uploaded to ${activity.category}`}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {formatTime(activity.timestamp)}
                                        </span>
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
