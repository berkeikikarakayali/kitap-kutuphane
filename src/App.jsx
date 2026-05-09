import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import BookForm from './Components/BookForm';
import HomePage from './Pages/HomePage';
import { createBook } from './Interfaces/Book';
import './index.css';

const STORAGE_KEY = 'kitap-kutuphane';

function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const handleAdd = (form) => {
    const newBook = createBook(form.title, form.author, form.genre, form.pages, form.status, form.rating);
    setBooks((prev) => [newBook, ...prev]);
    setShowForm(false);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleUpdate = (form) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === editingBook.id
          ? { ...b, ...form, pages: Number(form.pages), rating: Number(form.rating) }
          : b
      )
    );
    setEditingBook(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Silmek istediğine emin misin?')) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar onAddClick={() => setShowForm(true)} />
      <div className="flex-1">
        <HomePage books={books} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <footer className="text-center text-xs text-gray-400 py-4">
        Berke İkikarakayalı — Web Geliştirme Projesi
      </footer>
      {showForm && (
        <BookForm
          onSubmit={editingBook ? handleUpdate : handleAdd}
          onCancel={handleCancel}
          editingBook={editingBook}
        />
      )}
    </div>
  );
}

export default App;
