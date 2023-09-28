const request = require('supertest');
const app = require('../app');
const supertest = require('supertest');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTU4OTc0MTQsImV4cCI6MTY5NTkwMTAxNH0.U_d98XVijcbGxl0Pzhlr_6nar7MdQg27JoDuLE6o_hQ"

/*----------------------------------------------------------------------------RESERVATIONS-------------------------------------------------------------------------------------------*/

// GET
describe('GET /api/reservations', () => {
    it('should return a 401 error', async () => {
      const res = await request(app)
        .get('/api/reservations')
        .expect('Content-Type', /json/)
        .expect(401);
    });
  });

describe('GET /api/reservations', () => {
    it('should return a 200 error', async () => {
    const res = await request(app)
        .get('/api/reservations')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

// POST
describe('POST /api/reservations', () => {
    it('should return a 401 error', async () => {
    const res = await request(app)
        .post('/api/reservations')
        .send({
            date: "supertest",
            name: "supertest",
            note: "supertest",
            status: 1,
            userId: 99,
            spotId: 99,
            roomId: 99
        })
        .expect(401);
    });
});

describe('POST /api/reservations', () => {
    it('should return a 200 error', async () => {
    const res = await request(app)
        .post('/api/reservations')
        .set('Authorization', token)
        .send({

            "date": "2023-10-26T09:12:18.345Z",
            "name": "DataTypes",
            "note": "DataTypes",
            "status": 1,
            "userId": 99,
            "spotId": 99,
            "roomId": 99
        })
        .expect('Content-Type', /json/)
        .expect(201)
    });
});

// PUT
// DELETE

/*---------------------------------------------------------------------------------------ROOMS------------------------------------------------------------------------------------*/

// GET
describe('GET /api/rooms', () => {
    it('should return a 401 error', async () => {
      const res = await request(app)
        .get('/api/rooms')
        .expect('Content-Type', /json/)
        .expect(401);
    });
  });

describe('GET /api/rooms', () => {
    it('should return a 200 error', async () => {
    const res = await request(app)
        .get('/api/rooms')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

// POST
describe('POST /api/rooms', () => {
    it('should return a 401 error', async () => {
    const res = await request(app)
        .post('/api/rooms')
        .send({
            name: "supertest"
        })
        .expect(401);
    });
});

describe('POST /api/rooms', () => {
    it('should return a 200 error', async () => {
    const res = await request(app)
        .post('/api/rooms')
        .set('Authorization', token)
        .send({
            name: "supertest"
        })
        .expect(201)
    });
});

// PUT

// DELETE

/*------------------------------------------------------------------------------------------SPOTS---------------------------------------------------------------------------------*/

// GET
describe('GET /api/spots', () => {
    it('should return a 401 error', async () => {
      const res = await request(app)
        .get('/api/spots')
        .expect('Content-Type', /json/)
        .expect(401);
    });
  });

describe('GET /api/spots', () => {
    it('should return a 200 error', async () => {
    const res = await request(app)
        .get('/api/spots')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

// POST
describe('POST /api/spots', () => {
    it('should return a 401 error', async () => {
    const res = await request(app)
        .post('/api/spots')
        .send({
            name: "supertest"
        })
        .expect(401);
    });
});

describe('POST /api/spots', () => {
    it('should return a 200 error', async () => {
    const res = await request(app)
        .post('/api/spots')
        .set('Authorization', token)
        .send({
            name: "supertest"
        })
    });
});

// PUT
// DELETE

/*--------------------------------------------------------------------------------------USERS-------------------------------------------------------------------------------------*/

// GET
describe('GET /api/users', () => {
    it('should return a 401 error', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(401);
    });
  });

describe('GET /api/users', () => {
    it('should return a 200 error', async () => {
    const res = await request(app)
        .get('/api/users')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

// POST

describe('POST /api/users', () => {
    it('should return a 401 error', async () => {
    const res = await request(app)
        .post('/api/users')
        .send({
            "role": "supertest",
            "firstName": "supertest",
            "lastName": "supertest",
            "email": "super@test.fr",
            "phoneNumber": "supertest",
            "password": "supertest"
        })
        .expect(401);
    });
});

describe('POST /api/users', () => {
    it('should return a 200 error', async () => {
    const res = await request(app)
        .post('/api/users')
        .set('Authorization', token)
        .send({
            "role": "supertest",
            "firstName": "supertest",
            "lastName": "supertest",
            "email": "super@test.fr",
            "phoneNumber": "supertest",
            "password": "supertest"
        })
        .expect(201);
    });
});

// PUT
// DELETE

/*--------------------------------------------------------------------------------------SIGNIN-------------------------------------------------------------------------------------*/
describe('POST /auth/signin', () => {
    it('should return status 200', async () => {
        const res = await request(app)
        .post('/auth/signin')
        .send({
            "email": "esteban@test.fr",
            "password": "testarktik"
        })
        .expect(201);
    })
})


/*--------------------------------------------------------------------------------------SIGNUP-------------------------------------------------------------------------------------*/describe('POST /auth/signin', () => {
    it('should return status 200', async () => {
        const res = await request(app)
        .post('/auth/signup')
        .send({
            "firstName": "estebán",
            "lastName": "semellier",
            "password": "testarktik",
            "role": "admin", 
            "email": "esteban@test.fr",
            "phoneNumber": "0761401011"
        })
        .expect(201);
    })
})