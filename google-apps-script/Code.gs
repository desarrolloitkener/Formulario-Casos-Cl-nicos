/**
 * Pegar este código en el editor de Google Apps Script vinculado a tu hoja.
 * Menú: Extensiones → Apps Script
 *
 * Después: Implementar → Nueva implementación → Tipo: Aplicación web
 * - Ejecutar como: Yo
 * - Quién tiene acceso: Cualquier usuario
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var body = e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(body);

    var row = [
      data.timestamp || new Date().toISOString(),
      data.nombre || "",
      data.especialidad || "",
      data.hospital || "",
      data.email || "",
      data.celular || "",
      data.visitado_kener || "",
      data.desea_visita_kener || "",
      data.caso_id || "",
      data.caso_escenario || "",
      data.caso_pregunta_mc || "",
      data.respuesta_mc_letra || "",
      data.respuesta_mc_texto || "",
      data.pregunta_abierta_escenario || "",
      data.pregunta_abierta_texto || "",
      data.respuesta_abierta || "",
    ];

    sheet.appendRow(row);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "Endpoint activo. Use POST." })
  ).setMimeType(ContentService.MimeType.JSON);
}

function jsonResponse(obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
  return out;
}

/**
 * Ejecutar una sola vez desde el editor (botón Ejecutar) después de crear la hoja:
 * crea la fila de encabezados si la hoja está vacía.
 */
function crearEncabezadosSiHaceFalta() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "Marca de tiempo",
    "Nombre completo",
    "Especialidad",
    "Hospital",
    "Correo",
    "Celular",
    "¿Visitado por Kener?",
    "¿Desea ser visitado por Kener?",
    "ID caso MC",
    "Escenario caso MC",
    "Pregunta MC",
    "Respuesta MC (letra)",
    "Respuesta MC (texto opción)",
    "Escenario pregunta abierta",
    "Texto pregunta abierta",
    "Respuesta abierta",
  ]);
}
