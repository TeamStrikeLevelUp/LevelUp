const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// Login form handler
if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      credentials: "same-origin",
      headers: {
        "content-type": "application/json"
      }
    }).then(function(response) {
      if (response.status === 200) {
        window.location.pathname = "/dashboard";
      } else {
        alert("invalid user name or password");
      }
    });
  });
}

// Registration form handler
if (signupForm) {
  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

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
    }).then(function(response) {
      console.log("response", response);
      if (response.status == 200) {
        window.location.pathname = "/dashboard";
      } else {
        alert("error");
      }
    });
  });
}
