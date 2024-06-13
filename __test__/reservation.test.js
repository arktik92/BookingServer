const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../config/db.config');
let token;
let adminToken;
let reservationSourceId;

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

async function createAdminData() {
    return {
        email: 'admin@test.com',
        password: 'Admin1234!',
        firstname: 'admin',
        lastname: 'admin',
        role: 'admin',
        phoneNumber: '1234567890' 
    }
}
const roomData = {
    "name": "terrasse"    
};

const spotData = {
    name: "Soleil",
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
};

const reservationData = {
    reservation: { 
        numberOfCustomer: 4,
        date: new Date(),
        name: "stephanie",
        note: "sunshine",
        status: 1
    }
}


beforeAll(async () => {
    await sequelize.sync({ force: true });
    
    const userData = await createUserData();
    await request(app).post('/auth/signup').send(userData);

    const adminData = await createAdminData();
    await request(app).post('/auth/signup').send(adminData)

    const response = await request(app).post('/auth/signin').send({
        email: 'test@example.com',
        password: 'Test1234!'
    });

    const adminResponse = await request(app).post('/auth/signin').send({
        email: 'admin@test.com',
        password: 'Admin1234!'
    });

    token = response.body.token;
    adminToken = adminResponse.body.token;
    await request(app).post('/api/rooms').set('Authorization', adminToken).send(roomData);
    await request(app).post('/api/spots').set('Authorization', adminToken).send(spotData);
    const reservationSource = await request(app).post('/api/reservations').set('Authorization', token).send(reservationData)

    reservationSourceId = reservationSource.body.reservationData.id;
});

describe('Reservation API Integration Tests', () => {

    describe('GET /api/reservations/userreservations', () => {
        it('should not allow unauthorized access', async () => {
            const response = await request(app).get('/api/reservations/userreservations');
            expect(response.status).toBe(401);
        });

        it('should allow authorized access and show reservations', async () => {
            const response = await request(app)
                .get('/api/reservations/userreservations')
                .set('Authorization', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('reservations');
        });
    });

    describe('POST /api/reservations', () => {
        it('should deny reservation creation without authentication', async () => {
            const reservationData = {
                numberOfCustomer: 4,
                date: "2023-09-26T09:12:18.345Z",
                name: "stephanie",
                note: "sunshine",
                status: 1,
                spotId: 1
            };
            const response = await request(app).post('/api/reservations').send(reservationData);
            expect(response.status).toBe(401);
        });

        it('should allow authenticated users to create reservations', async () => {
            const reservationData = {
                numberOfCustomer: 4,
                date: "2023-09-26T09:12:18.345Z",
                name: "stephanie",
                note: "sunshine",
                status: 1,
                spotId: 1
            };
            const response = await request(app)
                .post('/api/reservations')
                .set('Authorization', token)
                .send(reservationData);

            expect(response.status).toBe(201);
        });
    });

    describe('PUT /api/reservations/:id', () => {

        it('should deny reservation update without authentication' , async () => {
            const response = await request(app).put(`/api/reservations/${reservationSourceId}`);
            expect(response.status).toBe(401);
        })

        it('should not allow other users to modify the reservation', async () => {
            const newUser = {
                email: 'another@example.com',
                password: 'Password123!',
                firstname: 'Another',
                lastname: 'User',
                role: 'user',
                phoneNumber: '0987654321'
            };
            await request(app).post('/auth/signup').send(newUser);

            const loginRes = await request(app).post('/auth/signin').send({
                email: 'another@example.com',
                password: 'Password123!'
            });

            const response = await request(app)
                .put(`/api/reservations/${reservationSourceId}`)
                .set('Authorization', loginRes.body.token)
                .send({
                    "reservation": { 
                        "numberOfCustomer": 4,
                        "date": new Date(),
                        "name": "stephanie",
                        "note": "li",
                        "status": 1,
                        "userId": 4
                    },
                    "spot": {
                        "name": "rooftp",
                        "roomId": 1
                    }
                });

            expect(response.status).toBe(403);
        });

        it('should allow the user to edit their reservation', async () => {

        const updateReservationData = {
            reservation: { 
                numberOfCustomer: 2,
                date: new Date(),
                name: "jc",
                note: "sunshine",
                status: 1
            }
        }

            const response = await request(app)
                .put(`/api/reservations`)
                .set('Authorization', token)
                .send(updateReservationData);

            expect(response.status).toBe(200);
        });
    });

    describe('DELETE /api/reservations/:id', () => {
        it('should deny reservaiton delete without authentication', async () => {
            const response = await request(app).delete(`/api/reservations/${reservationSourceId}`);
            expect(response.status).toBe(401);
        })

        it('should not allow unauthorized access', async () => {
            const newUser = {
                email: 'another@example.com',
                password: 'Password123!',
                firstname: 'Another',
                lastname: 'User',
                role: 'user',
                phoneNumber: '0987654321'
            }

            await request(app).post('/auth/signup').send(newUser);
            const secondUserRes = await request(app).post('/auth/signin').send({
                email: newUser.email,
                password: newUser.password
            })

            let newToken = secondUserRes.body.token;

            const response = await request(app)
                .delete(`/api/reservations/${reservationSourceId}`)
                .set('Authorization', newToken);

            expect(response.status).toBe(403);
        })

        it('should allow the user to delete their reservation', async () => {
            const response = await request(app)
                .delete(`/api/reservations/${reservationSourceId}`)
                .set('Authorization', token);

            expect(response.status).toBe(200);
        });
    });
});

afterAll(async () => {
    await sequelize.close();
});