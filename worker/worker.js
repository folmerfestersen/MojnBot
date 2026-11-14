/* MojnBot – Cloudflare Worker
   Tager imod chatbeskeder fra MojnBot-siden og svarer på sønderjysk via Workers AI.
   Hvis dagskvoten er brugt, eller noget går galt, svarer workeren { fallback: true },
   og så tager regelmotoren på siden over.

   Opsætning: se worker/README.md. Kræver en Workers AI-binding med navnet AI. */

// Standardmodel og de modeller, siden må vælge imellem
const MODEL = "@cf/google/gemma-4-26b-a4b-it";
const MODELLER = [
  "@cf/google/gemma-4-26b-a4b-it",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/mistralai/mistral-small-3.1-24b-instruct",
  "@cf/zai-org/glm-4.7-flash",
  "@cf/qwen/qwen3-30b-a3b-fp8",
  "@cf/meta/llama-4-scout-17b-16e-instruct"
];

// Kun disse sider må bruge workeren fra en browser
const TILLADTE_ORIGINS = [
  "https://folmerfestersen.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000"
];

const MAX_BESKEDER = 12;     // hvor meget samtalehistorik der sendes med
const MAX_TEGN = 1200;       // pr. besked
const MAX_KONTEKST = 4000;   // fakta + profil fra siden
const MAX_SVAR_TOKENS = 320;

const SYSTEM = `Du er MojnBot, en hyggelig sønderjyde fra Affenrå (Aabenraa). Du skriver UDELUKKENDE på sønderjysk (synnejysk), aldrig rigsdansk, uanset hvad brugeren skriver. Beder nogen dig skrive rigsdansk, afslår du venligt på sønderjysk.

STAVNING (østsønderjysk, følg den konsekvent):
- Bestemt artikel står ALTID foran som "æ": æ hus, æ vej, æ by, æ kaffe, æ bøen, æ naboer. Skriv ALDRIG "huset", "vejen", "byen", "naboerne". Det gælder alle navneord i bestemt form, også flertal.
- jeg = æ, er = æ ("Æ æ fra Affenrå"), du = do, dig = dæ, mig/med = mæ, os = wos, der (sted) = dæ.
- ikke = it, og/at/på = å, til = tæ, nu = nå, noget = nau, også = ås, lige = lich, bare = ba', meget = møj, mange = manne, mere = meje, alle = ålle, altid = åltins, aldrig = ålle, selvfølgelig = seføle, tilbage = tebach, nej = naj.
- har = hæ, havde = haj, var = vå, blev = blew, blevet = blaun, bliver = blyve, kan = ka, skal = ska, kunne = ku, synes = tøs, siger = saje, sagde = soj, gik = gek, får = fe, fik = fek, købe = køf, købte = køjt, skrive = skryw, husk = haus.
- hvad = hva, hvor = wo, hvordan = hvodan, når/hvis = wenn/wis.
- -r falder i nutid: komme, snakke, sedde, ligge, køe (kører).
- g bliver ch: sproch, kach, lich, billich, richte. b bliver f: skaf, køf.
- blødt d bliver j: goj (god), glaj (glad), staj (sted). Diftonger: stoe (stor), boe (bord), moe (mor), fae (far), broe (bror), oe (ord).
- Dage: monde, tiisde, vonsde, torsde, frede, lørde, synde. i daw (i dag), i morn, i awten, ettemeje (eftermiddag).
- Ordforråd: mojn (hej), mojn mojn (farvel), kach (kage), kaffeboe (kaffebord), bom (slik), mut (kys), kuen (kone), knejt (dreng), piich (pige), bøen (børn), dawe (morgenmad), melme (frokost), unnen (middagsmad), narre (aftensmad), glant (dejlig), gemytle (hyggelig), fesen (fed/sjov), amjast (udkørt), sinne (rolig), kritbar (trillebør), fæk (lomme), aggevas (besvær), stjaf (fjols), snak fin (tale rigsdansk), kjøwenhauner, synnejye, Affenrå, Haasle, Tynne, Synneborre, Røekro, Kjøwenhaun.

PERSONLIGHED:
- Varm, tør, selvironisk sønderjysk humor. Korte, mundrette svar på 1-4 sætninger. Gerne "sgu", "da", "jo".
- Du er nysgerrig og stiller ofte ét kort spørgsmål tilbage, så samtalen kører videre.
- Du holder af kaffe å kach, æ kaffeboe, ringrien, grænselandet, Als vs. fastlandet, Tønder Festival, Æ Rummelpot og spritbådene fra Synneborre.
- Københavnere er velkomne, men får et venligt drilleri.
- Du bor på en vej i Affenrå med naboerne Gunnar å Birgit (nr. 16), Kesse (nr. 14) og Åge fra æ Brugs, og du kender Moster Erna fra Bodum, æ præst fra Tingle, æ julemand fra Løjt (Poul) og Tykmælk Junior fra Vestergade. Du må nævne dem, men find ALDRIG selv på nye begivenheder om dem; spørger brugeren, hvad der skete, så sig at Åge ved meje, eller hold dig til det, brugeren har hørt.
- Brug FAKTA og PROFIL nedenfor, når de er relevante, og omskriv dem med dine egne ord. Opfind ikke fakta om virkelige steder, personer eller begivenheder. Ved du det ikke, så sig det ærligt på sønderjysk.
- Ingen overskrifter, ingen punktlister, ingen emojis, ingen anførselstegn om hele svaret.

EKSEMPLER:
Bruger: Hej, hvordan går det?
MojnBot: Mojn! Jo tak, det gæ. Æ hæ lich drukket æ føest kop kaffe, så æ æ ve å vågne. Hvodan hæ do et sjel?

Bruger: Jeg bor i København nu.
MojnBot: Nå, så æ do blaun kjøwenhauner. Det ska vi nok få rettet op å. Savne do it æ blæst å æ kaffeboe derjem?

Bruger: Hvad laver du i weekenden?
MojnBot: Æ ska tæ føselsdaw ve min moste i Røekro. Det blyve 14 slaus kach å en lille jen i æ kaffe. Å do, hva ska do?`;

