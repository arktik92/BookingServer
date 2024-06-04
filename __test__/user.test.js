const request = require('supertest');
const app = require('../app');
const { sequelize} = require('../config/db.config');
let userToken;

async function createUserData() {
    return {
        email: 'test@example.com',
        password: "Test1234!",
        firstname: 'sancho',
        lastname: 'User',
        role: 'user',
        phoneNumber: '1234567890'
    };
}

beforeAll(async () => {
    await sequelize.sync({ force: true });
    const userData = await createUserData();
    await request(app).post('/auth/signup').send(userData);
    const userResponse = await request(app).post('/auth/signin').send({
        email: userData.email,
        password: userData.password
    })

    userToken = userResponse.body.token;
});

describe('User profile API tests', () => {

    describe('GET /api/users/currentuser', () => {
        it('Un utilisateur connecté peut voir son propre profil, son email, son prénom et son nom', async () => {
            const response = await request(app)
                .get('/api/users/currentuser')
                .set('Authorization', userToken);
    
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('email');
            expect(response.body).toHaveProperty('firstname');
            expect(response.body).toHaveProperty('lastname');
        })
    })

    describe('PUT /api/users/currentuser', () => {
        it('un utilisateur connecté peut modifier son nom , prenom', async () => {
            const updatedData = {
                firstname: 'Sanchez',
                lastname: 'Sanpoils',
                password: 'newP@ssw0rd'
            }

            const response = await request(app)
                .put('/api/users/currentuser')
                .set('Authorization', userToken)
                .send(updatedData);
            
            expect(response.status).toBe(200);
        })
    });
    
});

afterAll(async () => {
    await sequelize.close();
});
