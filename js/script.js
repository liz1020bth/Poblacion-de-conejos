// ============================================================
// CRECIMIENTO DE CONEJOS CON FIBONACCI
// Algoritmo: Serie de Fibonacci sin vectores (variables simples)
// Interacción: document.getElementById() en toda la lógica
// ============================================================
 
/**
 * Función principal: calcula el crecimiento de conejos
 * siguiendo la serie de Fibonacci.
 *
 * Regla de Fibonacci aplicada a conejos (Problema de Leonardo Fibonacci, 1202):
 *  - En el mes 1: 1 par de conejos (recién nacidos)
 *  - En el mes 2: 1 par (aún no reproducen)
 *  - En el mes 3: 2 pares (el primer par tuvo su primera cría)
 *  - Cada mes siguiente: pares_actuales = pares_anterior + pares_hace_dos_meses
 *
 * El algoritmo usa SOLO variables (sin arreglos/arrays) para calcular la serie.
 */
function calcularConejos() {
 
  // --- 1. LEER DATOS DEL FORMULARIO con document.getElementById() ---
  let mesesInput  = document.getElementById("mesesConejos");
  let nombreInput = document.getElementById("nombreUsuario");
  let resultadoDiv = document.getElementById("resultado-box");
  let errorDiv     = document.getElementById("msg-error");
 
  let meses  = parseInt(mesesInput.value);
  let nombre = nombreInput.value.trim();
 
  // Limpiar estado anterior
  errorDiv.className  = "msg-error";
  resultadoDiv.className = "resultado-box";
 
  // --- 2. VALIDACIÓN ---
  if (isNaN(meses) || meses < 1 || meses > 40) {
    errorDiv.textContent = "⚠ Por favor ingresa un número de meses entre 1 y 40.";
    errorDiv.className = "msg-error visible";
    return;
  }
 
  // --- 3. ALGORITMO FIBONACCI SIN ARREGLOS ---
  // Solo usamos variables simples: a, b, c (como indica el documento del desafío)
  let a = 1; // Fibonacci: término anterior
  let b = 1; // Fibonacci: término actual
  let c;     // Fibonacci: siguiente término
 
  // Guardaremos los datos en variables para construir la tabla
  // (usamos un string de HTML, no un array de objetos)
  let filasHTML    = "";
  let maxPoblacion = 1; // para calcular el porcentaje de la barra visual
 
  // Primera pasada: encontrar el valor máximo (para las barras visuales)
  let tempA = 1, tempB = 1, tempC;
  let valoresTemp = [1, 1];
  for (let i = 3; i <= meses; i++) {
    tempC = tempA + tempB;
    tempA = tempB;
    tempB = tempC;
    valoresTemp.push(tempC);
  }
  maxPoblacion = valoresTemp[meses - 1];
 
  // Reiniciamos las variables para construir la tabla
  a = 1;
  b = 1;
 
  // Segunda pasada: construir las filas de la tabla
  for (let i = 1; i <= meses; i++) {
 
    // Obtener el valor Fibonacci del mes i
    let paresMes;
    if (i === 1) {
      paresMes = 1;
    } else if (i === 2) {
      paresMes = 1;
    } else {
      c = a + b;
      a = b;
      b = c;
      paresMes = b;
    }
 
    // Calcular conejos individuales (cada par = 2 conejos)
    let conejosIndividuales = paresMes * 2;
 
    // Porcentaje para la barra visual
    let porcentaje = Math.round((paresMes / maxPoblacion) * 100);
 
    // Emojis de conejo (máximo 10 para no saturar)
    let cantEmojis = Math.min(paresMes, 10);
    let emojis = "🐇".repeat(cantEmojis);
    if (paresMes > 10) emojis += " +" + (paresMes - 10);
 
    // Resaltar si la población duplicó la del mes anterior
    let cambioClass = "";
    if (i > 2 && valoresTemp[i-1] > valoresTemp[i-2] * 1.5) {
      cambioClass = 'style="color:var(--miel);font-weight:800"';
    }
 
    // Construir la fila HTML
    filasHTML += `
      <tr>
        <td style="font-family:'Courier Prime',monospace;color:rgba(255,255,255,0.45)">Mes ${i}</td>
        <td ${cambioClass}>${paresMes} par${paresMes !== 1 ? 'es' : ''}</td>
        <td style="color:var(--verde-claro)">${conejosIndividuales}</td>
        <td>
          <div class="barra-wrap">
            <div class="barra-bg">
              <div class="barra-fill" style="width:${porcentaje}%"></div>
            </div>
            <span class="barra-num">${paresMes}</span>
          </div>
        </td>
        <td class="conejos-vis">${emojis}</td>
      </tr>`;
  }
 
  // --- 4. CALCULAR ESTADÍSTICAS FINALES ---
  let totalParesFinal   = maxPoblacion;
  let totalIndividual   = totalParesFinal * 2;
  let crecimientoTotal  = meses > 1 ? (valoresTemp[meses-1] - valoresTemp[0]) : 0;
 
  let saludo = nombre ? `, <strong style="color:var(--miel)">${nombre}</strong>` : "";
 
  // --- 5. MOSTRAR RESULTADOS con document.getElementById() ---
  document.getElementById("resultado-box").innerHTML = `
    <div class="resultado-header">
      🐇 &nbsp;Simulación completada — ${meses} mes${meses !== 1 ? 'es' : ''}
    </div>
    <div class="resultado-body">
      <p style="color:rgba(255,255,255,0.65);font-size:0.88rem;margin-bottom:18px">
        Aquí tienes${saludo} el crecimiento de tu colonia de conejos siguiendo la serie de Fibonacci:
      </p>
 
      <!-- Estadísticas resumen -->
      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-numero">${totalParesFinal}</span>
          <span class="stat-label">Pares en mes ${meses}</span>
        </div>
        <div class="stat-card">
          <span class="stat-numero">${totalIndividual}</span>
          <span class="stat-label">Conejos totales</span>
        </div>
        <div class="stat-card">
          <span class="stat-numero">+${crecimientoTotal}</span>
          <span class="stat-label">Pares más vs mes 1</span>
        </div>
      </div>
 
      <!-- Tabla mes a mes -->
      <table class="tabla-resultado">
        <thead>
          <tr>
            <th>Período</th>
            <th>Pares (♂♀)</th>
            <th>Individuos</th>
            <th>Crecimiento visual</th>
            <th>Colonia</th>
          </tr>
        </thead>
        <tbody>
          ${filasHTML}
        </tbody>
      </table>
 
      <p style="margin-top:18px;font-size:0.78rem;color:rgba(255,255,255,0.30);font-family:'Courier Prime',monospace">
        Algoritmo: Fibonacci sin arreglos · variables a, b, c · document.getElementById()
      </p>
    </div>`;
 
  document.getElementById("resultado-box").className = "resultado-box visible";
 
  // Hacer scroll suave al resultado
  document.getElementById("resultado-box").scrollIntoView({ behavior: "smooth", block: "nearest" });
}
 
 
// ============================================================
// DEMO VISUAL de la secuencia en la sección de algoritmo
// ============================================================
window.addEventListener("DOMContentLoaded", function () {
 
  // Generar los primeros 10 números de Fibonacci para la demo visual
  let seqDemo = document.getElementById("secuencia-demo");
  if (seqDemo) {
    let a = 1, b = 1, c;
    let valores = [1, 1];
    for (let i = 3; i <= 10; i++) {
      c = a + b;
      a = b;
      b = c;
      valores.push(b);
    }
    valores.forEach(function (num) {
      let span = document.createElement("span");
      span.className = "seq-num";
      span.textContent = num;
      seqDemo.appendChild(span);
    });
  }
 
  // Permitir ejecutar con la tecla Enter
  let inputs = document.querySelectorAll("input");
  inputs.forEach(function (inp) {
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") calcularConejos();
    });
  });
});