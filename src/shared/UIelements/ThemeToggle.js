import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">Theme:</span>
            <button
                onClick={toggleTheme}
                className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
                style={{
                    backgroundColor: theme === 'light' ? 'var(--accent)' : 'var(--primary)',
                    color: theme === 'light' ? 'var(--primary)' : 'var(--accent)'
                }}
            >
                {theme === 'light' ? (
                    <div className="flex items-center space-x-2">
                        <FiSun className="text-lg" />
                        <span>Light</span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <FiMoon className="text-lg" />
                        <span>Dark</span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default ThemeToggle;
