import React from 'react';
import { View, Pressable } from 'react-native';
import Icon from '../../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';

export default function HomeScreen() {
  const navigation: any = useNavigation();
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <Pressable
        onPress={() => navigation.navigate('Settings')}
        style={{ position: 'absolute', top: 16, left: 16, zIndex: 1 }}
      >
        <Icon name="Settings" size="md" variant="secondary" />
      </Pressable>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="Home" size="lg" variant="secondary" />
        <AppText variant="title">
          {t('home.greeting', { name: 'User' })}
        </AppText>

        <AppText variant="title">Main Title</AppText>
        <AppText variant="body">This is body text.</AppText>
        <AppText variant="caption" color="#888">
          A caption
        </AppText>
        <AppText variant="error">Error message</AppText>
      </View>
    </ScreenContainer>
  );
}
