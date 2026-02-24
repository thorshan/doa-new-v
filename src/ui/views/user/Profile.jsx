import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Edit3,
  Flame,
  School,
  Check,
  Award,
  X,
  Target,
  ArrowLeft,
} from "lucide-react";
import { AVATAR } from "../../avatar";
import { useLanguage } from "../../../hooks/useLanguage";
import { userApi } from "../../../api/userApi";
import { examApi } from "../../../api/examApi";
import { translations } from "../../../constants/translations";
import Processing from "../../loaders/Processing";

const LEVEL_ORDER = ["Basic", "N5", "N4", "N3", "N2", "N1", "Business"];

const Profile = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [allExams, setAllExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingLevel, setIsEditingLevel] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [pendingLevel, setPendingLevel] = useState("");
  const [prereqName, setPrereqName] = useState("");

  const fetchData = async () => {
    try {
      const [userRes, examRes] = await Promise.all([
        userApi.getUserData(),
        examApi.getAllExams(),
      ]);
      setUserData(userRes.data);
      setAllExams(examRes.data);
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const levelData = useMemo(
    () => ({
      currentIdx: LEVEL_ORDER.indexOf(userData?.level?.current),
      passed: userData?.level?.passed ?? [],
    }),
    [userData],
  );

  const handleLevelChoice = (level) => {
    if (level === userData?.level?.current || levelData.passed.includes(level))
      return;

    const targetIdx = LEVEL_ORDER.indexOf(level);
    const pName = targetIdx > 0 ? LEVEL_ORDER[targetIdx - 1] : LEVEL_ORDER[0];

    setPendingLevel(level);
    setPrereqName(pName);
    setShowLevelModal(true);
  };

  const startTest = () => {
    const foundExam = allExams.find(
      (e) =>
        e.examType === "Level Test" &&
        (e.title?.includes(prereqName) || e.level?.code === prereqName),
    );

    const examId = foundExam?._id;
    const prereqId = foundExam?.level?.$oid || foundExam?.level;

    if (!prereqId) {
      alert(`Assessment for ${prereqName} not found.`);
      return;
    }

    setShowLevelModal(false);
    navigate(`/dashboard/exams/LevelTest`, {
      state: { targetLevel: pendingLevel, levelId: prereqId, examId },
    });
  };

  if (loading) return <Processing />;

  return (
    <div className="px-6 md:px-20 pb-24 animate-in fade-in duration-700">
      {/* Navigation Header */}
      <div className="flex items-center justify-between py-6 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text/50 hover:text-primary group"
        >
          <ArrowLeft size={18} />
          <span className="text-xs font-bold">
            {translations[language].go_back}
          </span>
        </button>
        <button
          onClick={() => navigate(`/${userData?._id}/profile/edit`)}
          className="p-3 bg-primary/10 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all"
        >
          <Edit3 size={20} />
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="relative p-2 border-4 border-primary/10 rounded-full mb-4">
          <img
            src={AVATAR[userData?.avatarId || 1]}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-contain bg-surface"
          />
        </div>
        <h2 className="text-3xl font-black text-text leading-tight">
          {userData?.name}
        </h2>
        <p className="text-text/40 font-bold text-xs mt-1">
          @{userData?.username}
        </p>
      </div>

      {/* Proficiency Bento Card */}
      <div className="bg-surface rounded-[40px] border border-border/50 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-text tracking-tight">
              Proficiency Goal
            </h3>
            <p className="text-sm font-bold text-text/40">
              Current: {userData?.level?.current}
            </p>
          </div>
          <button
            onClick={() => setIsEditingLevel(!isEditingLevel)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              isEditingLevel
                ? "bg-text text-background"
                : "bg-primary text-white shadow-lg shadow-primary/20"
            }`}
          >
            {isEditingLevel ? translations[language].cancel : "Level Up"}
          </button>
        </div>

        {/* Level Path */}
        <div className="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar">
          {LEVEL_ORDER.map((lvl) => {
            const isCurrent = lvl === userData?.level?.current;
            const isPassed = levelData.passed.includes(lvl);

            return (
              <div key={lvl} className="flex flex-col items-center shrink-0">
                <button
                  disabled={!isEditingLevel}
                  onClick={() => handleLevelChoice(lvl)}
                  className={`
                    w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-300
                    ${
                      isCurrent
                        ? "bg-primary text-white shadow-xl shadow-primary/30"
                        : isPassed
                          ? "bg-primary/10 text-primary"
                          : "bg-background text-text/20"
                    }
                    ${isEditingLevel && !isCurrent && !isPassed ? "border-2 border-dashed border-primary animate-pulse cursor-pointer hover:bg-primary/5" : ""}
                  `}
                >
                  {isPassed && !isCurrent ? (
                    <Check size={24} />
                  ) : (
                    <span className="font-black text-sm">
                      {lvl === "Business" ? "B" : lvl}
                    </span>
                  )}
                </button>
                <span
                  className={`text-[10px] font-black mt-3 uppercase tracking-tighter ${isCurrent ? "text-primary" : "text-text/30"}`}
                >
                  {lvl}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface p-8 rounded-[40px] flex flex-col items-center border border-border/50">
          <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4 text-orange-500">
            <Flame size={24} />
          </div>
          <span className="text-2xl font-black text-text">
            {userData?.stats?.streak || 0}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-text/30 mt-1">
            Day Streak
          </span>
        </div>
        <div className="bg-surface p-8 rounded-[40px] flex flex-col items-center border border-border/50">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
            <School size={24} />
          </div>
          <span className="text-2xl font-black text-text">
            {userData?.stats?.lessonsCompleted || 0}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-text/30 mt-1">
            Lessons
          </span>
        </div>
      </div>

      {/* Unlock Level Modal Overlay */}
      {showLevelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-surface border border-border/50 rounded-[40px] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Award size={40} />
            </div>
            <h3 className="text-2xl font-black text-text mb-2">
              Unlock {pendingLevel}
            </h3>
            <p className="text-text/50 text-sm font-medium leading-relaxed mb-8">
              To reach {pendingLevel}, you must pass the{" "}
              <span className="text-primary font-bold">{prereqName}</span>{" "}
              assessment to prove your skills.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={startTest}
                className="w-full py-5 bg-primary text-white rounded-[24px] font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Start {prereqName} Test
              </button>
              <button
                onClick={() => setShowLevelModal(false)}
                className="w-full py-4 text-text/30 font-black hover:text-text transition-all"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
