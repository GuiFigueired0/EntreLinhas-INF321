const { makeRequest, login } = require('./makeRequest');

async function testCreate(data) {
  return await makeRequest('POST', '/reading-history', data);
}

async function testFindBookHistory(user, book) {
  await makeRequest('GET', `/reading-history/find/${user}/${book}`);
}

async function testDelete(id) {
  await makeRequest('DELETE', `/reading-history/delete/${id}`);
}

(async () => {
  console.log('Starting ReadingHistory tests...');

  const user1 = await login();
  const book1 = await makeRequest('GET', `/books/find/1`, null, false);
  const data = {
    user: user1._id,
    book: book1._id,
    num_pages: book1.num_pages,
    progress: 150,
    comment: "I'm loving this book!",
  };

  let bookStateData = {
    user: user1._id,
    book: book1._id,
    state: 'Currently Reading',
  };
  const bookState1 = await makeRequest('POST', '/book-states/mark', bookStateData, false);

  await testCreate(data);
  data.progress = 200;
  const readingHistory = await testCreate(data);
  data.progress = book1.num_pages;
  await testCreate(data);
  
  await makeRequest('GET', `/book-states/find/${bookState1._id}`);
  await testDelete(readingHistory._id);
  await testFindBookHistory(user1._id, book1._id);

  await makeRequest('DELETE', `/book-states/delete/${bookState1._id}`);
  await testFindBookHistory(user1._id, book1._id);
  
  console.log('ReadingHistory tests completed.');
})();
