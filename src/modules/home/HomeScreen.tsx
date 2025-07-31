import React from 'react';
import {
  View,
  Pressable,
  NativeModules,
  Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Icon from '../../components/Icon';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';

export default function HomeScreen() {
  const navigation: any = useNavigation();
  const { t } = useTranslation();

  const showToast = () => {
    NativeModules.MyToast.show('Hello from Kotlin Native Module!');
  };
  const getBattery = async () => {
    try {
      const level = await NativeModules.MyToast.getBatteryLevel();
      Alert.alert(`Battery Level: ${level}%`);
    } catch (e: any) {
      console.log('Error', e);

      Alert.alert(`Error: ${e.message}`);
    }
  };

  const getDeviceInfo = async () => {
    try {
      const info = await NativeModules.MyToast.getDeviceInfo();
      console.log('DEVICE INFO', info);

      Alert.alert(
        'Device Info',
        `Brand: ${info.brand}\nModel: ${info.model}\nOS: ${info.osVersion} (API ${info.apiLevel})`,
      );
    } catch (e: any) {
      Alert.alert(`Error: ${e.message}`);
    }
  };

  async function getPhoneNumber() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const number = await NativeModules.MyToast.getPhoneNumber();
      console.log('Phone number:', number);
      Alert.alert('Phone number', `${number}`);
    } else {
      console.log('Permission denied');
    }
  }

  return (
    <ScreenContainer>
      <Pressable
        onPress={() => navigation.navigate('Settings')}
        style={{ position: 'absolute', top: 16, left: 16, zIndex: 1 }}
      >
        <Icon name="Settings" size="md" variant="secondary" />
      </Pressable>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable>
          <AppText variant="title">
            <Button title="Show Kotlin Toast" onPress={showToast} />
          </AppText>
        </Pressable>
        <Pressable>
          <AppText variant="title">
            <Button title="Show BAttery" onPress={getBattery} />
          </AppText>
        </Pressable>
        <Pressable>
          <AppText variant="title">
            <Button title="Show Device DEtails" onPress={getDeviceInfo} />
          </AppText>
        </Pressable>
        <Pressable>
          <AppText variant="title">
            <Button title="Show Phone Number" onPress={getPhoneNumber} />
          </AppText>
        </Pressable>

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
