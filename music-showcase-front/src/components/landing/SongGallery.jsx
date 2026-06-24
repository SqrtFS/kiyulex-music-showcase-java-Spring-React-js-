import { useEffect, useRef } from 'react';
import { MusicEngine } from '../../utils/MusicEngine';

const GalleryCard = ({ song, playingSongId, setPlayingSongId }) => {
  const isPlaying = playingSongId === (song.id || song.sequenceIndex);
  const engineRef = useRef(null);

  useEffect(() => {
    const songId = song.id || song.sequenceIndex;
    const seed = song.trackSeed || song.sequenceIndex * 12345;
    engineRef.current = new MusicEngine(seed);

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose();
      }
      setPlayingSongId((currentPlayingId) => {
        if (currentPlayingId === songId) return null;
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

  const hue = (song.trackSeed || 0) % 360;

  return (
    <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-200 flex flex-col justify-between group">
      <div 
        style={{ background: `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${(hue + 40) % 360}, 60%, 40%))` }}
        className="relative w-full aspect-square rounded-lg p-3 text-white flex flex-col justify-between mb-3 shadow-inner overflow-hidden"
      >
        <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded self-end z-10">
          {song.genre}
        </span>
        
        <div className="z-10">
          <h4 className="font-black text-base truncate uppercase">{song.album}</h4>
          <p className="text-xs opacity-80 truncate">{song.artist}</p>
        </div>

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
           <button onClick={togglePlay} className="w-15 h-15 rounded-full text-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center ">
                {isPlaying ? (
                  <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z" />
                  </svg>
                ) : (
                  <svg className="w-full h-full fill-current rounded-3xl" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                )}
              </button>
        </div>
      </div>
      
      <h3 className="font-bold text-gray-900 truncate text-sm">{song.title}</h3>
      <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
        <span>#{song.sequenceIndex}</span>
        <span className="text-gray-600 font-medium">Likes {song.likes}</span>
      </div>
    </div>
  );
};

export default function SongGallery({ songs, playingSongId, setPlayingSongId }) {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {songs.map((song) => (
        <GalleryCard 
          key={`${song.sequenceIndex}-${song.trackSeed}`} 
          song={song} 
          playingSongId={playingSongId}
          setPlayingSongId={setPlayingSongId}
        />
      ))}
    </div>
  );
}