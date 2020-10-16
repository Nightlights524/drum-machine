import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
      displayText: "Ready...",
      volume: 75
    }
    this.setDisplay = this.setDisplay.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }
  
  setDisplay (text) {
    this.setState( (state) =>  {
      if (state !== text) {
        return {displayText: text}
      }
      return state;
    });
  }

  setVolume (event) {
    this.setState({volume: event.target.value});
    this.setDisplay("Volume: " + event.target.value.toString());
  }

  render() {  
    const clips = Array.from(document.getElementsByClassName('clip'));
    clips.forEach(clip => {
      clip.volume = this.state.volume * 0.01;
    });

    return (
      <div id="drum-machine">
        <p id="title">Drum Machine</p>
        <div id="controls-area">
          <div id="pad-section">
            <DrumPad 
              clipSource="https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
              keyTrigger="Q" 
              clipID={"Kick"}
              setDisplay={this.setDisplay}
              />
            <DrumPad
              clipSource="https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
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
              clipSource="https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
              keyTrigger="A"
              clipID={"Side-Stick"}
              setDisplay={this.setDisplay}
              />
            <DrumPad
              clipSource="https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
              keyTrigger="S"
              clipID={"Shaker"}
              setDisplay={this.setDisplay}
              />
            <DrumPad
              clipSource="https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
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
          <div id="master-section">
            <p id="display">{this.state.displayText}</p>
            <div id="slider-area">
              <p id="volume-label">Volume ^ or v</p>
              <input 
                id="volume-slider"
                type="range"
                value={this.state.volume}
                onChange={this.setVolume}
                >
              </input>
            </div>
          </div>
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