const request = require('supertest');
const app = require('../app');

// MARK: - Test de l'accessibilité du serveur
describe('Accessibilité du serveur', () => {
    it('doit permettre un accès public', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});