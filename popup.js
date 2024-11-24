document.getElementById("translate-btn").addEventListener("click", async () => {
  const textInput = document.getElementById("text-input").value;
  const language = document.getElementById("language-select").value;
  const outputDiv = document.getElementById("translated-text");

  if (!textInput.trim()) {
    outputDiv.textContent = "Please enter text to translate.";
    return;
  }

  try {
    const apiKey = "srm9kD3NzS07tDxW8NP3oYraZVOY68SZ"; // Replace with your API key if required
    const url = `https://api.apilayer.com/translate?text=${encodeURIComponent(
      textInput
    )}&target=${language}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "apikey": apiKey
      }
    });

    if (!response.ok) {
      throw new Error("Translation API request failed.");
    }

    const data = await response.json();
    outputDiv.textContent = data.translated_text || "No translation available.";
  } catch (error) {
    console.error(error);
    outputDiv.textContent = "Error: Unable to translate text.";
  }
});
