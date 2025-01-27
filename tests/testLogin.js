const { makeRequest } = require('./makeRequest')

async function testRegister() {
  const loginData = {
    email: 'test1@test.com',
    password: 'test',
    name: 'Test Name',
    username: 'teste002',
  };

  await makeRequest('POST', '/login/register', loginData);
}

async function testLogin() {
  const loginData = {
    email: 'testemail@gmail.com',
    password: '123456',
  };

  await makeRequest('POST', '/login/login', loginData);
}

async function testLogout() {
  await makeRequest('GET', '/login/logout');
}

(async () => {
  console.log('Starting Login tests...');

  await testRegister();
  await testLogin();
  await testLogout();
  
  console.log('Login tests completed.');
})();