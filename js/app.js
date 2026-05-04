(function () {
  "use strict";

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8Bwy_TUo6bk_IdNcMXeLb4aOm5Ekqd6Hk93jHNaO_Qr_91rd_N2P02-CeT76PLY2ZQQ/exec";

  const formRegistro = document.getElementById("form-registro");
  const sectionRegistro = document.getElementById("section-registro");
  const sectionExamen = document.getElementById("section-examen");
  const sectionGracias = document.getElementById("section-gracias");
  const formExamen = document.getElementById("form-examen");
  const mcContainer = document.getElementById("mc-container");
  const btnEnviarRespuestas = document.getElementById("btn-enviar-respuestas");
  const alertEnvio = document.getElementById("alert-envio");
  const textoAbierta = document.getElementById("texto-abierta");

  let casoActual = null;

  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function letterFromIndex(i) {
    return String.fromCharCode(65 + i);
  }

  function renderPreguntaMultiple(caso) {
    mcContainer.innerHTML = "";
    const esc = document.createElement("p");
    esc.className = "caso-escenario";
    esc.textContent = caso.escenario;
    mcContainer.appendChild(esc);

    const pq = document.createElement("p");
    pq.className = "caso-pregunta";
    pq.textContent = caso.pregunta;
    mcContainer.appendChild(pq);

    const fieldset = document.createElement("fieldset");
    fieldset.className = "opciones-mc";

    caso.opciones.forEach(function (texto, idx) {
      const letra = letterFromIndex(idx);
      const id = "mc-" + letra;
      const wrap = document.createElement("label");
      wrap.className = "opcion-radio";
      wrap.setAttribute("for", id);
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "respuesta_mc";
      input.value = letra;
      input.id = id;
      input.required = idx === 0;
      const span = document.createElement("span");
      span.innerHTML =
        "<strong>" + letra + ")</strong> " + escapeHtml(texto);
      wrap.appendChild(input);
      wrap.appendChild(span);
      fieldset.appendChild(wrap);
    });

    mcContainer.appendChild(fieldset);
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function renderPreguntaAbierta() {
    const pa = window.PREGUNTA_ABIERTA;
    var html = "";
    if (pa.escenario) {
      html +=
        '<p class="caso-escenario">' + escapeHtml(pa.escenario) + "</p>";
    }
    html +=
      '<p class="caso-pregunta abierta-pregunta">' +
      escapeHtml(pa.pregunta) +
      "</p>";
    textoAbierta.innerHTML = html;
  }

  function trimCampo(elem) {
    if (elem && typeof elem.value === "string") {
      elem.value = elem.value.trim();
    }
  }

  function registrosListaControles(form) {
    return [
      form.elements.nombre,
      form.elements.especialidad,
      form.elements.hospital,
      form.elements.email,
      form.elements.celular,
    ];
  }

  function validateFormularioRegistro(form) {
    form.querySelectorAll('input[type="radio"]').forEach(function (r) {
      r.setCustomValidity("");
    });
    registrosListaControles(form).forEach(function (el) {
      if (el && el.setCustomValidity) {
        el.setCustomValidity("");
      }
    });
    registrosListaControles(form).forEach(trimCampo);

    const nombre = form.elements.nombre;
    if (!nombre.value) {
      nombre.setCustomValidity("Indique su nombre completo.");
    } else if (nombre.value.length < 2) {
      nombre.setCustomValidity("El nombre debe tener al menos 2 caracteres.");
    }

    const esp = form.elements.especialidad;
    if (!esp.value) {
      esp.setCustomValidity("Indique su especialidad.");
    } else if (esp.value.length < 2) {
      esp.setCustomValidity("La especialidad debe tener al menos 2 caracteres.");
    }

    const hosp = form.elements.hospital;
    if (!hosp.value) {
      hosp.setCustomValidity("Indique el hospital en el que labora.");
    } else if (hosp.value.length < 2) {
      hosp.setCustomValidity(
        "Escriba el nombre del hospital con al menos 2 caracteres."
      );
    }

    const emailEl = form.elements.email;
    if (!emailEl.value) {
      emailEl.setCustomValidity("Indique un correo electrónico.");
    }

    const tel = form.elements.celular;
    if (!tel.value) {
      tel.setCustomValidity("Indique su número de celular.");
    }

    if (!form.elements.visitado_kener.value) {
      const primer = form.querySelector('[name="visitado_kener"]');
      if (primer) {
        primer.setCustomValidity(
          'Seleccione si es visitado por Kener ("Sí" o "No").'
        );
      }
    }

    if (!form.elements.desea_visita_kener.value) {
      const primer = form.querySelector('[name="desea_visita_kener"]');
      if (primer) {
        primer.setCustomValidity(
          'Indique si desea ser visitado por Kener ("Sí" o "No").'
        );
      }
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }

    return true;
  }

  registrosListaControles(formRegistro).concat(
    Array.prototype.slice.call(
      formRegistro.querySelectorAll('input[type="radio"]'),
      0
    )
  ).forEach(function (el) {
    if (!el || !el.addEventListener) return;
    el.addEventListener("input", function () {
      if (el.type === "radio") {
        formRegistro.querySelectorAll('input[type="radio"]').forEach(
          function (r) {
            r.setCustomValidity("");
          }
        );
      } else {
        el.setCustomValidity("");
      }
    });
    el.addEventListener("change", function () {
      if (el.type === "radio") {
        formRegistro.querySelectorAll('input[type="radio"]').forEach(
          function (r) {
            r.setCustomValidity("");
          }
        );
      } else {
        el.setCustomValidity("");
      }
    });
  });

  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateFormularioRegistro(formRegistro)) {
      return;
    }
    const fd = new FormData(formRegistro);
    sessionStorage.setItem(
      "reg_kener",
      JSON.stringify({
        nombre: (fd.get("nombre") || "").toString().trim(),
        especialidad: (fd.get("especialidad") || "").toString().trim(),
        hospital: (fd.get("hospital") || "").toString().trim(),
        email: (fd.get("email") || "").toString().trim(),
        celular: (fd.get("celular") || "").toString().trim(),
        visitado_kener: fd.get("visitado_kener"),
        desea_visita_kener: fd.get("desea_visita_kener"),
      })
    );

    const casos = window.CASOS_EXAMEN;
    casoActual = casos[randomInt(casos.length)];
    renderPreguntaMultiple(casoActual);
    renderPreguntaAbierta();

    sectionRegistro.hidden = true;
    sectionExamen.hidden = false;
    sectionExamen.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  function buildPayload(fdExamen) {
    const reg = JSON.parse(sessionStorage.getItem("reg_kener") || "{}");
    const letraMC = fdExamen.get("respuesta_mc");
    const textoAbiertaResp = (fdExamen.get("respuesta_abierta") || "")
      .toString()
      .trim();

    const caso = casoActual;
    const labels = {};
    if (caso) {
      caso.opciones.forEach(function (t, i) {
        labels[letterFromIndex(i)] = t;
      });
    }

    return {
      timestamp: new Date().toISOString(),
      nombre: reg.nombre,
      especialidad: reg.especialidad,
      hospital: reg.hospital,
      email: reg.email,
      celular: reg.celular,
      visitado_kener: reg.visitado_kener,
      desea_visita_kener: reg.desea_visita_kener,
      caso_id: caso ? caso.id : "",
      caso_escenario: caso ? caso.escenario : "",
      caso_pregunta_mc: caso ? caso.pregunta : "",
      respuesta_mc_letra: letraMC || "",
      respuesta_mc_texto: letraMC && labels[letraMC] ? labels[letraMC] : "",
      pregunta_abierta_escenario: window.PREGUNTA_ABIERTA.escenario,
      pregunta_abierta_texto: window.PREGUNTA_ABIERTA.pregunta,
      respuesta_abierta: textoAbiertaResp,
    };
  }

  formExamen.addEventListener("submit", function (e) {
    e.preventDefault();
    alertEnvio.hidden = true;
    alertEnvio.textContent = "";

    var campoAbierta = formExamen.querySelector(
      'textarea[name="respuesta_abierta"]'
    );
    if (campoAbierta && typeof campoAbierta.value === "string") {
      campoAbierta.value = campoAbierta.value.trim();
      if (!campoAbierta.value || campoAbierta.value.length < 5) {
        campoAbierta.setCustomValidity(
          "Escriba una respuesta de al menos 5 caracteres."
        );
      } else {
        campoAbierta.setCustomValidity("");
      }
    }

    if (!formExamen.checkValidity()) {
      formExamen.reportValidity();
      return;
    }

    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.indexOf("PEGA_AQUI") !== -1) {
      alertEnvio.hidden = false;
      alertEnvio.className = "alert alert-error";
      alertEnvio.textContent =
        "Falta configurar la URL de Google Apps Script";
      return;
    }

    const fd = new FormData(formExamen);
    const payload = buildPayload(fd);

    btnEnviarRespuestas.disabled = true;
    btnEnviarRespuestas.textContent = "Enviando…";

    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json().catch(function () {
          return { ok: true };
        });
      })
      .then(function (data) {
        if (data && data.ok === false) {
          throw new Error(data.error || "Error al guardar");
        }
        sectionExamen.hidden = true;
        sectionGracias.hidden = false;
        sessionStorage.removeItem("reg_kener");
        sectionGracias.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch(function (err) {
        alertEnvio.hidden = false;
        alertEnvio.className = "alert alert-error";
        alertEnvio.textContent =
          "No se pudo enviar. Revise la URL de Apps Script y la conexión. " +
          (err.message || "");
      })
      .finally(function () {
        btnEnviarRespuestas.disabled = false;
        btnEnviarRespuestas.textContent = "Enviar respuestas";
      });
  });

  var taAbiertaIni = document.querySelector(
    'textarea[name="respuesta_abierta"]'
  );
  if (taAbiertaIni) {
    taAbiertaIni.addEventListener("input", function () {
      taAbiertaIni.setCustomValidity("");
    });
  }
})();
