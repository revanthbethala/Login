window.bcrypt = dcodeIO.bcrypt;
const $user = document.getElementById("email");
const $password = document.getElementById("password");
let $warning = document.getElementById("warning");
const $success = document.getElementById("successful");
let isValidUser = false;

function validate(event) {
  event.preventDefault();
  $warning.innerText = "";
  const username = $user.value;
  const password = $password.value;
  let isPasswordValid = false; // Declare isPasswordValid variable

  if (!username || !password) {
    $warning.innerText = "Please enter your email id and password";
    return;
  }
  let keys = Object.keys(localStorage);
  for (let i in keys) {
    let storedData = localStorage.getItem(keys[i]);
    if (storedData) {
      let items = JSON.parse(storedData);

      if (items.username === username || items.email === username) {
        isPasswordValid = bcrypt.compareSync(password, items.password);

        if (isPasswordValid) {
          isValidUser = true;
          break;
        }
      }
    }
  }
  if (isValidUser) {
    $success.style.display = "block";
    setTimeout(function () {
      $success.style.display = "none";
      window.location.reload();
    }, 2000);
  } else {
    $warning.innerText = "Invalid email id or password";
  }
}
