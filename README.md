# MojnBot ☕

**Æ synnejysk chatbot.** MojnBot snakker kun sønderjysk, uanset hvad du skriver til den.

👉 Prøv den: **https://folmerfestersen.github.io/MojnBot/**

## Hvad er det?

Sønderjysk er ikke et skriftsprog, men folk skriver det alligevel, bl.a. i
[Æ Synnejysk Forenings Facebook-gruppe](https://www.facebook.com/groups/synnejyskforening).
MojnBot er et forsøg på at samle de mønstre i én konsekvent, lydnær stavning
(østsønderjysk / Aabenraa-egnen) og bygge en bot, der holder fast i den.

Den kører i to lag:

- **AI (valgfri):** en lille Cloudflare Worker med Workers AI (Gemma 4) tager den frie snak,
  med fakta fra vidensbasen og det, botten ved om brugeren, som baggrund. Gratis op til
  Cloudflares daglige kvote. Se [worker/README.md](worker/README.md).
- **Regelmotor:** svarer altid på oversættelser, gloser og sladderkapitler, og tager over,
  når AI'en ikke er sat op, kvoten er brugt, eller noget fejler.

Regelmotoren består af:

- **Vidensbase** (`data/viden.js`): alle byer og egne i Aabenraa, Sønderborg, Haderslev og
  Tønder kommuner plus grænselandet, hver med flere svar; emner som kaffebord, ringridning,
  Genforeningen, Æ Rummelpot, Tønder Festival, SønderjyskE, Æ Spritte, mad, vejr, familie osv.
- **Sladder**: eskalerende historier om Gunnar og Birgit fra nummer 16, Kesse fra nummer 14 og
  Åge fra æ Brugs. Hver gang man spørger ("og så?", "hvad skete der med Gunnar?") kommer næste
  kapitel, og det bliver vildere. Man kan også spørge til fakta (alder, bil, hund, job).
- **Hukommelse**: husker navn, by og ting man har nævnt, og vender tilbage til dem.
- **Oversætter** (`js/oversaetter.js`): rigsdansk → sønderjysk via fraser, ordbog, bestemt form
  ("huset" → "æ hus") og lydregler for ukendte ord. Bruges med "Oversæt: …" og til at spejle
  det, brugeren skriver.
- **Gloser**: "Hvad betyder kach?" slår op i `data/ordbog.json`.

## Mappestruktur

```
index.html          chat-UI
css/stil.css        udseende
js/oversaetter.js   rigsdansk -> sønderjysk (fraser, ordbog, bestemt form, lydregler)
js/mojnbot.js       samtalemotor (regler, sladder, steder, emner, noter)
js/app.js           binder det hele sammen, tænkepause, AI-kald med fallback
js/config.js        workerUrl til Cloudflare-workeren (tom = kun regelmotor)
worker/worker.js    Cloudflare Worker med Workers AI
assets/             logo og ikoner
data/viden.js       vidensbase: steder, emner, sladderhistorier
data/ordbog.json    oversættelsesordbog + gloseliste med forklaringer
prompt/system.md    persona-beskrivelse (kan bruges hvis man senere vil sætte en sprogmodel på)
docs/stilguide.md   hvordan MojnBot staver, og hvorfor
```

## Sådan skriver MojnBot

Kort version (hele guiden ligger i [docs/stilguide.md](docs/stilguide.md)):

- Foranstillet artikel: **æ hus**, æ sproch, æ kaffe
- jeg = **æ**, er = **æ**, du = **do**, dig = **dæ**, mig/med = **mæ**, os = **wos**, ikke = **it**
- og/at/på = **å**, til = **tæ**, nu = **nå**, noget = **nau**, også = **ås**, lige = **lich**
- -r falder: komme, snakke, sedde · g → ch: sproch, kach, billich · b → f: skaf, køf
- blødt d → j: goj, glaj, staj · v → w: wo, wand, skryw
- Mojn = hej. Mojn mojn = farvel.

## Udvid botten

Vil du have MojnBot til at vide mere, så er det `data/viden.js`, du skal i:

- `steder`: tilføj et objekt med `navne` (alle stavemåder, små bogstaver) og `svar` (liste).
- `emner`: `id`, `ord` (nøgleord på rigsdansk og sønderjysk) og `svar`.
- `sladder`: tilføj en person med `navne`, `intro`, `fakta` og `kapitler` (rækkefølgen er historien).

Ordforråd ligger i `data/ordbog.json`:

- `oversaet`: rigsdansk ord → sønderjysk (bruges af oversætteren)
- `gloser`: sønderjysk ord → forklaring (bruges til "Hvad betyder …")

Ord, der mangler, køres gennem lydreglerne i `js/oversaetter.js`. Pull requests
med flere ord og bedre stavning er meget velkomne, især fra folk vest for
Tinglev og nord for Hoptrup Å, som staver anderledes.

## Kør lokalt

Det er statiske filer, men `fetch()` kræver en webserver:

```bash
python3 -m http.server 8000
# åbn http://localhost:8000
```

## Kilder

- Marie Birkkjær Jacobsen: *Synnejysk å skrift*, Ord & Sag 39 (Peter Skautrup Centret)
- Inger Schoonderbeek Hansen: *Dialektalt skriftsprog – Rikke Thomsens Mojn Når Vi Komme*, Ord & Sag 39
- Karen Margrethe Pedersen: *Sønderjysk skriftsprog i 150 år*, MUDS
- [mutmut.dk/sonderjysk-ordbog](https://mutmut.dk/sonderjysk-ordbog/) og [marskshoppen.dk/soenderjysk-ordbog](https://marskshoppen.dk/soenderjysk-ordbog/)
- [dansk-sprog-i-forandring.dk](https://dansk-sprog-i-forandring.dk/gamle-og-nye-dialekter-i-danmark-2/gammel-dialekt-sonderjysk/)
- Læsning af opslag og kommentarer i Æ Synnejysk Forenings åbne Facebook-gruppe (kun mønstre, ingen tekst er kopieret)

## Licens

MIT. Lavet af Mikkel Folmer Festersen Pedersen med hjælp fra Claude.
