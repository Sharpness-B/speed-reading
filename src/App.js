import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

import Metronome from '@kevinorriss/react-metronome'
import { Vex } from "vexflow";

const { Factory } = Vex.Flow;

function App() {
  const draw = () => {
    // clear
    document.getElementById('output').innerHTML = ""

    // draw
    const vf = new Factory({
      renderer: { elementId: 'output', width: 600, height: 150 },
    });

    const score = vf.EasyScore();
    const system = vf.System();

    system
      .addStave({
        voices: [
          score.voice(
            score.notes('')
              .concat(score.beam(score.notes('A4/16, E4, C4, D4')))
              .concat(score.beam(score.notes('A4/16, E4, C4, D4')))
              .concat(score.beam(score.notes('A4/16, E4, C4, D4')))
              .concat(score.beam(score.notes('A4/16, E4, C4, D4')))
              .concat(score.beam(score.notes('A4/16, E4, C4, D4')))
              .concat(score.beam(score.notes('A4/16, E4, C4, D4')))
              .concat(score.beam(score.notes('A4/16, E4, C4, D4')))
              .concat(score.beam(score.notes('A4/16, E4, C4, D4')))
            , { time: '8/4' })
        ],
      })
      .addClef('treble')
      .addTimeSignature('8/4');

    vf.draw();
  }


  
  useEffect(() => {
    draw()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>How fast can you successfully play all notes on first try?</p>
        <Metronome />
        <div id="output"></div>
        <button onClick={draw}>Ny</button>
      </header>
    </div>
  );
}

export default App;
