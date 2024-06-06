document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        localStorage.setItem('loggedInUser', email); // Store logged-in user
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to the main application page
    } else {
        alert('Invalid email or password.');
    }
});
