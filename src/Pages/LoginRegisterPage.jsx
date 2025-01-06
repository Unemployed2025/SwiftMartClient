import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/userRoutes';

import '../styles/login.css';

function LoginRegisterPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                const response = await login(username, password);
                const AccessToken = response.data.accessToken;
                localStorage.setItem("AccessToken", AccessToken);
                navigate('/home');
            } else {
                const response = await register(email, username, password);
                const AccessToken = response.data.accessToken;
                localStorage.setItem("AccessToken", AccessToken);
                navigate('/home');
            }
        } catch (error) {
            const messages = [
                error.response?.data?.message || "An error occurred",
                "Register if you don't have an account"
            ];
            let index = 0;

            const showNextMessage = () => {
                if (index < messages.length) {
                    setMessage(messages[index]);
                    index++;
                    setTimeout(showNextMessage, 2000);
                } else {
                    setMessage('');
                }
            };

            showNextMessage();
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <div className="animate-fadeIn">
            <div className="flex items-center justify-center min-h-screen background">
                <div className="form">
                    {isLogin ? (
                        <>
                            <h2 className="mb-12 text-4xl font-sans text-center">Sign In</h2>
                            <form className="space-y-9" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full p-2 border rounded"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-2 border rounded"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Register')}
                                </button>
                            </form>
                            <button onClick={toggleForm} className="w-full mt-4 text-green-600 hover:underline">
                                Don&apos;t have an account? Register here
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="mb-12 text-4xl font-sans text-center">Register</h2>
                            <form className="space-y-9" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full p-2 border rounded"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="w-full p-2 border rounded"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-2 border rounded"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Register')}
                                </button>
                            </form>
                            <button onClick={toggleForm} className="w-full mt-4 text-green-600 hover:underline">
                                Already have an account? Login here
                            </button>
                        </>
                    )}
                    {message && (
                        <div className="mt-4 p-3 rounded bg-red-100 border border-red-400 text-red-700 text-center">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterPage;