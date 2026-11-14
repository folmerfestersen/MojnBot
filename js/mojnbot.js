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
  function vaelg(key, liste) {
    if (!liste || !liste.length) return "";
    const brugt = mem.brugt[key] || [];
    let kand = liste.filter(s => !brugt.includes(s));
    if (!kand.length) { mem.brugt[key] = []; kand = liste; }
    const s = pick(kand);
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
      "Hva heede do forresten?",
      "Hæ do seen Æ Spritte å TV Syd?",
      "Kinne do Gunnar å Birgit fra nummer 16?",
      "Hvilken by i Synnejylland holl do mest a?"
    ];
    const f = liste.filter(s => !(mem.navn && s.includes("heede do")) && !(mem.by && s.includes("wo komme do fra")) && !(mem.sladder.gunnar && s.includes("Gunnar")));
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
  const PERSON = { gunnar: "Gunnar å Birgit", kesse: "Kesse fra nummer 14", aage: "Åge fra æ Brugs" };

  function sladderNavn(n) {
    for (const [id, s] of Object.entries(V.sladder || {})) {
      if (s.navne.some(a => harOrd(n, a))) return id;
    }
    return null;
  }

  function naesteKapitel(id, medIntro) {
    const s = V.sladder[id];
    const lvl = mem.sladder[id] || 0;
    mem.sidsteSladder = id;
    if (lvl >= s.kapitler.length) {
      mem.sladder[id] = lvl + 1; gem();
      if (lvl === s.kapitler.length) return s.slut;
      const andre = Object.keys(V.sladder).filter(k => k !== id && (mem.sladder[k] || 0) < V.sladder[k].kapitler.length);
      if (andre.length) { const a = andre[0]; return `Meje om ${PERSON[id]} hæ æ it lich nå. Men ve do, hva der æ sket mæ ${PERSON[a]}? ` + naesteKapitel(a, false); }
      return pick(["Det æ heel historien, så langt som Åge ve den. Men der komme meje, der gøe der åltins å den vej.", "Meje ve æ it ennu. Men æ sedde mæ øret mod æ hæk, så spøe igen i morn."]);
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
    const aktive = ids.filter(k => (mem.sladder[k] || 0) < V.sladder[k].kapitler.length);
    const id = aktive.includes(mem.sidsteSladder) ? mem.sidsteSladder : (aktive[0] || ids[0]);
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
    { re: /\b(skriv|snak|tal|svar)\b.*\b(rigsdansk|dansk|normalt|almindeligt|københavnsk|engelsk)\b|\b(rigsdansk|dansk)\b.*\b(tak|please)\b|kan du ikke (skrive|tale) dansk|forstår (dig )?ikke|speak english|in english|forstår ikke hvad du/,
      svar: () => pick([
        "Naj, hee snakke vi synnejysk. Det æ æ sproch, å det blyve vi ve mæ. Men æ ska nok snak lidt sinne, så do ka fylle mæ.",
        "Snak fin? Naj da. Æ æ MojnBot, it Kjøwenhaun-bot. Men spøe ba' igen, så saje æ det mæ anne oe.",
        "Det ka æ it, min ven. Æ hæ kun det jen sproch, å det æ synnejysk. Hva vå det, do it forsto? Så forklare æ det."
      ]) },
    { re: /(?:jeg hedder|mit navn er|æ heede|æ hedder|kald mig|jeg er)\s+([\p{L}-]+)(?:\s|$)/iu,
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
    { re: /hvad hedder jeg|hva heede æ|husker du mit navn|hvor er jeg fra|wo æ æ fra|hvad ved du om mig|hva ve do om mæ|husker du/,
      svar: () => {
        const dele = [];
        if (mem.navn) dele.push(`do heede ${mem.navn}`);
        if (mem.by) dele.push(`do æ fra ${mem.by}`);
        const noter = mem.noter.filter(n => !(mem.navn && n.ord.toLowerCase() === mem.navn.toLowerCase()) && !(mem.by && mem.by.toLowerCase().includes(n.ord.toLowerCase()))).slice(-3).map(n => n.sj);
        if (noter.length) dele.push(`do hæ snakket om ${noter.join(", ")}`);
        if (!dele.length) return "Det hæ do it soj ennu. Hva heede do, å wo komme do fra?";
        return cap(dele.join(", å ")) + ". Æ glemme it nau, æ æ synnejye." + (!mem.navn ? " Men hva heede do?" : "");
      } },
    { re: /hva[d]? betyder (.+)|betydning(en)? af (.+)|hva[d]? er (?:en |et )?["']?([\p{L}æøå' ]+?)["']? på (?:rigs)?dansk|hva betye (.+)/u,
      svar: (m) => {
        const ord = (m[1] || m[3] || m[4] || m[5] || "").replace(/[?.!]/g, "").trim().toLowerCase();
        const hit = Object.keys(GLOSER).find(k => k.toLowerCase() === ord) || Object.keys(GLOSER).find(k => ord.includes(k.toLowerCase()) && k.length > 2);
        if (hit) return `"${hit}" betye ${GLOSER[hit]}. ${pick(["Nå ve do det.", "Så hæ do løjt nau i daw.", "Det æ et goj oe, det ska do bruch."])}`;
        return `"${ord}"? Det kinne æ it lich som synnejysk oe. Men skryw det i en sætning, så ska æ nok øwersæt det.`;
      } },
    { re: /^(hej|hejsa|halløj|hallo|goddag|god morgen|godmorgen|god aften|dav|davs|mojn|moin|møjn|hi|hello|yo|hey|godt nytår)\b/,
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
    { re: /\b(farvel|hej hej|vi ses|godnat|god nat|mojn mojn|tak for i dag|tak for nu|jeg smutter|smutter|må gå|skal gå|må løbe)\b/,
      svar: () => pick([
        `Mojn mojn${navn()}! Å haus: ålle veje føe tæ Synnejylland.`,
        "Mojn mojn, å kom godt jem. Hils æ famille!",
        "Så saje vi mojn mojn. Det vå glant å snak mæ dæ.",
        "Mojn mojn! Å tej en tut bom mæ å æ vej.",
        mem.sidsteSladder ? "Mojn mojn! Å æ ska nok holl øje mæ nummer 16 imens." : "Mojn mojn! Kom igen, æ sedde hee mæ æ kaffe."
      ]) },
    { re: /^(tak|mange tak|tusind tak|tusin tak|manne tak|takker|tak skal du have|tak for hjælpen)\b/,
      svar: () => pick(["Sjel tak! Det æ da it nau å snak om.", "Ingen årsach. Det æ sårn, vi gøe det hee.", "Det vå så lidt. Kom igen wenn do vil."]) },
    { re: /hvordan (går det|har du det)|hvodan (hæ|har) do (et|det)|går det godt|alt vel|^hva så|^hvad så|hvordan går|wie geht|hvordan er det at være/,
      svar: () => pick([
        "Jo tak, det gæ. Æ hæ fån kaffe å kach, så æ ka it klaw. Hvodan hæ do et sjel?",
        "Det æ sgu fint. Lidt amjast ætte æ kaffeboe i gåe, men essen godt. Å do?",
        "Åh, det gæ sinne. Vi hæ it traffelt hee. Hva mæ dæ?",
        "Det gæ. Gunnar fra nummer 16 hæ laut ballade igen, men essen æ det roligt. Hva mæ dæ?"
      ]) },
    { re: /hvem er du|hva[d]? hedder du|hva heede do|hvem æ do|hvad er du|er du en (robot|bot|computer|ai)|hvad kan du|hva ka do|^hjælp|hjælp$|hvad laver du/,
      svar: () => pick([
        "Æ æ MojnBot, en synnejysk snakkemaskin fra Affenrå-egnen. Æ snakke kun æ sproch. Spøe mæ om byer, kaffe, ringrien, Æ Spritte, æ græns, elle hva der sker nee ve Gunnar å Birgit i nummer 16. Elle skryw 'oversæt: ...', så øwersætte æ det.",
        "MojnBot heede æ. Æ æ laut tæ å holl æ sproch i liv, jet oe a gangen. Æ ve nau om ålle byer fra Christiansfeld tæ Rudbøl, å æ ve ålt om æ vej, æ boe å. Å do, hva heede do?",
        "Æ æ MojnBot. Halvt computer, halvt synnejye, å heel glaj for kach. Æ sedde i Affenrå å drikke kaffe å holl øje mæ naboerne. Prøw å spøe om Røekro, Æ Spritte elle Gunnar."
      ]) },
    { re: /hvor (kommer|er) du fra|wo komme do fra|hvor bor du|wo boe do/,
      svar: () => pick([
        "Æ komme fra Affenrå, lich ve æ fjoe. Det æ dæ, man saje æ å it a. Wo komme do sjel fra?",
        "Fra Synnejylland, seføle. Nærmere bestemt Affenrå, å en vej mæ parcelhuus, wo Gunnar å Birgit boe i nummer 16 å Kesse i 14. Nord for Hoptrup Å saje de a, men vi saje æ.",
        "Affenrå! Byen mæ æ fjoe, Folkehjem å æ bæest kaffeboe. Å do?"
      ]) },
    { re: /hvad er klokken|hva æ æ klok|klokken|hvad tid|hvilken dag|hvilken dato|dato|hvad dag/,
      svar: () => {
        const d = new Date();
        const t = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        return `Æ klok æ ${t}, å det æ ${DAGE[d.getDay()]} den ${d.getDate()}. ${MAANEDER[d.getMonth()]}. ${d.getHours() >= 14 && d.getHours() < 16 ? "Kaffetid!" : d.getHours() >= 22 || d.getHours() < 6 ? "Do sku sawe. Men kaffe gæ ås." : "Tid tæ en kop kaffe, tøs æ."}`;
      } },
    { re: /vittighed|joke|fortæl (noget sjovt|en historie|en vits)|få mig til at grine|sig noget sjovt|en sjov/,
      svar: () => vaelg("vits", [
        "Hvofor tajer synnejye åltins kach mæ tæ Kjøwenhaun? Fordi de ve, hva de fe dæøwer.",
        "En kjøwenhauner spuet: 'Hvad betyder mojn?' Synnejyen soj: 'Det komme an å, om do komme elle gæ.' Kjøwenhauneren gek. 'Mojn mojn', soj synnejyen.",
        "Æ Rummelpot æ æ bæest vits, vi hæ. Den komme jen gang om æ åe, å den æ om wos sjel.",
        "Ve do, hvofor æ Kongeå æ så smal? Så a'erne it falle i å blyve tæ æ'er.",
        "Hva saje en alsinger, wenn han komme tæ fastlandet? 'E bro vå dye.'",
        "En synnejye blew spuet, om han ville ha kaffe elle te. Han soj ja.",
        "Hvodan ve man, at en synnejye æ glaj? Han saje 'det ka gå an'. Hvodan ve man, han æ heel vild? Han saje 'det æ sgu it ring'.",
        "Gunnar fra nummer 16 køjt en robotplæneklipper. Nå hæ Kesse i 14 æ pænest græsplæne å vejen. Det æ it en vits, det æ sket."
      ]) },
    { re: /^(ja|jo|jep|yes|okay|ok|fint|godt|super|nice|jamen ja|enig|præcis|lige præcis|helt sikkert|selvfølgelig|seføle)(?![\p{L}])[\s!.]*$/u,
      svar: () => mem.sidsteSladder && Math.random() < 0.5 ? naesteKapitel(mem.sidsteSladder, true) : pick(["Godt så! " + opfoelgning(), "Det tænt æ nok. " + opfoelgning(), "Jo jo. " + opfoelgning(), "Sårn ska det væe. " + opfoelgning()]) },
    { re: /^(nej|naj|næ|nope|niks|ikke rigtig|desværre|nej tak)(?![\p{L}])[\s!.]*$/u,
      svar: () => pick(["Naj? Nå, men så. " + opfoelgning(), "Det æ ås i orden. " + opfoelgning(), "Nå. Så lae vi det lich. " + opfoelgning()]) },
    { re: /^(ved ikke|det ved jeg ikke|ingen anelse|aner det ikke|ve it|æ ve it)\b/,
      svar: () => pick(["Det gøe it nau. Æ ve det heller it, å æ hæ det fint. " + opfoelgning(), "Så fin vi u a det sammen. " + opfoelgning()]) },
    { re: /^(haha|hehe|lol|hihi|hæhæ|😂|🤣|det er sjovt|sjovt)/,
      svar: () => mem.sidsteSladder && Math.random() < 0.6 ? "Griin do ba'. " + naesteKapitel(mem.sidsteSladder, true) : pick(["Dæ ka do se, synnejysk æ sjau. " + opfoelgning(), "Griin ba', det æ sund. " + opfoelgning()]) }
  ];

  function forkort(n) {
    const kort = { kristian: "Kesse", christian: "Kesse", marie: "Midde", frederik: "Fidde", jørgen: "Jønne", peter: "Pede", hans: "Hannes", anna: "Anne", jens: "Jes", niels: "Nis", mette: "Mett", lars: "Las", søren: "Søen", thomas: "Tammes", andreas: "Dres", karen: "Kaen", margrethe: "Grete", ingeborg: "Inge", mikkel: "Mikkel", tobias: "Tobbe", mathias: "Matti", sebastian: "Basse", birgit: "Bitten", gunnar: "Gunne" };
    return kort[n.toLowerCase()] || n;
  }

  /* ---------- Hovedfunktion ---------- */
  function svar(input) {
    const raw = input.trim();
    const n = norm(raw);
    const nyeNoter = tilfoejNoter(raw);

    // 0) Kort "og så?" fortsætter en igangværende sladderhistorie
    if (mem.sidsteSladder && FORTSAET_RE.test(raw) && !sladderNavn(n)) { ukendtTaeller = 0; return naesteKapitel(mem.sidsteSladder, true); }

    // 1) Faste regler
    for (const r of REGLER) {
      for (const kilde of [raw, n, raw.toLowerCase()]) {
        const m = kilde.match(r.re);
        if (m) { const s = r.svar(m, raw); if (s) { ukendtTaeller = 0; return s; } }
      }
    }

    // 2) Sladder (navne eller "og så?")
    const sl = sladderSvar(n, raw);
    if (sl) { ukendtTaeller = 0; return sl; }

    // 3) Steder, 4) Emner
    const sted = findSted(n);
    const emne = findEmne(n);
    const spoergsmaal = /\?$/.test(raw);
    const hale = () => spoergsmaal ? " " + pick(["Hva tøs do sjel?", "Svare det å det?", "Spøe ba' meje.", "Hæ do væt dæ?"]) : "";

    if (sted && (!emne || emne.id !== "spritte")) {
      ukendtTaeller = 0;
      return vaelg("sted:" + sted.navne[0], sted.svar) + hale();
    }
    if (emne) {
      ukendtTaeller = 0;
      return vaelg("emne:" + emne.id, emne.svar) + hale();
    }

    // 5) Ukendt: skift mellem note-refleksion, sladder og spejling
    ukendtTaeller++;
    const sj = Oversaetter.oversaet(raw);
    const note = nyeNoter[0];
    const valg = ukendtTaeller % 3; // 1: note, 2: sladder, 0: spejling

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
      if (s) return pick([`Hm, "${sj}". Ja. `, `Det ve æ it lich, hva æ ska saj tæ. Men ve do hva? `, `Nå. `, ``]) + s;
    }
    const g = gammelNote();
    if (g && Math.random() < 0.4) return `"${sj}", saje do. Det minde mæ om, at do tidligere snakket om ${g.sj}. Hvodan gek det mæ det?`;
    if (spoergsmaal || /^(hvad|hvor|hvem|hvornår|hvorfor|hvordan|hvilken|kan|er|har|vil|skal|ved)\b/.test(n)) {
      return pick([
        `Hm, "${sj}". Godt spøsmål. Æ tøs, svaret æ: en kop kaffe å så se å det igen. ${opfoelgning()}`,
        `Do spøe: "${sj}". Det hæ æ it et færre svar å, men ${opfoelgning().toLowerCase()}`,
        `"${sj}", saje do. Det ska æ tæn øwer, mens æ fe en kop kaffe. ${opfoelgning()}`,
        `Spøe do mæ? Æ ville saj: det komme an å, om do æ fra Affenrå elle Haasle. ${opfoelgning()}`
      ]);
    }
    return pick([
      `"${sj}". Ja, det ka do godt saj. ${opfoelgning()}`,
      `Å synnejysk heede det: "${sj}". ${opfoelgning()}`,
      `Nå, "${sj}". Det æ da godt. ${opfoelgning()}`,
      `Æ høe dæ: "${sj}". ${opfoelgning()}`,
      `"${sj}", saje do. Det lye richte. ${opfoelgning()}`
    ]);
  }

  function setGloser(g) { GLOSER = g || {}; }
  function setViden(v) { V = v || {}; }
  function nulstil() { mem = { sladder: {}, noter: [], brugt: {} }; try { localStorage.removeItem(MEM_KEY); } catch (_) {} }

  return { svar, setGloser, setViden, nulstil };
})();

if (typeof module !== "undefined") module.exports = MojnBot;
