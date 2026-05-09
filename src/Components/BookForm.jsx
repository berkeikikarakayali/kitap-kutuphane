import { useState, useEffect } from 'react';
import { GENRES, STATUSES } from '../Interfaces/Book';

const emptyForm = {
  title: '',
  author: '',
  genre: 'Roman',
  pages: '',
  status: 'okunacak',
  rating: '0',
};

const BookForm = ({ onSubmit, onCancel, editingBook }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title,
        author: editingBook.author,
        genre: editingBook.genre,
        pages: String(editingBook.pages),
        status: editingBook.status,
        rating: String(editingBook.rating),
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;
    onSubmit(form);
    setForm(emptyForm);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {editingBook ? 'Kitabı Güncelle' : 'Yeni Kitap Ekle'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kitap Adı *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Kitap adını girin"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Yazar *</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              placeholder="Yazar adını girin"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tür</label>
              <select
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sayfa Sayısı</label>
              <input
                name="pages"
                type="number"
                min="1"
                value={form.pages}
                onChange={handleChange}
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Puan (0-5)</label>
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                value={form.rating}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              {editingBook ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