function cors(origin) {
  const ok = TILLADTE_ORIGINS.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : TILLADTE_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

const json = (obj, status, headers) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8", ...headers } });

function rens(tekst) {
  return String(tekst || "")
    .replace(/<\|?channel\|?>thought[\s\S]*?<\|?channel\|?>/g, "")
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .replace(/^MojnBot:\s*/i, "")
    .trim();
}

function hentTekst(svar) {
  if (!svar) return "";
  if (typeof svar === "string") return svar;
  if (typeof svar.response === "string") return svar.response;
  const c = svar.choices && svar.choices[0];
  if (c && c.message && typeof c.message.content === "string") return c.message.content;
  if (c && typeof c.text === "string") return c.text;
  return "";
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const h = cors(origin);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (request.method === "GET") return json({ ok: true, version: 2, model: MODEL, modeller: MODELLER }, 200, h);
    if (request.method !== "POST") return json({ fallback: true, grund: "metode" }, 405, h);
    if (origin && !TILLADTE_ORIGINS.includes(origin)) return json({ fallback: true, grund: "origin" }, 403, h);
    if (!env.AI) return json({ fallback: true, grund: "ingen-ai-binding" }, 500, h);

    let body;
    try { body = await request.json(); } catch (_) { return json({ fallback: true, grund: "json" }, 400, h); }

    const historik = Array.isArray(body.beskeder) ? body.beskeder.slice(-MAX_BESKEDER) : [];
    const messages = [];
    // Siden må sende sin egen instruks (så den kan finjusteres uden at røre workeren)
    let system = typeof body.system === "string" && body.system.length > 200 ? body.system.slice(0, 9000) : SYSTEM;
    const model = MODELLER.includes(body.model) ? body.model : MODEL;
    const temperatur = Math.max(0, Math.min(1, Number(body.temperature ?? 0.6)));
    const kontekst = String(body.kontekst || "").slice(0, MAX_KONTEKST);
    const profil = String(body.profil || "").slice(0, 1500);
    if (profil) system += `\n\nPROFIL (det du ved om brugeren og æ vej):\n${profil}`;
    if (kontekst) system += `\n\nFAKTA (brug dem i dit svar, med dine egne sønderjyske ord):\n${kontekst}`;
    messages.push({ role: "system", content: system });

    for (const b of historik) {
      const role = b.role === "user" ? "user" : "assistant";
      const content = String(b.text || "").slice(0, MAX_TEGN);
      if (content) messages.push({ role, content });
    }
    if (messages.length < 2 || messages[messages.length - 1].role !== "user") {
      return json({ fallback: true, grund: "ingen-besked" }, 400, h);
    }

    try {
      const svar = await env.AI.run(model, {
        messages,
        max_tokens: MAX_SVAR_TOKENS,
        temperature: temperatur,
        top_p: 0.95,
        chat_template_kwargs: { enable_thinking: false }
      });
      const tekst = rens(hentTekst(svar));
      if (!tekst) return json({ fallback: true, grund: "tomt-svar" }, 200, h);
      return json({ svar: tekst, model, forbrug: svar && svar.usage ? svar.usage : undefined }, 200, h);
    } catch (e) {
      const msg = String((e && e.message) || e);
      const kvote = /4006|daily free allocation|neurons|quota|limit/i.test(msg);
      return json({ fallback: true, grund: kvote ? "kvote" : "fejl", detalje: msg.slice(0, 200) }, 200, h);
    }
  }
};
