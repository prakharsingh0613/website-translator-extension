chrome.storage.sync.get("language", ({ language }) => {
    if (!language) {
      language = "en"; // Default to English if no language is set
    }
  
    console.log(`Language selected: ${language}`); // Check if the language is being correctly retrieved
  
    // Call the translation API to translate the page's text
    translatePage(language);
  });
  
  function translatePage(language) {
    const textNodes = getTextNodes(document.body);
  
    textNodes.forEach((node) => {
      const originalText = node.textContent.trim();
      if (originalText) {
        // Call the translation API to translate the text
        fetchTranslation(originalText, language).then((translatedText) => {
          if (translatedText !== originalText) {
            node.textContent = translatedText; // Replace the text with the translated version
          }
        }).catch((error) => {
          console.error("Error in translation: ", error);
        });
      }
    });
  }
  
  function getTextNodes(element) {
    let nodes = [];
    for (const child of element.childNodes) {
      if (child.nodeType === 3) { // Text node
        nodes.push(child);
      } else if (child.nodeType === 1) { // Element node
        nodes = nodes.concat(getTextNodes(child));
      }
    }
    return nodes;
  }
  
  async function fetchTranslation(text, language) {
    const apiKey = "srm9kD3NzS07tDxW8NP3oYraZVOY68SZ"; // Your API key from APILayer
    const url = `https://api.apilayer.com/translate?text=${encodeURIComponent(text)}&to=${language}&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      console.log(data); // Log the response from the API
  
      if (data.success) {
        return data.contents.translated; // Return the translated text
      } else {
        console.error("Translation Error: ", data.error);
        return text; // Return the original text if translation fails
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      return text; // Return the original text if fetch fails
    }
  }
  