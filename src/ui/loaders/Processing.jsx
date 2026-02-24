import React from "react";

const Processing = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center transition-colors duration-300">
      {/* logo with pulse animation */}
      <div className="relative mb-8 animate-pulse">
        <img
          src="/assets/logo.png"
          alt="doa logo"
          className="h-24 w-24 md:h-32 md:w-32 object-contain"
        />
        {/* spinner ring around logo */}
        <div className="absolute inset-[-10px] border-4 border-transparent border-t-primary rounded-full animate-spin" />
      </div>

      {/* processing text */}
      <div className="flex flex-col items-center gap-2 px-4">
        {/* removed uppercase and adjusted tracking */}
        <h2 className="text-xl md:text-2xl font-black text-text animate-pulse text-center">
          Processing<span className="text-primary"> ...</span>
        </h2>

        <p className="text-[10px] md:text-xs font-bold text-text/40 tracking-widest text-center">
          Preparing your Japanese journey
        </p>
      </div>

      {/* progress bar background */}
      <div className="mt-10 w-48 h-[2px] bg-border rounded-full overflow-hidden">
        {/* actual progress fill */}
        <div className="h-full bg-primary animate-progress-loading" />
      </div>

      <style>{`
        @keyframes progress-loading {
          0% { width: 0%; transform: translateX(-100%); }
          100% { width: 100%; transform: translateX(0); }
        }
        .animate-progress-loading {
          animation: progress-loading 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Processing;
