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

interface Scores {
  [key: number]: number;
}

function App() {
  const [videoId, setVideoId] = useState("9hhMUT2U2L4");
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [playerStatus, setPlayerStatus] = useState(PlayerStates.UNSTARTED);

  function clickScore(scores: Scores, score: number) {
    // reset score
    if (score === 0) return {};

    // undefined youtube player
    const seconds = player?.getCurrentTime();
    if (seconds === undefined || seconds === null) return scores;

    // check if video is playing
    if (player?.getPlayerState() !== PlayerStates.PLAYING) return scores;

    // initialize score
    if (scores[seconds] === undefined || scores[seconds] === null)
      scores[seconds] = 0;

    // update score
    scores[seconds] += score;

    // shallow copy scores
    return { ...scores };
  }

  const [scores, setScores] = useReducer(clickScore, {});

  function onReady(youtubePlayer: YouTubePlayer) {
    setPlayer(youtubePlayer);
  }

  function onChangeVideo(videoId: string) {
    setVideoId(videoId);
    setScores(0);
  }

  return (
    <Container>
      <Card>
        <CardHeader title="yoyo" />
        <CardMedia
          src="iframe"
          component={YouTube}
          videoId={videoId}
          onReady={(e: { target: YouTubePlayer }) => onReady(e.target)}
          onStateChange={(e: { target: YouTubePlayer; data: number }) =>
            setPlayerStatus(e.data)
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
          <p>{JSON.stringify(scores)}</p>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
