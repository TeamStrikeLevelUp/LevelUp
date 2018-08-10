function fetchLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  }).then(function (response) {
    if (response.status === 200) {
      window.location.pathname = "/dashboard";
    } else {
      alert("invalid username or password");
    }
  });
}

function fetchSignup() {
  const signupUsername = document.getElementById("signup-username").value;
  const signupPassword = document.getElementById("signup-password").value;
  const signupEmail = document.getElementById("signup-email").value;

  fetch("/signup", {
    method: "POST",
    body: JSON.stringify({ signupUsername, signupPassword, signupEmail }),
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  }).then(function (response) {
    if (response.status == 200) {
      window.location.pathname = "/login";
    } else {
      alert("error");
    }
  });
}

// Registration form handler
const signupButton = document.querySelectorAll(".signup__signup");
const signupForm = document.querySelector('#signup-form');

if (signupForm) {
  console.log("signup");
  for (let i = 0; i < signupButton.length; i++) {
    signupButton[i].addEventListener("click", function (event) {
      event.preventDefault();
      fetchSignup();
    });
  }
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    fetchSignup();
  });
}

// Login form handler
const loginButton = document.querySelectorAll(".landing__login");
const loginForm = document.querySelector('#login-form');

if (loginForm) {
  console.log("login");
  for (var i = 0; i < loginButton.length; i++) {
    loginButton[i].addEventListener('click', function (e) {
      e.preventDefault();
      fetchLogin();
    })
  }
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    fetchLogin();
  })

}
