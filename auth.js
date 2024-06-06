// Check if the user is logged in
if (!localStorage.getItem('loggedInUser')) {
    window.location.href = 'login.html'; // Redirect to login page if not logged in
}

// Logout function to clear the user's session and redirect to the login page
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}
