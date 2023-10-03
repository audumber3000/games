import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import OptionsComponent from "./option";

const theme = createTheme();

const QuizComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30); // 30 seconds
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const [quizCompleted, setQuizCompleted] = useState(false); // Track quiz completion
  const [resultMessage, setResultMessage] = useState(""); // Track result message
  const [clickedOption, setClickedOption] = useState(null); // Track clicked option for each question
  const [showAnswer, setShowAnswer] = useState(false); // Track whether to show the answer

  const handleNextQuestion = () => {
    // Go to the next question or submit the quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setRemainingTime(30);
      setClickedOption(null); // Reset clicked option for the next question
      setShowAnswer(false); // Hide the answer for the next question
    } else {
      // Quiz completed, calculate and display result
      const result = (correctAnswers / quizQuestions.length) * 100;
      setQuizCompleted(true);
      setResultMessage(
        `Quiz completed! You got ${correctAnswers} out of ${
          quizQuestions.length
        } correct. Your score: ${result.toFixed(2)}%`
      );
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime === 0 && !quizCompleted) {
      clearInterval(timer);
      handleNextQuestion(); // Trigger next question when timer reaches 0
    }

    return () => clearInterval(timer);
  }, [currentQuestionIndex, remainingTime, correctAnswers, quizCompleted]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionSelect = (selectedOption) => {
    // Handle option selection here
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }
    setClickedOption(selectedOption); // Store the clicked option for the current question
    setShowAnswer(true); 
    console.log(selectedOption)// Show the answer when an option is selected
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: "#6A0DAD",
          minHeight: "51vh",
          display: "flex",
          height: "20vh",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {quizCompleted ? (
          // Display result message when the quiz is completed
          <Paper
            style={{
              backgroundColor: "transparent",
              padding: "16px",
              textAlign: "center",
              marginTop: "4rem",
              border: "none",
              boxShadow: "none",
              color: "white",
            }}
          >
            <Typography variant="h6" color="primary">
              <span style={{ color: "white" }}>{resultMessage}</span>
            </Typography>
          </Paper>
        ) : (
          // Display question, answer, and timer when the quiz is ongoing
          <>
            <Paper
              style={{
                backgroundColor: "transparent",
                padding: "16px",
                textAlign: "center",
                marginTop: "4rem",
                border: "none",
                boxShadow: "none",
                color: "white",
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                style={{
                  color: "white",
                  paddingBottom: "2rem",
                  fontSize: "1.2rem",
                }}
              >
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </Typography>

              <Typography variant="h5" color="inherit">
                {currentQuestion.question}
              </Typography>
              {showAnswer && (
                // Display the answer when showAnswer is true
                <Typography
                  variant="h5"
                  color="white"
                  style={{ paddingTop: "1rem" }}
                >
                  Answer: {currentQuestion.correctAnswer}
                </Typography>
              )}
            </Paper>
            <Typography
              variant="h6"
              color="inherit"
              style={{
                border: "1px solid yellow",
                borderRadius: "2rem",
                backgroundColor: "#F5E216",
                padding: "8px",
                fontSize: "1.1rem",
                color: "white",
                textAlign: "center",
                fontWeight: "800",
                marginTop: "2rem",
              }}
            >
              {remainingTime} seconds
            </Typography>
          </>
        )}
      </div>

      {!showAnswer && !quizCompleted && (
        // Display OptionsComponent when showAnswer is false and the quiz is ongoing
        <OptionsComponent
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          onOptionSelect={handleOptionSelect}
          clickedOption={clickedOption}
          onNextQuestion={handleNextQuestion} // Pass the onNextQuestion function
        />
      )}
    </ThemeProvider>
  );
};

export default QuizComponent;


const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Madrid", "Paris"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: "Blue Whale",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Leo Tolstoy"],
      correctAnswer: "William Shakespeare",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      correctAnswer: "Tokyo",
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon Dioxide",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Earth", "Jupiter", "Venus"],
      correctAnswer: "Jupiter",
    },
    {
      question: "Who is the author of 'To Kill a Mockingbird'?",
      options: ["J.K. Rowling", "George Orwell", "Harper Lee", "F. Scott Fitzgerald"],
      correctAnswer: "Harper Lee",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Fe", "Hg"],
      correctAnswer: "Au",
    },
    {
      question: "Which element has the atomic number 6?",
      options: ["Oxygen", "Carbon", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon",
    },
  ];

