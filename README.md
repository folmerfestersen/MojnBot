# MojnBot ☕

**Æ synnejysk chatbot.** MojnBot snakker kun sønderjysk, uanset hvad du skriver til den.

👉 Prøv den: **https://folmerfestersen.github.io/MojnBot/**

## Hvad er det?

Sønderjysk er ikke et skriftsprog, men folk skriver det alligevel, bl.a. i
[Æ Synnejysk Forenings Facebook-gruppe](https://www.facebook.com/groups/synnejyskforening).
MojnBot er et forsøg på at samle de mønstre i én konsekvent, lydnær stavning
(østsønderjysk / Aabenraa-egnen) og bygge en bot, der holder fast i den.

Den kører i to tilstande:

| Tilstand | Kræver | Hvad sker der |
|---|---|---|
| **Regelmotor** (standard) | Ingenting | En lille ELIZA-agtig bot med hensigtsgenkendelse, svarskabeloner og en rigsdansk → sønderjysk-oversætter (ordbog + lydregler). Gratis, kører 100 % i browseren. |
| **Claude** (valgfri) | Din egen Anthropic API-nøgle | Claude svarer med MojnBots sønderjyske system-prompt. Nøglen gemmes kun i din browsers `localStorage` og sendes direkte til `api.anthropic.com`. Hvis kaldet fejler, tager regelmotoren over. |

Klik på ⚙ øverst til højre for at indtaste en nøgle. Nøgler fås på
[console.anthropic.com](https://console.anthropic.com). Standardmodellen er
`claude-haiku-5-5`; `claude-sonnet-5-5` og `claude-opus-5-5` kan vælges.

## Mappestruktur

```
index.html          chat-UI
css/stil.css        udseende
js/oversaetter.js   rigsdansk -> sønderjysk (fraser, ordbog, bestemt form, lydregler)
js/mojnbot.js       regelbaseret samtalemotor
js/claude.js        valgfri Claude-klient (BYOK)
js/app.js           binder det hele sammen, gemmer samtale lokalt
data/ordbog.json    oversættelsesordbog + gloseliste med forklaringer
prompt/system.md    system-prompt til Claude
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

## Udvid ordbogen

Alt ordforråd ligger i `data/ordbog.json`:

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
