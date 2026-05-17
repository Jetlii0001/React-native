import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { darkTheme, lightTheme } from '../../theme/colors';

/**
 * Чипы для фильтров
 * Пункты 27-33: Расширенный поиск с фильтрами
 */
export default function FilterChips({ filters, selectedFilters, onToggleFilter }) {
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {filters.map((filter) => {
        const isSelected = selectedFilters.includes(filter.value);
        return (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? colors.primary : colors.surfaceVariant,
                borderColor: isSelected ? colors.primary : colors.border,
              },
            ]}
            onPress={() => onToggleFilter(filter.value)}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: isSelected ? '#fff' : colors.text,
                },
              ]}
            >
              {filter.icon && `${filter.icon} `}
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  contentContainer: {
    paddingHorizontal: 15,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

