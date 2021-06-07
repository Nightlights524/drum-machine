import React from 'react';
import * as styles from "./DrumMachine.module.css"
import kick1 from './sounds/kick1.mp3';
import kick2 from './sounds/kick2.mp3';
import snare from './sounds/snare.mp3';
import sidestick from './sounds/sidestick.mp3';
import hiHat from './sounds/hiHat.mp3';
import openHat from './sounds/openHat.mp3';
import shaker from './sounds/shaker.mp3';
import clap from './sounds/clap.mp3';
import ride from './sounds/ride.mp3';

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.audioClip = React.createRef();
    this.triggerSound = this.triggerSound.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidUpdate() {
    this.audioClip.current.volume = this.props.clipVolume / 100;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  triggerSound () {
    this.audioClip.current.currentTime = 0;
    this.audioClip.current.play();
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
        className={styles.drumPad}
        tabIndex={-1}
        onMouseDown={this.triggerSound}
      >
        <p className={styles.clipLabel}>{this.props.clipID}</p>
        <p className={styles.keyTriggerLabel}>{`(${this.props.keyTrigger})`}</p>
        <audio
          className="clip"
          src={this.props.clipSource}
          ref={this.audioClip}
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
      volume: 50
    }
    this.setDisplay = this.setDisplay.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }
  
  componentDidMount () {
    // Eliminate audio playback delay in Safari
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    new AudioContext();
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
    return (
      <div className={styles.drumMachine}>
        <p className={styles.title}>Drum Machine</p>
        <div className={styles.controlsArea}>
          <div className={styles.padSection}>
            <DrumPad 
              clipSource={kick1}
              keyTrigger="Q" 
              clipID={"Kick 1"}
              clipVolume={this.state.volume}
              setDisplay={this.setDisplay}
            />
            <DrumPad
              clipSource={kick2}
              keyTrigger="W"
              clipID={"Kick 2"}
              clipVolume={this.state.volume}
              setDisplay={this.setDisplay}
            />
            <DrumPad
              clipSource={snare}
              keyTrigger="E"
              clipID={"Snare"}
              clipVolume={this.state.volume}
              setDisplay={this.setDisplay}
            />
            <DrumPad
              clipSource={sidestick}
              keyTrigger="A"
              clipID={"Sidestick"}
              clipVolume={this.state.volume}
              setDisplay={this.setDisplay}
            />
            <DrumPad
              clipSource={openHat}
              keyTrigger="S"
              clipID={"Hat 1"}
              clipVolume={this.state.volume}
              setDisplay={this.setDisplay}
            />
            <DrumPad
              clipSource={hiHat}
              keyTrigger="D"
              clipID={"Hat 2"}
              clipVolume={this.state.volume}
              setDisplay={this.setDisplay}
            />
            <DrumPad
              clipSource={shaker}
              keyTrigger="Z"
              clipID={"Shaker"}
              clipVolume={this.state.volume}
              setDisplay={this.setDisplay}
            />
            <DrumPad
              clipSource={clap}
              keyTrigger="X"
              clipID={"Clap"}
              clipVolume={this.state.volume}
              setDisplay={this.setDisplay}
            />
            <DrumPad
              clipSource={ride}
              keyTrigger="C"
              clipID={"Ride"}
              clipVolume={this.state.volume}
              setDisplay={this.setDisplay}
            />
          </div>
          <div className={styles.masterSection}>
            <p className={styles.display}>{this.state.displayText}</p>
            <div>
              <p className={styles.volumeLabel}>Volume ^ or v</p>
              <input 
                className={styles.volumeSlider}
                type="range"
                value={this.state.volume}
                onChange={this.setVolume} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DrumMachine