import { useAudioData, visualizeAudio } from '@remotion/media-utils';
import { useEffect, useRef, useState } from 'react';
import {
	AbsoluteFill,
	Audio,
	continueRender,
	delayRender,
	Easing,
	Img,
	interpolate,
	Sequence,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import audioSource from './assets/ikalanga.mp3';
import coverImg from './assets/cover.jpg';
import backgroundImage from './assets/backgroundImage.jpg';
import ColorHash from 'color-hash';

import Cover from './assets/cover.png';

const AudioViz = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const audioData = useAudioData(audioSource);

	if (!audioData) {
		return null;
	}

	const allVisualizationValues = visualizeAudio({
		fps,
		frame,
		audioData,
		numberOfSamples: 2048, // Use more samples to get a nicer visualisation
	});

	// Pick the low values because they look nicer than high values
	// feel free to play around :)
	const visualization = allVisualizationValues.slice(0, 68);

	const mirrored = [...visualization.slice(1).reverse(), ...visualization];

	const colorHash = new ColorHash();

	return (
		<div className="flex flex-row items-end h-48 gap-1">
			{mirrored.map((v, i) => {
				// Const color = colorHash.hex(i.toString());
				// console.log(color);
				const color = i % 2 === 0 ? 'white' : 'red';
				return (
					<div
						key={i}
						className="w-[10px] rounded-full"
						style={{
							height: `${1000 * Math.sqrt(v)}%`,
							backgroundColor: color,
						}}
					/>
				);
			})}
		</div>
	);
};

const CircleSplomper = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const audioData = useAudioData(audioSource);

	if (!audioData) {
		return null;
	}

	const allVisualizationValues = visualizeAudio({
		fps,
		frame,
		audioData,
		numberOfSamples: 2048, // Use more samples to get a nicer visualisation
	});

	// Pick the low values because they look nicer than high values
	// feel free to play around :)
	const visualization = allVisualizationValues.slice(0, 1);
	console.log(visualization);

	return (
		<div
			className="bg-white rounded-full "
			style={{
				height: `${1000 * Math.sqrt(visualization[1])}%`,
				width: `${1000 * Math.sqrt(visualization[1])}%`,
			}}
		>
			{/* {mirrored.map((v, i) => {
				// Const color = colorHash.hex(i.toString());
				// console.log(color);
				const color = i % 2 === 0 ? 'white' : 'red';
				return (
					<div
						key={i}
						className="w-[10px] rounded-full"
						style={{
							height: `${1000 * Math.sqrt(v)}%`,
							backgroundColor: color,
						}}
					/>
				);
			})} */}
		</div>
	);
};

export const AudiogramComposition = () => {
	const { durationInFrames } = useVideoConfig();

	const ref = useRef<HTMLDivElement>(null);

	// Change this to adjust the part of the audio to use
	const offset = 2000;

	return (
		<div ref={ref}>
			<AbsoluteFill>
				<Sequence from={-offset}>
					<div className="flex flex-col items-center w-full h-full">
						<Img
							src={backgroundImage}
							className="absolute w-full h-full mix-blend-overlay"
						/>
						<Audio src={audioSource} />
						{/* <Img src={jack} className="h-full m-auto" /> */}

						<div className="mt-[45%]">
							<AudioViz />
						</div>

						{/* <div className="mt-[45%] ">
							<CircleSplomper />
						</div> */}
						{/* <Img
							src={Cover}
							className="absolute w-[500px] left-[50px] top-[30px] rounded-full border-[20px] border-black"
						/> */}

						{/* <div className="flex flex-col text-center absolute bg-white left-[620px] top-[1`200px] rounded-lg opacity-75 px-10">
							<div className="text-[100px] ">Zenna - Imagen</div>
						</div> */}
					</div>
				</Sequence>
			</AbsoluteFill>
		</div>
	);
};
