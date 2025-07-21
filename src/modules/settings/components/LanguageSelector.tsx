import React, { useState } from 'react';
import { View, Pressable, Modal, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import MMKV from '../../../services/storage';
import { changeLanguage } from '../../../i18n';
import { useTheme } from '../../../theme/ThemeContext';
import AppText from '../../../components/AppText';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  // Add more languages here
];

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(i18n.language);

  const handleSelect = async (lang: string) => {
    await changeLanguage(lang);
    MMKV.setString('appLanguage', lang);
    setSelected(lang);
    setModalVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <AppText variant="subtitle" style={styles.label}>
        {t('settings.language') || 'Language'}
      </AppText>
      <Pressable
        style={[
          styles.selector,
          { borderColor: theme.border, backgroundColor: theme.background },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <AppText variant="body">
          {LANGUAGES.find(l => l.code === selected)?.label || selected}
        </AppText>
      </Pressable>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <AppText variant="title" style={styles.modalTitle}>
              {t('settings.chooseLanguage') || 'Choose Language'}
            </AppText>
            <FlatList
              data={LANGUAGES}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.languageOption}
                  onPress={() => handleSelect(item.code)}
                >
                  <AppText
                    variant="body"
                    style={
                      item.code === selected
                        ? [styles.selected, { color: theme.primary }]
                        : undefined
                    }
                  >
                    {item.label}
                  </AppText>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <AppText variant="button">
                {t('common.cancel') || 'Cancel'}
              </AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selector: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    borderRadius: 12,
    padding: 20,
    alignItems: 'stretch',
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  selected: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
});
