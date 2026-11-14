/* MojnBot – UI */
(async () => {
  const scroll = document.getElementById("scroll");
  const chat = document.getElementById("chat");
  const tom = document.getElementById("tom");
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const send = document.getElementById("send");

  const HIST_KEY = "mojnbot.historik";
  let historik = [];
  try { historik = JSON.parse(localStorage.getItem(HIST_KEY) || "[]"); } catch (_) { historik = []; }

  const ordbog = await Oversaetter.load("data/ordbog.json");
  MojnBot.setGloser(ordbog.gloser);
  MojnBot.setViden(window.VIDEN);

  function besked(role, text, meta) {
    const el = document.createElement("div");
    el.className = "besked " + role + (meta ? " " + meta : "");
    if (role === "bot") {
      const av = document.createElement("div");
      av.className = "avatar";
      av.innerHTML = '<img src="assets/logo-512.png" alt="">';
      el.appendChild(av);
    }
    const t = document.createElement("div");
    t.className = "tekst";
    t.textContent = text;
    el.appendChild(t);
    chat.appendChild(el);
    tom.classList.add("skjult");
    scroll.scrollTop = scroll.scrollHeight;
    return el;
  }

  const gemHistorik = () => localStorage.setItem(HIST_KEY, JSON.stringify(historik.slice(-80)));
  const vent = ms => new Promise(r => setTimeout(r, ms));

  if (historik.length) historik.forEach(m => besked(m.role === "user" ? "bruger" : "bot", m.text));

  async function svarPaa(tekst) {
    besked("bruger", tekst);
    historik.push({ role: "user", text: tekst });
    gemHistorik();
    send.disabled = true;

    const taenker = besked("bot", "", "taenker");
    taenker.querySelector(".tekst").innerHTML = '<span class="prik"></span><span class="prik"></span><span class="prik"></span>';
    const svar = MojnBot.svar(tekst);
    await vent(Math.min(3200, 700 + svar.length * 12 + Math.random() * 600));

    taenker.remove();
    besked("bot", svar);
    historik.push({ role: "assistant", text: svar });
    gemHistorik();
    send.disabled = false;
    input.focus();
  }

  function indsend() {
    const t = input.value.trim();
    if (!t || send.disabled) return;
    input.value = "";
    input.style.height = "auto";
    svarPaa(t);
  }

  form.addEventListener("submit", e => { e.preventDefault(); indsend(); });
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); indsend(); }
  });
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(160, input.scrollHeight) + "px";
  });

  document.getElementById("forslag").addEventListener("click", e => {
    const b = e.target.closest("button[data-t]");
    if (b && !send.disabled) svarPaa(b.dataset.t);
  });

  document.getElementById("rydChat").addEventListener("click", () => {
    if (historik.length && !confirm("Ny samtale? Så glemme æ ålt, å Gunnar å Birgit starte forfra.")) return;
    historik = [];
    localStorage.removeItem(HIST_KEY);
    MojnBot.nulstil();
    chat.innerHTML = "";
    tom.classList.remove("skjult");
    input.focus();
  });

  input.focus();
})();
