
const API_URL = "http://localhost:3000";

// 🟢 Enviar datos del formulario principal (index.html)
async function enviarFormularioPrincipal(data) {
  const response = await fetch(`${API_URL}/formulario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  alert(result.message || "Formulario enviado correctamente");
}

// 🟢 Agregar un nuevo recurso (agregar.html)
async function agregarRecurso(data) {
  const response = await fetch(`${API_URL}/agregar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  alert(result.message || "Recurso agregado correctamente");
}

// 🟢 Registrar un préstamo (prestamo.html)
async function registrarPrestamo(data) {
  const response = await fetch(`${API_URL}/prestamo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  alert(result.message || "Préstamo registrado correctamente");
}

// 🟢 Enviar datos de formulario secundario (formulario.html)
async function enviarFormularioSecundario(data) {
  const response = await fetch(`${API_URL}/formulario-secundario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  alert(result.message || "Formulario secundario enviado correctamente");
}

