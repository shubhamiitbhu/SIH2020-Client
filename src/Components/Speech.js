import React from 'react';
import RasaAPI from '../utils/RasaAPI.js';

const Speech = (props) => {
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
		const entityExtraction = await RasaAPI.post(body);

		console.log(transcript, entityExtraction);

		const data = {};
		for (var result in entityExtraction.data.entities) {
			if (result.entity === 'orig') {
				data['origin'] = result.value;
			} else if (result.entity === 'date') {
				data['date'] = result.value;
			} else if (result.entity === 'dest') {
				data['destination'] = result.value;
			}
		}

		try {
			onSpeechEnd(data['origin'], data['destination'], data['date']);
		} catch (error) {
			console.log(error);
		}

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
