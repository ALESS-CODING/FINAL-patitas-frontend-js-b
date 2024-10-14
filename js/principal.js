window.addEventListener('load', function () {

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');
    const msgError = this.document.getElementById('msgError');

    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlertaSuccess(`Bienvenido ${result.nombreUsuario}`);

});

function mostrarAlertaSuccess(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

function cerrarAlertaSuccess(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'none';
}

const mostrarAlertaError = (mensaje) => {
    msgError.innerHTML = mensaje;
    msgError.style.display = 'block';
}

const idButtonLogout = document.getElementById('logout');

idButtonLogout.addEventListener('click', () => {
    const userAutenticado = localStorage.getItem('result');
    if (!userAutenticado) return;
    logout();
});


const logout = async () => {
    const url = 'http://localhost:8082/login/logout';
    const userAutenticado = JSON.parse(localStorage.getItem('result'));

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userAutenticado.nombreUsuario
        });

        if (response.status === 200) {
            localStorage.clear();
            window.location.replace('index.html');
        } else {
            cerrarAlertaSuccess()
            mostrarAlertaError('Ocurrio un error de tiempo');
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}
