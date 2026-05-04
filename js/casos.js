/**
 * Banco de 15 casos clínicos (opción múltiple).
 * El examen selecciona uno al azar por intento.
 */
window.CASOS_EXAMEN = [
  {
    id: 1,
    escenario:
      "Paciente masculino de 60 años con fiebre, tos productiva y consolidación lobar en Rx. Sin comorbilidades relevantes ni factores de riesgo para resistencia.",
    pregunta: "¿Mejor opción inicial?",
    opciones: [
      "Meropenem",
      "Vancomicina",
      "Ceftriaxona",
      "Cefepima",
    ],
    correcta: "C",
  },
  {
    id: 2,
    escenario:
      "Paciente con diverticulitis complicada, hemodinámicamente estable, sin choque séptico. Se evalúa tratamiento antibiótico intravenoso inicial.",
    pregunta: "¿Cuál es la mejor estrategia empírica inicial?",
    opciones: [
      "Ceftriaxona + metronidazol",
      "Ertapenem",
      "Meropenem",
      "Depende del riesgo de BLEE",
    ],
    correcta: "D",
  },
  {
    id: 3,
    escenario:
      "Paciente de 45 años con apendicitis complicada, sin datos de choque ni factores de riesgo para bacterias resistentes.",
    pregunta: "¿Mejor opción antibiótica?",
    opciones: [
      "Meropenem",
      "Vancomicina",
      "Ertapenem",
      "Cefepima",
    ],
    correcta: "C",
  },
  {
    id: 4,
    escenario:
      "Paciente de 70 años con choque séptico y antecedente de hospitalización reciente. Sospecha de BLEE.",
    pregunta: "¿Tratamiento empírico inicial?",
    opciones: [
      "Ceftriaxona",
      "Levofloxacino",
      "Meropenem",
      "Vancomicina",
    ],
    correcta: "C",
  },
  {
    id: 5,
    escenario:
      "Paciente con catéter venoso central, fiebre persistente. Hemocultivos con cocos Gram positivos en racimos.",
    pregunta: "¿Inicio de tratamiento?",
    opciones: [
      "Ceftriaxona",
      "Vancomicina",
      "Ertapenem",
      "Levofloxacino",
    ],
    correcta: "B",
  },
  {
    id: 6,
    escenario:
      "Paciente con NAC y antecedente de alergia a betalactámicos no anafiláctica.",
    pregunta: "¿Alternativa adecuada?",
    opciones: [
      "Cefepima",
      "Vancomicina",
      "Levofloxacino",
      "Meropenem",
    ],
    correcta: "C",
  },
  {
    id: 7,
    escenario:
      "Paciente con cefalea intensa, fiebre y rigidez de nuca. Sospecha de meningitis bacteriana.",
    pregunta: "¿Parte del esquema inicial?",
    opciones: [
      "Ceftriaxona",
      "Ertapenem",
      "Levofloxacino",
      "Cefepima",
    ],
    correcta: "A",
  },
  {
    id: 8,
    escenario: "Paciente oncológico con neutropenia febril.",
    pregunta: "¿Tratamiento inicial?",
    opciones: [
      "Ceftriaxona",
      "Cefepima",
      "Ertapenem",
      "Vancomicina",
    ],
    correcta: "B",
  },
  {
    id: 9,
    escenario:
      "Paciente con ITU complicada, sin factores de riesgo para Pseudomonas.",
    pregunta: "¿Mejor opción?",
    opciones: [
      "Cefepima",
      "Meropenem",
      "Ertapenem",
      "Vancomicina",
    ],
    correcta: "C",
  },
  {
    id: 10,
    escenario:
      "Paciente en UCI con cultivo positivo a E. coli BLEE y deterioro clínico.",
    pregunta: "¿Tratamiento dirigido?",
    opciones: [
      "Ceftriaxona",
      "Levofloxacino",
      "Meropenem",
      "Cefepima",
    ],
    correcta: "C",
  },
  {
    id: 11,
    escenario:
      "Paciente con sospecha de endocarditis infecciosa por Gram positivos resistentes.",
    pregunta: "¿Primera línea?",
    opciones: [
      "Ceftriaxona",
      "Vancomicina",
      "Ertapenem",
      "Levofloxacino",
    ],
    correcta: "B",
  },
  {
    id: 12,
    escenario:
      "Paciente de 50 años con diagnóstico de diverticulitis complicada, hemodinámicamente estable, sin factores de riesgo para bacterias resistentes. Se decide manejo intrahospitalario con antibiótico IV.",
    pregunta:
      "¿Cuál es una opción adecuada de tratamiento inicial?",
    opciones: [
      "Vancomicina",
      "Meropenem",
      "Ceftriaxona + metronidazol",
      "Cefepima",
    ],
    correcta: "C",
  },
  {
    id: 13,
    escenario:
      "Paciente con cultivo positivo a Enterobacterales productor de BLEE.",
    pregunta: "¿Conducta con cefepima?",
    opciones: [
      "Mantenerlo",
      "Aumentar dosis",
      "Cambiar a carbapenémico",
      "Suspender antibiótico",
    ],
    correcta: "C",
  },
  {
    id: 14,
    escenario:
      "Paciente con mejoría clínica y cultivo con patógeno sensible a espectro reducido.",
    pregunta: "¿Mejor estrategia?",
    opciones: [
      "Mantener amplio espectro",
      "Desescalar",
      "Doble antibiótico",
      "Suspender sin criterio",
    ],
    correcta: "B",
  },
  {
    id: 15,
    escenario:
      "Paciente crítico en UCI con infección grave por Gram negativos.",
    pregunta: "¿Cómo optimizar tratamiento?",
    opciones: [
      "Dosis única diaria",
      "Infusión prolongada",
      "Cambio a vía oral",
      "Suspensión temprana",
    ],
    correcta: "B",
  },
];

/**
 * Pregunta abierta fija (con contexto clínico-administrativo en un solo enunciado).
 */
window.PREGUNTA_ABIERTA = {
  titulo: "Pregunta abierta",
  escenario: "",
  pregunta:
    "En el manejo de infecciones complicadas del tracto urinario (ITUc), incluida la pielonefritis, así como de la neumonía adquirida en el hospital (NAH) y la neumonía asociada a ventilación mecánica (NAVM), ¿con qué alternativas terapéuticas cuentan actualmente en su hospital?",
};
