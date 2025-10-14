// Toggle forms
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

showSignup.addEventListener("click", () => {
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
});

showLogin.addEventListener("click", () => {
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
});

// Handle signup
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const role = document.getElementById("signupRole").value;

  const users = JSON.parse(localStorage.getItem("smartbite_users")) || [];
  
  if (users.find(u => u.email === email)) {
    alert("User already exists!");
    return;
  }

  users.push({ name, email, password, role });
  localStorage.setItem("smartbite_users", JSON.stringify(users));
  alert("Signup successful! Please login now.");

  signupForm.reset();
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
});

// Handle login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("smartbite_users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password!");
    return;
  }

  alert(`Welcome back, ${user.name}!`);

  if (user.role === "admin") {
    window.location.href = "INDEXXX.html";
  } else {
    window.location.href = "index.html";
  }
});
