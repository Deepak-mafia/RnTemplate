import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

const ICON_SIZE_MAP = {
  xs: 16,
  sm: 20,
  md: 28,
  lg: 36,
  xl: 48,
};

export type IconVariant = 'primary' | 'secondary' | 'default';
export type IconSize = keyof typeof ICON_SIZE_MAP;

interface IconProps {
  name: keyof typeof LucideIcons;
  size?: IconSize;
  color?: string;
  variant?: IconVariant;
}

export default function Icon({
  name,
  size = 'md',
  color,
  variant = 'default',
}: IconProps) {
  const { theme } = useTheme();
  const LucideIcon = LucideIcons[name] as React.ComponentType<any>;
  let iconColor = color;
  if (!iconColor) {
    if (variant === 'primary') iconColor = theme.iconPrimary;
    else if (variant === 'secondary') iconColor = theme.iconSecondary;
    else iconColor = theme.iconDefault;
  }
  if (!LucideIcon) return null;
  const pixelSize = ICON_SIZE_MAP[size] || ICON_SIZE_MAP['md'];
  return <LucideIcon size={pixelSize} color={iconColor} />;
}
