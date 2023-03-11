import { useReducer, useState } from "react";
import YouTube from "react-youtube";
import { YouTubePlayer } from "youtube-player/dist/types";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { Scores } from "types";
import LookAtThisGraph from "LookAtThisGraph";

function App() {
	const [videoId, setVideoId] = useState("9hhMUT2U2L4");
	const [player, setPlayer] = useState<YouTubePlayer | null>(null);
	const [playerStatus, setPlayerStatus] = useState(PlayerStates.UNSTARTED);
	const [videoLength, setVideoLength] = useState(0);

	function clickScore(scores: Scores, score: number) {
		// reset score
		if (score === 0) return {};

		// undefined youtube player
		if (!player) return scores;

		// check if video is playing
		if (player.getPlayerState() !== PlayerStates.PLAYING) return scores;

		// initialize score
		const seconds = `${player.getCurrentTime()}`;
		if (scores[seconds] === undefined || scores[seconds] === null) {
			scores[seconds] = 0;
		}

		// update score
		scores[seconds] += score;

		// shallow copy scores
		return { ...scores };
	}

	const [scores, setScores] = useReducer(clickScore, {});

	function onChangeVideo(videoId: string) {
		setVideoId(videoId);
		setScores(0);
	}

	return (
		<Container>
			<Card>
				<CardHeader title="yoyo" />

				{/* youtube video iframe */}
				<CardMedia
					src="iframe"
					component={YouTube}
					videoId={videoId}
					onReady={(e: { target: YouTubePlayer }) => setPlayer(e.target)}
					onStateChange={(e: { target: YouTubePlayer; data: number }) => {
						setPlayerStatus(e.data);
						if (e.data === PlayerStates.PLAYING) {
						}
					}}
					onPlay={(e: { target: YouTubePlayer }) =>
						setVideoLength(e.target.getDuration())
					}
					sx={{ m: "auto" }}
				/>

				<CardContent sx={{ m: "auto" }}>
					<TextField
						type="text"
						label="Youtube video ID"
						value={videoId}
						onChange={(e) => onChangeVideo(e.target.value)}
					/>

					{/* scoring buttons */}
					<Stack direction="row" spacing={1}>
						<Button
							onClick={() => setScores(1)}
							disabled={playerStatus !== PlayerStates.PLAYING}
						>
							+1
						</Button>
						<Button
							onClick={() => setScores(-1)}
							disabled={playerStatus !== PlayerStates.PLAYING}
						>
							-1
						</Button>
						<Button
							onClick={() => setScores(0)}
							disabled={playerStatus !== PlayerStates.PLAYING}
						>
							RESET
						</Button>
					</Stack>

					{/* graphs */}
					<LookAtThisGraph scores={scores} videoLength={videoLength} />

					{/* score debugging */}
					<p>{JSON.stringify(scores)}</p>
					<p>
						{Object.keys(scores).map((time) => (
							<p>{[parseFloat(time), "\t", scores[time]]}</p>
						))}
					</p>
					<p>{videoLength}</p>
				</CardContent>
			</Card>
		</Container>
	);
}

export default App;
