// Mostrar y ocultar el formulario de login
document.getElementById('loginToggle').addEventListener('click', function() {
    var dropdown = document.getElementById('loginDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Mostrar y ocultar la contraseña
document.getElementById('togglePassword').addEventListener('click', function() {
    var passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});