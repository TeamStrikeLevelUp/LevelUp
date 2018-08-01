const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('registration-form');

// Login form handler
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.status === 200) {
                    window.location.pathname = '/dashboard';
                } else {
                    alert('invalid user name or password');
                }
            })
    });
}

// Registration form handler
if (registrationForm) {
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const registrationUsername = document.getElementById('registration-username').value;
        const registrationPassword = document.getElementById('registration-password').value;
        const registrationEmail = document.getElementById('registration-email').value;

        fetch('/signin', {
            method: 'POST',
            body: JSON.stringify({ registrationUsername, registrationPassword, registrationEmail }),
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                console.log("response", response)
                if (response.status === 200) {
                    window.location.pathname = '/profile';
                } else {
                    alert('error');
                }
            })
    });
}