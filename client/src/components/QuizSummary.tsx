import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface IQuizResultState {
  score: number;
  numberOfQuestions: number;
  numberOfAnsweredQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  remark?: string;
}

const QuizSummary = () => {
  const [quizResults, setQuizResults] = useState<IQuizResultState>();

  const quizLocation = useLocation();

  useEffect(() => {
    let spinner = false;
    const quizState: IQuizResultState | undefined = quizLocation.state;
    let userRemark = "";

    if (quizState) {
      if (quizState.score <= 30) {
        userRemark = "You need more practice!";
      } else if (quizState.score > 30 && quizState.score <= 50) {
        userRemark = "Better luck next time!";
      } else if (quizState.score <= 70 && quizState.score > 50) {
        userRemark = "You can do better!";
      } else if (quizState.score >= 71 && quizState.score <= 84) {
        userRemark = "You did great!";
      } else {
        userRemark = "You're an absolute genius!";
      }

      setQuizResults({
        score: quizState.score / quizState.numberOfQuestions,
        numberOfQuestions: quizState.numberOfQuestions,
        numberOfAnsweredQuestions: quizState.numberOfAnsweredQuestions,
        correctAnswers: quizState.correctAnswers,
        wrongAnswers: quizState.wrongAnswers,
        remark: userRemark,
      });
    }

    return () => {
      spinner = true;
    };
  }, [quizLocation]);

  return (
    <Fragment>
      <div className="quiz-summary">
        {quizResults ? (
          <Fragment>
            <div style={{ textAlign: "center" }}>
              <span className="mdi mdi-check-circle-outline success-icon"></span>
            </div>
            <h1>Quiz has ended</h1>
            <div className="container stats">
              <h4>{quizResults.remark}</h4>
              <h2>Your Score: {quizResults.score.toFixed(0)}&#37;</h2>
              <span className="stat left">Total number of questions: </span>
              <span className="right">{quizResults.numberOfQuestions}</span>
              <br />
              <span className="stat left">Number of attempted questions: </span>
              <span className="right">{quizResults.numberOfAnsweredQuestions}</span>
              <br />
              <span className="stat left">Number of Correct Answers: </span>
              <span className="right">{quizResults.correctAnswers}</span> <br />
              <span className="stat left">Number of Wrong Answers: </span>
              <span className="right">{quizResults.wrongAnswers}</span>
            </div>
            <section>
              <ul>
                <li className="nav-item">
                  <Link to="/quiz" className="nav-link">
                    <button className="btn btn-primary">Play Again</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <button className="btn btn-info">Back to Home</button>
                  </Link>
                </li>
              </ul>
            </section>
          </Fragment>
        ) : (
          <section>
            <h1 className="no-stats">No Statistics Available</h1>
            <ul>
              <li>
                <Link to="/quiz">Take a Quiz</Link>
              </li>
              <li>
                <Link to="/profile">Back to Home</Link>
              </li>
            </ul>
          </section>
        )}
      </div>
    </Fragment>
  );
};

export default QuizSummary;
