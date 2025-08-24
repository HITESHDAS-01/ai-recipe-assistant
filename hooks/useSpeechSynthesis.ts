
import { useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const synth = window.speechSynthesis;

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    // If there's something already being spoken, cancel it to allow the new utterance to play.
    if (synth.speaking) {
      synth.cancel();
    }

    // A small timeout helps ensure the cancel command has time to process on some browsers
    // before the new `speak` command is issued. This prevents race conditions.
    setTimeout(() => {
        if (text !== '') {
          const utterThis = new SpeechSynthesisUtterance(text);
          utterThis.onend = () => {
            // Can be used for debugging if needed
          };
          utterThis.onerror = (event) => {
            // Log the specific error string from the event, not the whole object.
            console.error('SpeechSynthesisUtterance.onerror:', event.error);
          };
          
          // Basic language mapping
          if (lang.toLowerCase().includes('hinglish')) {
              utterThis.lang = 'hi-IN';
          } else if (lang.toLowerCase().includes('assamese')) {
              // Note: Assamese might not be supported on all browsers/OS.
              // 'bn-IN' (Bengali) is sometimes a fallback.
              utterThis.lang = 'as-IN'; 
          } else {
              utterThis.lang = 'en-US';
          }
    
          synth.speak(utterThis);
        }
    }, 100);
  }, [synth]);

  const cancel = useCallback(() => {
    // Make sure synth exists and is speaking before cancelling.
    if (synth && synth.speaking) {
        synth.cancel();
    }
  }, [synth]);

  return { speak, cancel };
};
