import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { setStatusBarTranslucent } from 'expo-status-bar';

const RegistrationForm = () => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const alertOpacity = useState(new Animated.Value(0))[0];
  const [passwordStrength, setPasswordStrength] = useState(0);

  

  const calculatePasswordStrength = (text) => {
    let strength = 0;
    if (/[a-z]/.test(text)) strength += 1;
    if (/[A-Z]/.test(text)) strength += 1;
    if (/[0-9]/.test(text)) strength += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(text)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 1:
        return '#FF4C4C'; // Red
      case 2:
        return '#FFC400'; // Yellow
      case 3:
      case 4:
        return '#4CAF50'; // Green
      default:
        return '#ccc'; // Default
    }
  };

  const handleRegistration = () => {
    if (!firstName) {
      showAlertBox('Please enter your first name');
      return;
    }
  
    if (!lastName) {
      showAlertBox('Please enter your last name');
      return;
    }
  
    if (!email) {
      showAlertBox('Please enter your email address');
      return;
    }
  
    if (!email.endsWith('@student.uwl.ac.uk')) {
      showAlertBox('Invalid Email', 'Please use a valid email address ending with @student.uwl.ac.uk');
      return;
    }
  
    if (!password) {
      showAlertBox('Please enter your password');
      return;
    }
  
    if (password.length < 8) {
      showAlertBox('Password Requirement', 'Password must be at least 8 characters long');
      return;
    }
  
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      showAlertBox('Password Requirement', 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }
  
    if (password !== confirmPassword) {
      showAlertBox('Password Mismatch', 'Password and confirm password do not match');
      return;
    }
  
   
    // registration data to your backend server
  
    showAlertBox('Registration Successful!', `Welcome, ${firstName} ${lastName}!`);
  };
  
 

  const showAlertBox = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(true);
    Animated.timing(alertOpacity, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  


  const hideAlertBox = () => {
    Animated.timing(alertOpacity, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setShowAlert(false));
  };
  

  return (
    
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="First Name"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          placeholder="Last Name"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          placeholder="Email Address"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
            calculatePasswordStrength(text);
          }}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#999"
        />
        <View style={styles.passwordStrength}>
          <View
            style={[
              styles.strengthIndicator,
              { backgroundColor: getPasswordStrengthColor(passwordStrength) },
              { width: `${passwordStrength * 25}%` },
            ]}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      {showAlert && (
        <Animated.View style={[styles.alertContainer, { opacity: alertOpacity }]}>
          <TouchableOpacity style={styles.alertBox} onPress={hideAlertBox}>
            <Text style={styles.alertTitle}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <Text style={styles.alertButtonText}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </KeyboardAvoidingView>
  );
};




const styles = StyleSheet.create({
  
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  
  formContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
  
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 15,
    fontSize: 18,
    color: '#333',
    backgroundColor: '#f9f9f9', 
  },
  button: {
    
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonText: {
  
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  alertContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, 
  },
  alertBox: {
   
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    maxWidth: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  alertButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  passwordStrength: {
    flexDirection: 'row',
    height: 10,
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  strengthIndicator: {
    height: '100%',
    borderRadius: 5,
  },
});

export default RegistrationForm;
