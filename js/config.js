/* MojnBot – indstillinger.
   workerUrl: adressen på din Cloudflare Worker (fx "https://mojnbot.dit-navn.workers.dev").
   Tom = kun regelmotor. */
window.MOJNBOT_CONFIG = {
  workerUrl: "https://mojnbot.folmerfestersen.workers.dev",
  timeoutMs: 15000,
  model: "@cf/google/gemma-4-26b-a4b-it",   // skal stå i MODELLER-listen i worker.js
  temperature: 0.5,
  // "oversaet": AI'en svarer på rigsdansk, og MojnBots oversætter laver det til sønderjysk (anbefalet)
  // "direkte": AI'en skriver selv sønderjysk (mere dialekt, men flere fejl)
  metode: "oversaet"
};
