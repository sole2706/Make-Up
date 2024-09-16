const bcrypt = require('bcrypt');

function encriptar() {
    const ClaveSinEncriptar = 'password123'; // Define la clave a encriptar aquí
    bcrypt.hash(ClaveSinEncriptar, 10, function(err, hash) {
        if (err) {
            console.error('Error al encriptar la clave:', err);
            return;
        }
        console.log('Clave encriptada:', hash);
    });
}

encriptar();
