# MojnBot-worker (Cloudflare Workers AI)

Workeren giver MojnBot en rigtig sprogmodel (Gemma 4 26B) uden API-nøgle i browseren.
Den kører gratis på Cloudflares Workers Free-plan med 10.000 "neurons" om dagen
(ca. nogle hundrede svar). Når kvoten er brugt, eller workeren fejler, tager
regelmotoren på siden over automatisk, og den prøver først AI'en igen næste døgn
(nulstilles kl. 01:00 dansk vintertid / 00:00 UTC). På Free-planen kan der ikke
komme en regning: kald ud over kvoten fejler bare.

## Opsætning i browseren (ca. 10 minutter)

1. Opret en gratis konto på https://dash.cloudflare.com (intet betalingskort nødvendigt).
2. Gå til **Workers & Pages** → **Create** → vælg *Hello World*-workeren.
   Navngiv den `mojnbot` og tryk **Deploy**.
3. Tryk **Edit code**, slet alt i editoren, og indsæt hele indholdet af `worker.js`.
   Tryk **Deploy**.
4. Gå til workerens **Settings** → **Bindings** → **Add** → **Workers AI**.
   Variabelnavnet skal være `AI`. Gem (deploy igen, hvis den beder om det).
5. Kopiér workerens adresse, fx `https://mojnbot.dit-navn.workers.dev`.
   Åbner du den i browseren, skal der stå `{"ok":true,...}`.
6. Sæt adressen ind i `js/config.js` som `workerUrl`, og push.

## Fra terminalen (alternativ)

```bash
cd worker
npx wrangler login
npx wrangler deploy
```

## Hvordan det hænger sammen

```
Bruger skriver
  └─ js/mojnbot.js: analyser()
       ├─ fast svar (oversæt, gloser, sladderkapitler, klokken, navn/by) → vises direkte
       └─ fri snak / steder / emner
            ├─ workerUrl sat og kvote ikke brugt → worker → Gemma (med FAKTA fra
            │    data/viden.js + PROFIL om brugeren) → Oversaetter.efterbehandl()
            └─ ellers / ved fejl → regelmotorens svar (fallback)
```

Workeren accepterer kun kald fra folmerfestersen.github.io og localhost
(`TILLADTE_ORIGINS` øverst i `worker.js`). Model, svarlængde og stavereglerne
til modellen kan også rettes øverst i filen.
