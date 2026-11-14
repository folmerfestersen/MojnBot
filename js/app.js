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

  /* ---------- AI via Cloudflare Worker (valgfri) ---------- */
  const CFG = window.MOJNBOT_CONFIG || {};
  const KVOTE_KEY = "mojnbot.kvoteBrugt";
  const utcDato = () => new Date().toISOString().slice(0, 10);
  const aiAktiv = () => !!CFG.workerUrl && localStorage.getItem(KVOTE_KEY) !== utcDato();

  async function spoergAI(analyse) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), CFG.timeoutMs || 15000);
    try {
      const kontekst = [...analyse.kontekst];
      if (analyse.hint) kontekst.push("Et forslag tæ et svar (du må gern skryw dit eget): " + analyse.hint);
      const res = await fetch(CFG.workerUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          beskeder: historik.slice(-12), kontekst: kontekst.join("\n"), profil: MojnBot.profil(),
          system: (CFG.metode === "oversaet" ? window.MOJNBOT_PROMPT_DA : window.MOJNBOT_PROMPT)
            .replace("{ORDBOG}", Oversaetter.ordbogTilAI(analyse.raw, ordbog.gloser))
            .replace("{FORSTAAELSE}", Oversaetter.forstaaelse(analyse.raw, ordbog.gloser) || "(beskeden er på rigsdansk)"),
          model: CFG.model, temperature: CFG.temperature
        }),
        signal: ctrl.signal
      });
      const data = await res.json().catch(() => ({}));
      if (data.grund === "kvote") localStorage.setItem(KVOTE_KEY, utcDato());
      if (!res.ok || data.fallback || !data.svar) { console.info("MojnBot: regelmotor tager over", data.grund || res.status); return null; }
      return CFG.metode === "oversaet" ? Oversaetter.efterbehandl(Oversaetter.oversaet(data.svar)) : Oversaetter.efterbehandl(data.svar);
    } catch (e) {
      console.info("MojnBot: AI utilgængelig, regelmotor tager over", e.name);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  if (historik.length) historik.forEach(m => besked(m.role === "user" ? "bruger" : "bot", m.text));

  async function svarPaa(tekst) {
    besked("bruger", tekst);
    historik.push({ role: "user", text: tekst });
    gemHistorik();
    send.disabled = true;

    const taenker = besked("bot", "", "taenker");
    taenker.querySelector(".tekst").innerHTML = '<span class="prik"></span><span class="prik"></span><span class="prik"></span>';
    const start = Date.now();
    const ai = aiAktiv();
    const analyse = MojnBot.analyser(tekst, ai);
    let svar = analyse.svar;
    if (!svar && ai) svar = await spoergAI(analyse);
    if (!svar) svar = MojnBot.fallback(analyse);
    const oensket = Math.min(3200, 700 + svar.length * 12 + Math.random() * 600);
    await vent(Math.max(0, oensket - (Date.now() - start)));

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

  const OVERSAET_FRASER = [
    "Jeg vil gerne have en kop kaffe og et stykke kage",
    "Hvad laver du i weekenden?",
    "Jeg har ikke tid i dag, jeg skal på arbejde",
    "Kan du ikke lige hjælpe mig med at bære sofaen?",
    "Det regner, så vi bliver hjemme og ser fjernsyn",
    "Min mor siger, at jeg skal komme hjem til aftensmad",
    "Hvor har du parkeret bilen?",
    "Jeg er så træt, jeg går i seng nu",
    "Skal vi tage til Tyskland og købe øl på lørdag?",
    "Hvad hedder din hund?",
    "Jeg glæder mig til jul",
    "Tak for i dag, det var hyggeligt",
    "Hvordan har du det i dag?",
    "Jeg har glemt min nøgle hjemme",
    "Vi ses i morgen ved kirken",
    "Hun er min bedste veninde",
    "Det er alt for dyrt i København",
    "Han kører alt for stærkt på motorvejen"
  ];
  document.getElementById("forslag").addEventListener("click", e => {
    const b = e.target.closest("button[data-t]");
    if (!b || send.disabled) return;
    if (b.dataset.oversaet !== undefined) {
      svarPaa("Oversæt: " + OVERSAET_FRASER[Math.floor(Math.random() * OVERSAET_FRASER.length)]);
    } else {
      svarPaa(b.dataset.t);
    }
  });

  document.getElementById("rydChat").addEventListener("click", () => {
    if (historik.length && !confirm("Vil do slet æ samtale å start forfra?")) return;
    historik = [];
    localStorage.removeItem(HIST_KEY);
    MojnBot.nulstil();
    chat.innerHTML = "";
    tom.classList.remove("skjult");
    input.focus();
  });

  input.focus();
})();
