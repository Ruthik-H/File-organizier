import React, { useEffect, useRef } from 'react';
import { History, FileText, Image, Music, Video, Archive, Code, File, Trash2, FolderPlus, Move, UploadCloud } from 'lucide-react';

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
    uploaded: UploadCloud
};

export default function ActivityLog({ activities, searchQuery }) {
    const logRef = useRef(null);

    useEffect(() => {
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

    const filteredActivities = activities.filter(activity =>
        !searchQuery ||
        activity.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-500" />
                    Activity Log
                </h3>
                <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
                    {filteredActivities.length} items
                </span>
            </div>

            <div ref={logRef} className="flex-1 overflow-y-auto pr-2 space-y-3">
                {filteredActivities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                        <History className="w-12 h-12 mb-3 opacity-20" />
                        <p className="text-sm font-medium">
                            {searchQuery ? 'No matching activities' : 'No recent activity'}
                        </p>
                    </div>
                ) : (
                    filteredActivities.map((activity, index) => {
                        const CategoryIcon = categoryIcons[activity.category] || File;
                        const ActionIcon = actionIcons[activity.action] || Move;

                        let actionColorClass = 'text-blue-500';
                        if (activity.action === 'deleted') actionColorClass = 'text-red-500';
                        if (activity.action === 'uploaded') actionColorClass = 'text-purple-500';

                        return (
                            <div
                                key={index}
                                className="group flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                            >
                                <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                                    <CategoryIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate mb-0.5">
                                        {activity.fileName}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <div className={`flex items-center gap-1 text-xs font-medium ${actionColorClass}`}>
                                            <ActionIcon className="w-3 h-3" />
                                            <span>
                                                {activity.action === 'moved' && `Moved to ${activity.category}`}
                                                {activity.action === 'deleted' && `Deleted from ${activity.category}`}
                                                {activity.action === 'created' && `Created ${activity.category}`}
                                                {activity.action === 'uploaded' && `Uploaded to ${activity.category}`}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            • {formatTime(activity.timestamp)}
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
