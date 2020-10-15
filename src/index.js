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

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.triggerSound = this.triggerSound.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  triggerSound () {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();

    this.props.setDisplay(this.props.clipID);
    // document.getElementById(this.props.keyTrigger).play();
  }

  handleKeyPress (event) {
    const trigger = event.key.toUpperCase();
    if(trigger === this.props.keyTrigger) {
      this.triggerSound();
    }
  }

  render () {
    return (
      <button
        className="drum-pad"
        id={this.props.clipID}
        tabIndex={-1}
        onMouseDown={this.triggerSound}
      >
        {this.props.keyTrigger}
        <audio
          id={this.props.keyTrigger}
          className="clip"
          src={this.props.clipSource}
        >
          Your browser does not support the <code>audio</code> element.
        </audio>
      </button>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "HIT A BUTTON"
    }
    this.setDisplay = this.setDisplay.bind(this);
  }
  
  setDisplay (text) {
    this.setState( (state) =>  {
      if (state !== text) {
        return {displayText: text}
      }
      return state;
    });
  }

  render() {  
    return (
      <div id="drum-machine">
        <h1 id="title">Drum Machine</h1>
        <h2 id="display">{this.state.displayText}</h2>
        <div id="pad-section">
          <DrumPad 
            clipSource="https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
            keyTrigger="Q" 
            clipID={"Kick"}
            setDisplay={this.setDisplay}
          />
          <DrumPad
            clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="W"
            clipID={"808"}
            setDisplay={this.setDisplay}
          />
          <DrumPad
            clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="E"
            clipID={"Snare1"}
            setDisplay={this.setDisplay}
          />
          <DrumPad
            clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="A"
            clipID={"Snare2"}
            setDisplay={this.setDisplay}
          />
          <DrumPad
            clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="S"
            clipID={"Clap"}
            setDisplay={this.setDisplay}
          />
          <DrumPad
            clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="D"
            clipID={"Hi-Hat"}
            setDisplay={this.setDisplay}
          />
          <DrumPad
            clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="Z"
            clipID={"Crash1"}
            setDisplay={this.setDisplay}
          />
          <DrumPad
            clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="X"
            clipID={"Crash2"}
            setDisplay={this.setDisplay}
          />
          <DrumPad
            clipSource="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            keyTrigger="C"
            clipID={"Ride"}
            setDisplay={this.setDisplay}
          />
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