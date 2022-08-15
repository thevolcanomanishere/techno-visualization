import { useAudioData } from '@remotion/media-utils';
import { Composition } from 'remotion';
import { AudiogramComposition } from './Composition';
import audio from './assets/ikalanga.mp3';

import './style.css';

const fps = 30;
let durationInFrames = 30 * fps;

export const RemotionVideo: React.FC = () => {
	const audioData = useAudioData(audio);
	if (audioData) {
		durationInFrames = Math.round(audioData?.durationInSeconds * fps);
	}

	return (
		<>
			<Composition
				id="Audiogram"
				component={AudiogramComposition}
				durationInFrames={durationInFrames}
				fps={fps}
				width={1920}
				height={1080}
			/>
		</>
	);
};
