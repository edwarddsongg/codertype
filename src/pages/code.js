import React, { Component } from "react";
import "./code_css/code.css";
import Timer from './timers/timers'
import randomWords from 'random-words'

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
       time: {}, 
       seconds: 0,
       change_sec:0,
       text: "",
       inputValue:"",
       lastLetter:"",
       words:[],
       completedWords:[],
       completed:false,
       startTime:undefined,
       timeElapsed:0,
       wpm:0,
       started: false,
       thisprogress: 0};
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    
  }

  setText = () => {
   
    const text = Array(100).fill(null).map(() => randomWords())
    const words =  text

    this.setState({
      text: text,
      words: words,
      completedWords: []
    });
  };

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = secs;

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }


  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }


  set30() {
    this.setState = ({
      change_sec:30
    });
    this.startTimer();
  }
  set60() {
    this.setState = ({
      change_sec:60
    });
    this.startTimer();
  }
  set90() {
    this.setState = ({
      change_sec: 90
    })
    this.startTimer();
  }

    startTimer() {
   
      this.setState({
        started: true,
        startTime: Date.now(),
        seconds: 400,
        timer: 0
      });
      this.state.seconds = 400;
      this.componentDidMount();

      this.started = true;
    
    
    
    if (this.timer == 0 && this.state.seconds > 0) {
      
      this.timer = setInterval(this.countDown, 1000);
      console.log(this.timer);
    } 

    this.setText();

    this.setState({
      started: true,
      startTime: Date.now(),
      completed: false,
      progress: 0
    });

  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }

  handleChange = e => {
    const { words, completedWords } = this.state;
    const inputValue = e.target.value;
    const lastLetter = inputValue[inputValue.length - 1];
    let prog;
    const currentWord = words[0];
    // console.log(currentWord, "currentWord");

    // if space or '.', check the word
    if (lastLetter === " " || lastLetter === ".") {
      // check to see if it matches to the currentWord
      // trim because it has the space
      if (inputValue.trim() === currentWord) {
        // remove the word from the wordsArray
        // cleanUp the input
        const newWords = [...words.slice(1)];
        //console.log(newWords, "newWords");
        //console.log(newWords.length, "newWords.length");
        const newCompletedWords = [...completedWords, currentWord];
        //console.log(newCompletedWords, "newCompletedWords");
        //console.log("----------------");

        // Get the total progress by checking how much words are left
        const progress =
          (newCompletedWords.length /
            (newWords.length + newCompletedWords.length)) *
          100;

        this.setState({
          words: newWords,
          completedWords: newCompletedWords,
          inputValue: "",
          // completed: newWords.length === 0,
          progress: progress
        });
        console.log(this.state.seconds);
        
      }
    } else {
      this.setState({
        inputValue: inputValue,
        lastLetter: lastLetter
        
      });

      if(this.state.seconds == 0) {
        this.setState({
          completed:true,
          
          inputValue: "",
          // completed: newWords.length === 0,
         
        });
        
        console.log(this.state.completed);
        console.log('why');
      }
    
    }

    this.calculateWPM();
  };

  calculateWPM = () => {
    const { startTime, completedWords } = this.state;
    const now = Date.now();
    const diff = (now - startTime) / 1000 / 60; // 1000 ms / 60 s
  
    const wordsTyped = Math.ceil(
      completedWords.reduce((acc, word) => (acc += word.length), 0) / 5
    );
   
    const wpm = Math.ceil(wordsTyped / diff);

    this.setState({
      wpm: wpm,
      timeElapsed: diff
    });
  };

  render() {
    const {
      text,
      inputValue,
      completedWords,
      wpm,
      timeElapsed,
      started,
      completed,
      progress
    } = this.state;

    if (!started)
      return (
        <div style={{
          height: '100vh'
        }}>
          <div className = "container">
          <button className="start-btn" onClick={this.startTimer}>
            Start game
          </button>

          </div>
        </div>
      );

    if (!text) return <p>Loading...</p>;

    if (completed) {
      return (
        <div className="container">
          <h2>
            Your WPM is <strong>{wpm}</strong>
          </h2>
          <button className="start-btn" onClick={this.startTimer}>
            Play again
          </button>
        </div>
      );
    }

    return (
      <div>

        <div className="wpm">
          <strong>WPM: </strong>
          {wpm}
          <br />
          <strong>Time: </strong>
          {Math.floor(timeElapsed * 60)}s
        </div>
        <div className="container">
        {this.state.time.s}
        <button className="start-btn" onClick={this.set30}>
            30
          </button>
          <button className="start-btn" onClick={this.set60}>
            60
          </button>
          <button className="start-btn" onClick={this.set}>
            90
          </button>
          <progress value={progress} max="100" />
          <p className="text">
            {this.state.text.map((word, w_idx) => {
              let highlight = false;
              let currentWord = false;

              // this means that the word is completed, so turn it green
              if (completedWords.length > w_idx) {
                highlight = true;
              }

              if (completedWords.length === w_idx) {
                currentWord = true;
              }

              return (
                <span
                  className={`word 
                                ${highlight && "green"} 
                                ${currentWord && "underline"}`}
                  key={w_idx}
                >
                  {word.split("").map((letter, l_idx) => {
                    const isCurrentWord = w_idx === completedWords.length;
                    const isWronglyTyped = letter !== inputValue[l_idx];
                    const shouldBeHighlighted = l_idx < inputValue.length;

                    return (
                      <span
                        className={`letter ${
                          isCurrentWord && shouldBeHighlighted
                            ? isWronglyTyped
                              ? "red"
                              : "green"
                            : ""
                        }`}
                        key={l_idx}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </p>
          <input
            type="text"
            onChange={this.handleChange}
            value={inputValue}
            // autoFocus={started ? 'true' : 'false'}
            autoFocus={true}
          />
        </div>
      </div>
    );
  }
}

export default Example;
