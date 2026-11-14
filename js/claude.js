/* MojnBot – valgfri Claude-integration (BYOK: brugerens egen nøgle, gemt kun i localStorage). */

const ClaudeKlient = (() => {
  const KEY = "mojnbot.apiKey";
  const MODEL_KEY = "mojnbot.model";
  const STANDARD_MODEL = "claude-haiku-5-5";
  let systemPrompt = "";

  async function loadSystemPrompt(url = "prompt/system.md") {
    const res = await fetch(url);
    systemPrompt = await res.text();
    return systemPrompt;
  }

  const getKey = () => localStorage.getItem(KEY) || "";
  const setKey = k => k ? localStorage.setItem(KEY, k.trim()) : localStorage.removeItem(KEY);
  const getModel = () => localStorage.getItem(MODEL_KEY) || STANDARD_MODEL;
  const setModel = m => localStorage.setItem(MODEL_KEY, m || STANDARD_MODEL);
  const harNoegle = () => getKey().startsWith("sk-ant-");

  async function svar(historik) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": getKey(),
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: getModel(),
        max_tokens: 600,
        system: systemPrompt,
        messages: historik.slice(-20).map(m => ({ role: m.role, content: m.text }))
      })
    });
    if (!res.ok) {
      let msg = res.status + " " + res.statusText;
      try { const j = await res.json(); msg = j.error?.message || msg; } catch (_) {}
      throw new Error(msg);
    }
    const data = await res.json();
    return (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
  }

  return { loadSystemPrompt, getKey, setKey, getModel, setModel, harNoegle, svar, STANDARD_MODEL };
})();
