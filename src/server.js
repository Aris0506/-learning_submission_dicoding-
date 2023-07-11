// tiap code saya beri comentar untuk saya ingat sebagai pembelajaran

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({

        port : 9000,
        host: 'localhost',
    });

    
    server.route(routes);

    // Hapi.server.routes(routes);

    await server.start();
    console.log(`server berjalan pada port ${server.info.uri}`);
}

init();