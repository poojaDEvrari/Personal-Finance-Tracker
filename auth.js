document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    const logoutLink = document.getElementById('logout');

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(loginForm);

            fetch('login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('isAuthenticated', 'true');
                    window.location.href = 'index.html'; // Redirect to home page
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(signupForm);

            fetch('signup.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Signup successful. Please login.');
                    window.location.href = 'login.html'; // Redirect to login page after successful signup
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Check if user is authenticated
    if (!localStorage.getItem('isAuthenticated')) {
        const unauthenticatedPaths = ['/PROJECT_F/login.html', '/PROJECT_F/signup.html'];

        if (!unauthenticatedPaths.includes(window.location.pathname)) {
            window.location.href = 'login.html';
        }
    } else {
        const authenticatedPaths = ['/PROJECT_F/login.html', '/PROJECT_F/signup.html'];

        if (authenticatedPaths.includes(window.location.pathname)) {
            window.location.href = 'index.html';
        }
    }

    // Logout
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();

            fetch('logout.php', {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.removeItem('isAuthenticated');
                    window.location.href = 'login.html';
                } else {
                    alert('Logout failed. Please try again.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
