import { useState } from 'react';
import TrackDetails from './TrackDetails';

const SongRow = ({ song, playingSongId, setPlayingSongId }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const rowBgClass = isExpanded ? "bg-blue-100 font-medium" : "bg-white hover:bg-gray-50";

    return (
        <>

            <tr 
                onClick={() => setIsExpanded(!isExpanded)}
                className={`border-b border-gray-200 cursor-pointer text-sm text-gray-800 transition-colors ${rowBgClass}`}
            >
                <td className="px-4 py-4 text-center text-gray-400">
                    <svg 
                        className={`w-4 h-4 mx-auto transition-transform ${isExpanded ? 'rotate-180 text-blue-500' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </td>
                <td className="px-4 py-4 text-center font-bold">{song.sequenceIndex}</td>
                <td className="px-4 py-4">{song.title}</td>
                <td className="px-4 py-4">{song.artist}</td>
                <td className="px-4 py-4 text-gray-500">{song.album}</td>
                <td className="px-4 py-4">{song.genre}</td>
            </tr>
            

            {isExpanded && (
                <tr className="bg-white border-b border-gray-200">
                    <td colSpan="6" className="p-0">
                        <TrackDetails
                            key={song.id || song.sequenceIndex}
                            song={song}
                            playingSongId={playingSongId}
                            setPlayingSongId={setPlayingSongId}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};

export default SongRow;