import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const themes = {
  blue: {
    id: 'blue',
    name: 'Ocean Blue',
    light: { primary: '#3B82F6', secondary: '#EFF6FF', accent: '#1D4ED8', background: '#F8FAFC', surface: '#FFFFFF', text: '#1F2937', textSecondary: '#6B7280', border: '#E5E7EB' },
    dark: { primary: '#60A5FA', secondary: '#1E293B', accent: '#93C5FD', background: '#0F172A', surface: '#1E293B', text: '#F8FAFC', textSecondary: '#CBD5E1', border: '#334155' }
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Green',
    light: { primary: '#10B981', secondary: '#ECFDF5', accent: '#059669', background: '#F0FDF4', surface: '#FFFFFF', text: '#1F2937', textSecondary: '#6B7280', border: '#E5E7EB' },
    dark: { primary: '#34D399', secondary: '#064E3B', accent: '#6EE7B7', background: '#042f2e', surface: '#064E3B', text: '#F8FAFC', textSecondary: '#CBD5E1', border: '#374151' }
  },
  purple: {
    id: 'purple',
    name: 'Royal Purple',
    light: { primary: '#8B5CF6', secondary: '#F5F3FF', accent: '#7C3AED', background: '#FAFAFA', surface: '#FFFFFF', text: '#1F2937', textSecondary: '#6B7280', border: '#E5E7EB' },
    dark: { primary: '#A78BFA', secondary: '#3730A3', accent: '#C4B5FD', background: '#1e1b4b', surface: '#3730A3', text: '#F8FAFC', textSecondary: '#CBD5E1', border: '#4C1D95' }
  },
  rose: {
    id: 'rose',
    name: 'Rose Pink',
    light: { primary: '#F43F5E', secondary: '#FFF1F2', accent: '#E11D48', background: '#FFFBFB', surface: '#FFFFFF', text: '#1F2937', textSecondary: '#6B7280', border: '#E5E7EB' },
    dark: { primary: '#FB7185', secondary: '#581C87', accent: '#FDA4AF', background: '#4c1d4a', surface: '#581C87', text: '#F8FAFC', textSecondary: '#CBD5E1', border: '#86198F' }
  },
};

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState('blue');
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedThemeId = localStorage.getItem('themeId') || 'blue';
    const savedMode = localStorage.getItem('themeMode') || 'light';
    if (themes[savedThemeId]) setThemeId(savedThemeId);
    setMode(savedMode);
  }, []);

  useEffect(() => {
    const theme = themes[themeId];
    const colors = theme[mode];
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    localStorage.setItem('themeId', themeId);
    localStorage.setItem('themeMode', mode);
  }, [themeId, mode]);

  const setTheme = (newThemeId) => {
    if (themes[newThemeId]) setThemeId(newThemeId);
  };

  const currentTheme = themes[themeId];
  const currentColors = currentTheme[mode];

  const value = useMemo(() => ({
    theme: currentTheme, mode, setTheme, setMode, themes, currentColors
  }), [currentTheme, mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
