const { makeRequest, login } = require('./makeRequest');

async function testGetUserFeed(id) {
  return await makeRequest('GET', `/activity/user/${id}`);
}

async function testGetFeed(id) {
  return await makeRequest('GET', `/activity/feed/${id}`);
}

(async () => {
  console.log('Starting Activity tests...');

  const userData2 = { 
    email: 'test@test.com', 
    password: 'test', 
  }
  const userData3 = { 
    email: 'test1@test.com', 
    password: 'test', 
  }
  const user1 = await login();
  const user2 = await login(userData2);
  const user3 = await login(userData3);
  const id1 = user1._id, id2 = user2._id, id3 = user3._id;
  const book1 = await makeRequest('GET', `/books/find/1`, null, false);
  const book2 = await makeRequest('GET', `/books/find/2`, null, false);

  const connection1 = await makeRequest('POST', '/connections', { follower: id1, user: id2 }, false);
  const connection2 = await makeRequest('POST', '/connections', { follower: id1, user: id3 }, false);

  let bookStateData1 = {
    user: id2,
    book: book1._id,
    state: 'Currently Reading',
  };
  let bookStateData2 = {
    user: id3,
    book: book2._id,
    state: 'Currently Reading',
  };
  const bookState1 = await makeRequest('POST', '/book-states/mark', bookStateData1, false);
  const bookState2 = await makeRequest('POST', '/book-states/mark', bookStateData2, false);

  const readingHistoryData = {
    user: id2,
    book: book1._id,
    num_pages: book1.num_pages,
    progress: book1.num_pages,
    comment: "I loved this book!",
  };
  await makeRequest('POST', '/reading-history', readingHistoryData, false);

  const reviewData = {
    user: id2,
    book: book1._id,
    rating: 5,
    text: "My favorite book so far this year!",
  };
  await makeRequest('POST', '/reviews', reviewData, false);

  await testGetFeed(id1);
  let feed = await testGetUserFeed(id2);

  await makeRequest('DELETE', `/book-states/delete/${bookState1._id}`, null, false);
  await makeRequest('DELETE', `/book-states/delete/${bookState2._id}`, null, false);

  await makeRequest('DELETE', `/connections/delete/${connection1._id}`, null, false);
  await makeRequest('DELETE', `/connections/delete/${connection2._id}`, null, false);

  console.log('Activity tests completed.');
})();
