document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      nombre: document.getElementById("nombre").value,
      apellido1: document.getElementById("apellido1").value,
      apellido2: document.getElementById("apellido2").value,
      email: document.getElementById("email").value,
      contraseña: document.getElementById("contraseña").value,
      telefono: document.getElementById("telefono").value,
    };

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.mensaje);
      } else {
        alert(result.mensaje);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error al registrar usuario");
    }
  });
