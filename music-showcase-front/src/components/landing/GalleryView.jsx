import { useEffect, useRef } from 'react';
import GalleryCard from './GalleryCard';

const GalleryView = ({ songs, setPage, isLoading, playingSongId, setPlayingSongId }) => {
  const sentinelRef = useRef(null);
  const hasRequestedRef = useRef(false);
  useEffect(() => {
    if (!isLoading) {
      hasRequestedRef.current = false;
    }
  }, [isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (
        entry.isIntersecting &&
        !isLoading &&
        !hasRequestedRef.current
      ) {
        hasRequestedRef.current = true;
        setPage(prev => prev + 1);
      }
    }, { rootMargin: '300px' });

    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [isLoading, setPage]);

  return (
    <div className="w-full px-7 py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs.map((song) => (
          <GalleryCard
            key={`${song.sequenceIndex}-${song.trackSeed}`}
            song={song}
            playingSongId={playingSongId}
            setPlayingSongId={setPlayingSongId}
          />
        ))}
      </div>

      <div ref={sentinelRef} className="w-full flex justify-center py-12">
        {isLoading && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        )}
      </div>
    </div>
  );
};

export default GalleryView;