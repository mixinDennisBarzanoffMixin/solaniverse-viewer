// import {Button} from "@mui/material";
import React, {useState, useEffect} from "react";
// import MusicNoteIcon from '@mui/icons-material/MusicNote';
import styles from "../Player/Player.module.css";
// @ts-ignore
const useAudio = (url, enabled) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(enabled);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
            setPlaying(enabled);
        },
        [enabled]
    );

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return [playing, toggle];
};

// @ts-ignore
const Player = ({url, enabled}) => {

    const [playing, toggle] = useAudio(url, enabled);

    return (
        <div className={styles.audioPlayer}>
            <button onClick={toggle as () => void} >
                Toggle sound
            </button>
        </div>
    );

};

export default Player;
