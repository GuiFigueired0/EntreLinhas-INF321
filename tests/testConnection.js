const { makeRequest, login } = require('./makeRequest');

async function testCreateConnection(follower, user) {
  return await makeRequest('POST', '/connections', { follower, user });
}

async function testFindUserConnections(followerId) {
  return await makeRequest('GET', `/connections/user/${followerId}`);
}

async function testFindFollowers(userId) {
  return await makeRequest('GET', `/connections/followers/${userId}`);
}

async function testDeleteConnection(connectionId) {
  return await makeRequest('DELETE', `/connections/delete/${connectionId}`);
}

(async () => {
  console.log('Starting connection tests...');

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
  let user3 = await login(userData3);
  const id1 = user1._id, id2 = user2._id, id3 = user3._id;

  console.log('User3 before creating connections:', user3);

  const connection1 = await testCreateConnection(id3, id1);
  const connection2 = await testCreateConnection(id1, id3);
  const connection3 = await testCreateConnection(id2, id3);

  await testFindUserConnections(id1);
  await testFindFollowers(id3);

  user3 = await login(userData3)
  console.log('User3 after creating connections:', user3);

  await testDeleteConnection(connection1._id);
  await testDeleteConnection(connection2._id);
  await testDeleteConnection(connection3._id);

  user3 = await login(userData3)
  console.log('User3 after deleting the created connections:', user3);

  console.log('Connection tests completed.');
})();
