export default function Pagination({ currentPage, setPage }) {
  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  return (
    <div className="flex items-center justify-center gap-1 py-6 bg-white border-t border-gray-100 rounded-b-lg">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
      >
        «
      </button>

      {currentPage > 1 && (
        <button
          onClick={() => setPage(currentPage - 1)}
          className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded transition-colors"
        >
          {currentPage - 1}
        </button>
      )}

      <button
        className="px-3 py-1 text-sm bg-blue-500 text-white font-medium rounded-sm shadow-sm"
      >
        {currentPage}
      </button>

      <button
        onClick={() => setPage(currentPage + 1)}
        className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded transition-colors"
      >
        {currentPage + 1}
      </button>
    </div>
  );
}