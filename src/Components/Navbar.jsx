const Navbar = ({ onAddClick }) => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          <h1 className="text-lg font-semibold">Kitaplığım</h1>
        </div>
        <button
          onClick={onAddClick}
          className="bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-lg hover:bg-emerald-600 transition text-sm"
        >
          + Ekle
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
