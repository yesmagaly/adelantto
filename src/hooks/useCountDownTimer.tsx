import React, { useState, useEffect } from "react";
/**
 * Count down timer hook.
 *
 * @param time In minutes
 * @returns
 */
const useCountDownTimer = (time: number) => {
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  // Minutes to seconds.
  const countDownTime = time * 60;

  useEffect(() => {
    let timerId: any;

    if (runTimer) {
      setCountDown(countDownTime);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setIsExpired(true);
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const seconds = String(countDown % 60).padStart(2, "0");
  const minutes = String(Math.floor(countDown / 60)).padStart(2, "0");

  return {
    minutes,
    seconds,
    isExpired,
    stopTimer: () => setRunTimer(false),
    resetTimer: () => {
      setCountDown(countDownTime);
      setRunTimer(true);
      setIsExpired(false);
    },
  };
};

export default useCountDownTimer;
