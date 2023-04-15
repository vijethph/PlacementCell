import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import VideosList from "./components/VideosList";
import CompaniesList from "./components/CompaniesList";
import Quiz from "./components/Quiz";
import IDE from "./components/IDE";
import QuizSummary from "./components/QuizSummary";
import Forum from "./components/Forum";
import NotFound from "./components/NotFound";

import "./App.css";

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <div className="App container-fluid" id="page-content">
        <Navbar />
        <main className="flex-shrink-0">
          <div className="container">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/videos" element={<VideosList />} />
              <Route path="/companies/details" element={<CompaniesList />} />
              <Route path="/ide" element={<IDE />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quizSummary" element={<QuizSummary />} />
              <Route path="/discussion" element={<Forum />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>

      <footer id="sticky-footer" className="footer fixed-bottom mt-auto py-3 bg-dark text-white-50">
        <div className="container text-center">
          <small>Developed By Sathya M and Vijeth P H</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
