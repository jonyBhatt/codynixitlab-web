import React, { useEffect } from 'react';

type Props = { onFinish?: () => void };

const LoadingScreen: React.FC<Props> = ({ onFinish }) => {
  useEffect(() => {
    const t = setTimeout(() => onFinish && onFinish(), 1400);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm loading-screen">
      <div className="flex flex-col items-center gap-6">
        <img src="/src/assets/logo-trns.png" alt="logo" className="w-32 h-32 object-contain loading-logo" />
        <div className="loader-ring">
          <svg viewBox="0 0 50 50" className="w-12 h-12">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
