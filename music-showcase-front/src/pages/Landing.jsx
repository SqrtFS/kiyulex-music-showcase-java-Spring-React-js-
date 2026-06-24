import ControlPanel from "../components/landing/ControlPanel";
import SongTable from "../components/landing/SongTable";
import SongGallery from "../components/landing/SongGallery";
import Pagination from "../components/landing/Pagination";
import { useState, useEffect } from 'react';

export default function Landing() {
  const [seed, setSeed] = useState(12345);
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState(0.0);
  const [lang, setLang] = useState('en_US');
  const [playingSongId, setPlayingSongId] = useState(null);
  const [songs, setSongs] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  useEffect(() => {
    setPage(1);
    window.scrollTo({ top: 0 });
  }, [seed, likes, lang, viewMode]);

  useEffect(() => {
    let active = true;

    const fetchSongs = async () => {
      try {
        const url = `${API_URL}/showcase?seed=${seed}&page=${page}&likes=${likes}&lang=${lang}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (!active) return;

        if (viewMode === 'gallery' && page > 1) {
          setSongs(prev => [...prev, ...data]);
        } else {
          setSongs(data); 
        }
      } catch (error) {
        console.error("Error receiving data:", error);
      }
    };

    fetchSongs();

    return () => {
      active = false;
    };
  }, [seed, page, likes, lang, viewMode]);

  useEffect(() => {
    if (viewMode !== 'gallery') return;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  return (
    <div className="Landing-page bg-linear-to-b from-gray-50 to-gray-100 min-h-screen">
      <ControlPanel 
        params={{ seed, page, likes, lang }} 
        setSeed={setSeed} 
        setPage={setPage} 
        setLikes={setLikes} 
        setLang={setLang} 
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      {viewMode === 'table' ? (
        <>
          <SongTable 
            songs={songs} 
            playingSongId={playingSongId}
            setPlayingSongId={setPlayingSongId}
          />
          <Pagination 
            currentPage={page} 
            setPage={setPage} 
          />
        </>
      ) : (
        <SongGallery 
          songs={songs} 
          playingSongId={playingSongId}
          setPlayingSongId={setPlayingSongId}
        />
      )}
    </div>
  );
}