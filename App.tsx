import React, { useEffect, useState } from 'react';
import AppNavigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n, { changeLanguage } from './src/i18n';
import STORAGE from './src/services/storage';
import { ThemeProvider } from './src/theme/ThemeContext';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = STORAGE.getString('appLanguage');
      if (savedLang) {
        await changeLanguage(savedLang);
        setLanguage(savedLang);
      }
      setIsReady(true);
    };
    loadLanguage();

    // Listen for language changes
    const onLanguageChanged = (lng: string) => setLanguage(lng);
    i18n.on('languageChanged', onLanguageChanged);
    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, []);

  if (!isReady) return null;

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
