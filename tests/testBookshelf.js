const { makeRequest, login } = require('./makeRequest');

async function testCreate(userId, name) {
  const bookshelfData = {
    owner: userId,
    name: name,
  };

  return await makeRequest('POST', '/bookshelf', bookshelfData);
}

async function testfindById(bookshelfId) {
  return await makeRequest('GET', `/bookshelf/find/${bookshelfId}`);
}

async function testAddBook(bookshelf_id, book_id) {
  const data = { bookshelf_id, book_id }

  await makeRequest('POST', '/bookshelf/add-book', data);
}

async function testRemoveBook(bookshelf_id, book_id) {
  const data = { bookshelf_id, book_id }

  await makeRequest('POST', '/bookshelf/remove-book', data);
}

async function testDeleteBookshelf(bookshelfId) {
  await makeRequest('DELETE', `/bookshelf/delete/${bookshelfId}`);
}

async function testSaveBookshelf(user_id, bookshelf_id) {
  const data = { user_id, bookshelf_id };

  await makeRequest('POST', '/bookshelf/save', data);
}

async function testFindByOwner(owner) {
  await makeRequest('GET', `/bookshelf/owner/${owner}`);
}

async function testGetBooks(bookshelfId) {
  await makeRequest('GET', `/bookshelf/books/${bookshelfId}`);
}

async function testGetBookshelvesInfo(bookshelf_ids) {
  await makeRequest('POST', '/bookshelf/info', { bookshelf_ids });
}

(async () => {
  console.log('Starting bookshelf tests...');

  const userData2 = { 
    email: 'test@test.com', 
    password: 'test', 
  }
  const user1 = await login();
  let user2 = await login(userData2);
  const bookshelf1 = await testCreate(user1, 'My Favorite Books');
  const bookshelf2 = await testCreate(user1, '2025 TBR');
  const id1 = bookshelf1._id;
  const id2 = bookshelf2._id;

  await testfindById(id1);
  await testAddBook(id1, 1);
  await testGetBooks(id1);
  await testFindByOwner(user1._id);
  await testSaveBookshelf(user2._id, id1);
  user2 = await login(userData2);
  console.log('Bookshelf saved ID:', user2.bookshelves)
  await testGetBookshelvesInfo([id1, id2]);
  
  await testRemoveBook(id1, 1);
  await testDeleteBookshelf(id1);
  await testDeleteBookshelf(id2);

  console.log('Bookshelf tests completed.');
})();
