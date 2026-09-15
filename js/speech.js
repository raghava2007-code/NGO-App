// speech.js — Text-to-speech using the Web Speech API.
// Uses the browser's built-in TTS. No external API or library required.
// Telugu voice support depends on device/browser voice availability.

const Speech = {
  supported: ("speechSynthesis" in window),

  langMap: {
    en: "en-US",
    te: "te-IN",
  },

  speak(text, lang = "en") {
    if (!this.supported) {
      console.warn("Web Speech API not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.langMap[lang] || "en-US";
    utterance.rate = 0.85;  // slightly slower for young learners
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to find the best matching voice
    const voices = window.speechSynthesis.getVoices();
    const targetLang = this.langMap[lang] || "en-US";
    const voice =
      voices.find(v => v.lang === targetLang) ||
      voices.find(v => v.lang.startsWith(targetLang.split("-")[0])) ||
      null;
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  },

  stop() {
    if (this.supported) window.speechSynthesis.cancel();
  },
};

// Pre-load voices (they may load asynchronously in some browsers)
if ("speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }
}