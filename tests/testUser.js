const { makeRequest, login } = require('./makeRequest');

async function testFindById(userId) {
  await makeRequest('GET', `/user/find/${userId}`);
}

async function testUpdateById(userId, updatedData) {
  await makeRequest('PUT', `/user/update/${userId}`, updatedData);
}

(async () => {
  console.log('Starting User tests...');

  const user = await login();
  const updatedData = {
    name: 'Updated Name',
    quote: 'This is my updated quote!',
  };

  await testFindById(user._id);
  await testUpdateById(user._id, updatedData);

  console.log('User tests completed.');
})();
