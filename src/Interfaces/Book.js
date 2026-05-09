export const createBook = (title, author, genre, pages, status, rating) => ({
  id: Date.now(),
  title,
  author,
  genre,
  pages: Number(pages),
  status,
  rating: Number(rating),
  createdAt: new Date().toISOString(),
});

export const GENRES = [
  'Roman',
  'Bilim Kurgu',
  'Fantastik',
  'Tarih',
  'Biyografi',
  'Kişisel Gelişim',
  'Polisiye',
  'Korku',
  'Felsefe',
  'Diğer',
];

export const STATUSES = [
  { value: 'okundu', label: 'Okundu' },
  { value: 'okunuyor', label: 'Okunuyor' },
  { value: 'okunacak', label: 'Okunacak' },
];
