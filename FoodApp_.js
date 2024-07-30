let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let singUpBtn = document.getElementById("singUp");
import { url } from "./constant";

let userSingUp = async (user) => {
  // Do fetch for user register url
  // with the url specify the mthod name
  // with the url specify the headers needed
  // Finally send the body: which the new user object
  let respone = await fetch(`${url}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  // Convert the response to json
  let Data = await respone.json();
  if (Data.success) {
    window.open("./SingIn.html");
  } else {
    alert(Data.message);
  }
  console.log(Data, "Done!");
};

singUpBtn.addEventListener("click", () => {
  let newUser = {
    name: username.value,
    email: email.value,
    password: password.value,
  };
  userSingUp(newUser);
});
