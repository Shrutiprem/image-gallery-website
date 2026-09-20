import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import { getUser } from '../services/storage';

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

const LoginScreen = ({ onLogin, onRegister }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    const registeredUser = getUser();

    if (!registeredUser) {
      setError('No registered account found. Please register first.');
      return;
    }

    if (
      email.trim().toLowerCase() !== registeredUser.email.toLowerCase() ||
      password !== registeredUser.password
    ) {
      setError('Invalid email or password.');
      return;
    }

    // Save login session
    localStorage.setItem('isLoggedIn', 'true');

    onLogin();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <Text style={styles.label}>Email Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <View style={styles.registerContainer}>
          <Text>Don't have an account? </Text>

          <Pressable onPress={onRegister}>
            <Text style={styles.registerText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 8,
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  error: {
    color: '#dc2626',
    marginTop: 12,
  },

  loginButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  loginButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  registerText: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
});