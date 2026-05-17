import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { darkTheme, lightTheme } from '../../theme/colors';

/**
 * Улучшенная строка поиска с фильтрами
 * Пункты 27-33: Расширенный поиск, автодополнение
 */
export default function SearchBar({ 
  value, 
  onChangeText, 
  onFilterPress, 
  onVoiceSearch,
  placeholder = "Поиск фильмов и сериалов..." 
}) {
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.searchInputContainer, { borderColor: colors.border, backgroundColor: colors.surfaceVariant }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.actionsContainer}>
        {onFilterPress && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={onFilterPress}
          >
            <Text style={styles.actionButtonText}>⚙️</Text>
          </TouchableOpacity>
        )}
        {onVoiceSearch && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.secondary }]}
            onPress={onVoiceSearch}
          >
            <Text style={styles.actionButtonText}>🎤</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearIcon: {
    fontSize: 18,
    color: '#999',
    padding: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 18,
  },
});

