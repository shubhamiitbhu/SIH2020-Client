import React, { useEffect } from 'react';
import RasaAPI from '../utils/RasaAPI.js';
import API from '../utils/API.js';
import { Icon } from 'react-icons-kit';
import { mic } from 'react-icons-kit/icomoon/mic';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import firebase from 'firebase/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'firebase/firestore';

var database;
const Speech = (props) => {
	useEffect(() => {
		database = firebase.firestore();
	}, []);

	const { onSpeechEnd } = props;
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();

	const listenSpeech = () => {
		recognition.start();
	};

	const stopListnening = () => {
		recognition.stop();
	};

	recognition.onresult = async (event) => {
		var last = event.results.length - 1;
		var transcript = event.results[last][0].transcript;

		const body = { text: transcript };
		const entityExtraction = await RasaAPI.post('/', body);

		const today = new Date();
		var data = {};
		data['date'] = today.getDate().toString() + ' jul ' + today.getFullYear();
		const iterate = entityExtraction.data.entities;
		for (var key in iterate) {
			data[iterate[key]['entity']] = iterate[key]['value'];
		}

		const originBody = { name: data['orig'] };
		const destinationBody = { name: data['dest'] };

		await database.collection('Logger').add({
			time: new Date().getTime().toString(),
			transcript: transcript,
			destination: data['dest'] !== undefined ? data['dest'] : 'Not Captured',
			origin: data['orig'] !== undefined ? data['orig'] : 'Not Captured',
			date: data['date'] !== undefined ? data['date'] : 'Not Captured',
			flagged:
				data['orig'] !== undefined && data['dest'] !== undefined && data['date'] !== undefined ? false : true,
		});
		try {
			var origin = await API.post('/station-name-to-code', originBody);
			var destination = await API.post('/station-name-to-code', destinationBody);
			if (origin !== null && destination !== null) {
				onSpeechEnd(origin.data, destination.data, data['date']);
			}
		} catch (error) {
			toast.error('One or more entites are missing');
		}

		stopListnening();
	};

	recognition.onspeechend = () => {
		recognition.stop();
	};

	return (
		<React.Fragment>
			<ToastContainer />
			<SubmitButton
				circular
				style={{ padding: 0.5 + 'rem', background: '#fff' }}
				type='submit'
				onClick={() => {
					listenSpeech();
				}}
			>
				{' '}
				<Icon size={40} icon={mic} />
			</SubmitButton>
		</React.Fragment>
	);
};

const SubmitButton = styled(Button)`
display: ${(props) => props.display}
`;
export default Speech;
