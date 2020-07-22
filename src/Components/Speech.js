import React from 'react';
import axios from 'axios';
import RasaAPI from '../utils/RasaAPI.js';
import API from '../utils/API.js';

const Speech = (props) => {
	const { onSpeechEnd } = props;
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	console.log(SpeechRecognition);
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
		const entityExtraction = await axios.post('http://35.202.113.93:5000/', body);

		console.log(transcript, entityExtraction);

		const data = {};
		const iterate = entityExtraction.data.entities;
		for (var key in iterate) {
			data[iterate[key]['entity']] = iterate[key]['value'];
		}

		const originBody = { name: data['orig'] };
		const destinationBody = { name: data['dest'] };
		const origin = await API.post('/station-name-to-code', originBody);
		const destination = await API.post('/station-name-to-code', destinationBody);

		onSpeechEnd(origin.data, destination.data, data['date']);

		stopListnening();
	};

	recognition.onspeechend = () => {
		recognition.stop();
	};

	return (
		<button
			onClick={() => {
				listenSpeech();
			}}
		>
			{' '}
			Start
		</button>
	);
};

export default Speech;
