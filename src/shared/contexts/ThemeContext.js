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
        navBg: '#213555', // Keep navigation background unchanged
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
        navBg: '#213555', // Keep navigation background unchanged
        shadowColor: 'rgba(0, 0, 0, 0.3)'
    }
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    }, [theme]);

    const applyTheme = (themeName) => {
        const root = document.documentElement;
        const themeColors = themes[themeName];
        
        Object.entries(themeColors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Add transition for smooth theme switching
        root.style.setProperty('--transition-duration', '0.3s');
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
