import React, { useState } from "react";

const QuizForm = ({ onSubmit }) => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const [question, setQuestion] = useState({
    text: "",
    options: ["", ""],
    correctAnswer: 0,
    image: null,
    audio: null,
  });

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleCorrectAnswerChange = (index) => {
    setQuestion({ ...question, correctAnswer: index });
  };

  const handleImageUpload = (e) => {
    setQuestion({ ...question, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleAudioUpload = (e) => {
    setQuestion({ ...question, audio: URL.createObjectURL(e.target.files[0]) });
  };

  const addOption = () => {
    setQuestion({ ...question, options: [...question.options, ""] });
  };

  const addQuestion = () => {
    setQuiz({ ...quiz, questions: [...quiz.questions, question] });
    setQuestion({ text: "", options: ["", ""], correctAnswer: 0, image: null, audio: null });
  };

  const submitQuiz = () => {
    onSubmit(quiz);
    setQuiz({ title: "", description: "", questions: [] });
  };

  return (
    <>
      {/* Main Quiz Form Container */}
      <div className="quiz-container">
        <h3>Quiz Details</h3>
        <input type="text" name="title" value={quiz.title} onChange={handleQuizChange} placeholder="Quiz Title" />
        <textarea name="description" value={quiz.description} onChange={handleQuizChange} placeholder="Quiz Description" />

        <div className="new">
        <h4>Upload Image (Optional)</h4>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {question.image && <img src={question.image} alt="Preview" width="100px" />}

        <h4>Upload Audio (Optional)</h4>
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
        {question.audio && <audio controls src={question.audio}></audio>}

        <h3>Add Question</h3>
        <input type="text" name="text" value={question.text} onChange={handleQuestionChange} placeholder="Question" />

        <h4>Options</h4>
        {question.options.map((option, index) => (
          <div key={index} className="option-row">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <input
              type="radio"
              name="correctAnswer"
              checked={question.correctAnswer === index}
              onChange={() => handleCorrectAnswerChange(index)}
            />
          </div>
        ))}
</div>
        <div>
          <button onClick={addOption}>Add Option</button>
          <button onClick={addQuestion}>Add Question</button>
          <button onClick={submitQuiz}>Submit Quiz</button>
        </div>
      </div>

      {/* Created Quizzes - Rendered Outside the Container */}
      <div className="quiz-display">
        {quiz.questions.length > 0 && (
          <div>
            <h4>Quiz: {quiz.title}</h4>
            <p>{quiz.description}</p>
            <ul>
              {quiz.questions.map((q, index) => (
                <li key={index}>
                  <strong>{q.text}</strong>
                  {q.image && <div><img src={q.image} alt="Preview" width="100px" /></div>}
                  {q.audio && <div><audio controls src={q.audio}></audio></div>}
                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>
                        {opt} {q.correctAnswer === i ? "✅" : ""}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizForm;
