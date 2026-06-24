const ControlPanel = ({ params, setSeed, setPage, setLikes, setLang, viewMode, setViewMode }) => {
    const handleRandomize = () => {
        const randomSeed = Math.floor(Math.random() * 100000000);
        setSeed(randomSeed);
        setPage(1);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-xs">
            <div className="flex items-center gap-14 py-1 px-4">

                <div className="flex flex-col border border-gray-300 rounded-md px-3 py-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider">Language</label>
                    <select 
                        value={params.lang}
                        onChange={(e) => {setLang(e.target.value); setPage(1);}}
                        className="text-sm text-gray-800 focus:outline-none bg-transparent cursor-pointer w-32 appearance-none"
                    >
                        <option value="en_US">English (US)</option>
                        <option value="de_DE">German (DE)</option>
                    </select>
                </div>


                <div className="flex flex-col border border-gray-300 rounded-md px-3 py-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider">Seed</label>
                    <div className="flex items-center justify-between w-36">
                        <input 
                            type="number"
                            value={params.seed}
                            onChange={(e) => {setSeed(Number(e.target.value)); setPage(1);}}
                            className="text-sm text-gray-800 focus:outline-none bg-transparent w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button onClick={handleRandomize} className="text-gray-400 hover:text-black transition-colors" title="Random Seed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>
                            </svg>
                        </button>
                    </div>
                </div>


                <div className="flex flex-col px-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Likes: {params.likes}</label>
                    <input 
                        type="range" min="0" max="10" step="0.1"
                        value={params.likes}
                        onChange={(e) => setLikes(Number(e.target.value))}
                        className="w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>


            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white shadow-xs">
                <button 
                    onClick={() => setViewMode('table')}
                    className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/><line x1="15" y1="9" x2="15" y2="21"/>
                    </svg>
                </button>
                <button 
                    onClick={() => setViewMode('gallery')}
                    className={`p-2 transition-colors ${viewMode === 'gallery' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;