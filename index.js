document.getElementById("registration-form").addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let termsAccepted = document.getElementById("terms").checked;

  // Email validation (simple regex check)
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  // Date validation (allowing birth years between 1967 and 2004)
  let dobDate = new Date(dob);
  let today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  let monthDiff = today.getMonth() - dobDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
  }

  if (age < 18 || age > 55) {
      alert("You must be between 18 and 55 years old to register.");
      return;
  }

  // Save user data to local storage
  let userData = JSON.parse(localStorage.getItem("users")) || [];
  userData.push({ name, email, password, dob, termsAccepted });
  localStorage.setItem("users", JSON.stringify(userData));

  // Reload the table
  loadUserData();
});

// Function to load saved user data into the table
function loadUserData() {
  let userData = JSON.parse(localStorage.getItem("users")) || [];
  let tableBody = document.getElementById("user-table-body");
  tableBody.innerHTML = "";

  userData.forEach(user => {
      let row = tableBody.insertRow();
      row.insertCell(0).textContent = user.name;
      row.insertCell(1).textContent = user.email;
      row.insertCell(2).textContent = user.password;
      row.insertCell(3).textContent = user.dob;
      row.insertCell(4).textContent = user.termsAccepted ? "true" : "false";
  });
}

// Load data on page load
document.addEventListener("DOMContentLoaded", loadUserData);
