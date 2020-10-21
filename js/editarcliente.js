import { obtenerCliente, editarCliente } from './API.js';
import { mostrarAlerta, validar } from './funciones.js';

(function() {
    // campos del form
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const empresaInput = document.getElementById('empresa');
    const telefonoInput = document.getElementById('telefono');
    const idInput = document.getElementById('id');

    document.addEventListener('DOMContentLoaded', async () => {
        const parametrosULR = new URLSearchParams(window.location.search);
        const idCliente = parseInt(parametrosULR.get('id'));
        const cliente = await obtenerCliente(idCliente);

        mostrarCliente(cliente);

        const formulario = document.getElementById('formulario');
        formulario.addEventListener('submit', validarCliente);
    });

    function mostrarCliente(cliente) {
        const {nombre, telefono, email, id, empresa} = cliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
        idInput.value = id;

    }

    function validarCliente(e) {
        e.preventDefault();

        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        }

        if(validar(cliente)) {
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }

        // reescribe el objeto
        editarCliente(cliente);
    }
})();