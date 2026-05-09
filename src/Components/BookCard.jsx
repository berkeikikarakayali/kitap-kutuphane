const statusStyles = {
  okundu: 'bg-green-100 text-green-700',
  okunuyor: 'bg-blue-100 text-blue-700',
  okunacak: 'bg-yellow-100 text-yellow-700',
};

const statusLabels = {
  okundu: 'Okundu',
  okunuyor: 'Okunuyor',
  okunacak: 'Okunacak',
};

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ))}
  </div>
);

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-lg leading-tight truncate">{book.title}</h3>
          <p className="text-gray-500 text-sm mt-0.5">{book.author}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${statusStyles[book.status]}`}>
          {statusLabels[book.status]}
        </span>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span className="bg-gray-100 px-2 py-0.5 rounded">{book.genre}</span>
        {book.pages > 0 && <span>{book.pages} sayfa</span>}
      </div>

      {book.rating > 0 && <StarRating rating={book.rating} />}

      <div className="flex gap-2 mt-auto pt-2 border-t border-gray-100">
        <button
          onClick={() => onEdit(book)}
          className="flex-1 text-indigo-600 border border-indigo-200 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-50 transition"
        >
          Düzenle
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="flex-1 text-red-600 border border-red-200 py-1.5 rounded-lg text-sm font-medium hover:bg-red-50 transition"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default BookCard;
