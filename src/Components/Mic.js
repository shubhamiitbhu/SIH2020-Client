import React from 'react';
import styled from 'styled-components';

const Mic = () => {
	const startAnimation = () => {
		var mic = document.getElementById('mic_body');
		var dots = document.getElementById('dots');
		var L = document.getElementById('dots_left');
		var M = document.getElementById('dots_middle');
		var R = document.getElementById('dots_right');
		mic.toggleClass('mic_animate');
		dots.toggleClass('animate');
		L.toggleClass('animate');
		M.toggleClass('animate');
		R.toggleClass('animate');
	};
	return (
		<StyledMic>
			<div class='frame'>
				<div class='center'>
					<div class='mic_container' onClick={startAnimation()}>
						<div class='mic_body'>
							<div class='mic_pill' />
							<div class='mic_hole' />
							<div class='mic_stand' />
							<div class='mic_bottom' />
						</div>
						<div class='dots'>
							<div class='dots_left' />
							<div class='dots_middle' />
							<div class='dots_right' />
						</div>
					</div>
				</div>
			</div>
		</StyledMic>
	);
};

const StyledMic = styled.div`
	.frame {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 400px;
		height: 400px;
		margin-top: -200px;
		margin-left: -200px;
		border-radius: 2px;
		box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
		overflow: hidden;
		background: purple;
		color: #333;
		font-family: 'Open Sans', Helvetica, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.mic {
		&_container {
			position: relative;
			width: 150px;
			height: 150px;
			margin: 50vh auto;
			border-radius: 50%;
			border: 5px solid white;
		}

		&_body {
			position: relative;
			top: 17%;
			left: 38%;
			transform-origin: 20px 50px;
		}

		&_pill {
			position: absolute;
			height: 80px;
			width: 35px;
			background: white;
			border-radius: 20px;
		}

		&_hole {
			position: absolute;
			height: 25px;
			width: 8px;
			top: 12px;
			left: 14px;
			background: purple;
			border-radius: 20px;
		}

		&_stand {
			position: absolute;
			top: 70px;
			left: 10%;
			background: white;
			height: 30px;
			width: 5px;
			border-radius: 5px;
		}

		&_bottom {
			position: absolute;
			background: white;
			border-radius: 5px;
			height: 5px;
			width: 35px;
			top: 95px;
		}

		&_animate {
			animation: mic 1s forwards;
		}
	}

	.dots {
		height: 100%;
		width: 80%;
		opacity: 0;
		transform: scale(0);
		position: absolute;
		left: 10%;

		&.animate {
			animation: dots 1s 1s forwards;
		}

		&_left,
		&_middle,
		&_right {
			height: 20px;
			width: 20px;
			position: absolute;
			top: 50%;
			background: white;
			border-radius: 50%;
			margin: auto auto;
		}

		&_left {
			left: 12%;

			&.animate {
				animation: dot 1s ease infinite;
			}
		}

		&_middle {
			left: 42%;

			&.animate {
				animation: dot 1s ease 0.1s infinite;
			}
		}

		&_right {
			left: 72%;

			&.animate {
				animation: dot 1s ease 0.2s infinite;
			}
		}
	}

	@keyframes dots {
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes dot {
		50% {
			top: 35%;
		}
	}

	@keyframes mic {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		30% {
			transform: scale(1.1);
			opacity: 1;
		}
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}
`;

export default Mic;
