import BookCard from './BookCard';

const BookList = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-5xl mb-4">📖</p>
        <p className="text-lg font-medium">Henüz kitap eklenmedi</p>
        <p className="text-sm mt-1">Yukarıdaki butona tıklayarak ilk kitabını ekle!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BookList;
