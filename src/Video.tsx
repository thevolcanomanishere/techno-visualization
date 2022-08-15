import { useAudioData } from '@remotion/media-utils';
import { Composition } from 'remotion';
import { AudiogramComposition } from './Composition';

import './style.css';

const fps = 30;
const durationInFrames = 30 * fps;

export const RemotionVideo: React.FC = () => {
	// Const audioData = useAudioData(audioSource);
	// if (audioData) {
	// DurationInFrames = Math.round(audioData?.durationInSeconds * fps);
	// }

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
