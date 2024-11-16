import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	Keyboard,
} from 'react-native';
import { useState } from 'react';
import Landing from '@/src/screens/Landing';

export default function HomeScreen() {
	const [weight, setWeight] = useState('');

	return <Landing />;
}
