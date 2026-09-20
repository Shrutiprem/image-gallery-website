// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Alert,
// } from 'react-native';

// import { saveUser, getUser } from '../services/storage';
// import {
//   validateEmail,
//   validateMobile,
//   validatePassword,
// } from '../utils/validation';

// const RegisterScreen = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [gender, setGender] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [error, setError] = useState('');

//   const handleRegister = () => {
//     setError('');

//     // Check empty fields
//     if (
//       fullName ||
//       email ||
//       gender ||
//       mobile ||
//       address ||
//       city ||
//       password ||
// confirmPassword
//     ) {
//       setError('All fields are mandatory.');
//       return;
//     }

//     // Validate email
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     // Validate mobile
//     if (!validateMobile(mobile)) {
//       setError('Mobile number must contain exactly 10 digits.');
//       return;
//     }

//     // Validate password
//     if (!validatePassword(password)) {
//       setError('Password must contain at least 6 characters.');
//       return;
//     }

//     // Confirm password
//     if (password !== confirmPassword) {
//       setError('Password and Confirm Password must match.');
//       return;
//     }

//     // Check if user already exists
//     const existingUser = getUser();

//     if (existingUser && existingUser.email === email.trim()) {
//       setError('An account with this email already exists.');
//       return;
//     }

//     const user = {
//       fullName: fullName.trim(),
//       email: email.trim(),
//       gender,
//       mobile,
//       address: address.trim(),
//       city,
//       password,
//     };

//     saveUser(user);

//     Alert.alert(
//       'Registration Successful',
//       'Your account has been created successfully.'
//     );

//     // Clear form
//     setFullName('');
//     setEmail('');
//     setGender('');
//     setMobile('');
//     setAddress('');
//     setCity('');
//     setPassword('');
//     setConfirmPassword('');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       <Text style={styles.label}>Full Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your full name"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       <Text style={styles.label}>Email Address</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <Text style={styles.label}>Gender</Text>

//       <View style={styles.genderContainer}>
//         <Pressable
//           style={styles.genderOption}
//           onPress={() => setGender('Male')}
//         >
//           <View style={styles.radio}>
//             {gender === 'Male' && <View style={styles.radioSelected} />}
//           </View>
//           <Text>Male</Text>
//         </Pressable>

//         <Pressable
//           style={styles.genderOption}
//           onPress={() => setGender('Female')}
//         >
//           <View style={styles.radio}>
//             {gender === 'Female' && <View style={styles.radioSelected} />}
//           </View>
//           <Text>Female</Text>
//         </Pressable>

//         <Pressable
//           style={styles.genderOption}
//           onPress={() => setGender('Other')}
//         >
//           <View style={styles.radio}>
//             {gender === 'Other' && <View style={styles.radioSelected} />}
//           </View>
//           <Text>Other</Text>
//         </Pressable>
//       </View>

//       <Text style={styles.label}>Mobile Number</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter 10-digit mobile number"
//         value={mobile}
//         onChangeText={(text) => {
//           const numbersOnly = text.replace(/[^0-9]/g, '');
//           setMobile(numbersOnly);
//         }}
//         keyboardType="numeric"
//         maxLength={10}
//       />

//       <Text style={styles.label}>Address</Text>
//       <TextInput
//         style={[styles.input, styles.textArea]}
//         placeholder="Enter your address"
//         value={address}
//         onChangeText={setAddress}
//         multiline
//       />

//       <Text style={styles.label}>City</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your city"
//         value={city}
//         onChangeText={setCity}
//       />

//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Minimum 6 characters"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <Text style={styles.label}>Confirm Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Re-enter your password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//       />

//       {error !== '' && <Text style={styles.error}>{error}</Text>}

//       <Pressable style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Register</Text>
//       </Pressable>
//     </ScrollView>
//   );
// };

// export default RegisterScreen;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 24,
//     maxWidth: 600,
//     width: '100%',
//     alignSelf: 'center',
//     backgroundColor: '#ffffff',
//   },

//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//   },

//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 7,
//     marginTop: 10,
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fafafa',
//   },

//   textArea: {
//     minHeight: 90,
//     textAlignVertical: 'top',
//   },

