/********************* Audio clip data ***********************/
const clips = [
  {
    keyCode: 81,
    key: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    key: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    key: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    key: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    key: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    key: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    key: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    key: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];
/*****************************************************************/

// Renders Display and DrumPad //
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "Ready!"
    };
    this.onDisplayChange = this.onDisplayChange.bind(this);
  }

  // Called by DrumPad when sound is played
  onDisplayChange(d) {
    this.setState({
      display: d
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <Display displayText={this.state.display} />
        <div className="container">
          <div className="row justify-content-around form-group">
            <DrumPad
              className="col-sm-3"
              info={{
                id: clips[0].id,
                text: clips[0].key,
                url: clips[0].url,
                code: clips[0].keyCode
              }}
              onDisplayChange={this.onDisplayChange}
            />
            <DrumPad
              className="col-sm-3"
              info={{
                id: clips[1].id,
                text: clips[1].key,
                url: clips[1].url,
                code: clips[1].keyCode
              }}
              onDisplayChange={this.onDisplayChange}
            />
            <DrumPad
              className="col-sm-3"
              info={{
                id: clips[2].id,
                text: clips[2].key,
                url: clips[2].url,
                code: clips[2].keyCode
              }}
              onDisplayChange={this.onDisplayChange}
            />
          </div>
          <div className="row justify-content-around form-group">
            <DrumPad
              className="col-sm-3"
              info={{
                id: clips[3].id,
                text: clips[3].key,
                url: clips[3].url,
                code: clips[3].keyCode
              }}
              onDisplayChange={this.onDisplayChange}
            />
            <DrumPad
              className="col-sm-3"
              info={{
                id: clips[4].id,
                text: clips[4].key,
                url: clips[4].url,
                code: clips[4].keyCode
              }}
              onDisplayChange={this.onDisplayChange}
            />
            <DrumPad
              className="col-sm-3"
              info={{
                id: clips[5].id,
                text: clips[5].key,
                url: clips[5].url,
                code: clips[5].keyCode
              }}
              onDisplayChange={this.onDisplayChange}
            />
          </div>
          <div className="row justify-content-around form-group">
            <DrumPad
              className="col-sm-3"
              info={{
                id: clips[6].id,
                text: clips[6].key,
                url: clips[6].url,
                code: clips[6].keyCode
              }}
              onDisplayChange={this.onDisplayChange}
            />
            <DrumPad
              className="col-sm-3"
              info={{
                id: clips[7].id,
                text: clips[7].key,
                url: clips[7].url,
                code: clips[7].keyCode
              }}
              onDisplayChange={this.onDisplayChange}
            />
            <DrumPad
              className="col-sm-3"
              info={{
                id: clips[8].id,
                text: clips[8].key,
                url: clips[8].url,
                code: clips[8].keyCode
              }}
              onDisplayChange={this.onDisplayChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Renders <button> and Audio //
class DrumPad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonStyle: "drum-pad btn btn-secondary"
    };

    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  // Plays sound and communicates sound info to App //
  playSound() {
    let sound = document.getElementById(this.props.info.text);
    sound.currentTime = 0;
    sound.play();
    this.props.onDisplayChange(this.props.info.id);
  }

  // When key is pressed, sound is played, button changes color
  handleKeyDown(e) {
    if (e.keyCode === this.props.info.code) {
      this.playSound();
      this.setState({
        buttonStyle: "drum-pad btn btn-warning"
      });
    }
  }

  // When key is released, button changes color back to original
  handleKeyUp() {
    this.setState({
      buttonStyle: "drum-pad btn btn-secondary"
    });
  }

  // When HTML is loaded, setup event listerns and event handlers
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  // Remove event handlers
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  render() {
    return (
      <button
        className={
          this.state.buttonStyle + " " + this.props.className + " " + "drumpad"
        }
        id={this.props.info.id}
        onClick={this.playSound}
      >
        {this.props.info.text}
        <Audio audioInfo={this.props} />
      </button>
    );
  }
}

// Rendered in DrumPad, itself renders <audio> //
const Audio = function (props) {
  return (
    <audio
      className="clip"
      id={props.audioInfo.info.text}
      src={props.audioInfo.info.url}
    />
  );
};

// Renders a <div>. Is rendered in App //
const Display = function (props) {
  return (
    <div className="text-center font-weight-bold display" id="display">
      <h2>{props.displayText}</h2>
    </div>
  );
};

// Finally, App is rendered in document by React's virtual DOM
ReactDOM.render(<App />, document.getElementById("app"));