/* MojnBot – UI */
(async () => {
  const chat = document.getElementById("chat");
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const send = document.getElementById("send");

  const HIST_KEY = "mojnbot.historik";
  let historik = [];
  try { historik = JSON.parse(localStorage.getItem(HIST_KEY) || "[]"); } catch (_) { historik = []; }

  const ordbog = await Oversaetter.load("data/ordbog.json");
  MojnBot.setGloser(ordbog.gloser);
  MojnBot.setViden(window.VIDEN);

  function boble(role, text, meta) {
    const el = document.createElement("div");
    el.className = "boble " + role + (meta ? " " + meta : "");
    el.textContent = text;
    chat.appendChild(el);
    chat.scrollTop = chat.scrollHeight;
    return el;
  }

  function gemHistorik() {
    localStorage.setItem(HIST_KEY, JSON.stringify(historik.slice(-60)));
  }

  function hilsen() {
    const h = new Date().getHours();
    const tid = h < 10 ? "Goj morn" : h < 18 ? "Mojn" : "Goj awten";
    return `${tid}! Æ æ MojnBot. Æ snakke kun synnejysk, men do må skryw lich som do vil. Spøe mæ om byer, kaffe, ringrien, Æ Spritte, elle hva der sker nee ve naboerne. Hva ska vi snak om?`;
  }

  if (historik.length) {
    historik.forEach(m => boble(m.role === "user" ? "bruger" : "bot", m.text));
  } else {
    const t = hilsen();
    boble("bot", t);
    historik.push({ role: "assistant", text: t });
    gemHistorik();
  }

  const vent = ms => new Promise(r => setTimeout(r, ms));

  async function svarPaa(tekst) {
    boble("bruger", tekst);
    historik.push({ role: "user", text: tekst });
    gemHistorik();
    send.disabled = true;
    input.disabled = true;

    // Tænkepause: tre prikker, længde afhænger af svarets længde
    const taenker = boble("bot", "", "taenker");
    taenker.innerHTML = '<span class="prik"></span><span class="prik"></span><span class="prik"></span>';
    const svar = MojnBot.svar(tekst);
    const ms = Math.min(3200, 600 + svar.length * 14 + Math.random() * 500);
    await vent(ms);

    taenker.remove();
    boble("bot", svar);
    historik.push({ role: "assistant", text: svar });
    gemHistorik();
    send.disabled = false;
    input.disabled = false;
    input.focus();
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const t = input.value.trim();
    if (!t || send.disabled) return;
    input.value = "";
    svarPaa(t);
  });

  document.getElementById("forslag").addEventListener("click", e => {
    const b = e.target.closest("button[data-t]");
    if (b && !send.disabled) svarPaa(b.dataset.t);
  });

  document.getElementById("rydChat").addEventListener("click", () => {
    if (!confirm("Ryd samtalen å glem ålt? (Gunnar å Birgit starte forfra.)")) return;
    historik = [];
    localStorage.removeItem(HIST_KEY);
    MojnBot.nulstil();
    chat.innerHTML = "";
    const t = hilsen();
    boble("bot", t);
    historik.push({ role: "assistant", text: t });
    gemHistorik();
  });

  input.focus();
})();
