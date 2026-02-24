import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  HelpCircle,
  ChevronRight,
  Award,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { examApi } from "../../../api/examApi";
import Processing from "../../loaders/Processing";

const MockExams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await examApi.getAllExams();
        const rawData = res.data?.data;

        if (Array.isArray(rawData)) {
          const filteredExams = rawData.filter(
            (exam) => exam.examType === "Mock JLPT",
          );
          setExams(filteredExams);
        }
      } catch (err) {
        console.error("Fetch Exams Error:", err.message);
        setError("Could not load exams. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return <Processing />;
  }

  return (
    <div className="px-6 md:px-20 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* BENTO HEADER CARD */}
      <div className="relative w-full max-w-4xl mx-auto mb-10 overflow-hidden rounded-[40px] p-8 md:p-12 bg-gradient-to-br from-primary to-indigo-600 shadow-2xl shadow-primary/20">
        {/* Decorative Background Icon */}
        <Award
          size={180}
          className="absolute -right-10 -top-10 text-white/10 rotate-12 pointer-events-none"
        />

        <div className="relative z-10">
          <p className="text-white/80 text-sm md:text-base font-bold tracking-widest uppercase">
            Available Exams
          </p>
          <h2 className="text-6xl md:text-8xl font-black text-white mt-2 tracking-tighter">
            {exams.length}
          </h2>
          <p className="text-white/60 text-sm md:text-base font-medium mt-6">
            Boost your JLPT score today
          </p>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black text-text tracking-tight">
          Ready to Start
        </h3>
        <button className="text-primary font-bold hover:underline">
          View All
        </button>
      </div>

      {/* EXAM LIST */}
      <div className="max-w-4xl mx-auto space-y-4">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <button
              key={exam._id}
              onClick={() => navigate(`/dashboard/exams/${exam._id}`)}
              className="w-full flex items-center p-5 bg-surface border border-border/50 rounded-[32px] hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 mr-5 transition-transform group-hover:scale-110">
                <FileText className="text-primary" size={24} />
              </div>

              {/* Info Area */}
              <div className="flex-1 text-left min-w-0">
                <h4 className="text-lg font-black text-text truncate pr-4">
                  {exam.title}
                </h4>
                <div className="flex items-center gap-6 mt-1">
                  <span className="flex items-center gap-1.5 text-text/50 text-xs font-bold uppercase tracking-wider">
                    <Clock size={14} /> {exam.durationMinutes || 0} min
                  </span>
                  <span className="flex items-center gap-1.5 text-text/50 text-xs font-bold uppercase tracking-wider">
                    <HelpCircle size={14} /> {exam?.questions?.length || 0} Qs
                  </span>
                </div>
              </div>

              {/* Action Arrow */}
              <div className="p-2 rounded-xl bg-background text-text/20 group-hover:text-primary transition-all">
                <ChevronRight size={20} />
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-surface/30 rounded-[40px] border border-dashed border-border/50">
            <AlertCircle className="w-10 h-10 text-text/20 mb-4" />
            <p className="text-text/40 font-bold text-lg">
              No mock exams found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockExams;
