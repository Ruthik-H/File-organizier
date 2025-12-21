import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import UploadZone from './components/UploadZone';
import ActivityLog from './components/ActivityLog';
import CategoryView from './components/CategoryView';
import { Image, FileText, Music, Video, Archive, Code } from 'lucide-react';

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
    const [searchQuery, setSearchQuery] = useState('');

    // View state
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'category'
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryFiles, setCategoryFiles] = useState([]);

    // Dashboard data
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({
        Images: 0,
        Documents: 0,
        Audio: 0,
        Videos: 0,
        Archives: 0,
        Code: 0,
        Executables: 0,
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

    // Fetch stats from backend
    const fetchStats = async (folderPath) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: folderPath })
            });
            const data = await response.json();
            if (data.status === 'success') {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    // Handle organize by path
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
                    const parts = item.split(' -> ');
                    const fileName = parts[0];
                    const category = parts.length > 1 ? parts[1] : 'Others';
                    return {
                        fileName,
                        category,
                        action: 'moved',
                        timestamp: new Date().toISOString()
                    };
                });

                setActivities(prev => [...newActivities, ...prev]);

                // Fetch updated stats
                await fetchStats(path.trim());

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

    // Handle file upload (drag and drop)
    const handleFileUpload = async (files) => {
        if (!files || files.length === 0) return;

        setLoading(true);
        setStatus(null);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status === 'success') {
                setStatus({ type: 'success', message: `Uploaded and organized ${files.length} file(s)` });

                // Add upload activities
                const uploadActivities = (data.uploaded || []).map(fileName => ({
                    fileName,
                    category: 'Uploads',
                    action: 'uploaded',
                    timestamp: new Date().toISOString()
                }));

                // Add moved activities
                const movedActivities = (data.moved || []).map(item => {
                    const parts = item.split(' -> ');
                    const fileName = parts[0];
                    const category = parts.length > 1 ? parts[1] : 'Others';
                    return {
                        fileName,
                        category,
                        action: 'moved',
                        timestamp: new Date().toISOString()
                    };
                });

                setActivities(prev => [...uploadActivities, ...movedActivities, ...prev]);

                // Fetch updated stats from uploads folder
                const uploadFolder = path.trim() || 'uploads';
                await fetchStats(uploadFolder);

                // Update path if not set
                if (!path.trim()) {
                    setPath(uploadFolder);
                }
            } else {
                setStatus({ type: 'error', message: data.message || 'Upload failed' });
            }
        } catch (error) {
            console.error('Upload error:', error);
            setStatus({ type: 'error', message: `Failed to upload files: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    // Handle category card click
    const handleCategoryClick = async (category) => {
        if (!path.trim()) {
            setStatus({ type: 'error', message: 'Please set a folder path first.' });
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/files/${category}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: path.trim() })
            });

            const data = await response.json();

            if (data.status === 'success') {
                setSelectedCategory(category);
                setCategoryFiles(data.files);
                setCurrentView('category');
            } else {
                setStatus({ type: 'error', message: data.message });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Failed to fetch category files.' });
        }
    };

    // Handle file deletion
    const handleFileDelete = async (category, filename) => {
        if (!path.trim()) return;

        try {
            const response = await fetch(`http://127.0.0.1:5000/files/${category}/${filename}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: path.trim() })
            });

            const data = await response.json();

            if (data.status === 'success') {
                // Update category files
                setCategoryFiles(prev => prev.filter(f => f.name !== filename));

                // Add delete activity
                const deleteActivity = {
                    fileName: filename,
                    category: category,
                    action: 'deleted',
                    timestamp: new Date().toISOString()
                };
                setActivities(prev => [deleteActivity, ...prev]);

                // Update stats
                await fetchStats(path.trim());

                setStatus({ type: 'success', message: data.message });
            } else {
                setStatus({ type: 'error', message: data.message });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Failed to delete file.' });
        }
    };

    // Card configurations
    const statCards = [
        { title: 'Images', icon: Image, color: 'rose', dataKey: 'Images' },
        { title: 'Documents', icon: FileText, color: 'blue', dataKey: 'Documents' },
        { title: 'Audio', icon: Music, color: 'amber', dataKey: 'Audio' },
        { title: 'Videos', icon: Video, color: 'purple', dataKey: 'Videos' },
        { title: 'Archives', icon: Archive, color: 'indigo', dataKey: 'Archives' },
        { title: 'Code', icon: Code, color: 'green', dataKey: 'Code' },
    ];

    // Render category view
    if (currentView === 'category') {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors font-sans">
                <Navbar
                    darkMode={darkMode}
                    toggleTheme={toggleTheme}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
                <CategoryView
                    category={selectedCategory}
                    files={categoryFiles}
                    onBack={() => setCurrentView('dashboard')}
                    onDelete={handleFileDelete}
                    folderPath={path}
                />
            </div>
        );
    }

    // Render dashboard view
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors font-sans pb-12">
            <Navbar
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

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
                            onClick={() => handleCategoryClick(card.title)}
                            isActive={selectedCategory === card.title}
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
                            handleFileUpload={handleFileUpload}
                            loading={loading}
                            status={status}
                        />
                    </div>

                    {/* Right: Activity Log */}
                    <div className="h-full">
                        <ActivityLog
                            activities={activities}
                            searchQuery={searchQuery}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
