const { makeRequest } = require('./makeRequest')

async function testCreateBook(bookData) {
  await makeRequest('POST', '/books', bookData);
}

async function testFindByGenre() {
  const genre = 'Fantasy & Paranormal';
  const page = 2;
  const limit = 2;

  await makeRequest('GET', `/books/genre/${genre}?page=${page}&limit=${limit}`);
}

async function testFindById() {
  const bookId = 1;

  await makeRequest('GET', `/books/find/${bookId}`);
}

async function testSearchByTitle() {
  const partialTitle = 'the';
  const page = 2;
  const limit = 2;

  await makeRequest('GET', `/books/search/${partialTitle}?page=${page}&limit=${limit}`);
}

async function testFindSimilarBooks() {
  const bookId = 3;

  await makeRequest('GET', `/books/similar/${bookId}`);
}

(async () => {
  console.log('Starting Book tests...');

  const bookData = {
    book_id: 2,
    series_id: 1,
    series_number: 2,
    series_name: 'Epic Fantasy',
    title: 'The Second Adventure',
    author_id: 1,
    author_name: 'John Doe',
    publisher: 'Fictional Press',
    description: 'An epic tale of adventure.',
    num_pages: 400,
    publication_day: 3,
    publication_month: 6,
    publication_year: 2021,
    image_url: 'https://images.gr-assets.com/books/1333287305m/13571772.jpg',
    similar_books: [2, 3],
    genre: 'Fantasy & Paranormal',
    ratings_per_star: {
      1: 10,
      2: 26,
      3: 42,
      4: 52, 
      5: 40,
    }
  };

  await testCreateBook(bookData);
  return;
  await testFindByGenre();
  await testFindById();
  await testSearchByTitle();
  await testFindSimilarBooks();
  
  console.log('Book tests completed.');
})();