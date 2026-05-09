import { useState, useMemo } from 'react';
import BookList from '../Components/BookList';
import { GENRES, STATUSES } from '../Interfaces/Book';

const SORT_OPTIONS = [
  { value: 'newest', label: 'En Yeni' },
  { value: 'oldest', label: 'En Eski' },
  { value: 'title', label: 'Başlık (A-Z)' },
  { value: 'rating', label: 'Puana Göre' },
];

const StatCard = ({ label, value, color }) => (
  <div className={`${color} rounded-xl p-4 text-center`}>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm opacity-80 mt-0.5">{label}</p>
  </div>
);

const HomePage = ({ books, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [sort, setSort] = useState('newest');

  const stats = useMemo(() => ({
    total: books.length,
    read: books.filter((b) => b.status === 'okundu').length,
    reading: books.filter((b) => b.status === 'okunuyor').length,
    toRead: books.filter((b) => b.status === 'okunacak').length,
  }), [books]);

  const filtered = useMemo(() => {
    let result = [...books];
    if (search) result = result.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    );
    if (filterStatus) result = result.filter((b) => b.status === filterStatus);
    if (filterGenre) result = result.filter((b) => b.genre === filterGenre);
    if (sort === 'newest') result.sort((a, b) => b.id - a.id);
    if (sort === 'oldest') result.sort((a, b) => a.id - b.id);
    if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [books, search, filterStatus, filterGenre, sort]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Toplam Kitap" value={stats.total} color="bg-indigo-100 text-indigo-800" />
        <StatCard label="Okundu" value={stats.read} color="bg-green-100 text-green-800" />
        <StatCard label="Okunuyor" value={stats.reading} color="bg-blue-100 text-blue-800" />
        <StatCard label="Okunacak" value={stats.toRead} color="bg-yellow-100 text-yellow-800" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Kitap veya yazar ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Tüm Durumlar</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Tüm Türler</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {filtered.length !== books.length && (
        <p className="text-sm text-gray-500 mb-3">{filtered.length} kitap bulundu</p>
      )}

      <BookList books={filtered} onEdit={onEdit} onDelete={onDelete} />
    </main>
  );
};

export default HomePage;
