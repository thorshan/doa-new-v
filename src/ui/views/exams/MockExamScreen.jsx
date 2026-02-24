import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Trophy,
  AlertCircle,
  CheckCircle2,
  Send,
  Loader2,
  HelpCircle,
} from "lucide-react";
import { examApi } from "../../../api/examApi";
import Processing from "../../loaders/Processing";

const MockExamScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal State
  const [resultStats, setResultStats] = useState({
    score: 0,
    total: 0,
    correct: 0,
    percentage: 0,
    isPassed: false,
  });

  const timerRef = useRef(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const res = await examApi.getExam(id);
        const data = res.data?.data || res.data;
        setExam(data);
        setTimeLeft((data.durationMinutes || 60) * 60);
      } catch (err) {
        navigate("/dashboard/exams/mock");
      } finally {
        setLoading(false);
      }
    };
    fetchExamDetails();
  }, [id, navigate]);

  useEffect(() => {
    if (!loading && exam && timeLeft > 0 && !showResult) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            calculateResult();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [loading, exam, showResult]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateResult = () => {
    setShowConfirmModal(false); // Close modal before showing results
    if (timerRef.current) clearInterval(timerRef.current);
    let earnedPoints = 0,
      totalPoints = 0,
      correctCount = 0;

    exam.questions.forEach((q, index) => {
      totalPoints += q.points || 1;
      if (selectedAnswers[index] === q.correctOptionIndex) {
        earnedPoints += q.points || 1;
        correctCount++;
      }
    });

    const percent = Math.round((earnedPoints / totalPoints) * 100);
    setResultStats({
      score: earnedPoints,
      total: totalPoints,
      correct: correctCount,
      percentage: percent,
      isPassed: percent >= (exam.passingScorePercentage || 80),
    });
    setShowResult(true);
  };

  if (loading) return <Processing />;

  if (showResult) {
    return (
      <div className="max-w-md mx-auto bg-surface rounded-[40px] border border-border/50 p-10 text-center shadow-2xl animate-in zoom-in duration-500">
        <div
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 ${resultStats.isPassed ? "bg-green-500/10" : "bg-red-500/10"}`}
        >
          {resultStats.isPassed ? (
            <Trophy className="text-green-500" size={40} />
          ) : (
            <AlertCircle className="text-red-500" size={40} />
          )}
        </div>
        <h2 className="text-5xl font-black text-text mb-2 tracking-tighter">
          {resultStats.percentage}%
        </h2>
        <p className="text-text/50 font-bold mb-8 uppercase tracking-widest text-xs">
          {resultStats.isPassed ? "Passed" : "Failed"} • {resultStats.score}/
          {resultStats.total} Points
        </p>
        <button
          onClick={() => navigate("/dashboard/exams/mock")}
          className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
        >
          Finish Review
        </button>
      </div>
    );
  }

  const currentQuestion = exam?.questions[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20 relative">
      
      {/* HUD */}
      <div className="flex items-center justify-between mb-10 bg-surface p-4 rounded-3xl border border-border/50 sticky top-4 z-20 backdrop-blur-md bg-opacity-80">
        <div
          className={`flex items-center gap-2 font-black ${timeLeft < 300 ? "text-red-500 animate-pulse" : "text-primary"}`}
        >
          <Clock size={18} />
          <span className="tabular-nums font-mono">{formatTime(timeLeft)}</span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-text/30">
          Q {currentIndex + 1} / {exam.questions.length}
        </div>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase hover:bg-primary hover:text-white transition-all"
        >
          Submit
        </button>
      </div>

      {/* QUESTION */}
      <div className="mb-12 animate-in slide-in-from-right duration-300">
        <h1 className="text-2xl md:text-3xl font-black text-text leading-tight">
          {currentQuestion.text}
        </h1>
      </div>

      {/* OPTIONS */}
      <div className="space-y-3">
        {currentQuestion.options.map((opt, i) => {
          const isSelected = selectedAnswers[currentIndex] === i;
          return (
            <button
              key={i}
              onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentIndex]: i })}
              className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/10"
                  : "bg-surface border-border/50 text-text hover:border-primary/20"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black mr-4 ${isSelected ? "bg-white/20" : "bg-background"}`}>
                {String.fromCharCode(65 + i)}
              </div>
              <span className="font-bold">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* FOOTER NAV */}
      <div className="flex items-center justify-between mt-12">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((c) => c - 1)}
          className="flex items-center gap-2 font-bold text-text/40 hover:text-primary disabled:opacity-0 transition-all"
        >
          <ChevronLeft size={20} /> Prev
        </button>
        <button
          onClick={() =>
            currentIndex < exam.questions.length - 1
              ? setCurrentIndex((c) => c + 1)
              : setShowConfirmModal(true)
          }
          className="px-8 py-4 bg-primary text-white rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          {currentIndex === exam.questions.length - 1 ? "Finish" : "Next"}{" "}
          <ChevronRight size={20} />
        </button>
      </div>

      {/* --- CUSTOM CONFIRMATION MODAL --- */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowConfirmModal(false)}
          />
          
          {/* Modal Card */}
          <div className="relative w-full max-w-sm bg-surface border border-border/50 rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <HelpCircle size={32} className="text-primary" />
            </div>
            
            <h3 className="text-xl font-black text-text text-center mb-2">
              Finish Exam?
            </h3>
            <p className="text-text/50 text-sm text-center mb-8 font-medium">
              You have answered {Object.keys(selectedAnswers).length} out of {exam.questions.length} questions. Are you sure you want to submit?
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={calculateResult}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Yes, Submit Now
              </button>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-4 bg-transparent text-text/40 font-black hover:text-text transition-all"
              >
                Continue Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockExamScreen;