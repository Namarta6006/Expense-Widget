document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        firstName,
        lastName,
        email,
        password
    };

    localStorage.setItem(email, JSON.stringify(user));
    alert('Signup successful! Please login.');
    window.location.href = 'login.html';
});
