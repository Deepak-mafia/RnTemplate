import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TAB_ROUTES } from './config';
import 'react-native-gesture-handler';
import { Settings } from '../modules';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import Icon from '../components/Icon';
import * as LucideIcons from 'lucide-react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const tab = TAB_ROUTES.find(t => t.name === route.name);
          if (!tab) return null;
          return (
            <Icon
              name={tab.icon as keyof typeof LucideIcons}
              size="md"
              variant={focused ? 'primary' : 'default'}
            />
          );
        },
        tabBarActiveTintColor: theme.iconPrimary,
        tabBarInactiveTintColor: theme.iconDefault,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
      })}
    >
      {TAB_ROUTES.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{ tabBarLabel: t(`tab.${tab.name.toLowerCase()}`) }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default function AppNavigation() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        >
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
