import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import Icon from '../../components/Icon';
import AppText from '../../components/AppText';
import { View } from 'react-native';

export default function SearchScreen() {
  return (
    <ScreenContainer>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="Search" size="lg" />
        <AppText variant="title">Search Screen</AppText>
      </View>
    </ScreenContainer>
  );
}
