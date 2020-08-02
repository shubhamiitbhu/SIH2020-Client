import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { mic } from 'react-icons-kit/icomoon/mic';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Enquiry = (props) => {
	const [ enquiryComponent, setEnquiryComponent ] = useState(null);

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

		const enquiryComponentasHTML = await axios.get(
			`https://erail.in/train-running-status/15159?date=29-Jul-2020&from=STW`,
		);
		setEnquiryComponent(enquiryComponentasHTML);
		const today = new Date();

		stopListnening();
	};

	recognition.onspeechend = () => {
		recognition.stop();
	};

	return (
		<React.Fragment>
			<ToastContainer />
			<Button
				circular
				style={{ padding: 0.5 + 'rem', background: '#fff' }}
				type='submit'
				onClick={() => {
					listenSpeech();
				}}
			>
				{' '}
				<Icon size={40} icon={mic} />
			</Button>
			{enquiryComponent}
		</React.Fragment>
	);
};

export default Enquiry;
