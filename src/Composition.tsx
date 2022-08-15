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
import ColorHash from 'color-hash';
import albumCover from './assets/albumCover.jpeg';

import Cover from './assets/cover.png';

const colorHash = new ColorHash();

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
		numberOfSamples: 256, // Use more samples to get a nicer visualisation
	});

	// Pick the low values because they look nicer than high values
	// feel free to play around :)
	const visualization = allVisualizationValues.slice(2, 3);
	const size = Math.round(1000 * Math.sqrt(visualization[0]));
	const color = colorHash.hex(visualization[0].toString());

	return (
		<div
			className="bg-white rounded-full"
			style={{
				height: `${size}px`,
				width: `${size}px`,
				backgroundColor: color,
			}}
		/>
	);
};

const AlbumCover = () => {
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
		numberOfSamples: 16, // Use more samples to get a nicer visualisation
	});

	// Pick the low values because they look nicer than high values
	// feel free to play around :)
	const visualization = allVisualizationValues.slice(1, 2);
	const size = Math.round(1000 * Math.sqrt(visualization[0]));
	const color = colorHash.hex(visualization[0].toString());

	return (
		// <div
		// 	className="bg-white rounded-full"
		// 	style={{
		// 		height: `${size}px`,
		// 		width: `${size}px`,
		// 		backgroundColor: color,
		// 	}}
		// />
		<Img
			src={albumCover}
			alt="album cover"
			style={{
				height: `${size}px`,
				width: `${size}px`,
			}}
		/>
	);
};

export const AudiogramComposition = () => {
	const { durationInFrames } = useVideoConfig();
	const frame = useCurrentFrame();

	const ref = useRef<HTMLDivElement>(null);

	// Change this to adjust the part of the audio to use
	const offset = 100;

	const tilt = interpolate(frame - 200, [0, 90], [0, 360]);

	console.log(tilt);

	return (
		<div ref={ref}>
			<AbsoluteFill>
				<Sequence from={0}>
					<div className="relative flex flex-col items-center w-full h-full">
						<Audio src={audioSource} />
						{/* <Img src={jack} className="h-full m-auto" /> */}

						<div className="mt-[90%]">
							<AudioViz />
						</div>

						<div className="absolute top-[4%]">
							{/* <CircleSplomper /> */}
							<AlbumCover />
						</div>

						{/* <div className="absolute left-[10%] top-[4%]">
							<AlbumCover />
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
				<Sequence from={100}>
					{frame <= 200 ? (
						<div className="absolute left-[10%] top-[20%] text-[200px] text-white">
							BUY NOW
						</div>
					) : null}
				</Sequence>
				<Sequence from={200}>
					<div
						className="absolute right-[10%] top-[20%] text-[200px] text-white"
						style={{ transform: `rotate(${tilt}deg)` }}
					>
						BUY NOW
					</div>
				</Sequence>
			</AbsoluteFill>
		</div>
	);
};
