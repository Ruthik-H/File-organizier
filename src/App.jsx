import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import UploadZone from './components/UploadZone';
import ActivityLog from './components/ActivityLog';
import { Image, FileText, Music, Video, Archive, AppWindow, File } from 'lucide-react';

const CATEGORIES = ['Images', 'Documents', 'Audio', 'Videos', 'Archives', 'Code', 'Executables', 'Others'];

// Helper to determine category
const getCategoryFromPath = (filePath) => {
    // Simple logic matching backend or extending it
    // Note: The backend likely does the actual sorting, but we need to guess category for UI stats
    // unless we parse the path or file extension.
    const ext = filePath.split('.').pop().toLowerCase();

    // Mapping common extensions to categories for UI feedback
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext)) return 'Images';
    if (['pdf', 'doc', 'docx', 'txt', 'xlsx', 'ppt', 'pptx'].includes(ext)) return 'Documents';
    if (['mp3', 'wav', 'flac', 'aac'].includes(ext)) return 'Audio';
    if (['mp4', 'mkv', 'avi', 'mov'].includes(ext)) return 'Videos';
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'Archives';
    if (['exe', 'msi', 'bat', 'sh'].includes(ext)) return 'Executables';
    if (['py', 'js', 'html', 'css', 'java', 'cpp', 'c', 'php'].includes(ext)) return 'Code';

    return 'Others';
};

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    const [path, setPath] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    // State for dashboard visuals
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({
        Images: 0,
        Documents: 0,
        Audio: 0,
        Videos: 0,
        Archives: 0,
        Others: 0
    });

    // Toggle Theme
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    const handleOrganize = async () => {
        if (!path.trim()) {
            setStatus({ type: 'error', message: 'Please enter a valid folder path.' });
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/organize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: path.trim() })
            });

            const data = await response.json();

            if (data.status === 'success') {
                setStatus({ type: 'success', message: data.message });

                // Process moved files to update UI
                const newActivities = (data.moved || []).map(item => {
                    // Backend returns "filename -> Category"
                    const parts = item.split(' -> ');
                    const fileName = parts[0];
                    // Use backend's category if available, else guess
                    const category = parts.length > 1 ? parts[1] : getCategoryFromPath(fileName);
                    return { fileName, category };
                });

                // Update Activities Log (prepend new ones)
                setActivities(prev => [...newActivities, ...prev]);

                // Update Stats
                const newStats = { ...stats };
                newActivities.forEach(act => {
                    if (newStats[act.category] !== undefined) {
                        newStats[act.category]++;
                    } else {
                        // Map specific categories to general ones if needed, or add to 'Others'
                        if (act.category === 'Code' || act.category === 'Executables') {
                            // If we want to track these specifically we need to add them to stats state
                            // For now, let's just group odd ones or add dynamic support if we want
                            newStats['Others']++;
                        } else {
                            newStats['Others']++;
                        }
                    }
                });
                setStats(newStats);

            } else {
                setStatus({ type: 'error', message: data.message });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Failed to connect to the server.' });
        } finally {
            setLoading(false);
        }
    };

    // Card configurations
    const statCards = [
        { title: 'Images', icon: Image, color: 'rose', dataKey: 'Images' },
        { title: 'Documents', icon: FileText, color: 'blue', dataKey: 'Documents' },
        { title: 'Audio', icon: Music, color: 'amber', dataKey: 'Audio' },
        { title: 'Videos', icon: Video, color: 'purple', dataKey: 'Videos' },
        { title: 'Archives', icon: Archive, color: 'indigo', dataKey: 'Archives' },
        { title: 'Others', icon: File, color: 'green', dataKey: 'Others' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors font-sans pb-12">
            <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

            <div className="max-w-7xl mx-auto px-6 pt-10">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
                    {statCards.map((card, index) => (
                        <StatCard
                            key={card.title}
                            title={card.title}
                            count={stats[card.dataKey] || 0}
                            icon={card.icon}
                            color={card.color}
                            delay={index * 100}
                        />
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">

                    {/* Left: Upload Zone (Spans 2 columns) */}
                    <div className="lg:col-span-2 h-full">
                        <UploadZone
                            path={path}
                            setPath={setPath}
                            handleOrganize={handleOrganize}
                            loading={loading}
                            status={status}
                        />
                    </div>

                    {/* Right: Activity Log */}
                    <div className="h-full">
                        <ActivityLog activities={activities} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;