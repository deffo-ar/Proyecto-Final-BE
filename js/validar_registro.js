
document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('meRegistro');
    formulario.addEventListener('submit', (event) => {
        if (!validarFormulario()) {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
            event.preventDefault();
        } else {
            alert ('Gracias por registrarse. Ya puede ingresar a su cuenta.');
            window.open('../pages/ingresar.html','_self');
            event.preventDefault();
        }
    });

});

function validarFormulario() {
    let esValido = true;

    esValido = validarCampo('nombre', 'El nombre es obligatorio') && esValido;
    esValido = validarCampo('apellido', 'El apellido es obligatorio') && esValido;
    esValido = validarCampo('email', 'El correo electrónico es obligatorio') && esValido;
    esValido = validarCampo('password', 'La contraseña es obligatoria') && esValido;
    esValido = validarCampo('fnac', 'La fecha de nacimiento es obligatoria') && esValido;
    esValido = validarCampo('pais', 'El país es obligatorio') && esValido;

    const terminos = document.getElementById('terminos').checked;
    if (!terminos) {
        esValido = false;
        document.getElementById('terminosError').innerHTML = 'Debes aceptar los términos y condiciones';
    } else {
        document.getElementById('terminosError').innerHTML = '';
    }

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


