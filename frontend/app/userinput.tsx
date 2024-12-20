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
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';

import MainImage from '@/assets/images/doctor.jpg'; // Replace with your image path

export default function UserIn() {
	const router = useRouter();
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
	const [age, setAge] = useState('');
	const [dietaryRestrictions, setDietaryRestrictions] = useState('');
	const [healthConditions, setHealthConditions] = useState('');
	const [exerciseHours, setExerciseHours] = useState('');
	const [activityLevel, setActivityLevel] = useState(null);
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: 'Sedentary', value: 'Sedentary' },
		{ label: 'Lightly Active', value: 'Lightly Active' },
		{ label: 'Moderately Active', value: 'Moderately Active' },
		{ label: 'Very Active', value: 'Very Active' },
		{ label: 'Extra Active', value: 'Extra Active' },
	]);

	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleSubmit = async () => {
		// Create the data object to send
		const data = {
			weight,
			height,
			age,
			dietaryRestrictions,
			healthConditions,
			exerciseHours,
			activityLevel,
		};

		// API endpoint (replace with your actual endpoint)
		const apiUrl = 'http://localhost:5000/api/users/userstats';

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();
			if (response.ok) {
				alert('Data submitted successfully!');
				console.log('Response:', result);
			} else {
				alert('Submission failed. Please try again.');
				console.error('Error:', result);
			}
		} catch (error) {
			alert('An error occurred. Please try again.');
			console.error('Error:', error);
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
						<Image source={MainImage} style={styles.logo} />
						<Text style={styles.header}>
							Welcome to Your Health Tracker
						</Text>
						<Text style={styles.subheader}>
							Track and achieve your health goals with ease
						</Text>

						{/* Input fields */}
						<TextInput
							style={styles.input}
							placeholder='Enter your weight (lbs)'
							placeholderTextColor='#aaa'
							keyboardType='numeric'
							value={weight}
							onChangeText={setWeight}
						/>

						<TextInput
							style={styles.input}
							placeholder='Enter your height (inches)'
							placeholderTextColor='#aaa'
							keyboardType='numeric'
							value={height}
							onChangeText={setHeight}
						/>

						<TextInput
							style={styles.input}
							placeholder='Enter your age'
							placeholderTextColor='#aaa'
							keyboardType='numeric'
							value={age}
							onChangeText={setAge}
						/>

						{/* Exercise Hours per Week Input */}
						<TextInput
							style={styles.input}
							placeholder='Enter exercise hours per week'
							placeholderTextColor='#aaa'
							keyboardType='numeric'
							value={exerciseHours}
							onChangeText={setExerciseHours}
						/>

						{/* Dropdown for activity level */}
						<DropDownPicker
							open={open}
							value={activityLevel}
							items={items}
							setOpen={setOpen}
							setValue={setActivityLevel}
							setItems={setItems}
							placeholder='Select Activity Level'
							style={[styles.dropdown, { marginBottom: 15 }]}
							textStyle={styles.dropdownText}
							dropDownContainerStyle={[
								styles.dropdownContainer,
								{ width: '90%' },
							]}
						/>

						{/* Dietary Restrictions box */}
						<View style={styles.dietaryRestrictionsBox}>
							<Text style={styles.dietaryRestrictionsHeader}>
								Dietary Restrictions
							</Text>
							<TextInput
								style={[
									styles.input,
									styles.dietaryRestrictionsInput,
								]}
								placeholder='Enter your dietary restrictions'
								placeholderTextColor='#aaa'
								value={dietaryRestrictions}
								onChangeText={setDietaryRestrictions}
								multiline
							/>
						</View>

						{/* Health Conditions Box */}
						<View style={styles.healthConditionsBox}>
							<Text style={styles.healthConditionsHeader}>
								Health Conditions
							</Text>
							<TextInput
								style={[
									styles.input,
									styles.healthConditionsInput,
								]}
								placeholder='Enter your health conditions'
								placeholderTextColor='#aaa'
								value={healthConditions}
								onChangeText={setHealthConditions}
								multiline
							/>
						</View>

						{/* Submit Button */}
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.button}
								onPress={handleSubmit}>
								<Text style={styles.buttonText}>Submit</Text>
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
	dropdown: {
		width: '90%',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#dfe4ea',
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		marginBottom: 15,
	},
	dropdownText: {
		fontSize: 16,
		color: '#333',
	},
	dropdownContainer: {
		width: '90%',
		borderRadius: 8,
		backgroundColor: '#fff',
		borderColor: '#dfe4ea',
	},
	dietaryRestrictionsBox: {
		width: '90%',
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#dfe4ea',
		marginBottom: 15,
	},
	dietaryRestrictionsHeader: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 10,
	},
	dietaryRestrictionsInput: {
		height: 100, // Height of the dietary restrictions input box
		textAlignVertical: 'top',
	},
	healthConditionsBox: {
		width: '90%',
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#dfe4ea',
		marginBottom: 15,
	},
	healthConditionsHeader: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 10,
	},
	healthConditionsInput: {
		height: 100, // Height of the health conditions input box
		textAlignVertical: 'top',
	},
	buttonContainer: {
		marginTop: 20,
		width: '90%',
	},
	button: {
		backgroundColor: '#2c3e50',
		paddingVertical: 15,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 2,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	extraPadding: {
		height: 100,
	},
});
