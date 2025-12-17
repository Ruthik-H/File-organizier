import React from 'react';

export default function StatCard({ title, count, icon: Icon, color, delay, onClick, isActive }) {
    // Map color names to specific Tailwind classes for gradients and text
    const colorStyles = {
        blue: "from-blue-500 to-cyan-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
        green: "from-emerald-500 to-green-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
        amber: "from-amber-500 to-orange-500 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
        purple: "from-violet-500 to-purple-500 text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800",
        rose: "from-rose-500 to-pink-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800",
        indigo: "from-indigo-500 to-blue-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
    };

    const style = colorStyles[color] || colorStyles.blue;
    const gradient = style.split(' ').slice(0, 2).join(' ');
    const iconColor = style.split(' ').slice(2, 4).join(' ');
    const bg = style.split(' ').slice(4, 6).join(' ');
    const borderColor = style.split(' ').slice(6).join(' ');

    return (
        <div
            onClick={onClick}
            className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 ${isActive ? borderColor : 'border-gray-100 dark:border-gray-700'
                } ${isActive ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{count}</h3>
                </div>
                <div className={`p-3 rounded-xl ${bg} transition-transform ${isActive ? 'scale-110' : ''}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500`}
                    style={{ width: count > 0 ? '75%' : '0%' }}
                ></div>
            </div>
        </div>
    );
}