//   genderContainer: {
//     flexDirection: 'row',
//     gap: 20,
//     marginBottom: 10,
//   },

//   genderOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },

//   radio: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: '#555555',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   radioSelected: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#2563eb',
//   },

//   error: {
//     color: '#dc2626',
//     fontSize: 14,
//     marginTop: 15,
//   },

//   button: {
//     backgroundColor: '#2563eb',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 30,
//   },

//   buttonText: {
//     color: '#ffffff',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

import { saveUser, getUser } from '../services/storage';

import {
  validateEmail,
  validateMobile,
  validatePassword,
} from '../utils/validation';

interface RegisterScreenProps {
  onRegisterSuccess?: () => void;
  onLogin?: () => void;
}

const RegisterScreen = ({
  onRegisterSuccess,
  onLogin,
}: RegisterScreenProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');

    // Check empty fields
    if (
      !fullName.trim() ||
      !email.trim() ||
      !gender ||
      !mobile ||
      !address.trim() ||
      !city.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('All fields are mandatory.');
      return;
    }

    // Validate email
    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate mobile
    if (!validateMobile(mobile)) {
      setError('Mobile number must contain exactly 10 digits.');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError('Password and Confirm Password must match.');
      return;
    }

    // Check if user already exists
    const existingUser = getUser();

    if (
      existingUser &&
      existingUser.email.toLowerCase() === email.trim().toLowerCase()
    ) {
      setError('An account with this email already exists.');
      return;
    }

    // Create user object
    const user = {
      fullName: fullName.trim(),
      email: email.trim(),
      gender,
      mobile,
      address: address.trim(),
      city: city.trim(),
      password,
    };

    // Save user to localStorage
    saveUser(user);

    Alert.alert(
      'Registration Successful',
      'Your account has been created successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            if (onRegisterSuccess) {
              onRegisterSuccess();
            }
          },
        },
      ]
    );

    // Clear form
    setFullName('');
    setEmail('');
    setGender('');
    setMobile('');
    setAddress('');
    setCity('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Register to access the Image Gallery
        </Text>

        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>

        <View style={styles.genderContainer}>

          <Pressable
            style={styles.genderOption}
            onPress={() => setGender('Male')}
          >
            <View style={styles.radio}>
              {gender === 'Male' && (
                <View style={styles.radioSelected} />
              )}
            </View>

            <Text style={styles.genderText}>Male</Text>
          </Pressable>

          <Pressable
            style={styles.genderOption}
            onPress={() => setGender('Female')}
          >
            <View style={styles.radio}>
              {gender === 'Female' && (
                <View style={styles.radioSelected} />
              )}
            </View>

            <Text style={styles.genderText}>Female</Text>
          </Pressable>

          <Pressable
            style={styles.genderOption}
            onPress={() => setGender('Other')}
          >
            <View style={styles.radio}>
              {gender === 'Other' && (
                <View style={styles.radioSelected} />
              )}
            </View>

            <Text style={styles.genderText}>Other</Text>
          </Pressable>

        </View>

        {/* Mobile */}
        <Text style={styles.label}>Mobile Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter 10-digit mobile number"
          value={mobile}
          onChangeText={(text) => {
            const numbersOnly = text.replace(/[^0-9]/g, '');
            setMobile(numbersOnly);
          }}
          keyboardType="numeric"
          maxLength={10}
        />

        {/* Address */}
        <Text style={styles.label}>Address</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
          multiline
        />

        {/* City */}
        <Text style={styles.label}>City</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your city"
          value={city}
          onChangeText={setCity}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Minimum 6 characters"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Error */}
        {error !== '' && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        {/* Register Button */}
        <Pressable
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>
            Register
          </Text>
        </Pressable>

        {/* Login Link */}
        <Pressable
          onPress={onLogin}
          style={styles.loginLink}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Login
          </Text>
        </Pressable>

      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
    justifyContent: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: 25,
    fontSize: 15,
  },

  label: {
    fontSize: 16,
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
    backgroundColor: '#fafafa',
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 5,
  },

  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  genderText: {
    fontSize: 15,
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

  error: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: 15,
  },

  registerButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  registerButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  loginLink: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  loginLinkText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '600',
  },
});