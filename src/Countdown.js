import React, { useEffect, useRef } from "react";
import { useState } from "react";

const Countdown = ({ seconds }) => {
  const [countdown, setCountdown] = useState(seconds);
  const timerid = useRef();

  useEffect(() => {
    timerid.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerid.current);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerid.current);
      alert("END");
    }
  }, [countdown]);

  const formatTime = (time) => {
    let minute = Math.floor(time / 60);
    let second = Math.floor(time - minute * 60);

    if (minute <= 10) minute = "0" + minute;
    if (second <= 10) second = "0" + second;

    return minute + ":" + second;
  };

  return <div>Countdown: {formatTime(countdown)}</div>;
};

export default Countdown;
