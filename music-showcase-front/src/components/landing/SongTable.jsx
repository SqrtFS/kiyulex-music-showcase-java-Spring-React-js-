import SongRow from './SongRow';

const SongTable = ({ songs , playingSongId, setPlayingSongId }) => {
    return (
        <div className="w-full bg-white">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b-2 border-black text-xs font-bold text-gray-800 tracking-wider">
                        <th className="w-12 px-4 py-3 text-center"></th>
                        <th className="px-4 py-3 text-center w-16">#</th>
                        <th className="px-4 py-3 w-1/4">Song</th>
                        <th className="px-4 py-3 w-1/4">Artist</th>
                        <th className="px-4 py-3 w-1/4">Album</th>
                        <th className="px-4 py-3 w-1/6">Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {songs && songs.map((song) => (
                        <SongRow key={song.trackSeed || song.sequenceIndex} song={song} playingSongId={playingSongId} setPlayingSongId={setPlayingSongId} />
                    ))}
                </tbody>
            </table>
            
            {(!songs || songs.length === 0) && (
                <div className="text-center py-10 text-gray-500">
                    Loading songs...
                </div>
            )}
        </div>
    );
};

export default SongTable;