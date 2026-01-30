import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const initialTime = targetTime * 1000;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  const timerIsActive =
    timeRemaining > 0 && timeRemaining < initialTime;

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

  function handleStart() {
    clearInterval(timer.current);
    setTimeRemaining(initialTime);

    timer.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 10) {
          clearInterval(timer.current);
          dialog.current.open();
          return 0;
        }
        return prev - 10;
      });
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset = {handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>

        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>

        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer is inactive"}
        </p>
      </section>
    </>
  );
}
