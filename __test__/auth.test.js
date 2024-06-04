const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../config/db.config');


beforeAll(async () => {
    await sequelize.sync({ force: true }); 
});

// MARK: - Test de la fonction signup()
describe('Authentication', () => {

    it('Un utilisateur peut s\'inscrire', async () => {
        const newUser = {
            email: "test@example.com",
            password: "Password123!",
            firstname: "Test",
            lastname: "User",
            phoneNumber: "1234567890"
        };

        const response = await request(app)
            .post('/auth/signup')
            .send(newUser);

        expect(response.status).toBe(201)
    })

    it('Un utilisateur ne peut pas s\'inscrire si les champs obligatoires sont manquants', async () => {
        const newUser = {
            password: "Password123!",
            firstname: "Test",
            lastname: "User",
            phoneNumber: "1234567890"
        };

        const response = await request(app)
            .post('/auth/signup')
            .send(newUser);
        
            expect(response.status).toBe(422)
            expect(response.body).toHaveProperty('errors')
    })

    it('Un utilisateur ne peut pas s\'inscrire si l\'email est invalide', async () => {
        const newUser = {
            email: "thisIsNotAnEmail",
            password: "Password123!",
            firstname: "Test",
            lastname: "User",
            phoneNumber: "1234567890"
        };

        const response = await request(app)
            .post('/auth/signup')
            .send(newUser);
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errors')
    })

    it('Un utilisateur ne peut pas s\'inscrire si le mot de passe est trop court', async () => {
        const newUser = {
            email: 'test@example.com',
            password: 'short',
            firstname: 'Test',
            lastname: 'User',
            phoneNumber: '1234567890'
        };

        const response = await request(app)
            .post('/auth/signup')
            .send(newUser);
        
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errors')
    });
});


// MARK: - Test de la fonction signin()
describe('sign in', () => {
    const newUser = {
        email: "test@example.com",
        password: "Password123!",
        firstname: "Test",
        lastname: "User",
        phoneNumber: "1234567890"
    };

    beforeAll(async () => {
        await request(app)
        .post('/auth/signup')
        .send(newUser);
    }) 

    it('un utilisateur peut se connecter', async () => {
        const user = {
            email: newUser.email,
            password: newUser.password
        }

        const response = await request(app)
            .post('/auth/signin')
            .send(user);
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('token')
    })

    it('un utilisateur ne peut pas se connecter si les champs obligatoires sont manquants', async () => {
        const user = {
            email: newUser.email
        }
        const response = await request(app)
            .post('/auth/signin')
            .send(user);
        
            expect(response.status).toBe(422)
            expect(response.body).toHaveProperty('errors')
    })

    it('un utilisateur ne peut pas se connecter si l\'email est invalide', async () => {
        const user = {
            email: "thisIsNotAnEmail",
            password: newUser.password
        }

        const response = await request(app)
            .post('/auth/signin')
            .send(user);
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errors')
    })

    it('un utilisateur ne peut pas se connectersi l\'email est invalide', async () => {
        const newUser = {
            email: "thisIsNotAnEmail",
            password: "Password123!",
            firstname: "Test",
            lastname: "User",
            phoneNumber: "1234567890"
        };

        const response = await request(app)
            .post('/auth/signup')
            .send(newUser);
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('errors')
    })
});

afterAll(async () => {
    await sequelize.close();
});