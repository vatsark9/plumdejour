import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            login(user);
            onClose();
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some(user => user.email === email)) {
            setError('Email already exists');
            return;
        }

        if (users.some(user => user.username === username)) {
            setError('Username already taken');
            return;
        }

        const newUser = { username, email, password, id: Date.now() };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setActiveTab('login');
        setError('Account created! Please login.');
        setEmail('');
        setPassword('');
        setUsername('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex mb-6">
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === 'login'
                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                : 'text-gray-500'
                        }`}
                        onClick={() => {
                            setActiveTab('login');
                            setError('');
                        }}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${
                            activeTab === 'signup'
                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                : 'text-gray-500'
                        }`}
                        onClick={() => {
                            setActiveTab('signup');
                            setError('');
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-2 text-sm text-center rounded bg-red-100 text-red-600">
                        {error}
                    </div>
                )}

                {activeTab === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Sign Up
                        </button>
                    </form>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 w-full py-2 px-4 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default AuthModal;