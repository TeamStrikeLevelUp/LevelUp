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
      // console.log("document.referrer", document.referrer)
      window.location.pathname = "/dashboard";
    } else {
      alert("invalid username or password");
    }
  });
}

function validateEmail(email) {
  let validate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validate.test(String(email).toLowerCase());
}

// username validation function
function validateUsername(username) {
  let valid = false;
  if (username.length > 3) {
    valid = true
  }
  return valid;
}

function validatePassword(password) {
  let valid = false;
  if (password.length > 3) {
    valid = true
  }
  return valid;
}

function fetchSignup() {
  const signupUsername = document.getElementById("signup-username").value;
  const signupPassword = document.getElementById("signup-password").value;
  const signupEmail = document.getElementById("signup-email").value;

  if (signupEmail && validateEmail(signupEmail)) {

    if (validateUsername(signupUsername)) {

      if (validatePassword(signupPassword)) {

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
          } else if ((response.status == 401)) {
            // alert("error");
            // user already exist
          } else if ((response.status == 500)) {
            // alert("error");
            // Server error
          }
        });

      } else {
        document.querySelector('.password-error').classList.add('visible');
        setTimeout(function () {
          document.querySelector('.password-error').classList.remove('visible');
        }, 5000)
      }

    } else {
      document.querySelector('.username-error').classList.add('visible');
      setTimeout(function () {
        document.querySelector('.username-error').classList.remove('visible');
      }, 5000)
    }

  } else {
    document.querySelector('.email-error').classList.add('visible');
    setTimeout(function () {
      document.querySelector('.email-error').classList.remove('visible');
    }, 5000)
  }



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

// Signup validation
function formValidation() {
  const form = document.querySelectorAll("#signup__form");
  const username = document.querySelectorAll("#signup-username").value;
  const password = document.querySelectorAll("#signup-password").value;
  const email = document.querySelectorAll("#signup-email").value;

  form.addEventListener('submit', function (event) {
    event.preventDefault();




  })

}