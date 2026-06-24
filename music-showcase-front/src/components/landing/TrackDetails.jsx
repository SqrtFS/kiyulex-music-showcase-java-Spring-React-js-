import { useState, useEffect, useRef } from 'react';
import {MusicEngine} from '../../utils/MusicEngine';

export default function TrackDetails({ song, playingSongId, setPlayingSongId }) {
const isPlaying = playingSongId === (song.id || song.sequenceIndex);
  const engineRef = useRef(null);

  const defaultLyrics = song.lyrics || [
    "Every beat reminds me of you, tearing me apart",
    "In the million suns that shine, you're the brightest star",
    "At the break of dawn, you're all I want, no matter how far",
    "",
    "Oh Melanie, I try to move on",
    "But the rhythm of your heart keeps playing this song..."
  ].join("\n");

  useEffect(() => {
    const songId = song.id || song.sequenceIndex;
    const seed = song.trackSeed || song.sequenceIndex * 12345;
    engineRef.current = new MusicEngine(seed);

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose();
      }
      

      setPlayingSongId((currentPlayingId) => {
        if (currentPlayingId === songId) {
          return null;
        }
        return currentPlayingId;
      });
    };
  }, [song, setPlayingSongId]);

 const togglePlay = async () => {
  if (!engineRef.current) return;

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
    <div className="bg-[#f8fafc] p-6 flex gap-8 border-t border-b border-blue-100 animate-fadeIn text-left">
      
      <div className="flex flex-col items-center gap-3">
        <div className="w-36 h-36 bg-amber-500 text-amber-950 font-black p-3 rounded shadow-md flex flex-col justify-between uppercase tracking-tighter select-none">
          <div className="text-sm border-b-2 border-amber-950 pb-1 leading-none font-sans">
            {song.album || "GET SCHWIFTY!"}
          </div>
          <div className="text-[11px] leading-tight text-right font-mono self-end bg-amber-950 text-amber-400 px-1 rounded">
            {song.artist || "AARON AARONSON"}
          </div>
        </div>

        <button className="flex items-center gap-1.5 bg-[#e7f3ff] text-[#1877f2] px-3 py-1 rounded-full text-xs font-semibold hover:bg-[#dbecfe] transition-colors shadow-xs">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M5 21h3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2zM21 10a2 2 0 0 0-2-2h-4V4.31a2.11 2.11 0 0 0-1.8-2 2 2 0 0 0-2.2 2V9.58L8.29 13.3a1 1 0 0 0-.29.71V19a2 2 0 0 0 2 2h6.31a3 3 0 0 0 2.87-2.18l2.54-7.61A2 2 0 0 0 21 11v-1z"/>
          </svg>
          <span>{song.likes}</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900">{song.title}</h3>
            
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-xs border border-gray-100">
              <button onClick={togglePlay} className="text-blue-500 hover:text-blue-600 transition-colors w-6 h-6 flex items-center justify-center">
                {isPlaying ? (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                )}
              </button>
              
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
              </svg>
              
              <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/3 h-full rounded-full"></div>
              </div>
              
              <span className="text-[10px] bg-gray-500 text-white font-mono px-1.5 py-0.5 rounded-sm">2:12</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            from <span className="text-gray-800 font-medium">{song.album || "Unknown Album"}</span> by <span className="text-gray-800 font-medium">{song.artist}</span>
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {song.publisher || "Apple Records"}, {song.year || "2019"}
          </p>
        </div>

        <div className="mt-4">
          <span className="inline-block bg-white text-xs border border-gray-200 border-b-0 text-gray-600 px-3 py-1 rounded-t-md font-medium shadow-xs">
            Lyrics
          </span>
          
          <div className="bg-white border border-gray-200 rounded-b-md rounded-re-md p-4 max-h-32 overflow-y-auto shadow-inner text-gray-600 italic font-serif text-sm leading-relaxed whitespace-pre-line custom-scrollbar">
            {defaultLyrics}
          </div>
        </div>

      </div>

    </div>
  );
}