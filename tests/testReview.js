const { makeRequest, login } = require('./makeRequest');

async function testCreate(data) {
  return await makeRequest('POST', '/reviews', data);
}

async function testFindById(id) {
  return await makeRequest('GET', `/reviews/find/${id}`);
}

async function testFindBookReviews(id) {
  return await makeRequest('GET', `/reviews/book/${id}`);
}

async function testFindUserReviews(id) {
  return await makeRequest('GET', `/reviews/user/${id}`);
}

async function testUpdate(id, data) {
  return await makeRequest('PUT', `/reviews/update/${id}`, data);
}

async function testDelete(id) {
  return await makeRequest('DELETE', `/reviews/delete/${id}`);
}

(async () => {
  console.log('Starting Review tests...');

  const user = await login({
    email: 'test1@test.com',
    password: 'test',
  });
  const book = await makeRequest('GET', `/books/find/1`, null, false);

  let bookStateData = {
    user: user._id,
    book: book._id,
    state: 'Read',
  };
  const bookState = await makeRequest('POST', '/book-states/mark', bookStateData, false);

  const reviewData = {
    user: user._id,
    book: book._id,
    rating: 4,
    title: "Perfection!!!",
    text: "My favorite book so far this year!",
  };
  let review = await testCreate(reviewData);
  
  await testFindBookReviews(book._id);
  await testUpdate(review._id, { rating: 5 });
  await testFindUserReviews(user._id);
  return;
  await testFindById(review._id);
  await testDelete(review._id);

  review = await testCreate(reviewData);
  await makeRequest('DELETE', `/book-states/delete/${bookState._id}`);
  await testFindUserReviews(user._id, book._id);
  
  console.log('Review tests completed.');
})();
