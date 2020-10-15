import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// function Stateless(props) {
//   return (
//     <div>
//     </div>
//   );
// }

// const Stateless = props => {
//   return (
//     <div>
//     </div>
//   );
// }

function DrumPad(props) {
  return (
    <button
      className="drum-pad"
      id={props.clipID}
      onMouseDown={() => {document.getElementById(props.keyTrigger).play()}}
    >
      {props.keyTrigger}
      <audio
        id={props.keyTrigger}
        className="clip"
        src={props.clipSource}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
    </button>
  );
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {  
    return (
      <div id="drum-machine">
        <h1 id="title">Drum Machine</h1>
        <h2 id="display">HIT A BUTTON</h2>
        <div id="pad-section">
          <DrumPad clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="Q" clipID={"Kick"} />
          <DrumPad clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="W" clipID={"808"} />
          <DrumPad clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="E" clipID={"Snare1"} />
          <DrumPad clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="A" clipID={"Snare2"} />
          <DrumPad clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="S" clipID={"Clap"} />
          <DrumPad clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="D" clipID={"Hi-Hat"} />
          <DrumPad clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="Z" clipID={"Crash1"} />
          <DrumPad clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="X" clipID={"Crash2"} />
          <DrumPad clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="C" clipID={"Ride"} />
        </div>
      </div>
    );
  }
}
  
// ========================================

ReactDOM.render(
  <DrumMachine />,
  document.getElementById('root')
);