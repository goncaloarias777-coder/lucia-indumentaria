document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const errorMsg = document.getElementById('error-msg');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;

            const emailCorrecto = "lucia@indumentaria.com";
            const passwordCorrecto = "123456";

            if (emailInput === emailCorrecto && passwordInput === passwordCorrecto) {
                // Guardamos credencial de sesión activa
                localStorage.setItem('admin_logueado', 'true');
                window.location.href = "admin.html";
            } else {
                errorMsg.style.display = "block";
            }
        });
    }
});