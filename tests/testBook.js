const { makeRequest } = require('./makeRequest')

async function testCreateBook() {
  const bookData = {
    book_id: 3,
    series_id: 1,
    series_number: 3,
    series_name: 'Epic Fantasy',
    title: 'The Third Adventure',
    authors: [1],
    author_name: 'John Doe',
    publisher: 'Fictional Press',
    description: 'An epic tale of adventure.',
    num_pages: 300,
    publication_day: 3,
    publication_month: 6,
    publication_year: 2021,
    image_url: 'http://example.com/book.jpg',
    similar_books: [1, 2],
    genre: 'Fantasy & Paranormal',
  };

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

  await testCreateBook();
  await testFindByGenre();
  await testFindById();
  await testSearchByTitle();
  await testFindSimilarBooks();
  
  console.log('Book tests completed.');
})();