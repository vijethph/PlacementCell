import React, { Fragment, useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import correctNotification from "../assets/audio/correct-answer.mp3";
import wrongNotification from "../assets/audio/wrong-answer.mp3";
import buttonNotification from "../assets/audio/button-sound.mp3";
import { getData } from "../services/UserFunctions";

let currentInterval = 0;

interface IQuestion {
  _id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
}

interface IQuizState {
  questions: IQuestion[];
  currentQuestion: IQuestion | null;
  nextQuestion: IQuestion | null;
  previousQuestion: IQuestion | null;
  currentAnswer: string;
  numberOfQuestions: number;
  numberOfAnsweredQuestions: number;
  currentQuestionIndex: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  nextButtonDisabled: boolean;
  previousButtonDisabled: boolean;
}

const initialQuizState = {
  questions: [],
  currentQuestion: null,
  nextQuestion: null,
  previousQuestion: null,
  currentAnswer: "",
  numberOfQuestions: 0,
  numberOfAnsweredQuestions: 0,
  currentQuestionIndex: 0,
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  nextButtonDisabled: false,
  previousButtonDisabled: true,
};

const Quiz = () => {
  const correctSound = useRef<HTMLAudioElement>(null);
  const wrongSound = useRef<HTMLAudioElement>(null);
  const buttonSound = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const [quizState, setQuizState] = useState<IQuizState>(initialQuizState);

  const [quizTimer, setQuizTimer] = useState({
    time: {
      minutes: 0,
      seconds: 0,
      distance: 0,
    },
  });

  const endQuiz = (endQuizState: IQuizState) => {
    swal({
      title: "Quiz has ended!",
      icon: "success",
    });

    setTimeout(() => {
      navigate("/quizSummary", {
        state: {
          score: endQuizState.score,
          numberOfQuestions: endQuizState.numberOfQuestions,
          numberOfAnsweredQuestions: endQuizState.correctAnswers + endQuizState.wrongAnswers,
          correctAnswers: endQuizState.correctAnswers,
          wrongAnswers: endQuizState.wrongAnswers,
        },
      });
    }, 1000);
  };

  const startTimer = () => {
    try {
      const countdownTime = Date.now() + 180000;
      currentInterval = setInterval(() => {
        const distance = countdownTime - Date.now();
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          clearInterval(currentInterval);
          setQuizTimer({
            time: {
              ...quizTimer.time,
              minutes: 0,
              seconds: 0,
            },
          });
          endQuiz(quizState);
        } else {
          console.log("setting initial interval");
          setQuizTimer({
            time: {
              minutes,
              seconds,
              distance,
            },
          });
        }
      }, 1000);
    } catch (error) {
      console.error("Timer error", error);
    }
  };

  useEffect(() => {
    let spinner = false;
    setQuizState(initialQuizState);
    getData("quiz")
      .then((result: IQuestion[]) => {
        if (!spinner) {
          setQuizState({
            ...quizState,
            questions: result,
            currentQuestion: result[0],
            currentAnswer: result[0].answer,
            nextQuestion: result[1],
            numberOfQuestions: result.length,
            previousButtonDisabled: true,
            nextButtonDisabled: false,
          });
        }

        startTimer();
      })
      .catch((error) => {
        console.error("Initial data fetch error", error);
      });

    return () => {
      spinner = true;
    };
  }, []);

  const handleOptions = () => {
    // show options
    const options = Array.from(document.querySelectorAll<HTMLElement>(".option"));

    options.forEach((optionElement) => {
      // eslint-disable-next-line no-param-reassign
      optionElement.style.visibility = "visible";
    });
  };

  const optionClickHandler = (event: React.MouseEvent, optionString: string) => {
    event.preventDefault();
    if (optionString.toLowerCase() === quizState.currentAnswer.toLowerCase()) {
      setTimeout(() => {
        correctSound?.current?.play();
      }, 500);
      swal("Correct Answer!", "You've picked the right one", "success");

      if (quizState.currentQuestionIndex + 1 === quizState.numberOfQuestions) {
        const endQuizState = {
          ...quizState,
          score: quizState.score + 1,
          correctAnswers: quizState.correctAnswers + 1,
          numberOfAnsweredQuestions: quizState.numberOfAnsweredQuestions + 1,
        };
        setQuizState(endQuizState);
        endQuiz(endQuizState);
      } else {
        setQuizState({
          ...quizState,
          score: quizState.score + 1,
          correctAnswers: quizState.correctAnswers + 1,
          currentQuestionIndex: quizState.currentQuestionIndex + 1,
          numberOfAnsweredQuestions: quizState.numberOfAnsweredQuestions + 1,
          currentQuestion: quizState.questions[quizState.currentQuestionIndex + 1],
          currentAnswer: quizState.questions[quizState.currentQuestionIndex + 1].answer,
          nextQuestion: quizState.questions[quizState.currentQuestionIndex + 2],
          previousQuestion: quizState.questions[quizState.currentQuestionIndex],
          previousButtonDisabled: !!(quizState.questions[quizState.currentQuestionIndex] === undefined || quizState.currentQuestionIndex + 1 === 0),
          nextButtonDisabled: !!(quizState.questions[quizState.currentQuestionIndex + 2] === undefined || quizState.currentQuestionIndex + 2 === quizState.numberOfQuestions),
        });
      }
    } else {
      setTimeout(() => {
        wrongSound?.current?.play();
      }, 500);
      swal("Wrong Answer!", "Better luck next time", "warning");
      if (quizState.currentQuestionIndex + 1 === quizState.numberOfQuestions) {
        const endQuizState = {
          ...quizState,
          wrongAnswers: quizState.wrongAnswers + 1,
          numberOfAnsweredQuestions: quizState.numberOfAnsweredQuestions + 1,
        };
        setQuizState(endQuizState);
        endQuiz(endQuizState);
      } else {
        setQuizState({
          ...quizState,
          wrongAnswers: quizState.wrongAnswers + 1,
          currentQuestionIndex: quizState.currentQuestionIndex + 1,
          numberOfAnsweredQuestions: quizState.numberOfAnsweredQuestions + 1,
          currentQuestion: quizState.questions[quizState.currentQuestionIndex + 1],
          currentAnswer: quizState.questions[quizState.currentQuestionIndex + 1].answer,
          nextQuestion: quizState.questions[quizState.currentQuestionIndex + 2],
          previousQuestion: quizState.questions[quizState.currentQuestionIndex],
          previousButtonDisabled: !!(quizState.questions[quizState.currentQuestionIndex] === undefined || quizState.currentQuestionIndex + 1 === 0),
          nextButtonDisabled: !!(quizState.questions[quizState.currentQuestionIndex + 2] === undefined || quizState.currentQuestionIndex + 2 === quizState.numberOfQuestions),
        });
      }
    }

    handleOptions();
  };

  const buttonClickHandler = (event: React.MouseEvent) => {
    buttonSound.current?.play();
    switch ((event.target as HTMLButtonElement).id) {
      case "previous-button": {
        if (quizState.previousQuestion !== undefined) {
          setQuizState((previousQuizState) => ({
            ...previousQuizState,
            currentQuestionIndex: previousQuizState.currentQuestionIndex - 1,
            numberOfAnsweredQuestions: previousQuizState.numberOfAnsweredQuestions + 1,
            currentQuestion: previousQuizState.questions[previousQuizState.currentQuestionIndex + 1],
            currentAnswer: previousQuizState.questions[previousQuizState.currentQuestionIndex + 1].answer,
            nextQuestion: previousQuizState.questions[previousQuizState.currentQuestionIndex + 2],
            previousQuestion: previousQuizState.questions[previousQuizState.currentQuestionIndex],
            previousButtonDisabled: !!(previousQuizState.questions[previousQuizState.currentQuestionIndex] === undefined || previousQuizState.currentQuestionIndex + 1 === 0),
            nextButtonDisabled: !!(previousQuizState.questions[previousQuizState.currentQuestionIndex + 2] === undefined || previousQuizState.currentQuestionIndex + 2 === quizState.numberOfQuestions),
          }));
        } else {
          swal("Error", "End of questions", "error");
        }
        break;
      }
      case "next-button": {
        if (quizState.nextQuestion !== undefined) {
          setQuizState((previousQuizState) => ({
            ...previousQuizState,
            currentQuestionIndex: previousQuizState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: previousQuizState.numberOfAnsweredQuestions + 1,
            currentQuestion: previousQuizState.questions[previousQuizState.currentQuestionIndex + 1],
            currentAnswer: previousQuizState.questions[previousQuizState.currentQuestionIndex + 1].answer,
            nextQuestion: previousQuizState.questions[previousQuizState.currentQuestionIndex + 2],
            previousQuestion: previousQuizState.questions[previousQuizState.currentQuestionIndex],
            previousButtonDisabled: !!(previousQuizState.questions[previousQuizState.currentQuestionIndex] === undefined || previousQuizState.currentQuestionIndex + 1 === 0),
            nextButtonDisabled: !!(previousQuizState.questions[previousQuizState.currentQuestionIndex + 2] === undefined || previousQuizState.currentQuestionIndex + 2 === quizState.numberOfQuestions),
          }));
        } else {
          swal("Error", "End of questions", "error");
        }
        break;
      }
      case "quit-button": {
        swal({
          title: "Are you sure?",
          text: "Do you want to quit the quiz?",
          icon: "warning",
          buttons: [true, "Yes"],
        }).then((confirmed) => {
          if (confirmed) {
            navigate("/profile");
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Fragment>
      <Fragment>
        <audio ref={correctSound} src={correctNotification}>
          <track kind="captions" />
        </audio>
        <audio ref={wrongSound} src={wrongNotification}>
          <track kind="captions" />
        </audio>
        <audio ref={buttonSound} src={buttonNotification}>
          <track kind="captions" />
        </audio>
      </Fragment>
      <div className="questions">
        <h2>Quiz Mode</h2>
        <div className="timer-container">
          <p>
            <span className="float-left badge badge-warning" style={{ float: "left" }}>
              <span className="mdi mdi-help-circle-outline mdi-24px"></span>
              {quizState.currentQuestionIndex + 1} of {quizState.numberOfQuestions}
            </span>
            <span className={`float-right badge badge-info ${quizTimer.time.distance && quizTimer.time.distance <= 120000 ? "warning" : ""} ${quizTimer.time.distance && quizTimer.time.distance < 30000 ? "invalid" : ""}`}>
              {quizTimer.time.minutes}:{quizTimer.time.seconds}
              <span className="mdi mdi-clock-outline mdi-24px"></span>
            </span>
          </p>
        </div>
        <h5>{quizState.currentQuestion?.question}</h5>
        <div className="options-container float-left">
          <option onClick={(event) => optionClickHandler(event, quizState?.currentQuestion?.optionA || "")} className="option">
            {quizState.currentQuestion?.optionA}
          </option>
          <option onClick={(event) => optionClickHandler(event, quizState?.currentQuestion?.optionB || "")} className="option">
            {quizState.currentQuestion?.optionB}
          </option>
        </div>
        <div className="options-container float-right">
          <option onClick={(event) => optionClickHandler(event, quizState?.currentQuestion?.optionC || "")} className="option">
            {quizState.currentQuestion?.optionC}
          </option>
          <option onClick={(event) => optionClickHandler(event, quizState?.currentQuestion?.optionD || "")} className="option">
            {quizState.currentQuestion?.optionD}
          </option>
        </div>

        <div className="button-container">
          <button className={` ${quizState.previousButtonDisabled ? "disable" : ""}`} id="previous-button" onClick={(event) => buttonClickHandler(event)}>
            Previous
          </button>
          <button className={` ${quizState.nextButtonDisabled ? "disable" : ""}`} id="next-button" onClick={(event) => buttonClickHandler(event)}>
            Next
          </button>
          <button id="quit-button" onClick={(event) => buttonClickHandler(event)}>
            Quit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Quiz;
