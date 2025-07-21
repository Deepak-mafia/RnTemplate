import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
}

export default function ScreenContainer({
  children,
  style,
  ...rest
}: ScreenContainerProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }, style]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Set your global padding here
  },
});
