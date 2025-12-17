import React, { useEffect, useRef } from 'react';
import { History, FileText, Image, Music, Video, Archive, Code, File, Trash2, FolderPlus, Move, Sparkles } from 'lucide-react';

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
    uploaded: Sparkles
};

const actionColors = {
    moved: { bg: 'from-blue-400 to-cyan-400', text: 'text-blue-700' },
    deleted: { bg: 'from-red-400 to-rose-400', text: 'text-red-700' },
    created: { bg: 'from-green-400 to-emerald-400', text: 'text-green-700' },
    uploaded: { bg: 'from-purple-400 to-pink-400', text: 'text-purple-700' }
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

        if (diffMins < 1) return '✨ Just now';
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
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-purple-200 h-full flex flex-col animate-bounce-in" style={{
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8f0ff 100%)'
        }}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2" style={{ fontFamily: "'Pacifico', cursive" }}>
                    <History className="w-6 h-6 text-purple-500 animate-wiggle" />
                    <span className="text-gradient-purple">Activity Log</span>
                </h3>
                <span className="text-sm font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-white px-3 py-1 rounded-full shadow-md" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    {filteredActivities.length} items
                </span>
            </div>

            <div ref={logRef} className="flex-1 overflow-y-auto pr-2 space-y-3">
                {filteredActivities.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-purple-400 animate-float">
                        <History className="w-16 h-16 mb-3 opacity-30" style={{ fontFamily: "'Fredoka', sans-serif" }} />
                        <p className="text-lg font-bold">
                            {searchQuery ? '🔍 No matching activities' : '📭 No recent activity'}
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
                                className="group flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all border-3 border-pink-200 hover:border-purple-300 shadow-md hover:shadow-lg fun-hover animate-fade-in"
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${actionColor.bg} shadow-lg transform hover:scale-110 transition-transform animate-float`}>
                                    <CategoryIcon className="w-6 h-6 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-base font-bold text-gray-800 truncate mb-1" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                                        {activity.fileName}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${actionColor.bg} text-white shadow-md flex items-center gap-1`} style={{ fontFamily: "'Fredoka', sans-serif" }}>
                                            <ActionIcon className="w-3 h-3" />
                                            {activity.action === 'moved' && `Moved to ${activity.category}`}
                                            {activity.action === 'deleted' && `Deleted from ${activity.category}`}
                                            {activity.action === 'created' && `Created ${activity.category}`}
                                            {activity.action === 'uploaded' && `Uploaded to ${activity.category}`}
                                        </span>
                                        <span className="text-xs text-purple-500 font-medium" style={{ fontFamily: "'Fredoka', sans-serif" }}>
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
