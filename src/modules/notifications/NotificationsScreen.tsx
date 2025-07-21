import React from 'react';
import { View } from 'react-native';
import Icon from '../../components/Icon';
import AppText from '../../components/AppText';
import ScreenContainer from '../../components/ScreenContainer';

export default function NotificationsScreen() {
  return (
    <ScreenContainer>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="Bell" size="lg" />
        <AppText variant="title">Notifications Screen</AppText>
      </View>
    </ScreenContainer>
  );
}
