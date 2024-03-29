import React, { Component } from "react";
import "./code_css/code.css";
import Timer from './timers/timers'
import randomWords from 'random-words'
import Graph from './graph'

let word_arr = []
let index_track = 0;
let correct_let = 0;
let extra = 0;
let total_let = 0;
let track = 0;
let unique_key = 0;
let current_word = ""
let input_word = ""

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 0,
      text: "",
      inputValue: "",
      lastLetter: "",
      words: [],
      completedWords: [],
      completed: false,
      startTime: undefined,
      timeElapsed: 0,
      wpm: 0,
      started: false,
      thisprogress: 0,
      press_toggle: false,
      thirty: false,
      sixty: false,
      ninety: false,
      index_track: 0,
      time_stamps: [],
      second_stamps: [],
      raw_arr: [],
      key_stroke: 0,
      key_wpm: 0,
      accuracy: 0,
      correct_word: 0,
      total_word: 0,
      raw_wpm: 0,
      prev_time_s: 0
    };
    this.setTime(30);
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);

    this.countDown = this.countDown.bind(this);
    this.run_now = this.setTime.bind(this)
  }

  setText = () => {

    const code = [
      `public class CallingMethodsInSameClass
    {
      public static void main(String[] args) {
        printOne();
        printOne();
        printTwo();
      }
    
      public static void printOne() {
        System.out.println("Hello World");
      }
    
      public static void printTwo() {
        printOne();
        printOne();
      }
    }`]
    for (let i = 0; i < 100; i++) {
      word_arr[i] = true;
    }

    const text = Array(100).fill(null).map(() => randomWords())
    const words = text

    this.setState({
      text: text,
      words: words,
      completedWords: []
    });

    this.setState({
      started: true,
      startTime: Date.now(),
      completed: false,
      progress: 0
    });
  };

  secondsToTime(secs) {

    let seconds = secs;

    let obj = {
      "s": seconds
    };
    return obj;
  }


  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });

  }



  startTimer = (time) => {
    index_track = 0;
    this.setState({
      started: true,
      startTime: Date.now(),
      seconds: time,
      timer: 0,
      completed: false
    });
    this.state.seconds = time;

    this.componentDidMount();

    if (this.timer == 0 && this.state.seconds > 0) {

      this.timer = setInterval(this.countDown, 1000);
    }

    //this.setText();

    this.setState({
      started: true,
      startTime: Date.now(),
      completed: false,
      progress: 0
    });


  }

  setTime = (time) => {

    if (time == 30) {
      this.setState({ thirty: true, sixty: false, ninety: false })
    } else if (time == 60) {
      this.setState({ sixty: true, thirty: false, ninety: false })
    } else {
      this.setState({ ninety: true, sixty: false, thirty: false })
    }

    this.setState({
      started: true,
      startTime: Date.now(),
      seconds: time,
      timer: 0,
      completed: false,
      press_toggle: false,
      inputValue: "",
      wpm: 0,
      time: 0,
      time_stamps: [],
      second_stamps: [],
      prev_stamp: time,
      raw_arr: [],
      key_stroke: 0,
      accuracy: 0,
      correct_word: 0,
      total_word: 0,
      raw_wpm: 0
    });
    total_let = 0;
    correct_let = 0;
    track = 0;
    extra = 0;

    this.state.seconds = time
    this.setText();
    this.secondsToTime(time)
    this.componentDidMount()
  }


  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;

    if (seconds == this.state.prev_stamp - 2) {

      let temp = this.state.key_stroke;

      this.setState({
        prev_stamp: seconds,
        time_stamps: [...this.state.time_stamps, this.state.wpm],
        raw_arr: [...this.state.raw_arr, temp / 2],
        key_stroke: 0,
        second_stamps: [...this.state.second_stamps, seconds]
      });
    }

    if (this.state.press_toggle) {

      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });

    }
    // Check if we're at zero.
    if (seconds == 0) {

      if (input_word.trim() == current_word) {
        correct_let += current_word.length
        total_let += current_word.length
      } else if (input_word.trim().length >= current_word.length) {
        console.log('hit')
        for (let i = 0; i < current_word.length; i++) {
          if (input_word[i] == current_word[i]) {
            correct_let++;
            total_let++;
          } else {
            total_let++;
          }
        }

        extra += input_word.trim().length - current_word.length
      }

      if (input_word.trim().length <= current_word) {
        for (let i = 0; i < input_word.trim().length; i++) {
          if (input_word[i] == current_word[i]) {
            correct_let++
          }
          total_let++
        }
      }

      clearInterval(this.timer);
      this.timer = 0;
      this.setState({
        completed: true,
        inputValue: "",
        // completed: newWords.length === 0,
        press_toggle: false
      });
    }
  }

  onPress(e) {

  }

  handleChange = e => {
    if (this.state.press_toggle == false) {
      this.setState({
        press_toggle: true
      });
      this.startTimer(this.state.seconds);
      return
    }

    const { words, completedWords } = this.state;
    const inputValue = e.target.value;
    const lastLetter = inputValue[inputValue.length - 1];
    let prog;
    const currentWord = words[0];

    this.setState({
      key_stroke: ++this.state.key_stroke
    });



    // console.log(currentWord, "currentWord");

    // if space or '.', check the word
    if (lastLetter === " " || lastLetter === ".") {
      // check to see if it matches to the currentWord
      // trim because it has the space

      // remove the word from the wordsArray
      // cleanUp the input
      const newWords = [...words.slice(1)];

      if (inputValue.trim() == currentWord) {
        const newCompletedWords = [...completedWords, currentWord];

        const progress =
          (newCompletedWords.length /
            (newWords.length + newCompletedWords.length)) *
          100;


        word_arr[index_track] = true;
        index_track++;


        correct_let += currentWord.length
        total_let += currentWord.length


        this.setState({
          words: newWords,
          completedWords: newCompletedWords,
          correct_word: this.state.correct_word + 1,
          total_word: this.state.total_word + 1,
          inputValue: "",
          // completed: newWords.length === 0,
          progress: progress
        });
      } else if (inputValue.trim().length >= currentWord.length) {

        word_arr[index_track] = false;
        index_track++;
        const newCompletedWords = [...completedWords, inputValue.trim()];

        const progress =
          (newCompletedWords.length /
            (newWords.length + newCompletedWords.length)) *
          100;
        
          for(let i = 0; i < currentWord.length; i++) {
            if(inputValue[i] == currentWord[i]) {
              correct_let++;
              total_let++;
            } else {
              total_let++;
            }
          }
  
          extra += inputValue.trim().length - currentWord.length 

        this.setState({
          words: newWords,
          completedWords: newCompletedWords,
          inputValue: "",
          total_word: this.state.total_word + 1,
          // completed: newWords.length === 0,
          progress: progress
        });
      }


    } else {
      this.setState({
        inputValue: inputValue,
        lastLetter: lastLetter

      });

    }

    current_word = currentWord
    input_word = inputValue

    this.calculateWPM();
  };

  calculateWPM = () => {
    const { startTime, completedWords } = this.state;
    const now = Date.now();


    let diff = (now - startTime) / 1000 / 60; // 1000 ms / 60 s

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
          <div className="container">
            <button className="start-btn" onClick={() => this.setTime(30)}>
              Start game
            </button>

          </div>
        </div>
      );

    if (!text) return <p>Loading... </p>;

    if (completed) {
      return (
        <div className="container">
          <h2>
            Your WPM is <strong>{wpm}</strong>
          </h2>

          <div className="frame">
            <button class="custom-btn btn-5" onClick={() => this.setTime(30)}> <span> Start  </span></button>
          </div>
          <Graph x_arr={this.state.second_stamps.reverse()} y_arr={this.state.time_stamps} r_y={this.state.raw_arr}></Graph>
          <div className="display">
            <div className="wrap_head">
              Statistics

              <div className="wrap_stats">
                What! {correct_let}, {total_let}
                Letter Accuracy: {correct_let / total_let}
                Extra: {extra}
              </div>
              <div className="wrap_stats">
                Correct Words: {this.state.correct_word} <br />
                Accuracy: {this.state.correct_word / this.state.total_word}
              </div>
            </div>
          </div>
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
          <span className="display_time">{this.state.time.s} </span>
          {/* <button className="start-btn" onClick={() => this.test(30)}>
            30
          </button>
          <button className="start-btn" onClick={() => this.startTimer(60)}>
            60
          </button>
          <button className="start-btn" onClick={() => this.startTimer(90)}>
            90
          </button> */}
          <div className="time_sets">
            <span className={this.state.thirty ? 'active_time' : 'time_change'} onClick={() => this.setTime(10)} >
              10s
            </span>

            <span className={this.state.thirty ? 'active_time' : 'time_change'} onClick={() => this.setTime(30)} >
              30s
            </span>

            <span className={this.state.sixty ? 'active_time' : 'time_change'} onClick={() => this.setTime(60)}>
              60s
            </span>
            <span className={this.state.ninety ? 'active_time' : 'time_change'} onClick={() => this.setTime(90)}>
              90s
            </span>
          </div>
          <progress value={progress} max="100" />
          <div className={this.state.press_toggle ? 'standard' : 'blur_div'}>
            <p className="text">
              {this.state.text.map((word, w_idx) => {
                let highlight = false;
                let currentWord = false;
                let red = false;
                // this means that the word is completed, so turn it green
                if (completedWords.length > w_idx) {
                  if (!word_arr[w_idx]) {
                    red = true;
                  }

                  highlight = true;
                }

                if (completedWords.length === w_idx) {
                  currentWord = true;
                }

                return (
                  <span
                    className={`word 
                                ${highlight && "sea_blue"} 
                                ${red && "red"}
                                ${currentWord && "underline"}`}
                    key={w_idx}
                  >
                    {word.split("").map((letter, l_idx) => {
                      const isCurrentWord = w_idx === completedWords.length;
                      const isWronglyTyped = letter !== inputValue[l_idx];
                      const shouldBeHighlighted = l_idx < inputValue.length;

                      return (
                        <span
                          className={`letter ${isCurrentWord && shouldBeHighlighted
                            ? isWronglyTyped
                              ? "red"
                              : "sea_blue"
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
          </div>

          <div className="input_hover">
            <span class="field field_v2">
              <input class="field__input"
                type="text"
                onChange={this.handleChange}
                value={inputValue}
                // autoFocus={started ? 'true' : 'false'}
                autoFocus={true} />
              <label class="field__label-wrap">
                <span class="field__label">Type to start!</span>
              </label>
            </span>
          </div>


        </div>
      </div>
    );
  }
}

export default Example;
