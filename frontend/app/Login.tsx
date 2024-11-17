import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};

	// Function to navigate to signup screen
	const goToSignUp = () => {
		router.push('/');
	};

	const handleLogin = async () => {
		if (!email || !password) {
			return;
		}

		try {
			const response = await axios.post(
				'http://localhost:5000/api/users/login',
				{
					email,
					password,
				}
			);
			// Assuming response contains a JWT token and user info
			const { token, user } = response.data;
			// Store token in AsyncStorage (or handle it as per your need)
			// Redirect to user input page or home screen
			console.log('Login Successful:', user);
			router.push('/userinput');
		} catch (err) {
			console.error('Error logging in:', err);
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<TouchableWithoutFeedback onPress={dismissKeyboard}>
				<View style={styles.container}>
					<ScrollView
						contentContainerStyle={styles.scrollContent}
						keyboardShouldPersistTaps='handled'>
						<Image
							source={require('@/assets/images/doctor.jpg')}
							style={styles.logo}
						/>
						<Text style={styles.header}>Login</Text>
						<Text style={styles.subheader}>
							Enter your credentials to log in
						</Text>

						{error && <Text style={styles.errorText}>{error}</Text>}

						{/* Input fields */}
						<TextInput
							style={styles.input}
							placeholder='Enter your email'
							placeholderTextColor='#aaa'
							keyboardType='email-address'
							value={email}
							onChangeText={setEmail}
						/>

						<TextInput
							style={styles.input}
							placeholder='Enter your password'
							placeholderTextColor='#aaa'
							secureTextEntry
							value={password}
							onChangeText={setPassword}
						/>

						{/* Login Button */}
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.button}
								onPress={handleLogin}>
								<Text style={styles.buttonText}>Login</Text>
							</TouchableOpacity>
						</View>

						{/* Button to navigate to signup page */}
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.secondaryButton}
								onPress={goToSignUp}>
								<Text style={styles.buttonText}>Sign Up</Text>
							</TouchableOpacity>
						</View>

						{/* Extra padding below submit button */}
						<View style={styles.extraPadding}></View>
					</ScrollView>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f9fbfd',
		paddingTop: 40, // Added top padding here
	},
	scrollContent: {
		alignItems: 'center',
		paddingVertical: 20,
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 20,
		marginTop: 50,
		borderRadius: 50,
	},
	header: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#2c3e50',
		textAlign: 'center',
		marginBottom: 10,
	},
	subheader: {
		fontSize: 16,
		color: '#7f8c8d',
		textAlign: 'center',
		marginBottom: 30,
	},
	input: {
		width: '90%',
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#dfe4ea',
		fontSize: 16,
		color: '#333',
		marginBottom: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 2,
	},
	buttonContainer: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 20, // Add space directly below the button
	},
	button: {
		width: '90%',
		backgroundColor: '#27ae60',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 4,
	},
	secondaryButton: {
		width: '90%',
		backgroundColor: '#3498db',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 4,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	errorText: {
		color: '#e74c3c',
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 20,
	},
	// Extra padding below the submit button
	extraPadding: {
		height: 100, // Adjust height as needed
	},
});
