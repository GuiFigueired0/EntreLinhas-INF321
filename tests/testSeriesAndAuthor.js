const { makeRequest } = require('./makeRequest');

async function testCreateSeries() {
  const seriesData = {
    series_id: 1,
    name: 'Epic Fantasy',
    description: 'A thrilling series about exploration and discovery.',
    books: [1, 2, 3],
  };

  await makeRequest('POST', '/series', seriesData);
}

async function testFindSeriesById() {
  const seriesId = 1;

  await makeRequest('GET', `/series/find/${seriesId}`);
}

async function testCreateAuthor() {
  const payload = {
    author_id: 1,
    name: 'John Doe',
    description: 'An author known for his thrilling novels.',
    books: [1, 2, 3],
    image_url: 'https://example.com/images/john_doe.jpg',
  };

  await makeRequest('POST', '/author', payload);
}

async function testFindAuthorById() {
  const authorId = 1;
  
  await makeRequest('GET', `/author/find/${authorId}`);
}

(async function runTests() {
  console.log('Starting Series and Author tests...');

  await testCreateSeries();
  await testFindSeriesById();

  await testCreateAuthor();
  await testFindAuthorById();

  console.log('Series and Author tests completed.');
})();
