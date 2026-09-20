import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { User } from '../types';

import {
  getUser,
  saveUser,
} from '../services/storage';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const ProfileScreen = ({
  onBack,
  onLogout,
}: ProfileScreenProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const [message, setMessage] = useState('');

  // Load user
  useEffect(() => {
    const savedUser = getUser();

    if (savedUser) {
      setUser(savedUser);

      setFullName(savedUser.fullName);
      setEmail(savedUser.email);
      setGender(savedUser.gender);
      setMobile(savedUser.mobile);
      setAddress(savedUser.address);
      setCity(savedUser.city);
    }
  }, []);

  // Save profile
  const handleSave = () => {
    if (!user) {
      return;
    }

    if (
      !fullName.trim() ||
      !email.trim() ||
      !gender ||
      !mobile.trim() ||
      !address.trim() ||
      !city.trim()
    ) {
      setMessage('All fields are required.');
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setMessage(
        'Mobile number must contain exactly 10 digits.'
      );
      return;
    }

    const updatedUser: User = {
      ...user,
      fullName: fullName.trim(),
      email: email.trim(),
      gender,
      mobile,
      address: address.trim(),
      city: city.trim(),
    };

    saveUser(updatedUser);

    setUser(updatedUser);

    setIsEditing(false);

    setMessage(
      'Profile updated successfully.'
    );
  };

  // Cancel editing
  const handleCancel = () => {
    if (!user) {
      return;
    }

    setFullName(user.fullName);
    setEmail(user.email);
    setGender(user.gender);
    setMobile(user.mobile);
    setAddress(user.address);
    setCity(user.city);

    setMessage('');

    setIsEditing(false);
  };

  if (!user) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No profile information found.
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>
            Back
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* Header */}
      <View style={styles.header}>

        <Pressable
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>
            ← Back
          </Text>
        </Pressable>

        <Pressable
          style={styles.logoutButton}
          onPress={onLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </Pressable>

      </View>

      <View style={styles.card}>

        <Text style={styles.title}>
          My Profile
        </Text>

        <Text style={styles.subtitle}>
          View and manage your account details
        </Text>

        {/* Full Name */}
        <Text style={styles.label}>
          Full Name
        </Text>

        {isEditing ? (
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        ) : (
          <Text style={styles.value}>
            {user.fullName}
          </Text>
        )}

        {/* Email */}
        <Text style={styles.label}>
          Email Address
        </Text>

        {isEditing ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        ) : (
          <Text style={styles.value}>
            {user.email}
          </Text>
        )}

        {/* Gender */}
        <Text style={styles.label}>
          Gender
        </Text>

        {isEditing ? (
          <View style={styles.genderContainer}>

            {['Male', 'Female', 'Other'].map(
              (option) => (
                <Pressable
                  key={option}
                  style={styles.genderOption}
                  onPress={() =>
                    setGender(option)
                  }
                >
                  <View style={styles.radio}>
                    {gender === option && (
                      <View
                        style={
                          styles.radioSelected
                        }
                      />
                    )}
                  </View>

                  <Text>
                    {option}
                  </Text>
                </Pressable>
              )
            )}

          </View>
        ) : (
          <Text style={styles.value}>
            {user.gender}
          </Text>
        )}

        {/* Mobile */}
        <Text style={styles.label}>
          Mobile Number
        </Text>

        {isEditing ? (
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={(text) => {
              const numbersOnly =
                text.replace(/[^0-9]/g, '');

              setMobile(numbersOnly);
            }}
            keyboardType="numeric"
            maxLength={10}
          />
        ) : (
          <Text style={styles.value}>
            {user.mobile}
          </Text>
        )}

        {/* Address */}
        <Text style={styles.label}>
          Address
        </Text>

        {isEditing ? (
          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            value={address}
            onChangeText={setAddress}
            multiline
          />
        ) : (
          <Text style={styles.value}>
            {user.address}
          </Text>
        )}

        {/* City */}
        <Text style={styles.label}>
          City
        </Text>

        {isEditing ? (
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />
        ) : (
          <Text style={styles.value}>
            {user.city}
          </Text>
        )}

        {/* Message */}
        {message !== '' && (
          <Text style={styles.message}>
            {message}
          </Text>
        )}

        {/* Buttons */}
        {!isEditing ? (
          <Pressable
            style={styles.editButton}
            onPress={() => {
              setMessage('');
              setIsEditing(true);
            }}
          >
            <Text style={styles.buttonText}>
              Edit Profile
            </Text>
          </Pressable>
        ) : (
          <View style={styles.editActions}>

            <Pressable
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>
                Save Changes
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>

          </View>
        )}

      </View>

    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  backButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  logoutButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  logoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  card: {
    width: '100%',
    maxWidth: 650,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#666666',
    marginTop: 6,
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 7,
  },

  value: {
    fontSize: 17,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },

  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#555555',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },

  message: {
    color: '#16a34a',
    marginTop: 15,
    fontWeight: '600',
  },

  editButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },

  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 25,
  },

  saveButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  cancelText: {
    color: '#333333',
    fontWeight: 'bold',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
    marginBottom: 20,
  },
});