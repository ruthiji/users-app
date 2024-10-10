const request = require('supertest');
const {app, server} = require('../index');
const { INTEGER } = require('sequelize');
let userId;

describe ('test users endpoints', () => {
   
test('It should create a new user', async () => {
  const expectedUser = {
    name :'John Doe',
  isManager : 'true',
  isActive :'false',
  };
   const  response = await request (app).post ('/api/users').send({name: expectedUser.name, isManager: expectedUser.isManager, isActive: expectedUser.isActive});
  expect(response.body.name).toEqual(expectedUser.name);
  expect(response.statusCode).toBe(200);
  userId = response.body.id;
  console.log('existing values:', userId);
});

test('It should update user', async () => {
    const updatedUser = {
      name :'Jahn',
      isManager : 'true',
      isActive :'false',

    };
     const  response = await request (app).put (`/api/users/${userId}`).send({name: updatedUser.name, isManager: updatedUser.isManager, isActive: updatedUser.isActive});
     console.log('existing values:', updatedUser);
     console.log ('comparevalues:', response.body);
     expect(response.body.name).toEqual(updatedUser.name);
      expect(response.statusCode).toBe(200);
 });

  test('It should delete user', async () => {
    const  response = await request (app).delete (`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
    console.log(userId);

   });
  })


afterAll(done => {
  // Closing the connection allows Jest to exit successfully.
  server.close()
  done()
})
