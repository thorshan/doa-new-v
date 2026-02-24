import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Puzzle,
  Mic,
  Trophy,
  CheckCircle2,
  ChevronRight,
  FileText,
  ArrowRight,
} from "lucide-react";
import { chapterApi } from "../../../api/chapterApi";
import { progressApi } from "../../../api/progressApi";
import { useAuth } from "../../../hooks/useAuth";
import { useLanguage } from "../../../hooks/useLanguage";
import { translations } from "../../../constants/translations";
import Processing from "../../loaders/Processing";

const ChapterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [chapter, setChapter] = useState(null);
  const [chapterProgress, setChapterProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const levelTag = user?.level?.current || "N5";
        const [chapterRes, progressRes] = await Promise.all([
          chapterApi.getFullChapter(id),
          progressApi.getCourseProgress(levelTag),
        ]);
        setChapter(chapterRes?.data?.data);
        const specificProgress = (
          progressRes?.data?.data?.completedChapter || []
        ).find((ch) => ch.chapterId.toString() === id);
        setChapterProgress(specificProgress);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, user]);

  if (loading) return <Processing />;

  const modules = chapterProgress?.completedSection;
  const isPassed = chapterProgress?.isSectionCompleted;
  const score = chapterProgress?.score || 0;

  const handleMainAction = () => {
    const order = ["speaking", "grammar", "renshuuA", "renshuuB", "renshuuC"];
    const next = order.find((k) => !modules?.[k]);
    if (next) return navigate(`/dashboard/chapters/${id}/${next}`);
    navigate(`/dashboard/exams/${chapter?.exam?._id}`);
  };

  return (
    <div className="pb-20 animate-in fade-in duration-500">
      {/* COMPACT HERO BENTO */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="relative h-32 sm:h-48 rounded-[24px] sm:rounded-[40px] p-5 bg-gradient-to-br from-[#047e4b] to-[#16c47f] text-white flex flex-col justify-end overflow-hidden shadow-lg shadow-green-900/10">
          <span className="absolute -right-2 -bottom-4 text-7xl sm:text-[120px] font-black opacity-10 italic">
            文
          </span>
          <div className="relative z-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2">
              <Puzzle size={16} />
            </div>
            <h2 className="text-sm sm:text-xl font-black">
              {chapter?.grammars?.length || 0} Patterns
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative flex-1 rounded-[20px] sm:rounded-[32px] p-4 bg-gradient-to-br from-[#047e4b] to-[#16c47f] text-white flex flex-col justify-center overflow-hidden">
            <span className="absolute -right-1 -bottom-2 text-5xl font-black opacity-10">
              話
            </span>
            <Mic size={14} className="mb-1" />
            <p className="text-[10px] sm:text-xs font-black truncate">
              {chapter?.speaking[0]?.title || "Dialogue"}
            </p>
          </div>
          <div
            className={`relative flex-1 rounded-[20px] sm:rounded-[32px] p-4 text-white flex flex-col justify-center overflow-hidden transition-colors ${isPassed ? "bg-gradient-to-br from-[#d94c4c] to-[#ff7919]" : "bg-gradient-to-br from-[#047e4b] to-[#16c47f]"}`}
          >
            <span className="absolute -right-1 -bottom-2 text-5xl font-black opacity-10">
              試
            </span>
            {isPassed ? (
              <CheckCircle2 size={14} className="mb-1" />
            ) : (
              <Trophy size={14} className="mb-1" />
            )}
            <p className="text-[10px] sm:text-xs font-black truncate">
              {isPassed ? `${score}%` : chapter?.exam?.title}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-[28px] sm:rounded-[40px] border border-border/50 overflow-hidden mb-8">
        {[
          {
            key: "speaking",
            label: translations[language].s_speaking,
            icon: Mic,
            path: "speaking",
          },
          {
            key: "grammar",
            label: translations[language].s_grammar,
            icon: Puzzle,
            path: "grammar",
          },
          {
            key: "renshuuA",
            label: translations[language].renshuua,
            icon: FileText,
            path: "renshuuA",
          },
          {
            key: "renshuuB",
            label: translations[language].renshuub,
            icon: FileText,
            path: "renshuuB",
          },
          {
            key: "renshuuC",
            label: translations[language].renshuuc,
            icon: FileText,
            path: "renshuuC",
          },
        ].map((item) => {
          const isDone = modules?.[item.key];
          return (
            <button
              key={item.key}
              onClick={() =>
                navigate(`/dashboard/courses/chapters/${id}/${item.path}`)
              }
              className="w-full flex items-center p-4 border-b border-border/10 last:border-none hover:bg-primary/5 transition-all group"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 transition-all ${isDone ? "bg-green-500/10 text-green-500" : "bg-background text-text/20 group-hover:text-primary"}`}
              >
                {isDone ? <CheckCircle2 size={20} /> : <item.icon size={18} />}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-black text-text">{item.label}</p>
                <p className="text-[10px] font-bold text-text/30 uppercase">
                  {item.key}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="text-text/10 group-hover:text-primary"
              />
            </button>
          );
        })}
      </div>

      <button
        onClick={handleMainAction}
        className="w-full h-14 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-primary/30 active:scale-95 transition-all"
      >
        <span className="text-sm">
          {isPassed
            ? translations[language].review
            : translations[language].continue}
        </span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default ChapterDetails;
