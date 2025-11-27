const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const togglePassword = document.getElementById('togglePassword');

// Function to check password strength
function checkPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
}

// Show/hide password
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.textContent = type === 'password' ? '👁' : '🙈';
});

// Real-time password validation
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    if (password === '' || checkPassword(password)) {
        passwordError.style.display = 'none';
    } else {
        passwordError.style.display = 'block';
    }
});
