import React from "react";
import ReactDOM from "react-dom";

let root = document.getElementById("root");

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Layout />, root);
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStarted: false,
      timerStopped: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
      captures: []
    };
  }

  handleTimerStart(e) {
    e.preventDefault();
    if (this.state.timerStopped) {
      this.timer = setInterval(() => {
        this.setState({ timerStarted: true, timerStopped: false });
        if (this.state.timerStarted) {
          if (this.state.seconds >= 60) {
            this.setState(prevState => ({
              minutes: prevState.minutes + 1,
              seconds: 0
            }));
          }
          if (this.state.minutes >= 60) {
            this.setState(prevState => ({
              hours: prevState.hours + 1,
              minutes: 0,
              seconds: 0
            }));
          }
          this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
        }
      }, 1000);
    }
  }

  handleTimerStop(e) {
    e.preventDefault();

    this.setState({ timerStarted: false, timerStopped: true });
    clearInterval(this.timer);
  }

  handleTimerReset() {
    this.setState({
      timerStarted: false,
      timerStopped: true,
      seconds: 0,
      minutes: 0,
      hours: 0,
      captures: []
    });
    clearInterval(this.timer);
  }

  handleTimerCapture() {
    this.setState(prevState => ({
      captures: [
        ...prevState.captures,
        this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds
      ]
    }));
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">React Based Timer</h2>
        <div className="timer-captures">
          {this.state.captures.map((time, index) => {
            return <code>{"Capture " + (index + 1) + " -- " + time}</code>;
          })}
        </div>
        <div className="timer-container">
          <div className="current-timer">
            {this.state.hours +
              ":" +
              this.state.minutes +
              ":" +
              this.state.seconds}
          </div>
          <div className="timer-controls">
            <button
              className="btn btn-success"
              onClick={this.handleTimerStart.bind(this)}
            >
              Start Timer
            </button>
            <button
              className="btn btn-alert"
              onClick={this.handleTimerStop.bind(this)}
            >
              Stop Timer
            </button>
            <button
              className="btn btn-info"
              onClick={this.handleTimerCapture.bind(this)}
            >
              Capture Time
            </button>
            <button
              className="btn btn-danger"
              onClick={this.handleTimerReset.bind(this)}
            >
              Reset!
            </button>
          </div>
        </div>
      </div>
    );
  }
}
