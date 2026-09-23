// Voice explanation utility supporting English and Telugu speech synthesis
import { Language } from '../types';

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Convert math symbols to spoken words for natural voice explanations
export function formatMathForSpeech(text: string, language: Language): string {
  let cleaned = text;

  if (language === 'te') {
    // Telugu math term replacements for clear audio readout
    cleaned = cleaned
      .replace(/\+/g, ' ప్లస్ ')
      .replace(/-/g, ' మైనస్ ')
      .replace(/[×*]/g, ' గుణకారం ')
      .replace(/[÷/]/g, ' భాగహారం ')
      .replace(/=/g, ' సమానం ')
      .replace(/≠/g, ' సమానం కాదు ')
      .replace(/\?/g, ' ఎంత ')
      .replace(/x/g, ' ఎక్స్ ')
      .replace(/²/g, ' స్క్వేర్ ');
  } else {
    // English math term replacements
    cleaned = cleaned
      .replace(/\+/g, ' plus ')
      .replace(/-/g, ' minus ')
      .replace(/[×*]/g, ' multiplied by ')
      .replace(/[÷/]/g, ' divided by ')
      .replace(/=/g, ' equals ')
      .replace(/≠/g, ' does not equal ')
      .replace(/\?/g, ' what ')
      .replace(/²/g, ' squared ');
  }

  return cleaned;
}

export function speakExplanation(
  text: string,
  language: Language,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): boolean {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis is not supported on this device/browser.');
    if (onError) onError();
    return false;
  }

  // Cancel any ongoing speech
  stopSpeaking();

  const formattedText = formatMathForSpeech(text, language);
  const utterance = new SpeechSynthesisUtterance(formattedText);

  // Set language code
  utterance.lang = language === 'te' ? 'te-IN' : 'en-IN';
  utterance.rate = 0.95; // Child-friendly slightly relaxed pace
  utterance.pitch = 1.05;

  // Try to find matching voice if available
  const voices = window.speechSynthesis.getVoices();
  if (language === 'te') {
    const teluguVoice = voices.find(
      (v) => v.lang.startsWith('te') || v.name.toLowerCase().includes('telugu')
    );
    if (teluguVoice) {
      utterance.voice = teluguVoice;
    }
  } else {
    const englishVoice = voices.find(
      (v) => (v.lang === 'en-IN' || v.lang === 'en-GB' || v.lang === 'en-US') && !v.name.includes('Google')
    ) || voices.find((v) => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
  return true;
}
