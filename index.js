document.addEventListener("DOMContentLoaded", () => {
    const dob = document.getElementById("dob");
    const form = document.getElementById("form");
    const entriesContainer = document.getElementById("entries");
  
    // Set min and max dates for DOB field
    const minDate = new Date(new Date() - 86400000 * 365 * 55);
    const maxDate = new Date(new Date() - 86400000 * 365 * 18);
    dob.setAttribute("min", minDate.toISOString().slice(0, 10));
    dob.setAttribute("max", maxDate.toISOString().slice(0, 10));
  
    // Function to refresh the table entries
    function refreshEntries() {
      entriesContainer.innerHTML = JSON.parse(localStorage.getItem("entries") || "[]")
        .map(
          (entry) => `
          <tr class="border-2 text-center">
            <td class="border-2 px-5 py-2">${entry.name}</td>
            <td class="border-2 px-5 py-2">${entry.email}</td>
            <td class="border-2 px-5 py-2">${entry.password}</td>
            <td class="border-2 px-5 py-2">${entry.dob}</td>
            <td class="border-2 px-5 py-2">${entry.accepted ? "Yes" : "No"}</td>
          </tr>`
        )
        .join("\n");
    }
  
    // Form submission handling
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const newEntry = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        dob: document.getElementById("dob").value,
        accepted: document.getElementById("accepted").checked,
      };
  
      // Save the new entry to localStorage
      const entries = JSON.parse(localStorage.getItem("entries") || "[]");
      entries.push(newEntry);
      localStorage.setItem("entries", JSON.stringify(entries));
  
      // Refresh the table
      refreshEntries();
  
      // Reset the form
      form.reset();
    });
  
    // Load entries on page load
    refreshEntries();
  });
  