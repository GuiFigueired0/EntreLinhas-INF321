const { makeRequest, login } = require('./makeRequest');

async function testMark(data) {
  return await makeRequest('POST', '/book-states/mark', data);
}

async function testDelete(id) {
  return await makeRequest('DELETE', `/book-states/delete/${id}`);
}

async function testfindById(id) {
  return await makeRequest('GET', `/book-states/find/${id}`);
}

async function testfindUserState(user, state) {
  return await makeRequest('GET', `/book-states/user-state/${user}/${state}`);
}

(async () => {
  console.log('Starting BookState tests...');

  const user1 = await login();
  const book1 = await makeRequest('GET', `/books/find/1`, null, false);
  const book2 = await makeRequest('GET', `/books/find/2`, null, false);

  let bookStateData = {
    user: user1._id,
    book: book1._id,
    state: 'Want to Read',
  };

  const bookState1 = await testMark(bookStateData);
  bookStateData.book = book2._id;
  let bookState2 = await testMark(bookStateData);
  bookStateData.state = 'Currently Reading'
  bookState2 = await testMark(bookStateData);
  
  await testfindUserState(user1._id, 'Want to Read');
  await testfindById(bookState2._id);

  await testDelete(bookState1._id);
  await testDelete(bookState2._id);
  
  console.log('BookState tests completed.');
})();
