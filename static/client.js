// const signupForm = document.getElementById("signup-form");

// Registration form handler
const signupButton = document.querySelectorAll(".signup__signup");

if (signupButton) {
  for (let i = 0; i < signupButton.length; i++) {
    signupButton[i].addEventListener("click", function (event) {
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
      }).then(function (response) {
        if (response.status == 200) {
          window.location.pathname = "/login";
        } else {
          alert("error");
        }
      });
    });
  }
}

// Login form handler
const loginButton = document.querySelectorAll(".landing__login");

if (loginButton) {
  for (var i = 0; i < loginButton.length; i++) {
    loginButton[i].addEventListener('click', function (e) {
      e.preventDefault();

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
          alert("invalid user name or password");
        }
      });
      // e.preventDefault();
      // loginForm.submit();
    })
  }

}
