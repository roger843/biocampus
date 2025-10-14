// prototipo mínimo de interacción (no persistente)
const state = {
  parqueadero: [
    { placa: 'ABC-123', tipo: 'Carro', ingreso: '08:12', estado: 'Dentro' },
    { placa: 'FTW-987', tipo: 'Moto', ingreso: '08:42', estado: 'Dentro' },
    { placa: 'TZX-555', tipo: 'Carro', ingreso: '09:05', estado: 'Salida' },
  ],
  implementos: [
    { codigo: 'IMP-001', nombre: 'Guantes Nitrilo', estado: 'Prestado', usuario: 'Ana M.' },
    { codigo: 'IMP-022', nombre: 'Mascarilla N95', estado: 'Disponible', usuario: '' },
    { codigo: 'IMP-033', nombre: 'Careta', estado: 'Prestado', usuario: 'Carlos P.' }
  ],
  usuarios: [
    { nombre: 'Roger Barros', rol: 'Administrador', correo: 'rogere-barrosm@unilibre.edu.co', estado: 'Activo' },
    { nombre: 'Ana Martínez', rol: 'Profesora', correo: 'ana@unilibre.edu.co', estado: 'Activo' }
  ]
};

function el(q){return document.querySelector(q)}
function els(q){return document.querySelectorAll(q)}

function renderTables(){
  const tb = el('#tablaParqueadero'), tbf = el('#tablaParqueaderoFull');
  tb.innerHTML=''; tbf.innerHTML='';
  state.parqueadero.forEach(r=>{
    const tr = `<tr><td>${r.placa}</td><td>${r.tipo}</td><td>${r.ingreso}</td><td>${r.estado}</td><td><button class="btn-sm" onclick="registrarSalida('${r.placa}')">Registrar salida</button></td></tr>`;
    tb.insertAdjacentHTML('beforeend',tr);
    tbf.insertAdjacentHTML('beforeend',tr);
  });
  const ti = el('#tablaImplementos'), tif = el('#tablaImplementosFull');
  ti.innerHTML=''; tif.innerHTML='';
  state.implementos.forEach(i=>{
    const tr = `<tr><td>${i.codigo}</td><td>${i.nombre}</td><td>${i.estado}</td><td>${i.usuario}</td><td><button class="btn-sm" onclick="togglePrestamo('${i.codigo}')">${i.estado==='Disponible'?'Prestar':'Devolver'}</button></td></tr>`;
    ti.insertAdjacentHTML('beforeend',tr);
    tif.insertAdjacentHTML('beforeend',tr);
  });
  const tu = el('#tablaUsuarios');
  tu.innerHTML='';
  state.usuarios.forEach(u=>{
    tu.insertAdjacentHTML('beforeend',`<tr><td>${u.nombre}</td><td>${u.rol}</td><td>${u.correo}</td><td>${u.estado}</td><td><button class="btn-sm" onclick="alert('Editar usuario')">Editar</button></td></tr>`)
  });

  el('#vehiculosCount').textContent = state.parqueadero.filter(p=>p.estado==='Dentro').length;
  el('#implementosCount').textContent = state.implementos.filter(i=>i.estado==='Prestado').length;
  el('#alertasCount').textContent = 2;
}

function registrarSalida(placa){
  const idx = state.parqueadero.findIndex(p=>p.placa===placa);
  if(idx>-1) state.parqueadero[idx].estado='Salida';
  renderTables();
}

function togglePrestamo(code){
  const idx = state.implementos.findIndex(i=>i.codigo===code);
  if(idx>-1){
    const it = state.implementos[idx];
    if(it.estado==='Disponible'){ it.estado='Prestado'; it.usuario='Usuario X' }
    else { it.estado='Disponible'; it.usuario='' }
  }
  renderTables();
}

function openIngresoModal() { window.location.href = "formulario.html"; }
function openPrestamoModal() { window.location.href = "prestamo.html"; }
function openAgregarModal(){ alert('Abrir formulario agregar implemento') }
function sampleRegister(){ state.parqueadero.unshift({ placa:'NEW-'+Math.floor(Math.random()*900), tipo:'Carro', ingreso:'10:20', estado:'Dentro'}); renderTables() }
function sampleLoan(){ state.implementos.unshift({ codigo:'IMP-'+Math.floor(Math.random()*900), nombre:'Equipo X', estado:'Prestado', usuario:'Usuario Y' }); renderTables() }

async function exportTable(kind) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let titulo = "";
  let contenido = [];

  if (kind === "report" || kind === "reportes") {
    titulo = "Reporte General de BioCampus";
    contenido.push("🔹 Vehículos dentro:");
    state.parqueadero.forEach(p => {
      contenido.push(`  - ${p.placa} (${p.tipo}) — ${p.estado}`);
    });
    contenido.push("");
    contenido.push("🔹 Implementos prestados:");
    state.implementos.forEach(i => {
      contenido.push(`  - ${i.codigo}: ${i.nombre} (${i.estado}) — ${i.usuario}`);
    });
  } else {
    titulo = "Exportación de " + kind;
    contenido.push("Contenido no definido.");
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(titulo, 14, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  let y = 30;
  contenido.forEach(linea => {
    doc.text(linea, 14, y);
    y += 8;
  });

  doc.save(titulo.replace(/\s+/g, "_") + ".pdf");
}

function login(){ closeLogin(); alert('Sesión iniciada (simulado)') }
function closeLogin(){ el('#loginView').classList.remove('active') }
function openLogin(){ el('#loginView').classList.add('active') }

// navigation
els('.menu-item').forEach(btn=>{
  btn.addEventListener('click', e=>{
    els('.menu-item').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const route = btn.getAttribute('data-route');
    els('.view').forEach(v=>v.classList.remove('active'));
    el('#'+route).classList.add('active');
  })
});

// theme toggle
el('#toggleTheme').addEventListener('click', ()=>{
  document.documentElement.classList.toggle('light');
  document.body.classList.toggle('light');
  if(document.body.classList.contains('light')) {
    document.documentElement.style.setProperty('--bg','#f5f7fa');
    document.documentElement.style.setProperty('--panel','#ffffff');
    document.documentElement.style.setProperty('--text','#0b1220');
    document.documentElement.style.setProperty('--muted','#475569');
  } else {
    document.documentElement.style.setProperty('--bg','#0b1220');
    document.documentElement.style.setProperty('--panel','#0f1724');
    document.documentElement.style.setProperty('--text','#e6eef8');
    document.documentElement.style.setProperty('--muted','#94a3b8');
  }
});

// Cargar implementos guardados desde localStorage
const implementosGuardados = JSON.parse(localStorage.getItem("implementos"));
if (implementosGuardados) {
  state.implementos = implementosGuardados;
}


// init
renderTables();
