import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime , onReset },
  ref
) {
  const dialog = useRef();

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const result = remainingTime <= 0 ? "lost" : "won";

  const score = Math.round((1 - remainingTime/(targetTime*1000))*100);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}!</h2>
      {result === 'won' && <h2> Your Score is {score}</h2>}

      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>

      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>

      <form method="dialog" onSubmit={onReset}>
        <button >Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
