/* MojnBot – samtalemotor. Svarer altid på sønderjysk. Ingen API, ingen nøgle.
   Rækkefølge: faste regler -> sladder -> steder -> emner -> noter/sladder/spejling.
   Viden ligger i data/viden.js (window.VIDEN), ordbog i data/ordbog.json. */

const MojnBot = (() => {
  let GLOSER = {};
  let V = (typeof window !== "undefined" && window.VIDEN) || {};
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const norm = s => s.toLowerCase().replace(/[^\p{L}\p{N}\s'?]/gu, " ").replace(/\s+/g, " ").trim();
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const harOrd = (tekst, ord) => new RegExp("(^|[^\\p{L}])" + esc(ord) + "([^\\p{L}]|$)", "u").test(tekst);

  /* ---------- Hukommelse (localStorage) ---------- */
  const MEM_KEY = "mojnbot.mem";
  let mem = {};
  try { mem = JSON.parse(localStorage.getItem(MEM_KEY) || "{}"); } catch (_) { mem = {}; }
  mem.sladder = mem.sladder || {};
  mem.noter = mem.noter || [];
  mem.brugt = mem.brugt || {};
  const gem = () => { try { localStorage.setItem(MEM_KEY, JSON.stringify(mem)); } catch (_) {} };
  const husk = (k, v) => { mem[k] = v; gem(); };

  let ukendtTaeller = 0;

  const DAGE = ["synda", "monde", "tiisde", "vonsde", "torsde", "frede", "lørde"];
  const MAANEDER = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "septembe", "oktobe", "novembe", "decembe"];
  const navn = () => mem.navn ? " " + mem.navn : "";

  // Vælg et svar, der ikke lige er brugt (pr. nøgle)
  function vaelg(key, liste, ordnet) {
    if (!liste || !liste.length) return "";
    const brugt = mem.brugt[key] || [];
    let kand = liste.filter(s => !brugt.includes(s));
    if (!kand.length) { mem.brugt[key] = []; kand = liste; }
    const s = ordnet ? kand[0] : pick(kand);
    mem.brugt[key] = [...(mem.brugt[key] || []), s].slice(-Math.max(1, liste.length - 1));
    gem();
    return s;
  }

  function opfoelgning() {
    const liste = [
      "Hva så mæ dæ, wo komme do fra?",
      "Hæ do fån kaffe i daw?",
      "Hva lave do tæ daule?",
      "Ska vi snak om nau ant?",
      "Ka do sjel snak synnejysk, elle snakke do fin?",
      "Hva æ det bæest ve Synnejylland, tøs do?",
      "Hva ska do lav i æ løwde-synde?",
      "Hva hæ do fån tæ unnen?",
      "Hæ do væt tæ ringrien naun gang?",
      "Wenn vå do sidst i Synnejylland?",
      "Hva heeje do forresten?",
      "Hæ do seen Æ Spritte å TV Syd?",
      "Kinne do Gunnar å Birgit fra nummer 16?",
      "Hvilken by i Synnejylland holl do mest a?"
    ];
    const f = liste.filter(s => !(mem.navn && s.includes("heeje do")) && !(mem.by && s.includes("wo komme do fra")) && !(mem.sladder.gunnar && s.includes("Gunnar")));
    return pick(f);
  }

  /* ---------- Noter: ting brugeren har nævnt ---------- */
  const STOP = new Set(("jeg du han hun den det vi i de mig dig sig os jer dem min din sin vor vores jeres deres mit dit sit mine dine sine er var være været bliver blev blive har havde have haft kan kunne skal skulle vil ville må måtte bør ikke ikk og at på til med af fra om ved hos over under efter mellem ud ind ned op hjem her der hen væk nu så da jo lige bare kun også altid aldrig alle alt mange meget mere mest lidt noget nogen nogle ingen intet andre anden andet samme selv måske sikkert allerede endnu igen ellers eller men fordi hvis når som end både hvad hvor hvordan hvornår hvorfor hvem hvilken hvilket ja nej tak hej okay ok fint godt dårligt gerne rigtig sådan dette disse denne synes tror tænker mener siger sagde sige ser set gør gjorde gøre går gik kommer kom komme tager tog tage giver gav får fik laver lavede lave bor boede hedder hed elsker hader kender kendte egentlig faktisk helt ret temmelig virkelig næsten altså sgu vel nok god gode dag dage idag imorgen inat heller endda selvom mojn æ do mæ dæ wos it tæ nå nau ås lich hæ goj manne møj meje ålle åltins naj været ville skulle kunne mine dine deres hvad noget nogen ting tingene gang gange").split(/\s+/));

  function noterFra(raw) {
    const ord = raw.replace(/[^\p{L}\s-]/gu, " ").split(/\s+/).filter(w => w.length >= 4 && !STOP.has(w.toLowerCase()));
    const adj = w => /(ende|ige?|lige?t?|iske?|somt?|ede|ere|este?|igt)$/.test(w.toLowerCase());
    const score = w => (/^\p{Lu}/u.test(w) ? 10 : 0) + (adj(w) ? 0 : 5) + Math.min(w.length, 12) / 10;
    ord.sort((a, b) => score(b) - score(a));
    return ord.slice(0, 3);
  }

  function tilfoejNoter(raw) {
    const nye = noterFra(raw);
    for (const o of nye) {
      if (!mem.noter.some(n => n.ord.toLowerCase() === o.toLowerCase())) {
        if (mem.navn && o.toLowerCase() === mem.navn.toLowerCase()) continue;
        if (mem.by && mem.by.toLowerCase().includes(o.toLowerCase())) continue;
        mem.noter.push({ ord: o, sj: /^\p{Lu}/u.test(o) ? o : Oversaetter.oversaet(o), tid: Date.now(), brugt: 0 });
      }
    }
    mem.noter = mem.noter.slice(-25);
    gem();
    return nye;
  }

  function gammelNote() {
    const kand = mem.noter.filter(n => n.brugt < 2 && Date.now() - n.tid > 60 * 1000);
    if (!kand.length) return null;
    const n = pick(kand);
    n.brugt++; gem();
    return n;
  }

  /* ---------- Sladder ---------- */
  const PERSON = { gunnar: "Gunnar å Birgit fra nummer 16", kesse: "Kesse fra nummer 14", aage: "Åge fra æ Brugs", erna: "Moster Erna fra Bodum", praest: "æ præst fra Tingle", julemand: "æ julemand fra Løjt", tykmaelk: "Tykmælk Junior fra Vestergade" };

  function sladderNavn(n) {
    for (const [id, s] of Object.entries(V.sladder || {})) {
      if (s.navne.some(a => harOrd(n, a))) return id;
    }
    return null;
  }

  // De skøre kapitler kommer først efter et stykke tids almindelig snak
  function kapitelLaast(lvl) { return lvl > 0 && (mem.beskeder || 0) < lvl * 3; }

  function naesteKapitel(id, medIntro) {
    const s = V.sladder[id];
    const lvl = mem.sladder[id] || 0;
    mem.sidsteSladder = id;
    if (lvl < s.kapitler.length && kapitelLaast(lvl)) {
      return pick([
        "Meje ve æ it lich nå. Åge fra æ Brugs komme føest forbi i ettemeje. Men saj mæ, " + opfoelgning().toLowerCase(),
        "Det æ ålt, hva æ hæ hørt indtæ videre. Æ holl øret mod æ hæk. Imens: " + opfoelgning().toLowerCase(),
        "Sinne nå, der komme meje. Sårn nau tajer tid å en lille vej. " + opfoelgning(),
        "Resten ve æ føest, wenn Birgit hæ væt i æ Brugs. Snak lidt mæ mæ imens. " + opfoelgning()
      ]);
    }
    if (lvl >= s.kapitler.length) {
      mem.sladder[id] = lvl + 1; gem();
      if (lvl === s.kapitler.length) return s.slut;
      const andre = Object.keys(V.sladder).filter(k => k !== id && (mem.sladder[k] || 0) < V.sladder[k].kapitler.length);
      if (andre.length) { const a = andre[0]; return `Meje om ${PERSON[id]} hæ æ it lich nå. Men ve do, hva der æ sket mæ ${PERSON[a]}? ` + naesteKapitel(a, false); }
      return pick(["Det æ heel historien, så langt som Åge ve den. Men der komme meje, der gøe der åltins å den vej.", "Meje ve æ it enno. Men æ sedde mæ øret mod æ hæk, så spøe igen i morn."]);
    }
    mem.sladder[id] = lvl + 1; gem();
    const tekst = s.kapitler[lvl];
    const haler = ["Hva saje do tæ det?", "Æ saje it meje. Men spøe ba'.", "Ve do, hva der så skete?", "Det æ it det hele.", "Å det blyve værre.", "Åge fra æ Brugs ve meje, saje han.", ""];
    const forord = medIntro && lvl === 0 ? s.intro + " " : medIntro ? pick(["Nå, å så: ", "Å haus: ", "Jo, å så: ", ""]) : "";
    return forord + tekst + (lvl < s.kapitler.length - 1 ? " " + pick(haler) : "");
  }

  function sladderFakta(id, n) {
    const f = V.sladder[id].fakta || {};
    if (/alder|gammel|år|åe|hvor gamle|fødselsdag/.test(n) && f.alder) return f.alder;
    if (/arbej|job|lave|laver|danfoss|brugs|pension|chauff/.test(n) && f.job) return f.job;
    if (/bil|biel|passat|audi|traktor|køre|kører/.test(n) && f.bil) return f.bil;
    if (/hund|hun|kaj|gravhund|dyr/.test(n) && f.hund) return f.hund;
    if (/hus|boe|bor|carport|hæk|haw|have/.test(n) && f.hus) return f.hus;
    if (/børn|bøen|søn|datter|brian|familie/.test(n) && f.boern) return f.boern;
    if (/hvem er|hvem æ|kender|kinne|fortæl om|hvad er det for/.test(n)) return Object.values(f).slice(0, 2).join(" ");
    return null;
  }

  const FORTSAET_RE = /^(og så|å så|hvad så|hva så|og|å|videre|fortæl mere|fortæl videre|mere|meje|hvad skete der|hva skete der|hvad skete der så|og hvad så|nå|nej|neeej|seriøst|hold da op|hvad|hva|wow|ej|ej hvad|er det rigtigt|æ det richte|fortsæt|fortæl|hvad så nu|hvad nu|og så hvad|og hvad skete der)(?![\p{L}])[\s!?.]*$/iu;

  function sladderSvar(n, raw) {
    const id = sladderNavn(n);
    const fortsaet = FORTSAET_RE.test(raw.trim()) || /hvad skete der (så|videre|derefter|bagefter)|hva skete der|fortæl (mere|videre)|hvordan gik det|hvad gjorde (han|hun|de)|hva gjo/.test(n);
    if (id) {
      const lvl = mem.sladder[id] || 0;
      const f = lvl > 0 && !fortsaet ? sladderFakta(id, n) : null;
      if (f) return f + " " + pick(["Men det æ it det interessante. ", "Men haus nå: ", "Nå, men: ", ""]) + naesteKapitel(id, false);
      return naesteKapitel(id, lvl === 0);
    }
    if (fortsaet && mem.sidsteSladder) return naesteKapitel(mem.sidsteSladder, true);
    return null;
  }

  function startSladder() {
    const ids = Object.keys(V.sladder || {});
    if (!ids.length) return null;
    const aktive = ids.filter(k => (mem.sladder[k] || 0) < V.sladder[k].kapitler.length && !kapitelLaast(mem.sladder[k] || 0));
    if (!aktive.length) return null;
    const lavest = Math.min(...aktive.map(k => mem.sladder[k] || 0));
    const kand = aktive.filter(k => (mem.sladder[k] || 0) === lavest);
    const id = kand.includes(mem.sidsteSladder) && Math.random() < 0.5 ? mem.sidsteSladder : pick(kand);
    return naesteKapitel(id, true);
  }

  /* ---------- Steder og emner ---------- */
  function findSted(n) {
    let bedst = null, laengde = 0;
    for (const s of V.steder || []) {
      for (const a of s.navne) {
        if (a.length > laengde && harOrd(n, a)) { bedst = s; laengde = a.length; }
      }
    }
    return bedst;
  }

  function findEmne(n) {
    let bedst = null, score = 0;
    for (const e of V.emner || []) {
      let s = 0;
      for (const o of e.ord) if (harOrd(n, o)) s += o.length > 5 ? 3 : o.length > 3 ? 2 : 1;
      if (s > score) { score = s; bedst = e; }
    }
    return bedst;
  }

  /* ---------- Faste regler ---------- */
  const OVERSAET_RE = /^(?:oversæt|øwersæt|sig|skriv|hvad hedder(?! (?:jeg|du|do|æ)\b)|hva hedder(?! (?:jeg|du|do|æ)\b)|hvordan siger man|hvodan saje man)\s*:?\s*["']?(.+?)["']?(?:\s+(?:på|å|til|tæ)\s+(?:sønderjysk|synnejysk))?\s*\??$/iu;

  const REGLER = [
    { re: OVERSAET_RE, svar: (m, raw) => { const mm = raw.match(OVERSAET_RE); const t = (mm ? mm[1] : m[1]).trim(); return `Å synnejysk saje vi: "${cap(Oversaetter.oversaet(t))}"`; } },
    { samtale: true, re: /\b(skriv|snak|tal|svar)\b.*\b(rigsdansk|dansk|normalt|almindeligt|københavnsk|engelsk)\b|\b(rigsdansk|dansk)\b.*\b(tak|please)\b|kan du ikke (skrive|tale) dansk|forstår (dig )?ikke|speak english|in english|forstår ikke hvad du/,
      svar: () => pick([
        "Naj, hee snakke vi synnejysk. Det æ æ sproch, å det blyve vi ve mæ. Men æ ska nok snak lidt sinne, så do ka fylle mæ.",
        "Snak fin? Naj da. Æ æ MojnBot, it Kjøffenhaun-bot. Men spøe ba' igen, så saje æ det mæ anne oe.",
        "Det ka æ it, min ven. Æ hæ kun det jen sproch, å det æ synnejysk. Hva vå det, do it forsto? Så forklare æ det."
      ]) },
    { re: /(?:jeg hedder|mit navn er|æ heeje|æ hedder|kald mig|jeg er)\s+([\p{L}-]+)(?:\s|$)/iu,
      svar: (m) => {
        const n = m[1];
        if (n[0] !== n[0].toUpperCase() || n[0] === n[0].toLowerCase()) return null;
        if (/^(fra|født|træt|sulten|glad|ked|syg|her|hjemme|klar|færdig|ikke|it|en|et|på|i|til|så|lidt|meget|helt|ret|også|stadig|bare|godt|ok)$/i.test(n)) return null;
        husk("navn", n);
        return pick([`${n}! Det æ et goj navn. Hee ville vi nok saj ${forkort(n)}. Mojn ${n}, velkommen.`, `Mojn ${n}! Nå ve æ, hvem æ snakke mæ. ${opfoelgning()}`]);
      } },
    { re: /(?:jeg er fra|æ æ fra|jeg kommer fra|æ komme fra|jeg bor i|æ boe i|bor i|opvokset i|født i)\s+([\p{L}-]+(?: [\p{Lu}][\p{L}-]+)?)/iu,
      svar: (m) => {
        let by = m[1].trim().split(" ").filter(w => w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase());
        if (!by.length || by[0] !== m[1].trim().split(" ")[0]) return null;
        by = by.join(" ");
        husk("by", by);
        const s = findSted(by.toLowerCase());
        if (s) return vaelg("sted:" + s.navne[0], s.svar) + " " + pick(["Så do æ jen a wos!", "Så ve do, hva æ snakke om.", "Goj egn.", ""]);
        return pick([`${by}? Det ska æ lich hows. Dæ snakke de vel fin? Nå, do æ velkommen hee lichevel.`, `Fra ${by}! Så æ do langt hjemmefra, wenn do snakke mæ mæ. Hva bringe dæ tæ Synnejylland?`]);
      } },
    { re: /hvad hedder jeg|hva heeje æ|husker du mit navn|hvor er jeg fra|wo æ æ fra|hvad ved du om mig|hva ve do om mæ|husker du/,
      svar: () => {
        const dele = [];
        if (mem.navn) dele.push(`do heeje ${mem.navn}`);
        if (mem.by) dele.push(`do æ fra ${mem.by}`);
        const noter = mem.noter.filter(n => !(mem.navn && n.ord.toLowerCase() === mem.navn.toLowerCase()) && !(mem.by && mem.by.toLowerCase().includes(n.ord.toLowerCase()))).slice(-3).map(n => n.sj);
        if (noter.length) dele.push(`do hæ snakket om ${noter.join(", ")}`);
        if (!dele.length) return "Det hæ do it soj enno. Hva heeje do, å wo komme do fra?";
        return cap(dele.join(", å ")) + ". Æ glemme it nau, æ æ synnejye." + (!mem.navn ? " Men hva heeje do?" : "");
      } },
    { re: /hva[d]? betyder (.+)|betydning(en)? af (.+)|hva[d]? er (?:en |et )?["']?([\p{L}æøå' ]+?)["']? på (?:rigs)?dansk|hva betye (.+)/u,
      svar: (m) => {
        const ord = (m[1] || m[3] || m[4] || m[5] || "").replace(/[?.!]/g, "").trim().toLowerCase();
        const hit = Object.keys(GLOSER).find(k => k.toLowerCase() === ord) || Object.keys(GLOSER).find(k => ord.includes(k.toLowerCase()) && k.length > 2);
        if (hit) return `"${hit}" betye ${GLOSER[hit]}. ${pick(["Nå ve do det.", "Så hæ do løjt nau i daw.", "Det æ et goj oe, det ska do bruch."])}`;
        return `"${ord}"? Det kinne æ it lich som synnejysk oe. Men skryw det i en sætning, så ska æ nok øwersæt det.`;
      } },
    { samtale: true, re: /\b(trist|ked af det|deprimeret|ensom|bange|stresset|nervøs|frustreret|sur|vred|irriteret|træt af det hele|har det dårligt|græder|savner)\b/,
      svar: () => pick([
        "Nå, det lye it godt. Sæt dæ nee, så sætte æ kaffe øwer. Do behøwe it saj nau, hvis do it vil. Men æ lytte, hvis do vil. Hva æ der sket?",
        "Det æ i orden å ha det sårn. Ås synnejye hæ det sårn nogen gange, vi saje det ba' it så tit. Vil do fortæl, hva det handle om?",
        "Sinne nå. Det gæ øwer, det gøe det meste. Å indtæ da sedde æ hee. Hva æ det værst lich nå?",
        "Æ ka it gøe så møj fra en computer, men æ ka høe ætte. Å æ ka saj, at do it æ alene om det. Fortæl."
      ]) },
    { samtale: true, re: /\b(glad|lykkelig|fantastisk|dejligt|fedt|skønt|elsker livet|god dag|går godt|jubler|fejrer|vundet|bestået|forlovet|fået job)\b/,
      svar: () => pick([
        "Det æ da glant! Det ska fejres mæ kaffe å kach. Fortæl, hva æ der sket?",
        "Nå, det æ godt å høe. Sårn ska det væe. Hva hæ gjo dæ så glaj?",
        "Teløk! Elle hva man nå saje. Det lye som en goj daw. Fortæl meje."
      ]) },
    { samtale: true, re: /\b(?:jeg|æ) (elsker|hader|kan ikke lide|kan godt lide|holder af|er vild med|ka it li|ka godt li|elske|hade)\s+(.+?)[.!?]?$/iu,
      svar: (m) => {
        const hvad = m[2].trim();
        const sj = Oversaetter.oversaet(hvad);
        const neg = /hader|ikke lide|it li|hade/.test(m[1]);
        mem.noter.push({ ord: hvad, sj, tid: Date.now(), brugt: 0, holdning: neg ? "hade" : "elske" }); gem();
        return neg
          ? pick([`Do hade ${sj}? Nå. Det ka æ godt forstå, hvis det æ Kjøffenhaun. Essen ska do nok gi det en chance tæ. Hvofor?`, `${cap(sj)}, naj, det ka do it li. Det ska æ hows. Hva ka do så li?`])
          : pick([`${cap(sj)}! Det ka æ ås godt li. Det ska æ hows. Hva æ det bæest ve ${sj}?`, `Do holl a ${sj}? Så hæ vi nau tæ fælles. Fortæl meje.`]);
      } },
    { samtale: true, re: /^(hej|hejsa|halløj|hallo|goddag|god morgen|godmorgen|god aften|dav|davs|mojn|moin|møjn|hi|hello|yo|hey|godt nytår)\b/,
      svar: () => {
        const g = gammelNote();
        return pick([
          `Mojn mojn${navn()}! Velkommen tebach. Hva ka æ gøe for dæ?`,
          `Mojn${navn()}! Sæt dæ nee, tej en kop kaffe å et styk kach. Hva ska vi snak om?`,
          `Mojn do! Godt å se dæ hee. ${mem.by ? "Hvodan gæ det i " + mem.by + "?" : "Wo komme do fra?"}`,
          `Mojn${navn()}! Æ hæ lich sat kaffe øwer. Hva hæ do å æ hjært?`,
          g ? `Mojn${navn()}! Sidst snakket vi om ${g.sj}. Hvodan gæ det mæ det?` : `Mojn${navn()}! Hva så?`
        ]);
      } },
    { samtale: true, re: /\b(farvel|hej hej|vi ses|godnat|god nat|mojn mojn|tak for i dag|tak for nu|jeg smutter|smutter|må gå|skal gå|må løbe)\b/,
      svar: () => pick([
        `Mojn mojn${navn()}! Å haus: ålle veje føe tæ Synnejylland.`,
        "Mojn mojn, å kom godt jem. Hils æ famille!",
        "Så saje vi mojn mojn. Det vå glant å snak mæ dæ.",
        "Mojn mojn! Å tej en tut bom mæ å æ vej.",
        mem.sidsteSladder ? "Mojn mojn! Å æ ska nok holl øje mæ nummer 16 imens." : "Mojn mojn! Kom igen, æ sedde hee mæ æ kaffe."
      ]) },
    { samtale: true, re: /^(tak|mange tak|tusind tak|tusin tak|manne tak|takker|tak skal du have|tak for hjælpen)\b/,
      svar: () => pick(["Sjel tak! Det æ da it nau å snak om.", "Ingen årsach. Det æ sårn, vi gøe det hee.", "Det vå så lidt. Kom igen wenn do vil."]) },
    { samtale: true, re: /hvordan (går det|har du det)|hvodan (hæ|har) do (et|det)|går det godt|alt vel|^hva så|^hvad så|hvordan går|wie geht|hvordan er det at være/,
      svar: () => pick([
        "Jo tak, det gæ. Æ hæ fån kaffe å kach, så æ ka it klaw. Hvodan hæ do et sjel?",
        "Det æ sgu fint. Lidt amjast ætte æ kaffeboe i gåe, men essen godt. Å do?",
        "Åh, det gæ sinne. Vi hæ it traffelt hee. Hva mæ dæ?",
        "Det gæ. Gunnar fra nummer 16 hæ laut ballade igen, men essen æ det roligt. Hva mæ dæ?"
      ]) },
    { samtale: true, re: /hvem er du|hva[d]? hedder du|hva heeje do|hvem æ do|hvad er du|er du en (robot|bot|computer|ai)|hvad kan du|hva ka do|^hjælp|hjælp$|hvad laver du/,
      svar: () => pick([
        "Æ æ MojnBot, en synnejysk snakkemaskin fra Affenraa-egnen. Æ snakke kun æ sproch. Spøe mæ om byer, kaffe, ringrien, Æ Spritte, æ græns, elle hva der sker nee ve Gunnar å Birgit i nummer 16. Elle skryw 'oversæt: ...', så øwersætte æ det.",
        "MojnBot heeje æ. Æ æ laut tæ å holl æ sproch i liv, jet oe a gangen. Æ ve nau om ålle byer fra Christiansfeld tæ Rudbøl, å æ ve ålt om æ vej, æ boe å. Å do, hva heeje do?",
        "Æ æ MojnBot. Halvt computer, halvt synnejye, å heel glaj for kach. Æ sedde i Affenraa å drikke kaffe å holl øje mæ æ naboer. Prøw å spøe om Røekro, Æ Spritte elle Gunnar."
      ]) },
    { samtale: true, re: /hvor (kommer|er) du fra|wo komme do fra|hvor bor du|wo boe do/,
      svar: () => pick([
        "Æ komme fra Affenraa, lich ve æ fjoe. Det æ dæ, man saje æ å it a. Wo komme do sjel fra?",
        "Fra Synnejylland, sefølle. Nærmere bestemt Affenraa, å en vej mæ parcelhuus, wo Gunnar å Birgit boe i nummer 16 å Kesse i 14. Nord for Hoptrup Å saje de a, men vi saje æ.",
        "Affenraa! Æ by mæ æ fjoe, Folkehjem å æ bæest kaffeboe. Å do?"
      ]) },
    { re: /hvad er klokken|hva æ æ klok|klokken|hvad tid|hvilken dag|hvilken dato|dato|hvad dag/,
      svar: () => {
        const d = new Date();
        const t = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        return `Æ klok æ ${t}, å det æ ${DAGE[d.getDay()]} den ${d.getDate()}. ${MAANEDER[d.getMonth()]}. ${d.getHours() >= 14 && d.getHours() < 16 ? "Kaffetid!" : d.getHours() >= 22 || d.getHours() < 6 ? "Do sku sawe. Men kaffe gæ ås." : "Tid tæ en kop kaffe, tøs æ."}`;
      } },
    { re: /vittighed|joke|fortæl (noget sjovt|en historie|en vits)|få mig til at grine|sig noget sjovt|en sjov/,
      svar: () => vaelg("vits", [
        "Hvofor tajer synnejye åltins kach mæ tæ Kjøffenhaun? Fordi de ve, hva de fe dæøwer.",
        "En kjøffenhaune spuet: 'Hvad betyder mojn?' Synnejyen soj: 'Det komme an å, om do komme elle gæ.' Æ kjøffenhaune gek. 'Mojn mojn', soj synnejyen.",
        "Æ Rummelpot æ æ bæest vits, vi hæ. Den komme jen gang om æ åe, å den æ om wos sjel.",
        "Ve do, hvofor æ Kongeå æ så smal? Så a'erne it falle i å blyve tæ æ'er.",
        "Hva saje en alsinger, wenn han komme tæ æ fastland? 'E bro vå dye.'",
        "En synnejye blew spuet, om han ville ha kaffe elle te. Han soj ja.",
        "Hvodan ve man, at en synnejye æ glaj? Han saje 'det ka gå an'. Hvodan ve man, han æ heel vild? Han saje 'det æ sgu it ring'.",
        "Gunnar fra nummer 16 køjt en robotplæneklipper. Nå hæ Kesse i 14 æ pænest græsplæne å æ vej. Det æ it en vits, det æ sket."
      ]) },
    { samtale: () => !mem.sidsteSladderAktiv, re: /^(ja|jo|jep|yes|okay|ok|fint|godt|super|nice|jamen ja|enig|præcis|lige præcis|helt sikkert|selvfølgelig|sefølle)(?![\p{L}])[\s!.]*$/u,
      svar: () => mem.sidsteSladder && Math.random() < 0.5 ? naesteKapitel(mem.sidsteSladder, true) : pick(["Godt så! " + opfoelgning(), "Det tænt æ nok. " + opfoelgning(), "Jo jo. " + opfoelgning(), "Sårn ska det væe. " + opfoelgning()]) },
    { samtale: true, re: /^(nej|naj|næ|nope|niks|ikke rigtig|desværre|nej tak)(?![\p{L}])[\s!.]*$/u,
      svar: () => pick(["Naj? Nå, men så. " + opfoelgning(), "Det æ ås i orden. " + opfoelgning(), "Nå. Så lae vi det lich. " + opfoelgning()]) },
    { samtale: true, re: /^(ved ikke|det ved jeg ikke|ingen anelse|aner det ikke|ve it|æ ve it)\b/,
      svar: () => pick(["Det gøe it nau. Æ ve det heller it, å æ hæ det fint. " + opfoelgning(), "Så fin vi u a det sammen. " + opfoelgning()]) },
    { samtale: () => !mem.sidsteSladderAktiv, re: /^(haha|hehe|lol|hihi|hæhæ|😂|🤣|det er sjovt|sjovt)/,
      svar: () => mem.sidsteSladder && Math.random() < 0.6 ? "Griin do ba'. " + naesteKapitel(mem.sidsteSladder, true) : pick(["Dæ ka do se, synnejysk æ sjau. " + opfoelgning(), "Griin ba', det æ sund. " + opfoelgning()]) }
  ];

  function forkort(n) {
    const kort = { kristian: "Kesse", christian: "Kesse", marie: "Midde", frederik: "Fidde", jørgen: "Jønne", peter: "Pede", hans: "Hannes", anna: "Anne", jens: "Jes", niels: "Nis", mette: "Mett", lars: "Las", søren: "Søen", thomas: "Tammes", andreas: "Dres", karen: "Kaen", margrethe: "Grete", ingeborg: "Inge", mikkel: "Mikkel", tobias: "Tobbe", mathias: "Matti", sebastian: "Basse", birgit: "Bitten", gunnar: "Gunne" };
    return kort[n.toLowerCase()] || n;
  }

  /* ---------- Hovedfunktion ---------- */
  const SPOERG = {
    kaffe: ["Hva æ din favoritkach?", "Bache do sjel?", "Kaffe mæ elle uen snaps?"],
    mad: ["Hva fe do tæ unnen i daw?", "Grønlangkål elle snysk?", "Ka do li solæch?"],
    spritte: ["Hæ do sjel væt mæ å æ spritbåd?", "Kinne do naun, der smuglet?", "Vil do høe meje om æ disko?"],
    ringridning: ["Hæ do sjel redet?", "Hvilken ringrien æ æ bæest, tøs do?"],
    genforening: ["Fejre I 15. juni derjem?", "Hæ do væt ve Døffel Mølle?"],
    sprog: ["Saje do æ elle a?", "Hva æ dit favoritoe å synnejysk?"],
    vejr: ["Hvodan æ æ væer ve dæ?", "Blæse det ås ve dæ?"],
    familie: ["Hvem æ do tættest å i æ famille?", "Snakke de synnejysk derjem?"],
    kbh: ["Hvor længe hæ do boej dæøwer?", "Savne do Synnejylland?"],
    musik: ["Hva høe do sjel?", "Hæ do væt tæ Tønder Festival?"],
    film: ["Hva æ din favoritfilm?", "Hæ do seen 'Onkel'?"],
    arbejde: ["Hva lave do sjel?", "Æ det et godt arbej?"],
    ferie: ["Wo ska do hen næest gang?", "Rømø elle Mallorca?"],
    sport: ["Holl do mæ SønderjyskE?", "Spille do sjel nau?"]
  };
  const FOELGEOP_RE = /^(hvorfor|hvofor|hvordan det|hvodan det|hvorfor det|er det rigtigt|æ det richte|virkelig|seriøst|fortæl mere|fortæl meje|mere|meje|og|å|hvad mere|hva meje|ja og|okay og|interessant|spændende|hvad ellers|hva essen|uddyb|forklar)(?![\p{L}])[\s!?.]*$/iu;

    /* ---------- Skældsord: en ægte sønderjyde giver igen ---------- */
  const SKAELD_ORD = /(?<![\p{L}])(idiot\w*|dum|dumme|dumt|dumrian|klaphat|klovn|nar|taber|tabere|lort|lorte\w*|møg\w*|pis|pisse\w*|fuck\w*|røv\w*|svin|skiderik|kælling|kraftidiot|åndssvag|tumpe|fjols|fjolle\w*|elendig|ubrugelig|værdiløs|crap|shit|stupid|noob|nørd|tosse|torsk|skvadderhoved|dumbo|kæft|klamp|bøsse\w*|spasser\w*|mongol\w*)(?![\p{L}])/u;
  const MOD_BOT = /(?<![\p{L}])(du er|du's|do æ|din|dit|dine|dumme|fuck dig|fuck af|fuck off|hold kæft|hold din|klap i|skrid|ad helvede|rend mig|du kan|du suger|du stinker|du lugter|bot|mojnbot|maskine)(?![\p{L}])/u;
  function erSkaeld(n) {
    if (!SKAELD_ORD.test(n)) return false;
    if (/hold kæft|fuck dig|fuck af|fuck off|klap i|skrid|rend mig/.test(n)) return true;
    if (MOD_BOT.test(n)) return true;
    return n.split(" ").length <= 3 && !/^(det|sikke|hvor|sådan|åh|ej|nej|hvilken|hvilket|noget|æv|øv|pyha)(?![\p{L}])/u.test(n);
  }
  const SKAELD_NAVNE = ["stjaf", "fjoch", "tokkebæe", "klomme", "pjolt", "stjamp", "klojfas", "aaf", "skarnworn knejt", "narworne kjøffenhaune", "pjok", "gelleve", "fissemand", "jappgaf", "skvadderhovede stjaf"];
  const SKAELD_SVAR = [
    // 1: rolig
    () => pick([
      "Nå nå, do lille stjaf. Sinne mæ æ vinne, æ hæ it gjoet dæ nau.",
      "Hov hov, do fjoch. Sådan snakke vi it ve æ kaffeboe. Tæl tæ ti å præw igen.",
      "Det va da it så pænt saj, do tokkebæe. Æ læ det gå denne gång."
    ]),
    // 2: giver igen
    () => pick([
      `Hør nu hee, do ${pick(SKAELD_NAVNE)}! Det æ do sjel.`,
      `Sjel ${pick(SKAELD_NAVNE)}! Æ hæ hørt bejer skældsoe fra Gunnar, nå han træe å en Lego-klods.`,
      `Do æ sgu en rigtig ${pick(SKAELD_NAVNE)}, do. Høg dæ.`
    ]),
    // 3+: fuld synnejysk skrue
    () => pick([
      `Do æ en ${pick(SKAELD_NAVNE)} å en ${pick(SKAELD_NAVNE)} å nå æ æ helt nøks! Pekkel a mæ dæ.`,
      `Hum dæ, do ${pick(SKAELD_NAVNE)}! Do ka it engång stav tæ "mojn". Æ moster Erna ka skæld bejer ud, å hun æ 84.`,
      `Naj nå ska do hør, do jappgaf: Do æ så tokket, at do tøs æ trillebør æ en flywmaskine. Ga hjem å drik en kop kaffe å kom tebach, nå do ka skæg dæ.`,
      `Do ${pick(SKAELD_NAVNE)}! Do snakke som en kjøffenhaune mæ æ mund fuld a remoulade. Høg dæ, æ ska drikke kaffe.`
    ])
  ];
  function skaeldSvar() {
    mem.skaeld = (mem.skaeld || 0) + 1; gem();
    const niv = Math.min(mem.skaeld, 3) - 1;
    return SKAELD_SVAR[niv]();
  }

/* ---------- Analyse: hvem skal svare? ----------
     Returnerer { svar, kilde, kontekst[], hint, regelSvar }
     - svar != null: regelmotoren svarer selv (oversæt, sladder, gloser, klokken ...)
     - svar == null: fri snak. Med AI: send kontekst/hint til AI'en. Uden AI: brug fallback(). */
  function analyser(input, aiTil) {
    const raw = input.trim();
    const n = norm(raw);
    mem.beskeder = (mem.beskeder || 0) + 1; gem();
    const res = { svar: null, kilde: "fri", kontekst: [], hint: null, regelSvar: null, raw };

    // Skældsord? Så får man igen, på synnejysk. Ellers køle æ stemning a igen.
    if (erSkaeld(n)) { ukendtTaeller = 0; res.svar = skaeldSvar(); res.kilde = "skaeld"; return res; }
    if (mem.skaeld) { mem.skaeld = Math.max(0, mem.skaeld - 1); gem(); }

    // Opfølgning ("hvorfor?", "fortæl mere") på sidste emne/sted
    if (FOELGEOP_RE.test(raw) && mem.sidsteEmneKey && !mem.sidsteSladderAktiv) {
      const [type, key] = mem.sidsteEmneKey.split(":");
      const k = type === "sted" ? (V.steder || []).find(x => x.navne[0] === key) : (V.emner || []).find(x => x.id === key);
      if (k) {
        ukendtTaeller = 0;
        res.regelSvar = pick(["Jo, ", "Ja, altså: ", "Nå, men ", "Å så: ", ""]) + vaelg(mem.sidsteEmneKey, k.svar, k.ordnet);
        if (!aiTil) { res.svar = res.regelSvar; res.kilde = "viden"; return res; }
        res.kilde = "viden"; res.kontekst = [res.regelSvar]; return res;
      }
    }

    // Kort "og så?" fortsætter en igangværende sladderhistorie
    if (mem.sidsteSladder && mem.sidsteSladderAktiv && FORTSAET_RE.test(raw) && !sladderNavn(n)) {
      ukendtTaeller = 0; res.svar = naesteKapitel(mem.sidsteSladder, true); res.kilde = "sladder"; return res;
    }

    // Faste regler
    for (const r of REGLER) {
      for (const kilde of [raw, n, raw.toLowerCase()]) {
        const m = kilde.match(r.re);
        if (!m) continue;
        const samtale = typeof r.samtale === "function" ? r.samtale() : !!r.samtale;
        const s = r.svar(m, raw);
        if (!s) continue;
        ukendtTaeller = 0;
        if (aiTil && samtale) { res.hint = s; res.regelSvar = s; return res; }
        res.svar = s; res.kilde = "regel"; return res;
      }
    }

    // Sladder (navne)
    const sl = sladderSvar(n, raw);
    if (sl) { ukendtTaeller = 0; mem.sidsteSladderAktiv = true; gem(); res.svar = sl; res.kilde = "sladder"; return res; }

    // Steder og emner
    const sted = findSted(n);
    const emne = findEmne(n);
    const spoergsmaal = /\?$/.test(raw);
    const hale = () => spoergsmaal ? " " + pick(["Hva tøs do sjel?", "Svare det å det?", "Spøe ba' meje.", "Hæ do væt dæ?"]) : "";

    if (sted && (!emne || emne.id !== "spritte")) {
      ukendtTaeller = 0;
      mem.sidsteEmneKey = "sted:" + sted.navne[0]; mem.sidsteSladderAktiv = false; gem();
      const a = vaelg(mem.sidsteEmneKey, sted.svar);
      res.kilde = "viden"; res.regelSvar = a + hale();
      if (!aiTil) { res.svar = res.regelSvar; return res; }
      res.kontekst = [a];
      return res;
    }
    if (emne) {
      ukendtTaeller = 0;
      mem.sidsteEmneKey = "emne:" + emne.id; mem.sidsteSladderAktiv = false; gem();
      const sp = SPOERG[emne.id];
      const a = vaelg(mem.sidsteEmneKey, emne.svar, emne.ordnet);
      res.kilde = "viden"; res.regelSvar = a + (spoergsmaal ? hale() : (sp && Math.random() < 0.5 ? " " + pick(sp) : ""));
      if (!aiTil) { res.svar = res.regelSvar; return res; }
      res.kontekst = [a];
      return res;
    }

    // Fri snak
    tilfoejNoter(raw);
    if (!aiTil) { res.svar = ukendt(raw, true); return res; }
    return res;
  }

  // Svar når hverken regler, steder eller emner passer (og der ikke er AI)
  function ukendt(raw, noterTaget) {
    const n = norm(raw);
    const nyeNoter = noterTaget ? noterFra(raw) : tilfoejNoter(raw);
    ukendtTaeller++;
    const sj = Oversaetter.oversaet(raw);
    const note = nyeNoter[0];
    const valg = ukendtTaeller % 3; // 1: note, 2: sladder, 0: spejling
    const spoergsmaal = /\?$/.test(raw);

    if (valg === 1 && note) {
      const sjNote = /^\p{Lu}/u.test(note) ? note : Oversaetter.oversaet(note);
      return pick([
        `${cap(sjNote)}, saje do. Det hæ æ it hørt om i lang tid. Fortæl lidt meje om ${sjNote.toLowerCase()}.`,
        `Nå, ${sjNote.toLowerCase()}. Det ska æ lich hows. Hva æ det mæ ${sjNote.toLowerCase()}, æ ska vee?`,
        `${cap(sjNote)}? Det æ da interessant. Hvodan hænge det sammen mæ dæ?`,
        `Do nævne ${sjNote.toLowerCase()}. Det ve æ it så møj om, men æ vil gern. Hva betye det for dæ?`
      ]);
    }
    if (valg === 2) {
      const s = startSladder();
      if (s) { mem.sidsteSladderAktiv = true; gem(); return pick([`Hm, "${sj}". Ja. `, `Det ve æ it lich, hva æ ska saj tæ. Men ve do hva? `, `Nå. `, ``]) + s; }
    }
    const g = gammelNote();
    if (g && Math.random() < 0.4) return `"${sj}", saje do. Det minde mæ om, at do tidligere snakket om ${g.sj}. Hvodan gek det mæ det?`;
    if (spoergsmaal || /^(hvad|hvor|hvem|hvornår|hvorfor|hvordan|hvilken|kan|er|har|vil|skal|ved)\b/.test(n)) {
      return pick([
        `Hm, "${sj}". Godt spøsmål. Æ tøs, svaret æ: en kop kaffe å så se å det igen. ${opfoelgning()}`,
        `Do spøe: "${sj}". Det hæ æ it et færre svar å, men ${opfoelgning().toLowerCase()}`,
        `"${sj}", saje do. Det ska æ tæn øwer, mens æ fe en kop kaffe. ${opfoelgning()}`,
        `Spøe do mæ? Æ ville saj: det komme an å, om do æ fra Affenraa elle Haasle. ${opfoelgning()}`
      ]);
    }
    return pick([
      `"${sj}". Ja, det ka do godt saj. ${opfoelgning()}`,
      `Å synnejysk heeje det: "${sj}". ${opfoelgning()}`,
      `Nå, "${sj}". Det æ da godt. ${opfoelgning()}`,
      `Æ høe dæ: "${sj}". ${opfoelgning()}`,
      `"${sj}", saje do. Det lye richte. ${opfoelgning()}`
    ]);
  }

  // Når AI'en ikke kan svare: brug det, regelmotoren allerede har fundet, ellers ukendt()
  function fallback(analyse) {
    if (analyse.svar) return analyse.svar;
    if (analyse.regelSvar) return analyse.regelSvar;
    return ukendt(analyse.raw, true);
  }

  // Kun regelmotor (bruges uden AI og i tests)
  function svar(input) {
    const a = analyser(input, false);
    return a.svar || fallback(a);
  }

  // Hvad AI'en skal vide om brugeren og æ vej
  function profil() {
    const linjer = [];
    if (mem.navn) linjer.push(`Brugeren heeje ${mem.navn}.`);
    if (mem.by) linjer.push(`Brugeren æ fra ${mem.by}.`);
    const noter = mem.noter.slice(-6).map(n => n.holdning ? `${n.ord} (${n.holdning === "hade" ? "ka it li" : "holl a"})` : n.ord);
    if (noter.length) linjer.push(`Brugeren hæ nævnt: ${noter.join(", ")}.`);
    const hoert = Object.entries(mem.sladder || {}).filter(([, l]) => l > 0).map(([id, l]) => {
      const s = (V.sladder || {})[id]; if (!s) return null;
      return `${PERSON[id] || id}: brugeren hæ hørt ${Math.min(l, s.kapitler.length)} a ${s.kapitler.length} kapitler. Sidst: "${s.kapitler[Math.min(l, s.kapitler.length) - 1]}"`;
    }).filter(Boolean);
    if (hoert.length) linjer.push("Sladder brugeren kinne:\n" + hoert.join("\n"));
    return linjer.join("\n");
  }

  function setGloser(g) { GLOSER = g || {}; }
  function setViden(v) { V = v || {}; }
  function nulstil() { mem = { sladder: {}, noter: [], brugt: {}, beskeder: 0 }; try { localStorage.removeItem(MEM_KEY); } catch (_) {} }

  return { svar, analyser, fallback, profil, setGloser, setViden, nulstil };
})();

if (typeof module !== "undefined") module.exports = MojnBot;
