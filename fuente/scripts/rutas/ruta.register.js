const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const modelo = require('../model/model.register');
const personal = require('../model/model.personal');

router.get('/register', async function (req, res) {
    try {
        const tiposUsuario = await modelo.obtenerTiposUsuario();
        const generos = await modelo.obtenerGeneros();
        const especialidades = await modelo.obtenerEspecialidades();
        // Puedes agregar ocupaciones si tienes una tabla, o usa Estado_civil si es lo que quieres mostrar
        res.render('register.ejs', {
            tittle: 'Registro',
            tiposUsuario,
            generos,
            especialidades,
            error: null
        });
    } catch (err) {
        console.log(err);
        res.render('register.ejs', {
            error: 'Error cargando datos',
            tiposUsuario: [],
            generos: [],
            especialidades: []
        });
    }
});
router.post('/register', async function(req, res) {
    const {
        user, email, pass, confirm, tipoUsuario,
        nombre, apellido, cedula, edad, genero, especialidad, telefono
    } = req.body;

    // Validaciones
    if(!user || !email || !pass || !confirm || !tipoUsuario ||
       !nombre || !apellido || !cedula || !edad || !genero || !especialidad) {
        return res.render('register.ejs', {error: 'Todos los campos son obligatorios'});
    }
    if(pass.length < 8){
        return res.render('register.ejs', {error: 'La contraseña debe ser mayor a 8 caracteres'});
    }
    if(pass !== confirm){
        return res.render('register.ejs', {error: 'Las contraseñas no coinciden'});
    }
    try {
        // Verificar si el usuario o el email ya existen
        const emailExiste = await modelo.existeEmail(email);
        const userExiste = await modelo.existeUser(user);
        if(userExiste){
            return res.render('register.ejs', {error: 'El usuario ya está en uso'});
        }else if(emailExiste){
            return res.render('register.ejs', {error: 'El correo ya está en uso'});
        }else {
            // Encriptar la contraseña antes de mandarla
            const hash = await bcryptjs.hash(pass, 12);
            // Insertar en Usuario y obtener el ID insertado
            const resultadoUsuario = await modelo.insertar(user, email, hash, tipoUsuario);
            const usuarioId = resultadoUsuario.insertId;

            let generoId = 1; // Masculino
            if(genero === 'F') generoId = 2;
            else if(genero === 'O') generoId = 3;

            // Determinar el ID de especialidad (solo si es médico)
            let especialidadId = null;
            if(tipoUsuario == 2) { // Médico
                especialidadId = especialidad;
            } else {
                especialidadId = 4; // ID de "No Aplicable"
            }

            // Insertar en Personal
            const resultadoPersonal = await personal.insertarPersonal(
                nombre, apellido, cedula, edad, genero, usuarioId, tipoUsuario, especialidadId
            );
            const personalId = resultadoPersonal.insertId;

            // Insertar teléfono en Telefono_Personal
            if (telefono) {
                await personal.insertarTelefonoPersonal(personalId, telefono);
            }

            res.redirect('/');
        }
    } catch (error) {
        res.render('register.ejs', { error: error.message });
    }
});

module.exports = router
