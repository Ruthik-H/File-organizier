import React from 'react';

export default function StatCard({ title, count, icon: Icon, color, onClick, isActive }) {
    const colorStyles = {
        blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', icon: 'text-blue-600 dark:text-blue-400' },
        green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', icon: 'text-green-600 dark:text-green-400' },
        amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', icon: 'text-amber-600 dark:text-amber-400' },
        purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', icon: 'text-purple-600 dark:text-purple-400' },
        rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400', icon: 'text-rose-600 dark:text-rose-400' },
        indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400', icon: 'text-indigo-600 dark:text-indigo-400' },
    };

    const style = colorStyles[color] || colorStyles.blue;

    return (
        <div
            onClick={onClick}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border ${isActive ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-100 dark:border-gray-700'
                }`}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {count}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                </div>
                <div className={`p-3 rounded-lg ${style.bg}`}>
                    <Icon className={`w-6 h-6 ${style.icon}`} />
                </div>
            </div>

            {/* Simple progress bar */}
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${style.text.replace('text-', 'bg-')} transition-all duration-1000`}
                    style={{ width: count > 0 ? '75%' : '0%' }}
                ></div>
            </div>
        </div>
    );
}
