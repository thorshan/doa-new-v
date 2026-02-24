import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Play, Lock, CheckCircle2, Trophy } from "lucide-react";

import Processing from "../../loaders/Processing";
import { useAuth } from "../../../hooks/useAuth";
import { useLanguage } from "../../../hooks/useLanguage";
import { chapterApi } from "../../../api/chapterApi";
import { progressApi } from "../../../api/progressApi";
import { translations } from "../../../constants/translations";

const Course = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [chapters, setChapters] = useState([]);
  const [courseProgress, setCourseProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (isRefreshing = false) => {
    if (!user?.level?.current) return;
    isRefreshing ? setRefreshing(true) : setLoading(true);

    try {
      const levelTag = user?.level.current;
      const [chapterRes, progressRes] = await Promise.all([
        chapterApi.getChapters(levelTag),
        progressApi.getCourseProgress(levelTag),
      ]);
      setChapters(chapterRes?.data.data || []);
      setCourseProgress(progressRes.data.data);
    } catch (err) {
      console.error("Fetch Course Data Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.level?.current]);

  const stats = useMemo(() => {
    const passedChapterIds = new Set(
      courseProgress?.completedChapter
        ?.filter((ch) => ch.isSectionCompleted)
        .map((ch) => ch.chapterId.toString()) || [],
    );

    const total = chapters.length;
    const completed = passedChapterIds.size;
    const percentage =
      total > 0 ? Math.min(Math.round((completed / total) * 100), 100) : 0;
    const nextChapter = chapters.find(
      (ch) => !passedChapterIds.has(ch._id.toString()),
    );

    let currentChapterName = "Start Learning";
    if (total > 0 && completed === total) {
      currentChapterName = "Level Complete! 🎉";
    } else if (nextChapter) {
      currentChapterName =
        translations[language].chapter + ` ${nextChapter.index || ""}`;
    }

    return {
      percentage,
      total,
      completed,
      passedChapterIds,
      currentChapterName,
    };
  }, [chapters, courseProgress, language]);

  const handlePressChapter = (chapterId, isLocked) => {
    if (isLocked) {
      alert("Finish previous chapter test to unlock.");
      return;
    }
    navigate(`/dashboard/courses/chapters/${chapterId}`);
  };

  if (loading && !refreshing) return <Processing />;

  return (
    <div className="pb-24">
      {/* PROGRESS OVERVIEW (Bento) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {/* Main Progress Card - Now occupies 1 column on mobile, 3 on desktop */}
        <div className="col-span-1 md:col-span-3 h-32 sm:h-44 rounded-[24px] sm:rounded-[40px] p-4 sm:p-8 bg-gradient-to-br from-[#047e4b] to-[#16c47f] text-white flex flex-col justify-between shadow-lg shadow-green-900/10">
          <div>
            <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-70">
              {translations[language].current_chapter}
            </p>
            <h2 className="text-sm sm:text-2xl font-black mt-0.5 leading-tight truncate">
              {stats.currentChapterName}
            </h2>
          </div>
          <div>
            <div className="flex justify-between items-end mb-1">
              <span className="text-lg sm:text-3xl font-black">
                {stats.percentage}%
              </span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Card - Occupies 1 column on mobile, 2 on desktop */}
        <div className="col-span-1 md:col-span-2 h-32 sm:h-44 rounded-[24px] sm:rounded-[40px] p-4 sm:p-8 bg-surface border border-border/50 flex flex-col justify-between">
          <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-text/30">
            {translations[language].chapters}
          </p>
          <div>
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-5xl font-black text-text">
                {stats.completed}
              </span>
              <span className="text-xs sm:text-xl font-bold text-text/30 ml-0.5">
                /{stats.total}
              </span>
            </div>
            <p className="text-[8px] sm:text-xs font-bold text-text/50 uppercase tracking-wide">
              {translations[language].completed}
            </p>
          </div>
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-black text-text mb-4 flex items-center gap-2 px-1">
        <Trophy size={18} className="text-primary" />
        {translations[language].table_content}
      </h3>
      {/* CHAPTER LIST */}
      <div className="bg-surface rounded-[32px] sm:rounded-[40px] border border-border/50 overflow-hidden shadow-sm">
        {chapters.map((chapter, idx) => {
          const isPassed = stats.passedChapterIds.has(chapter._id.toString());
          const isFirstChapter = idx === 0;
          const previousChapterPassed =
            idx > 0 &&
            stats.passedChapterIds.has(chapters[idx - 1]._id.toString());
          const isLocked = !isFirstChapter && !previousChapterPassed;

          return (
            <button
              key={chapter._id}
              onClick={() => handlePressChapter(chapter._id, isLocked)}
              className={`w-full group flex items-center justify-between p-4 sm:p-6 transition-all border-b border-border/20 last:border-none ${
                isLocked
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-primary/5 active:bg-primary/10"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                {/* Icon Box */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all ${
                    isPassed
                      ? "bg-green-500/10 text-green-500"
                      : isLocked
                        ? "bg-text/5 text-text/20"
                        : "bg-primary/10 text-primary"
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 size={20} className="sm:w-6 sm:h-6" />
                  ) : isLocked ? (
                    <Lock size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <Play size={18} className="sm:w-5 sm:h-5 fill-current" />
                  )}
                </div>

                {/* Text Info */}
                <div className="text-left truncate">
                  <p
                    className={`font-black text-[10px] sm:text-xs uppercase tracking-tighter mb-0.5 ${isLocked ? "text-text/20" : "text-text/40"}`}
                  >
                    {translations[language].chapter} {chapter.index || idx + 1}
                  </p>
                  <p
                    className={`font-bold text-sm sm:text-lg truncate ${isLocked ? "text-text/20" : "text-text"}`}
                  >
                    {chapter.title || `Chapter ${chapter.index || idx + 1}`}
                  </p>
                </div>
              </div>

              {!isLocked && (
                <ChevronRight
                  size={18}
                  className="text-text/10 group-hover:text-primary transition-all group-hover:translate-x-1 shrink-0 ml-2"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Course;
