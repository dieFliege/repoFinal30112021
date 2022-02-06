const pedir = require('supertest');
const {Reserva} = require('../../modeloss/reserva');

let serve;

describe('/api/reportes', () => {
    beforeEach(() => { 
        server = require('../../index'); 
    });
    afterEach(async () => { 
      await server.close(); 
      await Genre.remove({});
    });
    describe('POST /', () => {
        let dia;
        let mes;
        let hora;
        let responsable;
        let telefono;
        let comensales;
        let menues;
        const exec = async () => {
            return await request(server)
              .post('/api/reportes')
              .send({ dia, mes, hora, responsable, telefono, comensales, menues });
          }
        beforeEach(() => {
            dia = 1,
            mes = 1,
            hora = 0,
            responsable = 'Juan Pérez',
            telefono = '11111111';
            comensales = 4;
            menues = ['vegano', 'omnivoro', 'sin tacc', 'vegano'];
        });
        it('Deberìa devolver 200 si todos los datos son válidos.', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
        });
    });
});