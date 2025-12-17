import React from 'react';

export default function StatCard({ title, count, icon: Icon, color, delay, onClick, isActive }) {
    const colorStyles = {
        blue: { bg: 'from-blue-400 to-cyan-400', ring: 'ring-blue-400', shadow: 'shadow-blue-300' },
        green: { bg: 'from-emerald-400 to-green-400', ring: 'ring-emerald-400', shadow: 'shadow-emerald-300' },
        amber: { bg: 'from-amber-400 to-orange-400', ring: 'ring-amber-400', shadow: 'shadow-amber-300' },
        purple: { bg: 'from-violet-400 to-purple-400', ring: 'ring-violet-400', shadow: 'shadow-violet-300' },
        rose: { bg: 'from-rose-400 to-pink-400', ring: 'ring-rose-400', shadow: 'shadow-rose-300' },
        indigo: { bg: 'from-indigo-400 to-blue-500', ring: 'ring-indigo-400', shadow: 'shadow-indigo-300' },
    };

    const style = colorStyles[color] || colorStyles.blue;

    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 cursor-pointer border-4 ${isActive ? `border-pink-400 ${style.ring} ring-4 ring-offset-2 animate-pulse-glow` : 'border-transparent'
                } fun-hover animate-bounce-in ${style.shadow}`}
            style={{
                animationDelay: `${delay}ms`,
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #ffe5f5 100%)'
            }}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-bold text-pink-500 mb-2 uppercase tracking-wide" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        {title}
                    </p>
                    <h3 className="text-4xl font-bold text-gradient-rainbow animate-pulse" style={{ fontFamily: "'Pacifico', cursive" }}>
                        {count}
                    </h3>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${style.bg} shadow-lg transform hover:scale-110 transition-transform animate-float`}>
                    <Icon className="w-7 h-7 text-white" />
                </div>
            </div>

            {/* Rainbow progress bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 transition-all duration-1000 shimmer-button"
                    style={{ width: count > 0 ? '75%' : '0%' }}
                ></div>
            </div>
        </div>
    );
}
