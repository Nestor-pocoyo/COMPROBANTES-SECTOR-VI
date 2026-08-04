const $ = (id) => document.getElementById(id);

const rates = Object.freeze({ monthly: 340, annual: 3500, card: 150 });

// Padrón de 169 viviendas del Sector VI. No incluye nombres de propietarios.
const streetNumbers = Object.freeze({
  "CALIPSO": [101, 103, 105, 107, 115, 117, 119, 121, 123, 125, 127, 129, 131],
  "CLIO": [101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143],
  "OLIMPIA": [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 136, 138, 140, 142, 144, 146, 148, 150],
  "ORIÓN": [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 137, 139, 141, 143],
  "PARÍS": [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 151, 153],
});

const houses = Object.entries(streetNumbers).flatMap(([street, numbers]) => numbers.map((number) => ({ street, number: String(number), ...rates })));

const state = { issuedAt: new Date() };
const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });
const dateFormat = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric" });

function todayValue(date = new Date()) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function capitalize(text) { return text ? text.charAt(0).toUpperCase() + text.slice(1) : "—"; }

function formatDate(value) {
  if (!value) return "—";
  const [year, month, day] = value.split("-").map(Number);
  return dateFormat.format(new Date(year, month - 1, day));
}

function formatMonth(value) {
  if (!value) return "—";
  const [year, month] = value.split("-").map(Number);
  return capitalize(new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1)));
}

function formatTime(date) {
  return new Intl.DateTimeFormat("es-MX", { hour: "numeric", minute: "2-digit", hour12: true }).format(date).replace(" ", " ").toLowerCase();
}

function numberForNextFolio() {
  const key = "sector-vi-last-folio";
  const last = Number(localStorage.getItem(key) || "154") + 1;
  localStorage.setItem(key, String(last));
  return `SECV1-${new Date().getFullYear()}-${String(last).padStart(6, "0")}`;
}

function fillStreetOptions() {
  const street = $("street");
  const names = [...new Set(houses.map((house) => house.street))].sort((a, b) => a.localeCompare(b, "es"));
  street.innerHTML = '<option value="">Selecciona una calle</option>' + names.map((name) => `<option value="${name}">${name}</option>`).join("");
}

function selectedHouse() {
  return houses.find((house) => house.street === $("street").value && house.number === $("house-number").value);
}

function fillHouseOptions() {
  const houseNumber = $("house-number");
  const selectedStreet = $("street").value;
  const matching = houses.filter((house) => house.street === selectedStreet);
  houseNumber.disabled = !matching.length;
  houseNumber.innerHTML = matching.length
    ? '<option value="">Selecciona una vivienda</option>' + matching.map((house) => `<option value="${house.number}">${house.number}</option>`).join("")
    : '<option value="">Selecciona primero la calle</option>';
  updatePreview();
}

function proposedAmount() {
  const house = selectedHouse();
  if (!house) return null;
  const concept = $("concept").value;
  if (concept === "Mensualidad") return house.monthly;
  if (concept === "Anualidad") return house.annual;
  if (concept === "Compra de tarjeta") return house.card;
  return null;
}

function setConditionalFields() {
  const concept = $("concept").value;
  const isCard = concept === "Compra de tarjeta";
  const isDebt = concept === "Adeudo anterior";
  $("card-code-wrap").hidden = !isCard;
  $("prior-debt-wrap").hidden = !isDebt;
  $("preview-card-row").hidden = !isCard;
  $("preview-debt-row").hidden = !isDebt;
  $("preview-period-row").hidden = concept === "Compra de tarjeta" || isDebt;
}

function updateSuggestedAmount() {
  const amount = $("amount");
  const suggestion = proposedAmount();
  if (suggestion !== null && (!amount.value || amount.dataset.suggested === "true")) {
    amount.value = suggestion;
    amount.dataset.suggested = "true";
  }
  if ($("concept").value === "Adeudo anterior" && $("prior-debt").value && (!amount.value || amount.dataset.suggested === "true")) {
    amount.value = $("prior-debt").value;
    amount.dataset.suggested = "true";
  }
}

function updatePreview() {
  setConditionalFields();
  const house = selectedHouse();
  const folio = $("folio").value.trim() || "—";
  const amount = Number($("amount").value || 0);
  const concept = $("concept").value;
  const issuedAt = state.issuedAt;

  $("preview-folio").textContent = folio;
  $("preview-payment-date").textContent = formatDate($("payment-date").value);
  $("preview-issued-date").textContent = dateFormat.format(issuedAt);
  $("preview-issued-time").textContent = formatTime(issuedAt);
  $("preview-house").textContent = house ? `${house.street}, ${house.number}` : "Selecciona una vivienda";
  $("preview-concept").textContent = concept;
  $("preview-period").textContent = formatMonth($("covered-period").value);
  $("preview-debt").textContent = $("prior-debt").value ? money.format(Number($("prior-debt").value)) : "—";
  $("preview-card").textContent = $("card-code").value.trim() || "—";
  $("preview-amount").textContent = `${money.format(amount)} MXN`;
  $("preview-amount-highlight").textContent = `${money.format(amount)} MXN`;
  $("preview-method").textContent = $("method").value;
  $("preview-reference").textContent = $("reference").value.trim() || "—";
}

function resetForm(useNewFolio = false) {
  $("receipt-form").reset();
  $("payment-date").value = todayValue();
  $("covered-period").value = todayValue().slice(0, 7);
  $("folio").value = useNewFolio ? numberForNextFolio() : `SECV1-${new Date().getFullYear()}-000154`;
  $("house-number").disabled = true;
  $("house-number").innerHTML = '<option value="">Selecciona primero la calle</option>';
  $("amount").dataset.suggested = "true";
  state.issuedAt = new Date();
  $("status-message").textContent = "";
  $("status-message").className = "status-message";
  updatePreview();
}

function generatePdf() {
  const form = $("receipt-form");
  const status = $("status-message");
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = "Completa los campos obligatorios antes de generar el comprobante.";
    status.className = "status-message error";
    return;
  }
  state.issuedAt = new Date();
  updatePreview();
  status.textContent = "Abriendo la ventana de impresión…";
  status.className = "status-message";
  localStorage.setItem("sector-vi-last-receipt", JSON.stringify({ folio: $("folio").value, createdAt: new Date().toISOString() }));
  window.setTimeout(() => {
    window.print();
    status.textContent = "Selecciona “Guardar como PDF” y confirma el tamaño carta.";
  }, 120);
}

function init() {
  fillStreetOptions();
  resetForm(false);
  document.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => { if (field.id === "amount") field.dataset.suggested = "false"; updatePreview(); });
    field.addEventListener("change", () => { if (field.id === "amount") field.dataset.suggested = "false"; updatePreview(); });
  });
  $("street").addEventListener("change", fillHouseOptions);
  $("house-number").addEventListener("change", () => { updateSuggestedAmount(); updatePreview(); });
  $("concept").addEventListener("change", () => { updateSuggestedAmount(); updatePreview(); });
  $("prior-debt").addEventListener("input", () => { updateSuggestedAmount(); updatePreview(); });
  $("new-folio").addEventListener("click", () => { $("folio").value = numberForNextFolio(); updatePreview(); });
  $("clear-form").addEventListener("click", () => resetForm(true));
  $("receipt-form").addEventListener("submit", (event) => { event.preventDefault(); generatePdf(); });
  window.receiptIcons.createIcons();
}

init();
