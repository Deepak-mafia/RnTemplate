import React from 'react';
import { View, Pressable } from 'react-native';
import Icon from '../../components/Icon';
import LanguageSelector from './components/LanguageSelector';
import ScreenContainer from '../../components/ScreenContainer';
import ThemeToggle from './components/ThemeToggle';
import AppText from '../../components/AppText';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <ScreenContainer>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginRight: 12 }}
        >
          <Icon name="ArrowLeft" size="md" variant="secondary" />
        </Pressable>
        <AppText variant="title">{t('')}</AppText>
      </View>
      <View style={{}}>
        <LanguageSelector />
        <ThemeToggle />
      </View>
    </ScreenContainer>
  );
}
