import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

import Metronome from '@kevinorriss/react-metronome'
import { Vex } from "vexflow";

const { Factory } = Vex.Flow;

const scale = ["C", "D", "E", "F", "G", "A", "B"]

const bottom = "E4"
const top = "E6"

// E2 -> 2
const bottomOctave = parseInt( bottom.replace(/[A-Z]/g, "") )
const topOctave    = parseInt( top   .replace(/[A-Z]/g, "") )

// E2 -> 2
const bottomNote = parseInt( bottom.replace(/[0-9]/g, "") )
const topNote    = parseInt( top   .replace(/[0-9]/g, "") )


const bag = []

for (let i=bottomOctave; i<=topOctave; i++) {
  for (let note of scale) {
    // if outside of range
    if ( !(    (scale.indexOf(bottomNote) > scale.indexOf(note)    && i===4) 
            || (scale.indexOf(note)       > scale.indexOf(topNote) && i===6 )   ) ) {
      bag.push(`${note}${i}`)
    }
  }
}


Array.prototype.getRandomSample = function() {
  return this[Math.floor(Math.random()*this.length)];
}

function getRandom16thNotation() {
  return `${bag.getRandomSample()}/16, ${bag.getRandomSample()}, ${bag.getRandomSample()}, ${bag.getRandomSample()}`
}

function App() {
  const draw = () => {
    // clear
    document.getElementById('output').innerHTML = ""

    // draw
    const vf = new Factory({
      renderer: { elementId: 'output', width: 600, height: 140 },
    });

    const score = vf.EasyScore();
    const system = vf.System();

    system
      .addStave({
        voices: [
          score.voice(
            score.notes('')
              .concat(score.beam(score.notes(getRandom16thNotation(), { stem: 'up' })))
              .concat(score.beam(score.notes(getRandom16thNotation(), { stem: 'up' })))
              .concat(score.beam(score.notes(getRandom16thNotation(), { stem: 'up' })))
              .concat(score.beam(score.notes(getRandom16thNotation(), { stem: 'up' })))
              .concat(score.beam(score.notes(getRandom16thNotation(), { stem: 'up' })))
              .concat(score.beam(score.notes(getRandom16thNotation(), { stem: 'up' })))
              .concat(score.beam(score.notes(getRandom16thNotation(), { stem: 'up' })))
              .concat(score.beam(score.notes(getRandom16thNotation(), { stem: 'up' })))
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
        <h1>Speed Reading</h1>
        <p>How fast can you successfully play all notes on your first try?</p>
        <Metronome bpmTagStyle={{color: "#3B341F"}} />
        <div id="output"></div>
        <p id="flip-hint">You might want to rotate your phone to the side to view all the notes.</p>
        <button onClick={draw}>Generate New Music</button>
      </header>
    </div>
  );
}

export default App;
