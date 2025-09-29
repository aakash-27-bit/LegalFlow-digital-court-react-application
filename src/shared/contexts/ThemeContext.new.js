import React, { createContext, useContext, useState, useEffect } from 'react';

export const themes = {
    light: {
        primary: '#3D74B6',
        background: '#FBF5DE',
        accent: '#EAC8A6',
        alert: '#DC3C22',
        text: '#1B3C53',
        cardBg: '#ffffff',
        borderColor: '#e2e8f0',
        navBg: '#213555',
        shadowColor: 'rgba(0, 0, 0, 0.1)'
    },
    dark: {
        primary: '#1B3C53',
        background: '#234C6A',
        accent: '#456882',
        alert: '#D2C1B6',
        text: '#ffffff',
        cardBg: '#1B3C53',
        borderColor: '#456882',
        navBg: '#213555',
        shadowColor: 'rgba(0, 0, 0, 0.3)'
    }
};

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        const themeColors = themes[currentTheme];
        
        // Apply CSS custom properties
        Object.entries(themeColors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Set transition duration for smooth theme switching
        root.style.setProperty('--transition-duration', '0.3s');

        // Save theme preference
        localStorage.setItem('theme', currentTheme);

        // Add theme class for additional styling hooks
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(`theme-${currentTheme}`);
    }, [currentTheme]);

    const toggleTheme = () => {
        setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const value = {
        currentTheme,
        toggleTheme,
        colors: themes[currentTheme]
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeToggle = () => {
    const { currentTheme, toggleTheme } = useTheme();
    const isDark = currentTheme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            style={{
                backgroundColor: 'var(--cardBg)',
                color: 'var(--text)',
                border: '1px solid var(--borderColor)',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--transition-duration) ease-in-out',
                boxShadow: `0 2px 4px var(--shadowColor)`
            }}
        >
            {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            )}
        </button>
    );
};

// Add global styles for theme transitions
const style = document.createElement('style');
style.textContent = `
    * {
        transition: background-color var(--transition-duration) ease-in-out,
                    color var(--transition-duration) ease-in-out,
                    border-color var(--transition-duration) ease-in-out,
                    box-shadow var(--transition-duration) ease-in-out;
    }

    .theme-toggle:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 6px var(--shadowColor) !important;
    }

    .theme-toggle:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }

    .theme-toggle:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);

export default ThemeContext;
