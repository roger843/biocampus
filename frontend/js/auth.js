// frontend/js/auth.js

// ✅ REGISTRO DE USUARIO
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const telefono = document.getElementById("telefono").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const rol = document.getElementById("rol").value;

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, telefono, fecha_nacimiento, rol }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        window.location.href = "login.html";
      }
    } catch (error) {
      console.error("❌ Error al registrar:", error);
      alert("Error al registrar usuario.");
    }
  });
}

// ✅ INICIO DE SESIÓN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        localStorage.setItem("usuario", JSON.stringify(data.user));
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
      alert("Error en el inicio de sesión.");
    }
  });
}
