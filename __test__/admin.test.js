const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../config/db.config');
let adminToken;

async function createAdminData() {
    return {
        email: 'test@example.com',
        password: "Test1234!",
        firstname: 'sancho',
        lastname: 'User',
        role: 'admin',
        phoneNumber: '1234567890'
    };
}


beforeAll(async () => {
    await sequelize.sync({ force: true });
    const adminData = await createAdminData();
    await request(app).post('/auth/signup').send(adminData);
    const response = await request(app)
        .post('/auth/signin') 
        .send({
            email: adminData.email,
            password: adminData.password
        });

    adminToken = response.body.token;
})

describe('Admin API tests', () => {

    describe('GET /api/users', () => {
        it('an admin can see all users', async () => {
            const response = await request(app)
                .get('/api/users')
                .set('Authorization', adminToken);
    
            expect(response.status).toBe(200);
        });
    });

    describe('POST /api/users', () => {
        it('an admin can create a new user', async () => {
            const user = {
                email: 'test@example.com',
                password: "Test1234!",
                firstname: 'sancho',
                lastname: 'User',
                role: 'user',
                phoneNumber: '1234567890'
            }

            const response = await request(app)
                .post('/api/users')
                .set('Authorization', adminToken)
                .send(user);

            expect(response.status).toBe(200);
        });
    });
});

afterAll(async () => {
    await sequelize.close();
});