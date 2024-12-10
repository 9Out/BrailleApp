require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes'); // Pastikan path ini benar sesuai struktur folder Anda
const InputError = require('./exceptions/InputError'); // Pastikan path ini sesuai dengan lokasi file InputError

(async () => {
    try {
        // Konfigurasi server
        const server = Hapi.server({
            port: process.env.PORT || 3000, // Fallback port jika tidak ada PORT di .env
            host: process.env.HOST || '0.0.0.0', // Fallback host
            routes: {
                cors: {
                    origin: ['*'], // Mengizinkan semua origin (disarankan untuk dibatasi di production)
                },
            },
        });

        // Tambahkan routes
        server.route(routes);

        // Middleware untuk menangani respons sebelum dikirimkan
        server.ext('onPreResponse', (request, h) => {
            const response = request.response;

            // Penanganan khusus untuk InputError
            if (response instanceof InputError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: `${response.message}`,
                });
                newResponse.code(response.statusCode);
                return newResponse;
            }

            // Penanganan khusus untuk error Boom (kesalahan bawaan Hapi)
            if (response.isBoom) {
                const { output } = response;
                const newResponse = h.response({
                    status: 'fail',
                    message: output.payload.message,
                });
                newResponse.code(output.statusCode);
                return newResponse;
            }

            // Jika tidak ada masalah, lanjutkan respons
            return h.continue;
        });

        // Mulai server
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1); // Keluar dari proses jika server gagal dijalankan
    }
})();
