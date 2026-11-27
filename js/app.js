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

  function besked(role, text, meta, info) {
    const el = document.createElement("div");
    el.className = "besked " + role + (meta ? " " + meta : "");
    if (role === "bot") {
      const av = document.createElement("div");
      av.className = "avatar";
      av.innerHTML = '<img src="assets/logo.svg?v=3" alt="">';
      el.appendChild(av);
    }
    const ind = document.createElement("div");
    ind.className = "indhold";
    const t = document.createElement("div");
    t.className = "tekst";
    t.textContent = text;
    ind.appendChild(t);
    if (role === "bot" && !meta) ind.appendChild(handlinger(el, text, info || {}));
    el.appendChild(ind);
    chat.appendChild(el);
    tom.classList.add("skjult");
    scroll.scrollTop = scroll.scrollHeight;
    return el;
  }

  /* ---------- Knapper under hvert svar: 👎 og del ---------- */
  const IKON_NED = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.1 10 14H4.2a2 2 0 0 1-1.9-2.6l2.3-7A2 2 0 0 1 6.5 3H17v11l-4 8a3 3 0 0 1-4-3.9Z"/></svg>';
  const IKON_DEL = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/></svg>';

  function forrigeBrugerTekst(el) {
    let p = el.previousElementSibling;
    while (p && !p.classList.contains("bruger")) p = p.previousElementSibling;
    return p ? p.querySelector(".tekst").textContent : "";
  }

  function handlinger(el, text, info) {
    const bar = document.createElement("div");
    bar.className = "handlinger";
    const ned = document.createElement("button");
    ned.type = "button"; ned.className = "hk"; ned.title = "Dårligt svar"; ned.setAttribute("aria-label", "Dårligt svar");
    ned.innerHTML = IKON_NED;
    ned.addEventListener("click", () => {
      if (ned.classList.contains("valgt")) return;
      ned.classList.add("valgt");
      sendFeedback({ bruger: forrigeBrugerTekst(el), svar: text, kilde: info.kilde || "?" });
      toast("Tak! Æ ska præw å bliw bejer.");
    });
    const del = document.createElement("button");
    del.type = "button"; del.className = "hk"; del.title = "Del"; del.setAttribute("aria-label", "Del");
    del.innerHTML = IKON_DEL;
    del.addEventListener("click", () => delSvar(forrigeBrugerTekst(el), text));
    bar.append(ned, del);
    return bar;
  }

  let toastTimer;
  function toast(t) {
    let el = document.getElementById("toast");
    if (!el) { el = document.createElement("div"); el.id = "toast"; document.body.appendChild(el); }
    el.textContent = t;
    el.classList.add("vis");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("vis"), 2600);
  }

  function sendFeedback(fb) {
    const rec = { ...fb, tid: new Date().toISOString(), side: location.pathname, sprog: navigator.language };
    try {
      const lokal = JSON.parse(localStorage.getItem("mojnbot.feedback") || "[]");
      lokal.push(rec); localStorage.setItem("mojnbot.feedback", JSON.stringify(lokal.slice(-50)));
    } catch (_) {}
    if (!CFG.workerUrl) return;
    fetch(CFG.workerUrl.replace(/\/$/, "") + "/feedback", {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(rec)
    }).catch(() => {});
  }

  /* Del: tegn samtalen som et billede med logo */
  const logoImg = new Image();
  logoImg.src = "assets/logo-512.png?v=3";

  function ombryd(ctx, tekst, maks) {
    const linjer = [];
    for (const afsnit of String(tekst).split("\n")) {
      let l = "";
      for (const ord of afsnit.split(/\s+/)) {
        const proeve = l ? l + " " + ord : ord;
        if (ctx.measureText(proeve).width > maks && l) { linjer.push(l); l = ord; } else l = proeve;
      }
      linjer.push(l);
    }
    return linjer;
  }

  function tegnDelebillede(spm, svar) {
    const W = 1080, P = 70, maks = W - P * 2 - 80;
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    const font = s => `${s}px system-ui, -apple-system, "Segoe UI", sans-serif`;
    ctx.font = font(38);
    const lSpm = spm ? ombryd(ctx, spm, maks - 60) : [];
    const lSvar = ombryd(ctx, svar, maks);
    const LH = 54;
    const hSpm = lSpm.length ? lSpm.length * LH + 50 : 0;
    const H = Math.max(1080, 260 + hSpm + 60 + lSvar.length * LH + 160);
    c.width = W; c.height = H;
    ctx.fillStyle = "#f6f1e6"; ctx.fillRect(0, 0, W, H);
    // top
    if (logoImg.complete && logoImg.naturalWidth) ctx.drawImage(logoImg, P, 60, 120, 120);
    ctx.fillStyle = "#6a2c1a"; ctx.font = "bold " + font(64); ctx.fillText("MojnBot", P + 145, 140);
    let y = 260;
    // brugerens boble (højre)
    if (lSpm.length) {
      ctx.font = font(38);
      const bw = Math.min(maks, Math.max(...lSpm.map(l => ctx.measureText(l).width)) + 60);
      const bh = lSpm.length * LH + 30;
      ctx.fillStyle = "#e9dcc4";
      ctx.beginPath(); ctx.roundRect(W - P - bw, y, bw, bh, 34); ctx.fill();
      ctx.fillStyle = "#2b1d14";
      lSpm.forEach((l, i) => ctx.fillText(l, W - P - bw + 30, y + 52 + i * LH));
      y += bh + 50;
    }
    // botten
    if (logoImg.complete && logoImg.naturalWidth) {
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(P + 30, y + 22, 34, 0, Math.PI * 2); ctx.fill();
      ctx.drawImage(logoImg, P + 6, y - 2, 48, 48);
    }
    ctx.fillStyle = "#2b1d14"; ctx.font = font(38);
    lSvar.forEach((l, i) => ctx.fillText(l, P + 90, y + 36 + i * LH));
    // bund
    ctx.fillStyle = "#c9572a"; ctx.fillRect(0, H - 90, W, 90);
    ctx.fillStyle = "#fff"; ctx.font = "bold " + font(32);
    ctx.fillText("folmerfestersen.github.io/MojnBot", P, H - 34);
    ctx.font = font(28); ctx.textAlign = "right"; ctx.fillText("Bygget mæ snaps i æ kaffe", W - P, H - 36);
    ctx.textAlign = "left";
    return c;
  }

  async function delSvar(spm, svar) {
    const c = tegnDelebillede(spm, svar);
    const blob = await new Promise(r => c.toBlob(r, "image/png"));
    if (!blob) return;
    const fil = new File([blob], "mojnbot.png", { type: "image/png" });
    try {
      if (navigator.canShare && navigator.canShare({ files: [fil] })) {
        await navigator.share({ files: [fil], title: "MojnBot", text: "Se lich hva MojnBot soj! https://folmerfestersen.github.io/MojnBot/" });
        return;
      }
    } catch (e) { if (e.name === "AbortError") return; }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "mojnbot.png";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast("Æ billed æ gemt. Del det mæ hvem do vil!");
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

  if (historik.length) historik.forEach(m => besked(m.role === "user" ? "bruger" : "bot", m.text, null, { kilde: m.kilde }));

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
    let svar = analyse.svar, kilde = "regel";
    if (!svar && ai) { svar = await spoergAI(analyse); if (svar) kilde = "ai"; }
    if (!svar) svar = MojnBot.fallback(analyse);
    const oensket = Math.min(3200, 700 + svar.length * 12 + Math.random() * 600);
    await vent(Math.max(0, oensket - (Date.now() - start)));

    taenker.remove();
    besked("bot", svar, null, { kilde });
    historik.push({ role: "assistant", text: svar, kilde });
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
  const FORSLAG = [
    { t: "Hvem er du?", s: "Hvem æ do?", u: "Lær MojnBot å kinne" },
    { t: "Fortæl om spritbådene fra Sønderborg", s: "Æ Spritte", u: "Spritbådene fra Synneborre" },
    { t: "Hvad sker der med Gunnar og Birgit fra nummer 16?", s: "Nummer 16", u: "Sladder fra æ vej" },
    { t: "Fortæl mig om det sønderjyske kaffebord", s: "Æ kaffeboe", u: "Syw slaus kach, mindst" },
    { t: "Hvad ved du om Rødekro?", s: "Røekro", u: "Elle en anne by" },
    { t: "Hvad sker der med Moster Erna fra Bodum?", s: "Moster Erna", u: "Nyt fra Bodum" },
    { t: "Hvad har præsten fra Tingle nu lavet?", s: "Æ præst fra Tingle", u: "Der æ uro i æ kirk" },
    { t: "Hvordan har julemanden fra Løjt det?", s: "Æ julemand", u: "Poul fra Løjt" },
    { t: "Hvad laver Tykmælk Junior?", s: "Tykmælk Junior", u: "Fra Vestergade" },
    { t: "Fortæl om ringridning", s: "Ringrien", u: "Hest, lans å øl" },
    { t: "Hvad ved du om Genforeningen?", s: "Genforeningen", u: "1920 å hele æ histori" },
    { t: "Fortæl en vits", s: "En vits", u: "Lidt synnejysk humor" },
    { t: "Hvad ved du om Tønder?", s: "Tynne", u: "Festival å marsk" },
    { t: "Hvad ved du om Als?", s: "Als", u: "Øen i æ øst" },
    { t: "Hvad spiser man i Sønderjylland?", s: "Synnejysk mad", u: "Sortsuppe å kach" },
    { t: "Hvad synes du om København?", s: "Kjøffenhaun", u: "Hva tøs do om æ hovedstad?" },
    { t: "Hvad er rummelpot?", s: "Rummelpot", u: "Nytårsaften på æ land" },
    { t: "Hvordan er vejret i dag?", s: "Æ vejr", u: "Blæst å moll" }
  ];
  const OVERSAET_KORT = { t: "oversæt", s: "Øwersæt nau", u: "Rigsdansk → synnejysk", o: true };
  const forslagEl = document.getElementById("forslag");

  function blandForslag() {
    const pulje = [...FORSLAG];
    for (let i = pulje.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pulje[i], pulje[j]] = [pulje[j], pulje[i]]; }
    const valgte = [...pulje.slice(0, 5), OVERSAET_KORT];
    forslagEl.innerHTML = "";
    for (const f of valgte) {
      const b = document.createElement("button");
      b.type = "button"; b.dataset.t = f.t;
      if (f.o) b.dataset.oversaet = "";
      const st = document.createElement("strong"); st.textContent = f.s;
      const sp = document.createElement("span"); sp.textContent = f.u;
      b.append(st, sp);
      forslagEl.appendChild(b);
    }
  }

  forslagEl.addEventListener("click", e => {
    const b = e.target.closest("button[data-t]");
    if (!b || send.disabled) return;
    if (b.dataset.oversaet !== undefined) {
      svarPaa("Oversæt: " + OVERSAET_FRASER[Math.floor(Math.random() * OVERSAET_FRASER.length)]);
    } else {
      svarPaa(b.dataset.t);
    }
  });

  /* Dagens oe: samme ord for alle på samme dato */
  const dagensOrdEl = document.getElementById("dagensOrd");
  function visDagensOrd() {
    // Kun ægte sønderjyske gloser: ingen småord, egennavne eller ord, resten af landet også bruger
    const UDEN = new Set(["mojn", "nau", "lich", "hæ", "goj", "meje", "ålle", "hee", "jem", "wo", "vå", "gek", "soj", "daw", "jen", "tow", "trej", "fie", "syw", "ååt", "tyyw", "klok", "ring", "pråblem", "put", "pot", "bull", "kjø", "wie", "svat", "røj", "biel", "boch", "moe", "fae", "broe", "duels"]);
    const ord = Object.keys(ordbog.gloser || {})
      .filter(k => k.length > 3 && !UDEN.has(k) && k === k.toLowerCase() && !/[\/(]/.test(k)).sort();
    if (!ord.length) return;
    const dato = new Date().toLocaleDateString("sv-SE");
    let h = 0; for (const ch of dato) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const o = ord[h % ord.length];
    const betydning = String(ordbog.gloser[o]).split(".")[0];
    dagensOrdEl.innerHTML = "";
    const lbl = document.createElement("small"); lbl.textContent = "Dagens oe";
    const w = document.createElement("strong"); w.textContent = o;
    const b = document.createElement("span"); b.textContent = betydning;
    dagensOrdEl.append(lbl, w, b);
    dagensOrdEl.hidden = false;
    dagensOrdEl.onclick = () => { if (!send.disabled) svarPaa("Hvad betyder " + o + "?"); };
  }

  blandForslag();
  visDagensOrd();

  /* Åbnet fra ordbogen med ?q=…: stil spørgsmålet med det samme */
  const qParam = new URLSearchParams(location.search).get("q");
  if (qParam && qParam.trim()) {
    history.replaceState(null, "", location.pathname + location.hash);
    setTimeout(() => svarPaa(qParam.trim().slice(0, 500)), 300);
  }

  /* Besøgstæller: én gang pr. browser pr. dag */
  (async () => {
    if (!CFG.workerUrl) return;
    const el = document.getElementById("besog");
    const idag = new Date().toLocaleDateString("sv-SE");
    let metode = "GET";
    try { if (localStorage.getItem("mojnbot.besog") !== idag) metode = "POST"; } catch (_) {}
    try {
      const r = await fetch(CFG.workerUrl.replace(/\/$/, "") + "/besog", { method: metode });
      const d = await r.json();
      if (!d.ok || !d.antal) return;
      if (metode === "POST") try { localStorage.setItem("mojnbot.besog", idag); } catch (_) {}
      el.textContent = ` · ☕ ${d.antal.toLocaleString("da-DK")} hæ væt tæ kaffe ve MojnBot`;
      el.hidden = false;
    } catch (_) {}
  })();

  /* Småkach-popup (for sjov) */
  const SMAAKACH_KEY = "mojnbot.smaakach";
  const smaakach = document.getElementById("smaakach");
  const SMAAKACH_SVAR = {
    naj: ["Nå nå, så fe do ingen kach. Men do må gern blyw lichevel.", "Så hæ do fået lov å sidde ve æ kaffeboe uden kach. Det æ synd for dæ."],
    aggevas: ["Det ve æ goj! Kach hæ ålle gjoet nauen fortræd.", "Sefølle it. Så spise do jo ås syw slaus."],
    fint: ["Glant! Æ sætte æ kaffe over.", "Det æ en goj jen. Do fe den mæ æ mest flødeskum."]
  };
  try {
    if (!localStorage.getItem(SMAAKACH_KEY)) setTimeout(() => { smaakach.hidden = false; requestAnimationFrame(() => smaakach.classList.add("vis")); }, 1200);
  } catch (_) {}
  smaakach.addEventListener("click", e => {
    const b = e.target.closest("button[data-valg]");
    if (!b) return;
    try { localStorage.setItem(SMAAKACH_KEY, b.dataset.valg); } catch (_) {}
    smaakach.classList.remove("vis");
    setTimeout(() => { smaakach.hidden = true; }, 250);
    const s = SMAAKACH_SVAR[b.dataset.valg];
    toast(s[Math.floor(Math.random() * s.length)]);
  });

  document.getElementById("rydChat").addEventListener("click", () => {
    if (historik.length && !confirm("Vil do slet æ samtale å start forfra?")) return;
    historik = [];
    localStorage.removeItem(HIST_KEY);
    MojnBot.nulstil();
    chat.innerHTML = "";
    blandForslag();
    tom.classList.remove("skjult");
    input.focus();
  });

  input.focus();
})();
