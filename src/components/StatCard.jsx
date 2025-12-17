import React from 'react';

export default function StatCard({ title, count, icon: Icon, color, delay }) {
    // Map color names to specific Tailwind classes for gradients and text
    const colorStyles = {
        blue: "from-blue-500 to-cyan-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
        green: "from-emerald-500 to-green-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
        amber: "from-amber-500 to-orange-500 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
        purple: "from-violet-500 to-purple-500 text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20",
        rose: "from-rose-500 to-pink-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20",
        indigo: "from-indigo-500 to-blue-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20",
    };

    const style = colorStyles[color] || colorStyles.blue;
    const gradient = style.split(' ').slice(0, 2).join(' '); // Extract gradient from string
    const iconColor = style.split(' ').slice(2, 4).join(' ');
    const bg = style.split(' ').slice(4).join(' ');

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{count}</h3>
                </div>
                <div className={`p-3 rounded-xl ${bg}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>

            {/* Tiny progress bar purely for visual flair */}
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${gradient} opacity-80`} style={{ width: '60%' }}></div>
            </div>
        </div>
    );
}
