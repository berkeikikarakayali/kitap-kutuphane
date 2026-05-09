const Navbar = ({ onAddClick }) => {
  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <h1 className="text-xl font-bold tracking-tight">Kitap Kütüphanem</h1>
        </div>
        <button
          onClick={onAddClick}
          className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
        >
          + Kitap Ekle
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
