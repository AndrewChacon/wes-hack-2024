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
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import MainImage from '@/assets/images/doctor.jpg'; // Replace with your image path

export default function App() {
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
	const [age, setAge] = useState('');
	const [open, setOpen] = useState(false);
	const [activityLevel, setActivityLevel] = useState(null);
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

					<DropDownPicker
						open={open}
						value={activityLevel}
						items={items}
						setOpen={setOpen}
						setValue={setActivityLevel}
						setItems={setItems}
						placeholder='Select Activity Level'
						style={styles.dropdown}
						textStyle={styles.dropdownText}
						dropDownContainerStyle={styles.dropdownContainer}
					/>

					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.dismissButton]}
						onPress={dismissKeyboard}>
						<Text style={styles.dismissButtonText}>
							Dismiss Keyboard
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
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
		fontSize: 16,
		fontWeight: 'bold',
	},
	dismissButton: {
		backgroundColor: '#bdc3c7',
		marginTop: 10,
	},
	dismissButtonText: {
		color: '#2c3e50',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
