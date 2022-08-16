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
import Vinyl from './assets/vinyl.png';
import SpotifyLogo from './assets/spotify.png';
import BandcampLogo from './assets/bandcamp.png';
import AppleLogo from './assets/apple.png';
import TidalLogo from './assets/Tidal_logo.png';
import DeezerLogo from './assets/deezer.png';
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
		numberOfSamples: 512, // Use more samples to get a nicer visualisation
	});

	// Pick the low values because they look nicer than high values
	// feel free to play around :)
	const visualization = allVisualizationValues.slice(0, 54);

	const mirrored = [...visualization.slice(0).reverse(), ...visualization];

	return (
		<div className="z-0 flex flex-row items-center h-48 gap-1">
			{mirrored.map((v, i) => {
				// Const color = colorHash.h ex(i.toString());
				// console.log(color);
				// const color = i % 2 === 0 ? '#0F5ACF' : '#FF5929';

				let color;
				if (i % 2 === 0) {
					color = '#0F5ACF';
				} else if (i % 3 === 0) {
					color = 'white';
				} else {
					color = '#FF5929';
				}
				const brightness = interpolate(v, [0, 0.2], [0.2, 2]);
				const width = interpolate(v, [0, 0.2], [1, 100]);
				const height = interpolate(2 * Math.sqrt(v), [0, 0.2], [1, 150]);
				return (
					<div
						key={i}
						className="rounded-full transform-gpu"
						style={{
							width: `${width}px`,
							height: `${height}%`,
							backgroundColor: color,
							// Filter: `brightness(${brightness})`,
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

	const brightness = interpolate(visualization[0], [0, 0.3], [0, 1]);

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
			style={
				{
					// Filter: `brightness(${brightness})`,
				}
			}
		/>
	);
};

const RenderSpinningBuyNow = () => {
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

	const brightness = interpolate(visualization[0], [0, 0.3], [0, 1]);
	const tilt = interpolate(frame - 200, [0, 90], [0, 360]);

	return (
		<div
			className="absolute right-[10%] top-[20%] text-[200px] text-white"
			style={{
				transform: `rotate(${tilt}deg)`,
				filter: `brightness(${brightness})`,
			}}
		>
			BUY NOW
		</div>
	);
};

export const AudiogramComposition = () => {
	const audioData = useAudioData(audioSource);

	const { durationInFrames } = useVideoConfig();

	const frame = useCurrentFrame();
	if (frame === 1) {
		console.log(audioData);
	}

	const ref = useRef<HTMLDivElement>(null);

	// Change this to adjust the part of the audio to use
	const offset = 2000;

	const tilt = interpolate(frame - 200, [0, 360], [0, 360]);

	return (
		<div ref={ref}>
			<AbsoluteFill>
				<Sequence from={0}>
					<div className="relative flex flex-col items-center w-full h-full">
						<Audio src={audioSource} />

						{/* <div>{JSON.stringify(audioData?.channelWaveforms, null, 2)}</div> */}
						{/* <Img src={jack} className="h-full m-auto" /> */}
						<Img
							src={Vinyl}
							className="absolute rounded-full top-10 left-[300px] w-[600px] h-[600px] z-10"
							style={{
								transform: `rotate(${tilt}deg)`,
							}}
						/>

						<Img
							src={albumCover}
							className="absolute z-20 top-10 left-10 w-[600px] h-[600px]"
						/>
						<div
							className="z-0 mt-[35%]"
							style={
								{
									// Transform: `rotate(${tilt}deg)`,
								}
							}
						>
							<AudioViz />
						</div>

						<div>
							{/* <div className="absolute z-10 text-5xl text-white top-8 right-56">
								Out now on:
							</div> */}
							<Img
								src={SpotifyLogo}
								className="absolute z-10 bg-white top-24 right-24 w-96 bg-clip-text"
							/>
							{/* <div className="absolute z-10 w-64 h-32 bg-white top-24 right-24 bg-clip-content" /> */}
							<Img
								src={BandcampLogo}
								className="absolute z-10 top-56 right-24 w-96"
							/>
							<Img
								src={AppleLogo}
								className="absolute z-10 top-[350px] right-24 w-96 invert"
							/>
							<Img
								src={TidalLogo}
								className="absolute z-10 top-[480px] right-24 w-96 invert"
							/>
							<Img
								src={DeezerLogo}
								className="absolute z-10 top-[450px] right-16 w-[460px] invert"
							/>
						</div>

						{/* <div className="absolute top-[0%] z-0">
							<AlbumCover />
						</div> */}

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
				<Sequence from={100} durationInFrames={100}>
					{/* <div className="absolute left-[10%] top-[20%] text-[200px] text-white">
						BUY NOW
					</div> */}
				</Sequence>
				<Sequence from={200}>
					{/* <div
						className="absolute right-[10%] top-[20%] text-[200px] text-white"
						style={{ transform: `rotate(${tilt}deg)` }}
					>
						BUY NOW
					</div> */}

					{/* {RenderSpinningBuyNow()} */}
				</Sequence>
			</AbsoluteFill>
		</div>
	);
};
