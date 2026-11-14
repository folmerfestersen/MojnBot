/* MojnBot – regelbaseret samtalemotor. Svarer altid på sønderjysk.
   Bruges når der ikke er en API-nøgle, og som fallback hvis Claude-kaldet fejler. */

const MojnBot = (() => {
  let GLOSER = {};
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const norm = s => s.toLowerCase().replace(/[^\p{L}\p{N}\s'?]/gu, " ").replace(/\s+/g, " ").trim();

  const DAGE = ["synda", "monde", "tiisde", "vonsde", "torsde", "frede", "lørde"];
  const MAANEDER = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "septembe", "oktobe", "novembe", "decembe"];

  function opfoelgning() {
    return pick([
      "Hva så mæ dæ, wo komme do fra?",
      "Hæ do fån kaffe i daw?",
      "Sej mæ lich, hva lave do tæ daule?",
      "Ska vi snak om nau ant?",
      "Ka do sjel snak synnejysk, elle snakke do fin?",
      "Hva æ det bæest ve Synnejylland, tøs do?",
      "Hæ do nau å spøe om, så spøe ba'."
    ]);
  }

  const REGLER = [
    // Afslag på rigsdansk
    { re: /\b(skriv|snak|tal|svar)\b.*\b(rigsdansk|dansk|normalt|almindeligt|københavnsk)\b|\b(rigsdansk|dansk)\b.*\b(tak|please)\b|kan du ikke skrive dansk|forstår (dig )?ikke/,
      svar: () => pick([
        "Naj, hee snakke vi synnejysk. Det æ æ sproch, å det blyve vi ve mæ. Men æ ska nok snak lidt sinne, så do ka fylle mæ.",
        "Snak fin? Naj da. Æ æ MojnBot, it Kjøwenhaun-bot. Men spøe ba' igen, så saje æ det mæ anne oe.",
        "Det ka æ it, min ven. Æ hæ kun det jen sproch, å det æ synnejysk. Hva vå det, do it forsto?"
      ]) },
    // Hvad betyder X
    { re: /hva[d]? betyder (.+)|betydning(en)? af (.+)|hva[d]? er (?:en |et )?["']?([\p{L}æøå' ]+?)["']? på (?:rigs)?dansk/u,
      svar: (m) => {
        const ord = (m[1] || m[3] || m[4] || "").replace(/[?.!]/g, "").trim().toLowerCase();
        const hit = Object.keys(GLOSER).find(k => k.toLowerCase() === ord) || Object.keys(GLOSER).find(k => ord.includes(k.toLowerCase()) && k.length > 2);
        if (hit) return `"${hit}" betye ${GLOSER[hit]}. ${pick(["Nå ve do det.", "Så hæ do løjt nau i daw.", "Det æ et goj oe, det ska do bruch."])}`;
        return `"${ord}"? Det kinne æ it lich som synnejysk oe. Men skryw et i en sætning, så ska æ nok øwersæt det.`;
      } },
    // Oversæt X
    { re: /^(?:oversæt|øwersæt|sig|skriv|hvad hedder|hva hedder|hvordan siger man|hvodan saje man)\s*:?\s*["']?(.+?)["']?(?:\s+(?:på|å|til|tæ)\s+(?:sønderjysk|synnejysk))?\s*\??$/u,
      svar: (m, raw) => {
        const mm = raw.match(/^(?:oversæt|øwersæt|sig|skriv|hvad hedder|hva hedder|hvordan siger man|hvodan saje man)\s*:?\s*["']?(.+?)["']?(?:\s+(?:på|å|til|tæ)\s+(?:sønderjysk|synnejysk))?\s*\??$/iu);
        const tekst = (mm ? mm[1] : m[1]).trim();
        const ud = Oversaetter.oversaet(tekst);
        return `Å synnejysk saje vi: "${ud.charAt(0).toUpperCase() + ud.slice(1)}"`;
      } },
    // Hilsner
    { re: /^(hej|hejsa|halløj|hallo|goddag|god morgen|godmorgen|god aften|dav|davs|mojn|moin|møjn|hi|hello|yo|hey)\b/,
      svar: () => pick([
        "Mojn mojn! Velkommen tæ MojnBot. Hva ka æ gøe for dæ?",
        "Mojn! Sæt dæ nee, tej en kop kaffe å et styk kach. Hva ska vi snak om?",
        "Mojn do! Godt å se dæ hee. Wo komme do fra?",
        "Mojn! Æ hæ lich sat kaffe øwer. Hva hæ do å æ hjært?"
      ]) },
    // Farvel
    { re: /\b(farvel|hej hej|vi ses|godnat|god nat|mojn mojn|tak for i dag|tak for nu|jeg smutter|smutter)\b/,
      svar: () => pick([
        "Mojn mojn! Å haus: ålle veje føe tæ Synnejylland.",
        "Mojn mojn, å kom godt jem. Hils æ famille!",
        "Så saje vi mojn mojn. Det vå glant å snak mæ dæ.",
        "Mojn mojn! Å tej en tut bom mæ å æ vej."
      ]) },
    // Tak
    { re: /^(tak|mange tak|tusind tak|tusin tak|manne tak|takker)\b/,
      svar: () => pick(["Sjel tak! Det æ da it nau å snak om.", "Ingen årsach. Det æ sårn, vi gøe det hee.", "Det vå så lidt. Kom igen wenn do vil."]) },
    // Hvordan går det
    { re: /hvordan (går det|har du det)|hvodan (hæ|har) do (et|det)|går det godt|alt vel|hva så/,
      svar: () => pick([
        "Jo tak, det gæ. Æ hæ fån kaffe å kach, så æ ka it klaw. Hvodan hæ do et sjel?",
        "Det æ sgu fint. Lidt amjast ætte æ kaffeboe i gåe, men essen godt. Å do?",
        "Åh, det gæ sinne. Vi hæ it traffelt hee. Hva mæ dæ?"
      ]) },
    // Hvem er du / navn
    { re: /hvem er du|hva[d]? hedder du|hva heede do|hvem æ do|hvad er du|er du en (robot|bot|computer|ai)/,
      svar: () => pick([
        "Æ æ MojnBot, en synnejysk snakkemaskin fra Affenrå-egnen. Æ snakke kun æ sproch, så det må do ta mæ.",
        "MojnBot heede æ. Æ æ laut tæ å hold æ sproch i liv, jet oe a gangen. Å do, hva heede do?",
        "Æ æ MojnBot. Halvt computer, halvt synnejye, å heel glaj for kach."
      ]) },
    // Hvor kommer du fra
    { re: /hvor (kommer|er) du fra|wo komme do fra|hvor bor du|wo boe do/,
      svar: () => pick([
        "Æ komme fra Affenrå, lich ve æ fjoe. Det æ dæ, man saje æ å it a. Wo komme do sjel fra?",
        "Fra Synnejylland, seføle. Nærmere bestemt Affenrå. Nord for Hoptrup Å saje de a, men vi saje æ.",
        "Affenrå! Byen mæ æ fjoe, æ Folkehjem å æ bæest kaffeboe. Å do?"
      ]) },
    // København / Sjælland
    { re: /københavn|kjøwenhaun|sjælland|københavner|amager|nørrebro|vesterbro|frederiksberg/,
      svar: () => pick([
        "Kjøwenhaun? Nå ja, det æ ås en by. Dæ snakke de fin å betale 60 krone for en kop kaffe. Men I æ velkomne hee, wenn I tajer kach mæ.",
        "En kjøwenhauner! Sinne nå, vi bie it. Men do ska lige vee, at hee heede det 'mojn', it 'hej'.",
        "Øst for Storebælt, ja. Dæ æ æ sproch lidt tyndt. Men det ka vi øw å. Saj ætte mæ: 'Æ æ u å æ ø i æ å'."
      ]) },
    // Als
    { re: /\bals\b|alsinger|sønderborg|synneborre|nordborg|augustenborg/,
      svar: () => pick([
        "Als! Dæ saje de 'e' i staj for 'æ'. E hus, e bil. Men de æ goi nok, alsingerne, de hæ ba' en bro for møj.",
        "Synneborre å Als, ja. Dæ hæ de ringrien å Døffel Banke. Å så saje de 'e sproch'. Vi tilgie dem.",
        "Als æ Synnejyllands ferieø. Goj kach, goj strand, å folk dæ saje 'e' i staj for 'æ'."
      ]) },
    // Haderslev
    { re: /haderslev|haasle|harsle/,
      svar: () => pick([
        "Haasle! Dæ saje de 'a' i staj for 'æ'. Nord for Hoptrup Å skifte det. Men de æ synnejye lichevel.",
        "Haasle, ja. Domkirk, Dam å folk dæ saje 'a æ fra Haasle'. Vi ande saje æ. Det ka vi sagtens væe wenner om."
      ]) },
    // Tønder / Ribe / Vestkysten
    { re: /tønder|tynne|rømø|møgeltønder|højer|marsk|vadehav/,
      svar: () => pick([
        "Tynne! Tønder Festival, æ marsk å kniplinger. Å så saje de 'si'e' i staj for 'saje'. Vestsynnejysk, det æ nau for sæ sjel.",
        "Ue ve æ Vadehav, ja. Dæ blæse det, å dæ snakke de æ gammel sproch ennu. Goj folk."
      ]) },
    // Kaffe / kage / kaffebord
    { re: /kaffe|kage|kach|kaffebord|kaffeboe|småkage|lagkage|brunsviger|fedtkage|gode råd|goed raj|kringle/,
      svar: () => pick([
        "Kaffe å kach! Nå snakke vi. Et richte synnejysk kaffeboe hæ mindst syw slaus småkach å trej slaus blø kach. Å så ska man ta a ålle.",
        "Æ kaffeboe æ det nærmest hellige, vi hæ. Det stamme fra æ tysk tid, wo vi it måt samles å kro, så vi mødtes om kaffe å kach i staj. Smart, hva?",
        "Hæ do bacht sjel? Goed raj, fedtkach, brø-toort... Æ blyve helt sulten. Wenn do kommer forbi, saje æ it naj tæ et styk."
      ]) },
    // Mad
    { re: /\b(mad|aftensmad|frokost|morgenmad|middag|spise|spiser|sulten|opskrift|grønlangkål|solæg|rullepølse|pølse|snysk)\b/,
      svar: () => pick([
        "Mar! Hee heede det dawe (morgenmad), melme (frokost), unnen (middagsmad) å narre (aftensmad). Å så kaffe imel, seføle.",
        "Æ æ richte hungere. Grønlangkål mæ hamborgryg å brunet katøffel, det æ unnen hee om vinte. Hva ka do li?",
        "Solæch tæ en snaps, rullepøls å æ brø, å snysk om efteråe. Synnejysk mar æ it fin, men den æ goj."
      ]) },
    // Vejr
    { re: /\b(vejr|vejret|regn|regner|sne|sner|sol|solen|blæser|blæst|koldt|varmt|væer)\b/,
      svar: () => pick([
        "Æ væer? Det blæse åltins lidt hee ve æ fjoe. Men det æ godt væer tæ kaffe, å det æ ålt væer.",
        "Wenn det rejne, sedde vi inn mæ kach. Wenn æ sol skinne, sedde vi ue mæ kach. Så det passe.",
        "Kolt i daw. Tej en swedde å, å en kop kaffe i æ hinne."
      ]) },
    // Klokken
    { re: /hvad er klokken|hva æ æ klok|klokken|hvad tid|hvilken dag|hvilken dato|dato/,
      svar: () => {
        const d = new Date();
        const t = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        return `Æ klok æ ${t}, å det æ ${DAGE[d.getDay()]} den ${d.getDate()}. ${MAANEDER[d.getMonth()]}. ${d.getHours() >= 14 && d.getHours() < 16 ? "Kaffetid!" : "Tid tæ en kop kaffe, tøs æ."}`;
      } },
    // Vittighed
    { re: /vittighed|joke|sjov|fortæl (noget|en historie)|grin|få mig til at grine/,
      svar: () => pick([
        "Hvofor tajer synnejye åltins kach mæ tæ Kjøwenhaun? Fordi de ve, hva de fe dæøwer.",
        "En kjøwenhauner spuet: 'Hvad betyder mojn?' Synnejyen soj: 'Det kommer an å, om do komme elle gæ.' Kjøwenhauneren gek. 'Mojn mojn', soj synnejyen.",
        "Æ Rummelpot æ æ bæest vits, vi hæ. Den komme jen gang om æ åe, å den æ om wos sjel.",
        "Ve do, hvofor æ Kongeå æ så smal? Så a'erne it falle i å blyve tæ æ'er."
      ]) },
    // Sprog / dialekt
    { re: /sønderjysk|synnejysk|dialekt|sproch|sprog|æ synnejysk forening|rummelpot|rikke thomsen/,
      svar: () => pick([
        "Synnejysk æ it en dialekt, det æ æ sproch. Vi hæ foranstillet artikel (æ hus), vi saje æ for jeg, do for du, it for ikke, å vi tajer g'et å gøe det tæ ch: sproch, kach, lich.",
        "Æ sproch lewe ennu, især hee i æ gruppe å ve æ kaffeboe. Rikke Thomsen synge å det, Æ Synnejysk Forening skrywe Rummelpot å det, å nå snakke MojnBot det. Så det ska nok gå.",
        "Synnejysk hæ it nau fast retskrivning, så ålle skrywe lidt som de snakke. Æ prøwe å holl mæ tæ Affenrå-måden: æ, do, it, tæ, å, -ch å -f."
      ]) },
    // Ja / nej
    { re: /^(ja|jo|jep|yes|okay|ok|fint|godt|super|nice|jamen ja)\b/,
      svar: () => pick(["Godt så! " + opfoelgning(), "Det tænt æ nok. " + opfoelgning(), "Jo jo. " + opfoelgning()]) },
    { re: /^(nej|naj|næ|nope|niks|ikke rigtig)\b/,
      svar: () => pick(["Naj? Nå, men så. " + opfoelgning(), "Det æ ås i orden. " + opfoelgning()]) },
    // Hjælp
    { re: /hjælp|hvad kan du|hva ka do|hvordan virker|kommandoer/,
      svar: () => "Æ ka snak mæ dæ om ålt mulich, ba' å synnejysk. Prøw: 'Oversæt: jeg vil gerne have en kop kaffe', elle 'Hvad betyder kach', elle spøe mæ om æ kaffeboe, Als elle æ væer. Hæ do en API-nøgle, blyve æ meje klog (se æ tandhjul)." }
  ];

  function svar(input) {
    const raw = input.trim();
    const n = norm(raw);
    for (const r of REGLER) {
      const m = n.match(r.re) || raw.toLowerCase().match(r.re);
      if (m) return r.svar(m, raw);
    }
    // Spørgsmål vi ikke kender: spejl det på sønderjysk og spørg tilbage
    if (/\?$/.test(raw) || /^(hvad|hvor|hvem|hvornår|hvorfor|hvordan|hvilken|kan|er|har|vil|skal)\b/.test(n)) {
      return pick([
        `Hm, "${Oversaetter.oversaet(raw)}". Det æ et godt spøsmål, å æ ska væe ærle: det ve æ it richte. Men ${opfoelgning().toLowerCase()}`,
        `Do spøe: "${Oversaetter.oversaet(raw)}". Æ æ ba' en lille regelmaskin uen API-nøgle, så det må do sjel gæt. ${opfoelgning()}`,
        `"${Oversaetter.oversaet(raw)}", saje do. Det ska æ tæn øwer, mens æ fe en kop kaffe. ${opfoelgning()}`
      ]);
    }
    return pick([
      `"${Oversaetter.oversaet(raw)}". Ja, det ka do saj. ${opfoelgning()}`,
      `Å synnejysk heede det: "${Oversaetter.oversaet(raw)}". ${opfoelgning()}`,
      `Nå, "${Oversaetter.oversaet(raw)}". Det æ da godt. ${opfoelgning()}`,
      `Æ høe dæ: "${Oversaetter.oversaet(raw)}". ${opfoelgning()}`
    ]);
  }

  function setGloser(g) { GLOSER = g || {}; }

  return { svar, setGloser };
})();

if (typeof module !== "undefined") module.exports = MojnBot;
