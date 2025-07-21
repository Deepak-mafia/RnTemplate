import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import AppText from '../../../components/AppText';

export default function ThemeToggle() {
  const { mode, toggleTheme, theme } = useTheme();
  return (
    <View style={styles.row}>
      <AppText variant="subtitle" style={styles.label}>
        Theme
      </AppText>
      <Switch
        value={mode === 'dark'}
        onValueChange={toggleTheme}
        thumbColor={mode === 'dark' ? theme.primary : '#ccc'}
        trackColor={{ false: '#ccc', true: theme.primary }}
      />
      <AppText variant="body" style={{ marginLeft: 8 }}>
        {mode === 'dark' ? 'Dark' : 'Light'}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
