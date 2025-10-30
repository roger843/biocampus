// === Funciones auxiliares ===
const el = (sel) => document.querySelector(sel);
const els = (sel) => document.querySelectorAll(sel);

// === Renderizado de tablas ===
function renderTables() {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const usersTable = el('#usersTable tbody');
  if (!usersTable) return;

  usersTable.innerHTML = '';
  storedUsers.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
    `;
    usersTable.appendChild(row);
  });
}

// === Registro de usuario ===
function register() {
  const name = el('#registerName').value.trim();
  const email = el('#registerEmail').value.trim();
  const password = el('#registerPassword').value.trim();
  const role = el('#registerRole').value;

  if (!name || !email || !password) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find((u) => u.email === email)) {
    alert('Este correo ya está registrado.');
    return;
  }

  users.push({ name, email, password, role });
  localStorage.setItem('users', JSON.stringify(users));

  alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
  toggleForms('login');
}

// === Inicio de sesión ===
function login() {
  const email = el('#loginEmail').value.trim();
  const password = el('#loginPassword').value.trim();

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    actualizarUsuario();
    alert(`👋 Bienvenido, ${user.name}!`);
  } else {
    alert('❌ Correo o contraseña incorrectos.');
  }
}

// === Cierre de sesión ===
function logout() {
  localStorage.removeItem('currentUser');
  alert('👋 Has cerrado sesión correctamente.');
}

// === Actualización del usuario activo ===
function actualizarUsuario() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const userDisplay = el('#userDisplay');
  if (!userDisplay) return;

  if (user) {
    const iniciales = user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
    userDisplay.innerHTML = `<div class="avatar">${iniciales}</div> ${user.name}`;
  } else {
    userDisplay.innerHTML = '';
  }
}

// === Control de formularios (login / registro / recuperación) ===
function toggleForms(form) {
  const loginForm = el('#loginForm');
  const registerForm = el('#registerForm');
  const recuperarForm = el('#recuperarForm');

  loginForm.style.display = form === 'login' ? 'block' : 'none';
  registerForm.style.display = form === 'register' ? 'block' : 'none';
  recuperarForm.style.display = form === 'recuperar' ? 'block' : 'none';
}

// === Recuperación de contraseña ===
function cerrarRecuperacion() {
  el('#recuperarForm').style.display = 'none';
  el('#loginForm').style.display = 'block';
}

function toggleRecuperacion(mostrar) {
  document.getElementById("loginForm").style.display = mostrar ? "none" : "block";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("recuperarForm").style.display = mostrar ? "block" : "none";
}

function mostrarRecuperacion() {
  toggleRecuperacion(true);
}

async function recuperarContrasena() {
  const email = document.getElementById("recuperarEmail").value.trim();

  if (!email) {
    alert("Por favor, ingresa tu correo institucional.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/recuperar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("📨 Se ha enviado un correo para recuperar tu contraseña.");
      toggleRecuperacion(false);
    } else {
      alert("❌ Error: " + data.message);
    }
  } catch (error) {
    alert("⚠️ No se pudo conectar con el servidor. Verifica que esté activo.");
  }
}

// === Inicialización ===
renderTables();
actualizarUsuario();
el('#logoutBtn').addEventListener('click', logout);
