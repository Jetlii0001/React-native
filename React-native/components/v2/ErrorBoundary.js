import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { darkTheme, lightTheme } from '../../theme/colors';

/**
 * Error Boundary для обработки ошибок
 * Пункты 86-89: Технические улучшения
 */
class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Здесь можно отправить ошибку в систему логирования
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onReset={() => this.setState({ hasError: false, error: null })} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, onReset }) {
  const { theme } = useThemeStore();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>⚠️ Что-то пошло не так</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        Произошла ошибка в приложении
      </Text>
      {__DEV__ && error && (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error.toString()}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onReset}
      >
        <Text style={styles.buttonText}>Попробовать снова</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ErrorBoundaryClass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

