import React from 'react';
import { Text as RNText, TextProps, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type TextVariant =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'button'
  | 'error';

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const VARIANT_STYLES: Record<TextVariant, TextStyle> = {
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
  button: { fontSize: 16, fontWeight: '600', textTransform: 'uppercase' },
  error: { fontSize: 14, fontWeight: '400', color: '#FF3B30' },
};

export default function AppText({
  variant = 'body',
  color,
  style,
  children,
  ...rest
}: AppTextProps) {
  const { theme } = useTheme();
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.body;
  const textColor =
    color || (variant === 'error' ? VARIANT_STYLES.error.color : theme.text);

  return (
    <RNText style={[variantStyle, { color: textColor }, style]} {...rest}>
      {children}
    </RNText>
  );
}
