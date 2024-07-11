
document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('ingreso');
    formulario.addEventListener('submit', (event) => {
        if (!validarFormulario()) {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
            event.preventDefault();
        } else {
            alert ('Ingreso exitoso. Disfrute del mejor contenido');
            window.open('../index.html','_self');
            event.preventDefault();
        }
    });

});

function validarFormulario() {
    let esValido = true;

    esValido = validarCampo('email', 'El correo electrónico es obligatorio') && esValido;
    esValido = validarCampo('password', 'La contraseña es obligatoria') && esValido;

    return esValido;

}

function validarCampo(campoId, mensajeError) {
    const campo = document.getElementById(campoId);
    const value = campo.value.trim();

    if (campoId === 'email') {
        if (value === '') {
            document.getElementById(campoId+'Error').innerHTML = mensajeError;
            return false;
        } else if (!isEmail(value)) {
            document.getElementById(campoId+'Error').innerHTML = 'El formato del correo electrónico es incorrecto';
            return false;
        } else {
            document.getElementById(campoId+'Error').innerHTML = '';
            return true;
        }
    } else {
        if (value === '') {
            document.getElementById(campoId+'Error').innerHTML = mensajeError;
            return false;
        } else {
            document.getElementById(campoId+'Error').innerHTML = '';
            return true;
        }
    }

}

function isEmail (email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email); 
}


