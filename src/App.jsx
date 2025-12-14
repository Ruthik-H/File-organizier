import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [path, setPath] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [movedFiles, setMovedFiles] = useState([]);

    const handleOrganize = async () => {
        if (!path.trim()) {
            setStatus({ type: 'error', message: 'Please enter a valid folder path.' });
            return;
        }

        setLoading(true);
        setStatus(null);
        setMovedFiles([]);

        try {
            const response = await axios.post('http://127.0.0.1:5000/organize', { path: path.trim() });

            if (response.data.status === 'success') {
                setStatus({ type: 'success', message: response.data.message });
                setMovedFiles(response.data.moved || []);
            } else {
                setStatus({ type: 'error', message: response.data.message });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Failed to connect to the server.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <div className="ambient-light light-1"></div>
            <div className="ambient-light light-2"></div>

            <div className="card">
                <h1>File Organizer</h1>
                <p className="subtitle">Instantly tidy up your messy directories.</p>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Paste your folder path here..."
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleOrganize()}
                    />
                </div>

                <button onClick={handleOrganize} disabled={loading}>
                    {loading ? <span className="spinner"></span> : null}
                    {loading ? 'Organizing...' : 'Organize Now'}
                </button>

                {status && (
                    <div className={`status ${status.type}`}>
                        {status.message}
                    </div>
                )}

                {movedFiles.length > 0 && (
                    <div className="moved-list">
                        {movedFiles.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </div>
                )}

                {status?.type === 'success' && movedFiles.length === 0 && (
                    <div className="moved-list">No files needed moving.</div>
                )}
            </div>
        </div>
    );
}

export default App;
