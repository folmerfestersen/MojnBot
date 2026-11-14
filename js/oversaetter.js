/* MojnBot – regelbaseret oversætter rigsdansk -> sønderjysk.
   1) flerordsudtryk  2) ordbogsopslag  3) bestemt form -> "æ ..."  4) lydregler på ukendte ord */

const Oversaetter = (() => {
  let ORD = {};
  let FRASER = [];

  const FLERORD = {
    "i dag": "i daw", "i morgen": "i morn", "i aften": "i awten", "i går": "i gåe", "i nat": "i nat",
    "i forgårs": "i overgår", "i weekenden": "i æ løwde-synde", "om lidt": "knap aude",
    "god dag": "goj daw", "god morgen": "goj morn", "god aften": "goj awten", "god nat": "goj nat",
    "god weekend": "goj løwde-synde", "god søndag": "goj synda", "god lørdag": "goj lørda",
    "tak for i dag": "tak for i daw", "mange tak": "manne tak", "tusind tak": "tusin tak",
    "hvad så": "hva så", "hvordan går det": "hvodan hæ do et", "hvordan har du det": "hvodan hæ do et",
    "hvor kommer du fra": "wo komme do fra", "hvad hedder du": "hva heede do", "hvad laver du": "hva lave do",
    "det er": "det æ", "der er": "dæ æ", "her er": "hee æ", "jeg er": "æ æ", "du er": "do æ", "vi er": "vi æ", "de er": "de æ",
    "jeg har": "æ hæ", "du har": "do hæ", "vi har": "vi hæ", "jeg kan": "æ ka", "jeg skal": "æ ska", "jeg vil": "æ vil",
    "kan ikke": "ka it", "skal ikke": "ska it", "vil ikke": "vil it", "er ikke": "æ it", "har ikke": "hæ it",
    "tag det roligt": "sinne nå", "slap af": "sinne nå", "ro på": "sinne nå",
    "en pose slik": "en tut bom", "hul i lommen": "gaf i æ fæk", "ikke noget at gøre ved det": "dæ it å gøje",
    "tale rigsdansk": "snak fin", "snakke rigsdansk": "snak fin", "på sønderjysk": "å synnejysk", "på dansk": "å dansk",
    "sønderjysk kaffebord": "synnejysk kaffeboe", "over grænsen": "øwer æ græns", "syd for grænsen": "syd for æ græns",
    "hinanden": "æ nan", "med hinanden": "mæ æ nan",
    "klokken er": "æ klok æ", "hvad er klokken": "hva æ æ klok"
  };

  async function load(url = "data/ordbog.json") {
    const res = await fetch(url);
    const data = await res.json();
    ORD = data.oversaet || {};
    FRASER = Object.entries(FLERORD).sort((a, b) => b[0].length - a[0].length);
    return data;
  }

  function setOrdbog(data) {
    ORD = data.oversaet || {};
    FRASER = Object.entries(FLERORD).sort((a, b) => b[0].length - a[0].length);
  }

  function matchCase(src, out) {
    if (!src) return out;
    if (src === src.toUpperCase() && src.length > 1) return out.toUpperCase();
    if (src[0] === src[0].toUpperCase() && src[0] !== src[0].toLowerCase()) return out[0].toUpperCase() + out.slice(1);
    return out;
  }

  const VOK = "aeiouyæøå";
  const erVokal = c => VOK.includes(c);

  // Lydregler til ord, der ikke står i ordbogen
  function lydregler(w) {
    let o = w;
    if (o.length < 4) return o;
    // hv- -> w-
    if (o.startsWith("hv")) o = "w" + o.slice(2);
    // -lig/-ligt -> -le ; -ig/-igt -> -ich
    if (/ligt?$/.test(o)) o = o.replace(/ligt?$/, "le");
    else if (/igt?$/.test(o)) o = o.replace(/igt?$/, "ich");
    // -else -> -els (bevarels, tæmælling)
    o = o.replace(/else$/, "els");
    // -ning -> -ning (uændret), -hed -> -hej
    o = o.replace(/hed$/, "hej");
    // -nd / -ld i udlyd -> -n / -l  (hund->hun, vild->vil)
    o = o.replace(/nd$/, "n").replace(/ld$/, "l");
    // -ede (datid) -> -et ; -ende -> -end
    o = o.replace(/ede$/, "et").replace(/ende$/, "end");
    // -er (præsens/flertal) -> -e  (kommer->komme), men ikke -mer/-ner i korte ord
    if (/[a-zæøå]{3,}er$/.test(o) && !/eer$/.test(o)) o = o.slice(0, -1);
    // -b efter vokal i udlyd -> -f ; -g efter vokal i udlyd -> -ch
    if (/[aeiouyæøå]b$/.test(o)) o = o.slice(0, -1) + "f";
    if (/[aeiouyæøå]g$/.test(o)) o = o.slice(0, -1) + "ch";
    // -age -> -ach (bagage->bagach), -ige -> -iche
    o = o.replace(/age$/, "ach").replace(/ige$/, "iche");
    // -ede/-de ending in apokope: "bage" -> "bach" handled; generic trailing -e after consonant cluster dropped for verbs (snakke->snak)
    if (/[^aeiouyæøå]{2}e$/.test(o) && o.length > 4) o = o.slice(0, -1);
    // v mellem vokaler -> w (over->øwer handled by dict; lave->lawe)
    o = o.replace(/([aeiouyæøå])v([aeiouyæøå])/g, "$1w$2");
    return o;
  }

  // Bestemt form: "kaffen" -> "æ kaffe", "husene" -> "æ huus"
  function bestemtForm(w) {
    const m = w.match(/^(.+?)(erne|ene|en|et)$/);
    if (!m) return null;
    const stam = m[1];
    const kandidater = [stam, stam + "e"];
    for (const k of kandidater) {
      if (ORD[k] && k.length >= 3) return "æ " + ORD[k];
    }
    if ((m[2] === "erne" || m[2] === "ene") && stam.length >= 3) return "æ " + lydregler(stam);
    return null;
  }

  function oversaetOrd(raw) {
    const lower = raw.toLowerCase();
    if (ORD[raw] !== undefined) return matchCase(raw, ORD[raw]);           // egennavne (Aabenraa)
    if (ORD[lower] !== undefined) return matchCase(raw, ORD[lower]);
    const bf = bestemtForm(lower);
    if (bf) return matchCase(raw, bf);
    return matchCase(raw, lydregler(lower));
  }

  function oversaet(tekst) {
    if (!tekst) return "";
    let t = " " + tekst + " ";
    const laast = [];
    // 1) flerordsudtryk (case-insensitive, hele ord) – resultatet låses, så ord-passet ikke rører det
    for (const [da, sj] of FRASER) {
      const re = new RegExp("(?<![\\p{L}])" + da.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\p{L}])", "giu");
      t = t.replace(re, m => { laast.push(matchCase(m, sj)); return "\u0001" + (laast.length - 1) + "\u0002"; });
    }
    // 2) ord for ord
    t = t.replace(/[\p{L}']+/gu, w => oversaetOrd(w));
    // 3) lås op
    t = t.replace(/\u0001(\d+)\u0002/g, (_, i) => laast[+i]);
    return t.trim().replace(/\s+([,.!?;:])/g, "$1");
  }

  /* Efterbehandling af AI-tekst: retter kun de hyppigste rigsdanske smuttere
     og bestemt form ("huset" -> "æ hus"). Rører ikke ord, der allerede er sønderjyske. */
  const SMUTTERE = {
    "jeg": "æ", "ikke": "it", "ik": "it", "du": "do", "dig": "dæ", "mig": "mæ", "os": "wos",
    "og": "å", "med": "mæ", "til": "tæ", "hvad": "hva", "hvor": "wo", "hvordan": "hvodan",
    "også": "ås", "noget": "nau", "meget": "møj", "mange": "manne", "lige": "lich", "nu": "nå",
    "har": "hæ", "havde": "haj", "er": "æ", "var": "vå", "blev": "blew", "kan": "ka", "skal": "ska",
    "siger": "saje", "sagde": "soj", "synes": "tøs", "altid": "åltins", "aldrig": "ålle", "alle": "ålle",
    "nej": "naj", "selvfølgelig": "seføle", "tilbage": "tebach", "rigtig": "richte", "rigtigt": "richte",
    "dag": "daw", "kage": "kach", "kager": "kach", "sprog": "sproch", "sønderjysk": "synnejysk",
    "sønderjyde": "synnejye", "sønderjyder": "synnejye", "hjem": "jem", "her": "hee", "godt": "godt",
    "ved": "ve", "på": "å", "mor": "moe", "far": "fae", "stor": "stoe", "god": "goj", "glad": "glaj",
    "ude": "ue", "over": "øwer", "efter": "ætte", "allerede": "ollrej", "sammen": "sammen", "måske": "måske",
    "ju": "jo", "blive": "blyw", "bliver": "blyve", "holde": "holl", "holder": "holle", "eller": "elle", "bare": "ba'",
    "hele": "heel", "lyde": "lye", "lyder": "lye", "møje": "møj", "ud": "u", "af": "a", "weekend": "løwde-synde",
    "weekenden": "æ løwde-synde", "lave": "lav", "laver": "lave", "hvis": "wis", "når": "wenn",
    "plejer": "plejje", "tror": "troe", "godt": "godt", "dejlig": "glant", "dejligt": "glant", "hyggeligt": "gemytle", "herhen": "heehen", "derhen": "dæhen",
    "hyggelig": "gemytle", "sikke": "sikke", "høre": "høe", "nogensinde": "naunsinde", "altså": "ålså", "kom": "kom", "gerne": "gern", "ville": "vil", "kunne": "ku", "skulle": "sku"
  };
  function efterbehandl(tekst) {
    if (!tekst) return tekst;
    // Fjern evt. tænke-tags fra modellen
    tekst = tekst.replace(/<\|?channel\|?>thought[\s\S]*?<\|?channel\|?>/g, "").replace(/<\/?think>[\s\S]*?<\/think>/g, "").trim();
    tekst = tekst.replace(/\blich lige\b/gi, "lich").replace(/\blige lich\b/gi, "lich");
    tekst = retDoDae(tekst);
    return tekst.replace(/[\p{L}']+/gu, (w, off, hel) => {
      const lw = w.toLowerCase();
      const foer = hel.slice(Math.max(0, off - 3), off).toLowerCase();
      const harArtikel = /(^|\s)[æe]\s$/.test(foer);
      if (SMUTTERE[lw] !== undefined) return matchCase(w, SMUTTERE[lw]);
      if (/^\p{Lu}/u.test(w) && ORD[w] !== undefined) return ORD[w];   // bynavne: Aabenraa -> Affenrå
      const KORT = { byen: "by", øen: "ø", åen: "å", søen: "sø", koen: "ko", broen: "bro", kroen: "kro", fjorden: "fjoe", havnen: "havn", vejen: "vej", kirken: "kirk", grænsen: "græns", naboerne: "naboer", børnene: "bøen" };
      if (KORT[lw]) return harArtikel ? KORT[lw] : matchCase(w, "æ " + KORT[lw]);
      // bestemt form af kendte navneord -> æ + stamme
      const m = lw.match(/^(.+?)(erne|ene|en|et)$/);
      if (m && m[1].length >= 3) {
        const stam = ORD[m[1]] !== undefined ? m[1] : (ORD[m[1] + "e"] !== undefined ? m[1] + "e" : null);
        if (stam && !["den", "det", "end", "men"].includes(lw)) {
          const sj = ORD[stam];
          return harArtikel ? sj : matchCase(w, "æ " + sj);
        }
      }
      return w;
    });
  }

  /* do (du) vs. dæ (dig/der): ret de typiske fejl, hvor "dæ" står som grundled */
  const VERBER = "vil|ville|ka|kan|ku|ska|skal|sku|hæ|har|haj|vå|ve|tøs|synes|komme|kom|gæ|går|saje|siger|lave|lav|snakke|fe|får|køe|boe|bor|mene|troe|tror|kinne|kender|ligge|sedde|spise|drikke|blyve|bliver|må|se|ser|skrywe|høe|hører|hjælpe|elske|hade|savne|glæe|ønske|behøwe|plejje";
  function retDoDae(t) {
    const L = "(?<![\\p{L}'])", R = "(?![\\p{L}'])";
    // "wis dæ vil" -> "wis do vil": dæ som grundled efter bindeord/spørgeord, foran et udsagnsord
    t = t.replace(new RegExp(`${L}(wis|hvis|wenn|når|at|å|så|men|fordi|om|elle|hvodan|hva|wo|hvem)\\s+dæ\\s+(?=(?:${VERBER})${R})`, "giu"), (m, a) => `${a} do `);
    // "Hva tøs dæ", "Hæ dæ ...?", "Ka dæ ..." -> do (dæ lige efter et hjælpe-/tankeudsagnsord)
    t = t.replace(new RegExp(`${L}(tøs|hæ|ka|ska|vil|ve|kinne|ku|sku|må|savne|boe|gæ|komme|snakke|vå|har|kan|skal|synes)\\s+dæ${R}`, "giu"), (m, v) => `${v} do`);
    return t;
  }

  /* Ordbog til AI'en: en fast kerne + de ord, brugeren selv har skrevet */
  const KERNE = ("jeg mig du dig os er var har havde ikke og på til med nu noget også lige bare meget mange mere alle altid aldrig her hvad hvor hvordan nej kan skal synes siger sagde går gik sidder får fik købe tilbage selvfølgelig tillykke god godt glad stor kage dag aften morgen eftermiddag mor far bror søster børn kone mand dreng pige ven venner nabo hus vej by bil mad kaffe slik øl penge tid uge år skole arbejde kirke have køkken stue dør vindue bord stol seng hoved hånd øjne hund kat hest vejr regn sol koldt varmt træt sulten sød sjov dejlig hyggelig rigtig mærkelig billig dyr hurtig smuk færdig svær nem lille ny gammel lang kort komme gå se tage give sove bo hedde tro tænke huske vide lave snakke høre finde hjælpe vente kende spise drikke køre fest familie").split(" ");
  function ordbogTilAI(brugertekst, gloser, max = 160) {
    const linjer = new Set();
    const ord = (brugertekst || "").toLowerCase().match(/[\p{L}']+/gu) || [];
    for (const w of ord) {
      if (ORD[w] !== undefined && ORD[w] !== w) linjer.add(`${w} = ${ORD[w]}`);
      const m = w.match(/^(.+?)(erne|ene|en|et)$/);
      if (m && ORD[m[1]] !== undefined && m[1].length >= 2) linjer.add(`${w} = æ ${ORD[m[1]]}`);
      if (gloser) { const g = Object.keys(gloser).find(k => k.toLowerCase() === w); if (g) linjer.add(`${g} betyder ${gloser[g].split(".")[0]}`); }
    }
    for (const w of KERNE) { if (linjer.size >= max) break; if (ORD[w] !== undefined && ORD[w] !== w) linjer.add(`${w} = ${ORD[w]}`); }
    return [...linjer].join("\n");
  }

  return { load, setOrdbog, oversaet, lydregler, efterbehandl, ordbogTilAI, retDoDae };
})();

if (typeof module !== "undefined") module.exports = Oversaetter;
