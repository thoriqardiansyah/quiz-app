import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [data, setData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionAnswer, setQuestionAnswer] = useState(0);
  const [show, setShow] = useState(true);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(60);
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
      setShow(false);
    }
  }, [countdown]);

  const formatTime = (time) => {
    let minute = Math.floor(time / 60);
    let second = Math.floor(time - minute * 60);

    if (minute <= 10) minute = "0" + minute;
    if (second <= 10) second = "0" + second;

    return minute + ":" + second;
  };

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=boolean`
      )
      .then((res) => {
        const data = res.data.results;
        setData(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#039;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
  }

  const handleQuestion = (isCorrect) => {
    if (isCorrect === (data !== null && data[currentQuestion].correct_answer)) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert("you have reached the end of the quiz");
      setShow(false);
    }
    setQuestionAnswer(questionAnswer + 1);
  };

  return (
    <>
      <div className="w-64 md:w-1/2 lg:w-2/3 mx-auto mt-28 p-8 border shadow-md rounded-md">
        {show
          ? data !== null && (
              <>
                <div>
                  <h3 className="text-center text-lg lg:text-2xl font-bold mb-8">
                    Question {currentQuestion + 1} out of {data.length}
                  </h3>
                  <h3 className="text-center font-semibold">
                    {/* <Countdown seconds={90} /> */}
                    Countdown: {formatTime(countdown)}
                  </h3>
                  <div className="text-center">
                    <p className="my-4">
                      {unEscape(data[currentQuestion].question)}
                    </p>
                    <button
                      type="submit"
                      onClick={() => handleQuestion("True")}
                      className="bg-violet-500 px-6 py-1 rounded-md text-white mx-3"
                    >
                      True
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleQuestion("False")}
                      className="bg-violet-500 px-6 py-1 rounded-md text-white"
                    >
                      False
                    </button>
                  </div>
                </div>
              </>
            )
          : data !== null && (
              <div>
                <div className="text-center ml-8 font-semibold text-xl">
                  <p className="mb-6">
                    You scored {score} out of {data.length}
                  </p>
                  <p>Incorrect Answer: {data.length - score}</p>
                  <p>correct Answer: {score}</p>
                  <p>Your Answer Question: {questionAnswer}</p>
                </div>
                <div className="text-center mt-10 flex flex-row justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-green-400 text-white py-1 px-4 mx-6 rounded-md"
                  >
                    Restart
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-red-400 text-white py-1 px-4 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
      </div>
    </>
  );
};

export default Quiz;
