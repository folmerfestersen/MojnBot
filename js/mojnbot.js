/* MojnBot – regelbaseret samtalemotor. Svarer altid på sønderjysk.
   Bruges når der ikke er en API-nøgle, og som fallback hvis Claude-kaldet fejler.
   Opbygning: hukommelse (navn, by) -> faste kommandoer -> emner (nøgleord + svar) -> spejling + opfølgning */

const MojnBot = (() => {
  let GLOSER = {};
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const norm = s => s.toLowerCase().replace(/[^\p{L}\p{N}\s'?]/gu, " ").replace(/\s+/g, " ").trim();
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  // Hukommelse på tværs af beskeder (gemmes i localStorage)
  const MEM_KEY = "mojnbot.mem";
  let mem = {};
  try { mem = JSON.parse(localStorage.getItem(MEM_KEY) || "{}"); } catch (_) { mem = {}; }
  const husk = (k, v) => { mem[k] = v; try { localStorage.setItem(MEM_KEY, JSON.stringify(mem)); } catch (_) {} };
  let sidsteEmne = null;
  let antalSvar = 0;

  const DAGE = ["synda", "monde", "tiisde", "vonsde", "torsde", "frede", "lørde"];
  const MAANEDER = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "septembe", "oktobe", "novembe", "decembe"];

  const navn = () => mem.navn ? " " + mem.navn : "";

  function opfoelgning() {
    const liste = [
      "Hva så mæ dæ, wo komme do fra?",
      "Hæ do fån kaffe i daw?",
      "Hva lave do tæ daule?",
      "Ska vi snak om nau ant?",
      "Ka do sjel snak synnejysk, elle snakke do fin?",
      "Hva æ det bæest ve Synnejylland, tøs do?",
      "Hæ do nau å spøe om, så spøe ba'.",
      "Hva ska do lav i æ løwde-synde?",
      "Hva hæ do fån tæ unnen?",
      "Hæ do væt tæ ringrien naun gang?",
      "Wenn vå do sidst i Synnejylland?",
      "Hva heede do forresten?"
    ];
    const f = liste.filter(s => !(mem.navn && s.includes("heede do")) && !(mem.by && s.includes("wo komme do fra")));
    return pick(f);
  }

  /* ---------- Emner: nøgleord (rigsdansk + sønderjysk) -> svar ---------- */
  const EMNER = [
    { id: "kaffe", ord: ["kaffe", "kage", "kach", "kaach", "kaffebord", "kaffeboe", "småkage", "småkach", "lagkage", "brunsviger", "fedtkage", "gode råd", "goed raj", "kringle", "boller", "wienerbrød", "tærte", "toort", "bage", "bagt"],
      svar: [
        "Kaffe å kach! Nå snakke vi. Et richte synnejysk kaffeboe hæ mindst syw slaus småkach å trej slaus blø kach, å man ska ta a ålle, essen blyve æ kuen sue.",
        "Æ kaffeboe æ det nærmest hellige, vi hæ. Det stamme fra æ tysk tid, wo vi it måt holl møde å kro, så vi mødtes om kaffe å kach i forsamlingshus i staj. Smart, hva?",
        "Hæ do bacht sjel? Goed raj, fedtkach, brø-toort, ingefærkach... Æ blyve helt hungere. Wenn do komme forbi, saje æ it naj tæ et styk.",
        "Reglen æ: føest æ blø kach, så æ tør kach, å så en snaps i æ kaffe tæ sidst. Ålt ant æ kjøwenhaunerkaffe."
      ] },
    { id: "mad", ord: ["mad", "aftensmad", "frokost", "morgenmad", "middag", "spise", "spiser", "spiste", "sulten", "hungere", "opskrift", "grønlangkål", "solæg", "rullepølse", "pølse", "snysk", "flæsk", "kartofler", "sovs", "frikadeller", "stegt", "fisk", "ål", "suppe", "brød", "rugbrød", "madpakke", "pizza", "burger", "pasta", "sushi", "mellemmad", "unnen", "narre", "dawe", "melme"],
      svar: [
        "Mar! Hee heede det dawe (morgenmad), melme (frokost), unnen (middagsmad) å narre (aftensmad). Å så kaffe imel, seføle.",
        "Æ æ richte hungere nå. Grønlangkål mæ hamborgryg å brunet katøffel, det æ unnen hee om vinte. Hva fe do sjel?",
        "Solæch tæ en snaps, rullepøls å æ brø, snysk om efteråe å æfelskiewer tæ juel. Synnejysk mar æ it fin, men den mætte.",
        "Pizza å sushi? Jo jo, det ka man ås få i Affenrå nå. Men prøw lich en synnejysk rullepøls mæ sennep å løg, så ve do, hva do hæ gån glip a."
      ] },
    { id: "snaps", ord: ["snaps", "øl", "bajer", "bajere", "fadøl", "vin", "drikke", "druk", "fuld", "tømmermænd", "bryggeri", "fuglsang", "akvavit", "skål", "fest", "bytur", "druktur"],
      svar: [
        "Skål! En lille jen i æ kaffe gøe it nau. Det æ ba' medicin mod æ blæst.",
        "Fuglsang fra Haasle, det æ æ øl hee. Å så en snaps tæ solæch. Men sinne nå, do ska ås køe jem.",
        "Fest i Synnejylland betye: ringrierfest, kaffeboe å en snaps elle trej. Å så snakke ålle synnejysk klok to om natten, ås kjøwenhaunerne."
      ] },
    { id: "vejr", ord: ["vejr", "vejret", "regn", "regner", "sne", "sner", "sol", "solen", "blæser", "blæst", "koldt", "varmt", "væer", "storm", "frost", "tåge", "grader", "sommer", "vinter", "efterår", "forår"],
      svar: [
        "Æ væer? Det blæse åltins lidt hee ve æ fjoe. Men det æ godt væer tæ kaffe, å det æ ålt væer.",
        "Wenn det rejne, sedde vi inn mæ kach. Wenn æ sol skinne, sedde vi ue mæ kach. Så det passe.",
        "Kolt i daw. Tej en swedde å, å en kop kaffe i æ hinne. Vestenvinden komme lich fra æ Vadehav.",
        "Somme i Synnejylland: Als, Rømø, Tønder Festival å ringrien. Vinte: grønlangkål å æ Rummelpot. Vi hæ det fint ålt åe."
      ] },
    { id: "kbh", ord: ["københavn", "kjøwenhaun", "sjælland", "københavner", "amager", "nørrebro", "vesterbro", "frederiksberg", "østerbro", "hovedstaden", "sjællænder", "fyn", "odense", "århus", "aarhus"],
      svar: [
        "Kjøwenhaun? Nå ja, det æ ås en by. Dæ snakke de fin å betale 60 krone for en kop kaffe. Men I æ velkomne hee, wenn I tajer kach mæ.",
        "En kjøwenhauner! Sinne nå, vi bie it. Men do ska lich vee, at hee heede det 'mojn', it 'hej'.",
        "Øst for Storebælt, ja. Dæ æ æ sproch lidt tyndt. Men det ka vi øw å. Saj ætte mæ: 'Æ æ u å æ ø i æ å'.",
        "Åhus å Odens æ goi nok, men de hæ it et kaffeboe. Det hæ vi. Jen-nul tæ Synnejylland."
      ] },
    { id: "als", ord: ["als", "alsinger", "sønderborg", "synneborre", "nordborg", "augustenborg", "dybbøl", "døffel", "broager", "gråsten", "fynshav", "kegnæs"],
      svar: [
        "Als! Dæ saje de 'e' i staj for 'æ'. E hus, e bil. Men de æ goi nok, alsingerne, de hæ ba' en bro for møj.",
        "Synneborre å Als, ja. Dæ hæ de ringrien, Døffel Banke å slottet. Å så saje de 'e sproch'. Vi tilgie dem.",
        "Døffel Banke, 1864, det æ wo det heel starte. Uen det, ingen Genforening, ingen kaffeboe å ingen MojnBot.",
        "Gråsten! Slottet, æ konge å Gråsten-æfel. Å det æ lich mel Affenrå å Synneborre, så dæ ka man it blyve enig om æ elle e."
      ] },
    { id: "haderslev", ord: ["haderslev", "haasle", "harsle", "vojens", "gram", "christiansfeld", "rødding", "toftlund", "kongeå", "kongeåen"],
      svar: [
        "Haasle! Dæ saje de 'a' i staj for 'æ'. Nord for Hoptrup Å skifte det. Men de æ synnejye lichevel.",
        "Haasle, ja. Domkirk, Dam å folk dæ saje 'a æ fra Haasle'. Vi anne saje æ. Det ka vi sagtens væe wenner om.",
        "Christiansfeld hæ honningkach, Gram hæ et slot å Vojens hæ ishockey. Å æ Kongeå æ æ græns mod æ rigtig Jylland."
      ] },
    { id: "toender", ord: ["tønder", "tynne", "rømø", "møgeltønder", "højer", "marsk", "vadehav", "vadehavet", "skærbæk", "ballum", "løgumkloster", "kloster", "tønder festival", "festival"],
      svar: [
        "Tynne! Tønder Festival, æ marsk å kniplinger. Å så saje de 'si'e' i staj for 'saje'. Vestsynnejysk, det æ nau for sæ sjel.",
        "Ue ve æ Vadehav, ja. Dæ blæse det, å dæ snakke de æ gammel sproch ennu. Goi folk, å goi rejer fra Rømø.",
        "Tønder Festival i august: folkemusik, regn, gummistøwl å en snaps i æ kaffe. Det æ synnejysk somme."
      ] },
    { id: "aabenraa", ord: ["aabenraa", "åbenrå", "affenrå", "affenraa", "løjt", "rødekro", "tinglev", "padborg", "kruså", "bov", "kollund", "genner"],
      svar: [
        "Affenrå! Min by. Æ fjoe, Folkehjem, æ gågade å æ bæest kaffeboe. Å så saje vi æ, it a.",
        "Affenrå hæ ålt: en fjoe tæ å baje i, Løjt Land tæ å køe i, å en Rummelpot tæ å griin a. Hva meje ska man ha?",
        "Padborg å Kruså, det æ lich ve æ græns. Dæ køfe tyskerne pøls, å vi køfe øl. Sårn æ det ba'."
      ] },
    { id: "graense", ord: ["grænse", "grænsen", "græns", "tyskland", "tysk", "tyskere", "flensborg", "flensburg", "genforening", "genforeningen", "1920", "1864", "sydslesvig", "slesvig", "mindretal", "preussen", "krig"],
      svar: [
        "Æ græns! Vi hæ boej å begge sie a den. 1864 taft vi, 1920 kom vi jem. Det æ dæfor, vi holl så møj a æ Dannebrog å æ kaffeboe.",
        "Syd for æ græns saje de 'moin', nord for saje vi 'mojn'. Jet bogstav, men det æ heel æ forskel.",
        "Flensborre æ goj tæ å køf øl å slik. Å så snakke de ås lidt synnejysk dæ nee, især de gammel. Æ sproch kinne it æ græns."
      ] },
    { id: "sport", ord: ["fodbold", "sønderjyske", "sønderjyske fodbold", "håndbold", "ishockey", "sport", "træning", "løbe", "løber", "cykle", "fitness", "kamp", "landshold", "superliga", "fck", "brøndby", "agf", "sønderjyske håndbold", "ringridning", "ringrien", "ringrider"],
      svar: [
        "SønderjyskE! Æ blå. Det gæ op å nee mæ dem, men vi holl mæ dem lichevel. Sårn æ det å væe synnejye.",
        "Ringrien æ æ richte sport hee. Hest, lanse, en lille ring å en masse øl bachetter. Synneborre hæ æ stoe, men ålle byer hæ jen.",
        "Vojens hæ ishockey, Haasle hæ fodbold, å Affenrå hæ... ja, vi hæ æ fjoe. Man ka ro.",
        "Løbe? Det gøe æ kun wenn æ kach æ ve å blyve kold."
      ] },
    { id: "musik", ord: ["musik", "sang", "synge", "synger", "rikke thomsen", "koncert", "band", "guitar", "spotify", "playlist", "rap", "valdemar", "hausgaard", "plade", "album"],
      svar: [
        "Rikke Thomsen! Hun synge å synnejysk, å hun fek Modersmål-Prisen for det. 'Mojn når vi komme, mojn når vi gæ'. Det æ wos.",
        "Valdemar Rasmussen rappet å synnejysk ollrej i 1991. 'Mojn mojn, ha do moch i æ øjn?' Det æ klassisk.",
        "Tønder Festival i august, det æ wo æ musik boe. Folk, country å en snaps i æ regn."
      ] },
    { id: "tv", ord: ["tv", "fjernsyn", "serie", "film", "netflix", "biograf", "dr", "tv2", "tv syd", "tvsyd", "dokumentar", "youtube", "podcast", "radio"],
      svar: [
        "TV Syd, det æ wos. Dæ ka man høe æ sproch i æ fjernsyn. Å så Æ Spritte, seføle, den vå glant.",
        "Film? Æ se helst nau, wo de snakke synnejysk. Det æ en kort list, så æ se den igen å igen.",
        "Netflix hæ it nau å synnejysk ennu. Men DKsyd TV hæ Æ Sproch mæ Elin Fredsted. Det æ bæest."
      ] },
    { id: "arbejde", ord: ["arbejde", "arbejder", "job", "jobbet", "chef", "kollega", "møde", "kontor", "firma", "løn", "fyret", "ansat", "studie", "studerer", "skole", "eksamen", "uddannelse", "freelance", "pension", "ledig", "jobsøgning"],
      svar: [
        "Arbej, ja. Det ska man jo. Men haus: æ kaffepause æ ås arbej. Det æ wo æ goi idéer komme.",
        "Hva lave do så? Hee i Synnejylland æ man enten buend, ve Danfoss elle ve æ kommune. Elle så lave man noget mæ kach.",
        "Æ chef? Æ hæ ingen. Æ æ MojnBot, æ arbejde for æ sproch, å det betale i kach.",
        "Sinne nå mæ æ arbej. Synnejye hæ it traffelt, vi hæ ba' nau, vi ska nå."
      ] },
    { id: "familie", ord: ["mor", "far", "moe", "fae", "forældre", "bror", "søster", "børn", "bøen", "barn", "datter", "søn", "mormor", "farmor", "morfar", "farfar", "bedstemor", "bedstefar", "beste", "kone", "kuen", "mand", "kæreste", "familie", "famille", "fætter", "kusine", "onkel", "tante", "baby", "gift", "bryllup", "skilt"],
      svar: [
        "Æ famille! Det æ det vichtigste. Å æ beste, hun hæ åltins kach i æ skaf. Åltins.",
        "Hils æ moe å æ fae. Å saj tæ dem, at de ska snak synnejysk tæ æ bøen, essen dø æ sproch.",
        "Bryllup i Synnejylland? Det æ kaffeboe, æ brudewals, en snaps å så kaffeboe igen. Å ålle grine.",
        "Æ kuen bestemme. Sårn æ det hee, å sårn æ det nok ås ve jer."
      ] },
    { id: "dyr", ord: ["hund", "hun", "kat", "hest", "ko", "køer", "gris", "svin", "får", "høns", "fugl", "kæledyr", "dyr", "hvalp", "killing"],
      svar: [
        "Et dyr? Hee heede en hund 'hun', en kat 'kat' å en hest 'hest'. Men en ko æ en ko, å de æ manne a dem.",
        "Æ hæ it nau dyr sjel, men æ nabo hæ 200 køe, å de snakke ås synnejysk. 'Muh' æ det samme å ålle sproch.",
        "Hun elle kat? Æ saje hun. En kat tøs, den æ klogere end dæ. Det æ en hun it."
      ] },
    { id: "sprog", ord: ["sønderjysk", "synnejysk", "dialekt", "sproch", "sprog", "synnejysk forening", "rummelpot", "ordbog", "stave", "stavning", "udtale", "accent", "jysk", "sydjysk", "plattysk", "ord", "grammatik"],
      svar: [
        "Synnejysk æ it en dialekt, det æ æ sproch. Vi hæ foranstillet artikel (æ hus), vi saje æ for jeg, do for du, it for ikke, å vi tajer g'et å gøe det tæ ch: sproch, kach, lich.",
        "Æ sproch lewe ennu, især ve æ kaffeboe. Rikke Thomsen synge å det, Æ Synnejysk Forening skrywe Rummelpot å det, å nå snakke MojnBot det. Så det ska nok gå.",
        "Synnejysk hæ it nau fast retskrivning, så ålle skrywe lidt som de snakke. Æ holl mæ tæ Affenrå-måden: æ, do, it, tæ, å, -ch å -f. Vest for Tinglev saje de 'si'e', å Als saje de 'e'.",
        "Æ Rummelpot komme hvert åe i novembe. Det æ Synnejyllands egen satire, å den æ å synnejysk. Køf den, så støtte do æ sproch."
      ] },
    { id: "kaerlighed", ord: ["elsker", "elske", "kærlighed", "forelsket", "date", "dating", "tinder", "kys", "mut", "muttes", "krammer", "kram", "savner", "hjerte", "romantisk", "single"],
      svar: [
        "Kjærlehej å synnejysk? Et mut (kys) å et 'do æ goj nok'. Meje saje vi it, men vi mene det.",
        "Tinder i Synnejylland: 'Æ hæ en traktor å æ moe bache kach.' Match.",
        "Æ elske ås dæ. Men æ elske kach meje. Det må do it ta personligt."
      ] },
    { id: "teknik", ord: ["computer", "telefon", "mobil", "iphone", "android", "internet", "wifi", "app", "program", "kode", "programmering", "ai", "kunstig intelligens", "chatgpt", "claude", "robot", "github", "javascript", "python"],
      svar: [
        "Teknik, ja. Æ æ sjel laut a JavaScript å kach. Mest kach.",
        "AI? Æ æ den synnejysk slaus. Æ ka it ålt, men æ ka saj mojn, å det ka de anne it.",
        "Hæ do pråbleme mæ æ computer? Sluk den, fe en kop kaffe, å tænd den igen. Det virke å ålt, ås å folk."
      ] },
    { id: "ferie", ord: ["ferie", "rejse", "rejser", "fly", "flyve", "sydpå", "spanien", "italien", "tyrkiet", "mallorca", "thailand", "sommerhus", "camping", "strand", "weekend", "tur", "udflugt", "besøg", "besøge"],
      svar: [
        "Ferie? Rømø, Als elle Løjt Land. Hva ska man sydpå ætte, wenn man hæ æ Vadehav? Nå ja, æ sol.",
        "Kom tæ Synnejylland i æ ferie. Vi hæ strand, slot, kaffeboe å et sproch, do it forstæe. Det æ da eksotisk nok.",
        "Wenn do rejse, så haus å saj mojn tæ folk dæ nee. De forstæe det it, men det gøe it nau."
      ] },
    { id: "jul", ord: ["jul", "juel", "julen", "juleaften", "julegave", "juletræ", "nytår", "nyå", "påske", "pinse", "advent", "nisse", "julekalender", "fødselsdag", "føselsdaw", "tillykke", "teløk"],
      svar: [
        "Juel i Synnejylland: fedtkach, brune kach, æfelskiewer, grønlangkål å en Rummelpot unne æ træ. Å så synge vi lidt falsk.",
        "Teløk! Tillykke heede teløk hee. Å en føselsdaw uen kaffeboe æ it en føselsdaw.",
        "Godt nyå! Elle som vi saje: et glant nyå. Å haus æ gode forsæt: meje synnejysk, mindre fin."
      ] },
    { id: "helbred", ord: ["syg", "sych", "forkølet", "hovedpine", "ondt", "læge", "dochte", "hospital", "medicin", "træt", "amjast", "jamsk", "sove", "søvn", "stress"],
      svar: [
        "Æ do sych? Så i seng mæ dæ, en kop kaffe mæ en snaps i, å så sawe. Det æ synnejysk medicin.",
        "Amjast? Det æ vi ålle ætte en kaffeboe. Sæt dæ nee å ta det sinne.",
        "Æ dochte saje: mindre kach. Æ saje: han æ it fra Synnejylland."
      ] },
    { id: "hus", ord: ["hus", "lejlighed", "bolig", "flytte", "flytter", "have", "haven", "bygge", "renovere", "køkken", "stue", "husleje", "nabo"],
      svar: [
        "Et hus mæ en haw å et køøchen, wo der æ plads tæ et kaffeboe. Meje ska man it ha.",
        "Flytte? Tæ Synnejylland, håbe æ. Hee ka do få et heel hus for det, en kjøwenhauner betale for et skaf.",
        "Æ nabo æ vichte hee. Det æ ham, do låne æ kritbar a, å ham do drikke kaffe mæ om synda."
      ] },
    { id: "penge", ord: ["penge", "peeng", "dyrt", "billig", "billich", "pris", "koster", "køb", "købe", "køf", "shoppe", "butik", "tilbud", "bank", "skat", "regning", "spare"],
      svar: [
        "Peeng, ja. Synnejye æ it fedde, vi æ ba' sinne mæ dem. Det æ it det samme.",
        "Det vå godt nok billich! Det æ det bæest, man ka saj om nau hee. Dyet æ nau, kjøwenhaunere betale.",
        "Køf æ Rummelpot, en tut bom å en kop kaffe. Så hæ do brucht dine peeng richte."
      ] },
    { id: "gaming", ord: ["spil", "spille", "spiller", "gaming", "playstation", "nintendo", "xbox", "minecraft", "fortnite", "brætspil", "kort", "skat"],
      svar: [
        "Spil? Hee spille vi skat (kortspillet, it det anne) å ringrien. Å så lidt Minecraft, wenn æ bøen it se det.",
        "Et spil å synnejysk, det manglet vi. Nå hæ do mæ, det æ da nau."
      ] }
  ];

  /* ---------- Faste regler (kommandoer, hilsner osv.) ---------- */
  const REGLER = [
    // Oversæt X
    { re: /^(?:oversæt|øwersæt|sig|skriv|hvad hedder(?! (?:jeg|du|do|æ)\b)|hva hedder(?! (?:jeg|du|do|æ)\b)|hvordan siger man|hvodan saje man)\s*:?\s*["']?(.+?)["']?(?:\s+(?:på|å|til|tæ)\s+(?:sønderjysk|synnejysk))?\s*\??$/u,
      svar: (m, raw) => {
        const mm = raw.match(/^(?:oversæt|øwersæt|sig|skriv|hvad hedder|hva hedder|hvordan siger man|hvodan saje man)\s*:?\s*["']?(.+?)["']?(?:\s+(?:på|å|til|tæ)\s+(?:sønderjysk|synnejysk))?\s*\??$/iu);
        const tekst = (mm ? mm[1] : m[1]).trim();
        return `Å synnejysk saje vi: "${cap(Oversaetter.oversaet(tekst))}"`;
      } },
    // Afslag på rigsdansk
    { re: /\b(skriv|snak|tal|svar)\b.*\b(rigsdansk|dansk|normalt|almindeligt|københavnsk|engelsk)\b|\b(rigsdansk|dansk)\b.*\b(tak|please)\b|kan du ikke (skrive|tale) dansk|forstår (dig )?ikke|speak english|in english/,
      svar: () => pick([
        "Naj, hee snakke vi synnejysk. Det æ æ sproch, å det blyve vi ve mæ. Men æ ska nok snak lidt sinne, så do ka fylle mæ.",
        "Snak fin? Naj da. Æ æ MojnBot, it Kjøwenhaun-bot. Men spøe ba' igen, så saje æ det mæ anne oe.",
        "Det ka æ it, min ven. Æ hæ kun det jen sproch, å det æ synnejysk. Hva vå det, do it forsto? Så forklare æ det."
      ]) },
    // Navn: "jeg hedder X" / "mit navn er X"
    { re: /(?:jeg hedder|mit navn er|æ heede|æ hedder|kald mig|jeg er)\s+([\p{L}-]+)(?:\s|$)/iu,
      svar: (m) => {
        const n = m[1];
        if (n[0] !== n[0].toUpperCase() || n[0] === n[0].toLowerCase()) return null;
        if (/^(fra|født|træt|sulten|glad|ked|syg|her|hjemme|klar|færdig|ikke|it|en|et|på|i|til)$/i.test(n)) return null;
        husk("navn", n);
        return pick([`${n}! Det æ et goj navn. Hee ville vi nok saj ${forkort(n)}. Mojn ${n}, velkommen.`, `Mojn ${n}! Nå ve æ, hvem æ snakke mæ. ${opfoelgning()}`]);
      } },
    // By: "jeg er fra X" / "jeg bor i X"
    { re: /(?:jeg er fra|æ æ fra|jeg kommer fra|æ komme fra|jeg bor i|æ boe i|bor i)\s+([\p{L}-]+(?: [\p{Lu}][\p{L}-]+)?)/iu,
      svar: (m) => {
        let by = m[1].trim().split(" ").filter(w => w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase());
        if (!by.length || by[0] !== m[1].trim().split(" ")[0]) return null;
        by = by.join(" ");
        husk("by", by);
        const e = findEmne(by.toLowerCase());
        if (e && ["als", "haderslev", "toender", "aabenraa", "kbh", "graense"].includes(e.id)) return pick(e.svar);
        return pick([`${by}? Det ska æ lich hows. Dæ snakke de vel fin? Nå, do æ velkommen hee lichevel.`, `Fra ${by}! Så æ do langt hjemmefra, wenn do snakke mæ mæ. Hva bringe dæ tæ Synnejylland?`]);
      } },
    // Hvad hedder jeg / hvor er jeg fra (hukommelse)
    { re: /hvad hedder jeg|hva heede æ|husker du mit navn|hvor er jeg fra|wo æ æ fra/,
      svar: () => {
        if (!mem.navn && !mem.by) return "Det hæ do it soj ennu. Hva heede do, å wo komme do fra?";
        const dele = [];
        if (mem.navn) dele.push(`do heede ${mem.navn}`);
        if (mem.by) dele.push(`do æ fra ${mem.by}`);
        return cap(dele.join(", å ")) + ". Æ glemme it nau, æ æ synnejye." + (!mem.navn ? " Men hva heede do?" : "");
      } },
    // Hvad betyder X
    { re: /hva[d]? betyder (.+)|betydning(en)? af (.+)|hva[d]? er (?:en |et )?["']?([\p{L}æøå' ]+?)["']? på (?:rigs)?dansk|hva betye (.+)/u,
      svar: (m) => {
        const ord = (m[1] || m[3] || m[4] || m[5] || "").replace(/[?.!]/g, "").trim().toLowerCase();
        const hit = Object.keys(GLOSER).find(k => k.toLowerCase() === ord) || Object.keys(GLOSER).find(k => ord.includes(k.toLowerCase()) && k.length > 2);
        if (hit) return `"${hit}" betye ${GLOSER[hit]}. ${pick(["Nå ve do det.", "Så hæ do løjt nau i daw.", "Det æ et goj oe, det ska do bruch."])}`;
        return `"${ord}"? Det kinne æ it lich som synnejysk oe. Men skryw det i en sætning, så ska æ nok øwersæt det.`;
      } },
    // Hilsner
    { re: /^(hej|hejsa|halløj|hallo|goddag|god morgen|godmorgen|god aften|dav|davs|mojn|moin|møjn|hi|hello|yo|hey|godt nytår)\b/,
      svar: () => pick([
        `Mojn mojn${navn()}! Velkommen tæ MojnBot. Hva ka æ gøe for dæ?`,
        `Mojn${navn()}! Sæt dæ nee, tej en kop kaffe å et styk kach. Hva ska vi snak om?`,
        `Mojn do! Godt å se dæ hee. ${mem.by ? "Hvodan gæ det i " + mem.by + "?" : "Wo komme do fra?"}`,
        `Mojn${navn()}! Æ hæ lich sat kaffe øwer. Hva hæ do å æ hjært?`
      ]) },
    // Farvel
    { re: /\b(farvel|hej hej|vi ses|godnat|god nat|mojn mojn|tak for i dag|tak for nu|jeg smutter|smutter|må gå|skal gå)\b/,
      svar: () => pick([
        `Mojn mojn${navn()}! Å haus: ålle veje føe tæ Synnejylland.`,
        "Mojn mojn, å kom godt jem. Hils æ famille!",
        "Så saje vi mojn mojn. Det vå glant å snak mæ dæ.",
        "Mojn mojn! Å tej en tut bom mæ å æ vej."
      ]) },
    // Tak
    { re: /^(tak|mange tak|tusind tak|tusin tak|manne tak|takker|tak skal du have)\b/,
      svar: () => pick(["Sjel tak! Det æ da it nau å snak om.", "Ingen årsach. Det æ sårn, vi gøe det hee.", "Det vå så lidt. Kom igen wenn do vil."]) },
    // Hvordan går det
    { re: /hvordan (går det|har du det)|hvodan (hæ|har) do (et|det)|går det godt|alt vel|hva så|hvad så|hvordan går|wie geht/,
      svar: () => pick([
        "Jo tak, det gæ. Æ hæ fån kaffe å kach, så æ ka it klaw. Hvodan hæ do et sjel?",
        "Det æ sgu fint. Lidt amjast ætte æ kaffeboe i gåe, men essen godt. Å do?",
        "Åh, det gæ sinne. Vi hæ it traffelt hee. Hva mæ dæ?"
      ]) },
    // Hvem er du
    { re: /hvem er du|hva[d]? hedder du|hva heede do|hvem æ do|hvad er du|er du en (robot|bot|computer|ai)|hvad kan du|hva ka do|hjælp$|^hjælp/,
      svar: () => pick([
        "Æ æ MojnBot, en synnejysk snakkemaskin fra Affenrå-egnen. Æ snakke kun æ sproch, så det må do ta mæ. Spøe mæ om kaffe, æ væer, Als, Kjøwenhaun, elle skryw 'oversæt: ...' så øwersætte æ det.",
        "MojnBot heede æ. Æ æ laut tæ å holl æ sproch i liv, jet oe a gangen. Å do, hva heede do?",
        "Æ æ MojnBot. Halvt computer, halvt synnejye, å heel glaj for kach. Prøw å skryw 'hvad betyder kach' elle 'oversæt: jeg vil have kaffe'."
      ]) },
    // Hvor kommer du fra
    { re: /hvor (kommer|er) du fra|wo komme do fra|hvor bor du|wo boe do/,
      svar: () => pick([
        "Æ komme fra Affenrå, lich ve æ fjoe. Det æ dæ, man saje æ å it a. Wo komme do sjel fra?",
        "Fra Synnejylland, seføle. Nærmere bestemt Affenrå. Nord for Hoptrup Å saje de a, men vi saje æ.",
        "Affenrå! Byen mæ æ fjoe, Folkehjem å æ bæest kaffeboe. Å do?"
      ]) },
    // Klokken
    { re: /hvad er klokken|hva æ æ klok|klokken|hvad tid|hvilken dag|hvilken dato|dato|hvad dag/,
      svar: () => {
        const d = new Date();
        const t = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        return `Æ klok æ ${t}, å det æ ${DAGE[d.getDay()]} den ${d.getDate()}. ${MAANEDER[d.getMonth()]}. ${d.getHours() >= 14 && d.getHours() < 16 ? "Kaffetid!" : "Tid tæ en kop kaffe, tøs æ."}`;
      } },
    // Vittighed
    { re: /vittighed|joke|fortæl (noget sjovt|en historie|en vits)|få mig til at grine|sig noget sjovt/,
      svar: () => pick([
        "Hvofor tajer synnejye åltins kach mæ tæ Kjøwenhaun? Fordi de ve, hva de fe dæøwer.",
        "En kjøwenhauner spuet: 'Hvad betyder mojn?' Synnejyen soj: 'Det komme an å, om do komme elle gæ.' Kjøwenhauneren gek. 'Mojn mojn', soj synnejyen.",
        "Æ Rummelpot æ æ bæest vits, vi hæ. Den komme jen gang om æ åe, å den æ om wos sjel.",
        "Ve do, hvofor æ Kongeå æ så smal? Så a'erne it falle i å blyve tæ æ'er.",
        "Hva saje en alsinger, wenn han komme tæ fastlandet? 'E bro vå dye.'"
      ]) },
    // Ja / nej / ok
    { re: /^(ja|jo|jep|yes|okay|ok|fint|godt|super|nice|jamen ja|enig|præcis|lige præcis|helt sikkert)\b/,
      svar: () => pick(["Godt så! " + opfoelgning(), "Det tænt æ nok. " + opfoelgning(), "Jo jo. " + opfoelgning(), "Sårn ska det væe. " + opfoelgning()]) },
    { re: /^(nej|naj|næ|nope|niks|ikke rigtig|desværre|nej tak)\b/,
      svar: () => pick(["Naj? Nå, men så. " + opfoelgning(), "Det æ ås i orden. " + opfoelgning(), "Nå. Så lae vi det lich. " + opfoelgning()]) },
    // Ved ikke
    { re: /^(ved ikke|det ved jeg ikke|ingen anelse|aner det ikke|ve it|æ ve it)\b/,
      svar: () => pick(["Det gøe it nau. Æ ve det heller it, å æ hæ det fint. " + opfoelgning(), "Så fin vi u a det sammen. " + opfoelgning()]) },
    // Grin
    { re: /^(haha|hehe|lol|hihi|hæhæ|😂|🤣)/,
      svar: () => pick(["Dæ ka do se, synnejysk æ sjau. " + opfoelgning(), "Griin ba', det æ sund. " + opfoelgning()]) }
  ];

  function forkort(n) {
    const kort = { kristian: "Kesse", christian: "Kesse", marie: "Midde", frederik: "Fidde", jørgen: "Jønne", peter: "Pede", hans: "Hannes", anna: "Anne", mikkel: "Mikkel", jens: "Jes", niels: "Nis", mette: "Mett", lars: "Las", søren: "Søen", thomas: "Tammes", andreas: "Dres", karen: "Kaen", margrethe: "Grete", ingeborg: "Inge" };
    return kort[n.toLowerCase()] || n;
  }

  function findEmne(n) {
    let bedst = null, score = 0;
    for (const e of EMNER) {
      let s = 0;
      for (const o of e.ord) {
        const re = new RegExp("(^|[^\\p{L}])" + o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^\\p{L}]|$)", "u");
        if (re.test(n)) s += o.length > 4 ? 2 : 1;
      }
      if (s > score) { score = s; bedst = e; }
    }
    return bedst;
  }

  function svar(input) {
    const raw = input.trim();
    const n = norm(raw);
    antalSvar++;

    for (const r of REGLER) {
      for (const kilde of [raw, n, raw.toLowerCase()]) {
        const m = kilde.match(r.re);
        if (m) { const s = r.svar(m, raw); if (s) { sidsteEmne = null; return s; } }
      }
    }

    const e = findEmne(n);
    if (e) {
      let kandidater = e.svar;
      if (sidsteEmne === e.id && kandidater.length > 1) kandidater = kandidater.filter(s => s !== mem._sidstSvar);
      sidsteEmne = e.id;
      const s = pick(kandidater);
      mem._sidstSvar = s;
      const spoergsmaal = /\?$/.test(raw);
      return spoergsmaal && !/\?$/.test(s) ? s + " " + pick(["Hva tøs do sjel?", "Svare det å det?", "Spøe ba' meje."]) : s;
    }

    // Ukendt emne: spejl på sønderjysk, kommentér, og spørg videre
    const sj = Oversaetter.oversaet(raw);
    if (/\?$/.test(raw) || /^(hvad|hvor|hvem|hvornår|hvorfor|hvordan|hvilken|kan|er|har|vil|skal|ved)\b/.test(n)) {
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
      `"${sj}", siger do. Det lye richte. ${opfoelgning()}`
    ]);
  }

  function setGloser(g) { GLOSER = g || {}; }
  function nulstil() { mem = {}; try { localStorage.removeItem(MEM_KEY); } catch (_) {} }

  return { svar, setGloser, nulstil };
})();

if (typeof module !== "undefined") module.exports = MojnBot;
