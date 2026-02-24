import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Gauge,
  Volume2,
  CheckCircle2,
  Square,
} from "lucide-react";

import { chapterApi } from "../../../api/chapterApi";
import { progressApi } from "../../../api/progressApi";
import { useAuth } from "../../../hooks/useAuth";
import Processing from "../../loaders/Processing";
import { CHARACTERS } from "../../character";

// --- Visualizer Component ---
const AudioVisualizer = ({ color }) => (
  <div className="flex items-center gap-0.5 h-3">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="w-0.5 bg-current rounded-full animate-bounce"
        style={{
          backgroundColor: color,
          animationDuration: `${0.4 + i * 0.1}s`,
        }}
      />
    ))}
  </div>
);

const SpeakingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isSlowMode, setIsSlowMode] = useState(false);

  // Video States
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  // Refs for Players
  const videoRef = useRef(null);
  const audioRef = useRef(new Audio());
  const isAutoPlayingRef = useRef(false);

  // --- Data Loading ---
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const levelTag = user?.level?.current || "N5";
        const [chapterRes, progressRes] = await Promise.all([
          chapterApi.getFullChapter(id),
          progressApi.getCourseProgress(levelTag),
        ]);

        setChapter(chapterRes.data.data);
        const allChapters = progressRes?.data?.data?.completedChapter || [];
        const specificProgress = allChapters.find(
          (ch) => ch.chapterId.toString() === id,
        );

        if (specificProgress?.completedSection?.speaking) setIsCompleted(true);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, [id, user]);

  // --- Audio Sequence Logic ---
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (isAutoPlayingRef.current && playingIndex !== null) {
        const nextIndex = playingIndex + 1;
        if (nextIndex < sortedLines.length) {
          setTimeout(() => playAudio(nextIndex), 600);
        } else {
          stopPlayback();
        }
      } else {
        setPlayingIndex(null);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [playingIndex, chapter]);

  // --- Handlers ---
  const playAudio = (index) => {
    const line = sortedLines[index];
    if (!line?.audioUrl) return;

    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }

    setPlayingIndex(index);
    audioRef.current.src = line.audioUrl;
    audioRef.current.playbackRate = isSlowMode ? 0.85 : 1.0;
    audioRef.current.play();
  };

  const stopPlayback = () => {
    audioRef.current.pause();
    isAutoPlayingRef.current = false;
    setIsAutoPlaying(false);
    setPlayingIndex(null);
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      stopPlayback();
    } else {
      isAutoPlayingRef.current = true;
      setIsAutoPlaying(true);
      playAudio(0);
    }
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    stopPlayback();
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
      setIsVideoFinished(false);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const speakingSection = chapter?.speaking?.[0] || chapter?.speaking;
  const sortedLines = useMemo(() => {
    if (!speakingSection?.lines) return [];
    return [...speakingSection.lines].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );
  }, [speakingSection]);

  const speakerSides = useMemo(() => {
    const sides = {};
    let currentSide = "left";
    sortedLines.forEach((line) => {
      const name = line.speaker.nameJa;
      if (!sides[name]) {
        sides[name] = currentSide;
        currentSide = currentSide === "left" ? "right" : "left";
      }
    });
    return sides;
  }, [sortedLines]);

  if (loading) return <Processing />;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* VIDEO CONTAINER */}
        <div className="relative aspect-video w-full rounded-[32px] overflow-hidden bg-black mb-8 shadow-xl">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={() => {
              setIsVideoFinished(true);
              setIsVideoPlaying(false);
            }}
            src="https://vidplay.io/stream/lXUlsfD21VMuAsedEAu8Ag"
          />
          <button
            onClick={toggleVideo}
            className="absolute inset-0 flex items-center justify-center bg-black/20 group transition-all"
          >
            {!isVideoPlaying && (
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white ring-4 ring-white/30">
                {isVideoFinished ? (
                  <RotateCcw size={32} />
                ) : (
                  <Play size={32} fill="currentColor" />
                )}
              </div>
            )}
          </button>
        </div>

        {/* CHAT MESSAGES */}
        <div className="space-y-6">
          {sortedLines.map((line, index) => {
            const isLeft = speakerSides[line.speaker.nameJa] === "left";
            const isPlayingBubble = playingIndex === index;

            return (
              <div
                key={index}
                className={`flex gap-3 animate-in slide-in-from-bottom-4 duration-500 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={CHARACTERS[line.speaker.nameJa] || [0]}
                    alt="avatar"
                  />
                </div>

                <button
                  onClick={() => playAudio(index)}
                  className={`max-w-[75%] p-4 rounded-[24px] text-left transition-all border outline-none
                    ${
                      isLeft
                        ? "bg-surface border-border/50 rounded-tl-none"
                        : "bg-primary border-primary text-white rounded-tr-none shadow-lg shadow-primary/20"
                    } ${isPlayingBubble ? "ring-4 ring-primary/10 scale-[1.02]" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${isLeft ? "text-primary" : "text-white/60"}`}
                    >
                      {line.speaker.nameJa}
                    </span>
                    {isPlayingBubble && (
                      <AudioVisualizer
                        color={isLeft ? "var(--primary)" : "white"}
                      />
                    )}
                  </div>

                  <p className="text-lg font-bold leading-snug mb-2">
                    {line.textJa}
                  </p>

                  <div
                    className={`h-px w-full my-3 ${isLeft ? "bg-black/5" : "bg-white/20"}`}
                  />

                  <p
                    className={`text-xs leading-relaxed font-medium ${isLeft ? "text-text/60" : "text-white/80"}`}
                  >
                    {line.textMn}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent flex gap-4">
        <button
          onClick={toggleAutoPlay}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg
            ${isAutoPlaying ? "bg-red-500 text-white animate-pulse" : "bg-primary/10 text-primary hover:bg-primary/20"}`}
        >
          {isAutoPlaying ? (
            <Square size={24} fill="currentColor" />
          ) : (
            <Volume2 size={24} />
          )}
        </button>

        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`flex-1 h-16 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl
            ${isCompleted ? "bg-green-500 text-white" : "bg-primary text-white shadow-primary/30 active:scale-95"}`}
        >
          {isCompleted ? <CheckCircle2 size={22} /> : null}
          {isCompleted ? "Completed" : "Mark as Done"}
        </button>
      </div>
    </div>
  );
};

export default SpeakingPage;
