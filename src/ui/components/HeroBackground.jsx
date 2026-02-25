import React from "react";
import { useTheme } from "../../hooks/useTheme";

const HeroBackground = () => {
  const { theme } = useTheme();
  const primary = "#047e4b";
  const lightPrimary = "#047e4b";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient
            id="centerCore"
            cx="50%"
            cy="50%"
            r="75%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Floating Japanese characters (gentle upward drift) */}
        {Array.from({ length: 32 }).map((_, i) => (
          <text
            key={i}
            x={80 + (i % 12) * 88 + (i % 5) * 12}
            y={620 + Math.floor(i / 12) * -95}
            fontSize={11 + (i % 6)}
            fill={lightPrimary}
            opacity="0.68"
            stroke="none"
            className="jp-particle"
            style={{
              animationDelay: `-${i * 0.65}s`,
            }}
          >
            {
              [
                "あ",
                "い",
                "う",
                "え",
                "お",
                "か",
                "き",
                "く",
                "け",
                "こ",
                "さ",
                "し",
                "す",
                "せ",
                "そ",
                "日本",
                "言語",
                "勉強",
                "漢字",
                "ひらがな",
                "カタカナ",
                "ありがとう",
                "こんにちは",
                "すみません",
                "はい",
                "いいえ",
                "先生",
                "学生",
                "練習",
                "会話",
                "文法",
                "単語",
              ][i % 64]
            }
          </text>
        ))}

        {/* ================= CENTRAL BUBBLE – NIHONGO CORE ================= */}
        <g filter="url(#glow)">
          <circle
            cx="600"
            cy="350"
            r="132"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeOpacity="0.09"
          />
          <circle
            cx="600"
            cy="350"
            r="98"
            fill="url(#centerCore)"
            className="core-pulse"
          />
          <circle cx="600" cy="350" r="71" fill="#047e4b" />
          <text
            x="600"
            y="338"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="58"
            fontWeight="800"
            fill="#ffffff"
            stroke="none"
            letterSpacing="-2"
          >
            日本語
          </text>
          <text
            x="600"
            y="388"
            textAnchor="middle"
            fontSize="14"
            fill={theme === "dark" ? "#efefef" : "#081d2a"}
            stroke="none"
            letterSpacing="6"
            fontWeight="600"
          >
            NIHONGO BY DOA
          </text>
        </g>

        {/* ================= INDEPENDENT BUBBLES ONLY (NO CONNECTION LINES) ================= */}

        {/* 1. Hiragana – Top Left */}
        <g transform="translate(400,200)" filter="url(#glow)">
          <g className="node float">
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fontSize="31"
              fill="#047e4b"
              stroke="none"
              fontWeight="700"
            >
              ひらがな
            </text>
            <text
              x="0"
              y="35"
              textAnchor="middle"
              fontSize="10.5"
              fill={lightPrimary}
              stroke="none"
            >
              HIRAGANA
            </text>
          </g>
        </g>

        {/* 2. Katakana – Top Right */}
        <g transform="translate(800,165)" filter="url(#glow)">
          <g className="node float delay-1">
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fontSize="29"
              fill="#047e4b"
              stroke="none"
              fontWeight="700"
            >
              カタカナ
            </text>
            <text
              x="0"
              y="35"
              textAnchor="middle"
              fontSize="10.5"
              fill={lightPrimary}
              stroke="none"
            >
              KATAKANA
            </text>
          </g>
        </g>

        {/* 3. Kanji – Mid Left */}
        <g transform="translate(385,385)" filter="url(#glow)">
          <g className="node float delay-2">
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fontSize="34"
              fill="#047e4b"
              stroke="none"
              fontWeight="700"
            >
              漢字
            </text>
            <text
              x="0"
              y="36"
              textAnchor="middle"
              fontSize="10.5"
              fill={lightPrimary}
              stroke="none"
            >
              KANJI
            </text>
          </g>
        </g>

        {/* 4. Conversation – Bottom Right */}
        <g transform="translate(850,350)" filter="url(#glow)">
          <g className="node float delay-3">
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fontSize="26"
              fill="#047e4b"
              stroke="none"
              fontWeight="700"
            >
              会話
            </text>
            <text
              x="0"
              y="35"
              textAnchor="middle"
              fontSize="10.5"
              fill={lightPrimary}
              stroke="none"
            >
              CONVERSATION
            </text>
          </g>
        </g>

        {/* 5. Vocabulary & Grammar – Bottom Left */}
        <g transform="translate(700,530)" filter="url(#glow)">
          <g className="node float delay-4">
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fontSize="23"
              fill="#047e4b"
              stroke="none"
              fontWeight="700"
            >
              単語・文法
            </text>
            <text
              x="0"
              y="35"
              textAnchor="middle"
              fontSize="10"
              fill={lightPrimary}
              stroke="none"
            >
              VOCAB + GRAMMAR
            </text>
          </g>
        </g>
      </svg>

      <style jsx>{`
        .node {
          transform-origin: center;
        }
        .node-draw {
          stroke-dasharray: 340;
          stroke-dashoffset: 340;
          animation: nodeDraw 2.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
        @keyframes nodeDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .float {
          animation: floatNode 6s ease-in-out infinite;
        }
        .float.delay-1 {
          animation-delay: 0.4s;
        }
        .float.delay-2 {
          animation-delay: 1.1s;
        }
        .float.delay-3 {
          animation-delay: 2.3s;
        }
        .float.delay-4 {
          animation-delay: 3.6s;
        }

        @keyframes floatNode {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-19px) scale(1.04);
          }
        }

        .core-pulse {
          animation: corePulse 3.8s ease-in-out infinite;
        }
        @keyframes corePulse {
          0%,
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.12);
          }
        }

        .jp-particle {
          animation: jpDrift 19s linear infinite;
          font-family: system-ui, sans-serif;
        }
        @keyframes jpDrift {
          0% {
            transform: translateY(120px) translateX(0);
            opacity: 0.25;
          }
          15% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-720px) translateX(18px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroBackground;
