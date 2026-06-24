import { useState, useEffect, useRef } from 'react';
import { MusicEngine } from '../../utils/MusicEngine';

export default function GalleryCard({ song, playingSongId, setPlayingSongId }) {
  const isPlaying = playingSongId === (song.id || song.sequenceIndex);
  const engineRef = useRef(null);


  const generateCoverBg = (seed) => {
    const s = seed || 12345;
    const hue1 = s % 360;
    const hue2 = (s * 31) % 360;
    return `linear-gradient(${s % 180}deg, hsl(${hue1}, 75%, 45%), hsl(${hue2}, 65%, 35%))`;
  };

  useEffect(() => {
    const songId = song.id || song.sequenceIndex;
    const seed = song.trackSeed || song.sequenceIndex * 12345;
    engineRef.current = new MusicEngine(seed);

    return () => {
      if (engineRef.current) engineRef.current.dispose();
      setPlayingSongId(current => current === songId ? null : current);
    };
  }, [song, setPlayingSongId]);

  const togglePlay = async (e) => {
    e.stopPropagation();
    const songId = song.id || song.sequenceIndex;

    if (isPlaying) {
      engineRef.current.stop();
      setPlayingSongId(null);
    } else {
      MusicEngine.stopAll();
      await engineRef.current.play();
      setPlayingSongId(songId);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-all group relative">
      <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
        #{song.sequenceIndex}
      </span>


      <div 
        style={{ background: generateCoverBg(song.trackSeed) }}
        className="w-full aspect-square flex flex-col justify-between p-4 text-white relative overflow-hidden shrink-0 select-none"
      >
        <span className="text-[9px] uppercase tracking-widest font-black bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded self-end z-10">
          {song.genre}
        </span>

        <div className="z-10 drop-shadow-md">
          <h4 className="font-black text-lg leading-tight line-clamp-2 uppercase">
            {song.album || "Single"}
          </h4>
          <p className="text-xs opacity-90 truncate mt-0.5">{song.artist}</p>
        </div>


        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={togglePlay}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-105 text-white ${
              isPlaying ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {isPlaying ? (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="1"/></svg>
            ) : (
              <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>
        </div>
      </div>


      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-base truncate">{song.title}</h3>
          <p className="text-xs text-gray-400 mt-1 italic line-clamp-2">
            {song.reviewText || "No description available for this track."}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 text-xs">
          <span className="text-gray-500 font-semibold flex items-center gap-1">
            {song.likes}
          </span>
          {isPlaying && (
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-3 bg-blue-500 animate-[bounce_1s_infinite_100ms]"></span>
              <span className="w-0.5 h-1.5 bg-blue-500 animate-[bounce_1s_infinite_300ms]"></span>
              <span className="w-0.5 h-2.5 bg-blue-500 animate-[bounce_1s_infinite_200ms]"></span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}