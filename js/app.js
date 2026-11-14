/* MojnBot – UI */
(async () => {
  const chat = document.getElementById("chat");
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const send = document.getElementById("send");
  const motor = document.getElementById("motor");
  const dlg = document.getElementById("indstillinger");
  const apiKey = document.getElementById("apiKey");
  const model = document.getElementById("model");

  const HIST_KEY = "mojnbot.historik";
  let historik = [];
  try { historik = JSON.parse(localStorage.getItem(HIST_KEY) || "[]"); } catch (_) { historik = []; }

  const ordbog = await Oversaetter.load("data/ordbog.json");
  MojnBot.setGloser(ordbog.gloser);
  await ClaudeKlient.loadSystemPrompt("prompt/system.md");

  function opdaterStatus() {
    const claude = ClaudeKlient.harNoegle();
    motor.textContent = claude ? "Claude · " + ClaudeKlient.getModel() : "Regelmotor";
    motor.className = "pill " + (claude ? "claude" : "regel");
  }

  function boble(role, text, meta) {
    const el = document.createElement("div");
    el.className = "boble " + role + (meta ? " " + meta : "");
    el.textContent = text;
    chat.appendChild(el);
    chat.scrollTop = chat.scrollHeight;
    return el;
  }

  function gemHistorik() {
    localStorage.setItem(HIST_KEY, JSON.stringify(historik.slice(-40)));
  }

  function hilsen() {
    const h = new Date().getHours();
    const tid = h < 10 ? "Goj morn" : h < 18 ? "Mojn" : "Goj awten";
    return `${tid}! Æ æ MojnBot. Æ snakke kun synnejysk, men do må skryw lich som do vil. Hva ska vi snak om? Kaffe, kach, æ væer elle nau helt ant?`;
  }

  // Genindlæs tidligere samtale eller start med hilsen
  if (historik.length) {
    historik.forEach(m => boble(m.role === "user" ? "bruger" : "bot", m.text));
  } else {
    const t = hilsen();
    boble("bot", t);
    historik.push({ role: "assistant", text: t });
    gemHistorik();
  }
  opdaterStatus();

  async function svarPaa(tekst) {
    boble("bruger", tekst);
    historik.push({ role: "user", text: tekst });
    gemHistorik();
    send.disabled = true;
    const tænker = boble("bot", "…", "taenker");

    let svar, viaClaude = false;
    if (ClaudeKlient.harNoegle()) {
      try {
        svar = await ClaudeKlient.svar(historik);
        viaClaude = true;
      } catch (e) {
        console.warn("Claude-kald fejlede, falder tilbage til regelmotor:", e.message);
        boble("bot", "(Claude svaret it: " + e.message + ". Æ tajer øwer sjel.)", "fejl");
      }
    }
    if (!svar) svar = MojnBot.svar(tekst);

    tænker.remove();
    boble("bot", svar, viaClaude ? "" : "regel");
    historik.push({ role: "assistant", text: svar });
    gemHistorik();
    send.disabled = false;
    input.focus();
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const t = input.value.trim();
    if (!t) return;
    input.value = "";
    svarPaa(t);
  });

  document.getElementById("forslag").addEventListener("click", e => {
    const b = e.target.closest("button[data-t]");
    if (b) svarPaa(b.dataset.t);
  });

  document.getElementById("aabnIndstillinger").addEventListener("click", () => {
    apiKey.value = ClaudeKlient.getKey();
    model.value = ClaudeKlient.getModel();
    dlg.showModal();
  });
  document.getElementById("gem").addEventListener("click", () => {
    ClaudeKlient.setKey(apiKey.value);
    ClaudeKlient.setModel(model.value);
    opdaterStatus();
  });
  document.getElementById("rydNoegle").addEventListener("click", () => {
    ClaudeKlient.setKey("");
    apiKey.value = "";
    opdaterStatus();
  });
  document.getElementById("rydChat").addEventListener("click", () => {
    historik = [];
    localStorage.removeItem(HIST_KEY);
    chat.innerHTML = "";
    const t = hilsen();
    boble("bot", t);
    historik.push({ role: "assistant", text: t });
    gemHistorik();
    dlg.close();
  });

  input.focus();
})();
