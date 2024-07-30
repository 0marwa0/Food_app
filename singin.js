let email = document.getElementById("email");
let password = document.getElementById("password");
let login = document.getElementById("login");
import { url } from "./constant.js";
console.log(url, "url");
let userLogin = async (user) => {
  // async function to do the post request for the login
  // Do fetch for user login url
  // with the url specify the mthod name
  // with the url specify the headers needed
  // Finally send the body: which the new user object
  let respone = await fetch(`${url}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  // Convert the response to json
  let Data = await respone.json();
  if (Data.success) {
    localStorage.setItem("token", Data.token);
    // sessionStorage.setItem("token", Data.token);
    window.open("./home.html");
  } else {
    alert(Data.message);
  }
  console.log(Data.token);

  console.log(Data, "login successfully!");
};

login.addEventListener("click", () => {
  let user = {
    email: email.value,
    password: password.value,
  };
  userLogin(user);
});
