import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { lightColors, darkColors } from './colors';
import MMKV from '../services/storage';

type ThemeType = 'light' | 'dark';

const themes = {
  light: lightColors,
  dark: darkColors,
};

interface ThemeContextProps {
  theme: typeof lightColors;
  mode: ThemeType;
  setMode: (mode: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<ThemeType>('light');

  useEffect(() => {
    const stored = MMKV.getString('themeMode');
    if (stored === 'light' || stored === 'dark') {
      setModeState(stored);
    }
  }, []);

  const setMode = (newMode: ThemeType) => {
    setModeState(newMode);
    MMKV.setString('themeMode', newMode);
  };

  const toggleTheme = () => setMode(mode === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider
      value={{ theme: themes[mode], mode, setMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
