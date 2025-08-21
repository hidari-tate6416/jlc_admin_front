import React from "react";

export default function Index() {
  return (
    <div className="absolute w-full h-full max-h-screen z-20 gap-6 bg-white bg-opacity-80 transition-opacity animate-scale-out-center" role="status" aria-live="polite">
      <div className="flex justify-center items-center h-full" aria-label="読み込み中">
        <div className="animate-ping h-4 w-4 bg-blue rounded-full"></div>
      </div>
    </div>
  );
};