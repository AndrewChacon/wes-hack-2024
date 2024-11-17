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

import MainImage from '@/assets/images/doctor.jpg';

export default function App() {
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
	const [age, setAge] = useState('');
	const [dietaryRestrictions, setDietaryRestrictions] = useState(''); // Placeholder for dietary restrictions
	const [healthConditions, setHealthConditions] = useState(''); // Placeholder for health conditions
	const [exerciseHours, setExerciseHours] = useState(''); // New input for exercise hours
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

						<TextInput
							style={styles.input}
							placeholder='Enter exercise hours per week'
							placeholderTextColor='#aaa'
							keyboardType='numeric'
							value={exerciseHours}
							onChangeText={setExerciseHours}
						/>

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

						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.button}>
								<Text style={styles.buttonText}>Submit</Text>
							</TouchableOpacity>
						</View>

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
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	// Extra padding below the submit button
	extraPadding: {
		height: 100, // Adjust height as needed
	},
});
