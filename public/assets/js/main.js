const translateBtn = document.querySelector("#TraslateBtn");

translateBtn.addEventListener('click', async () => {

    let inputText = document.querySelector("#inputText");
    
    const text = inputText.value.trim();

    const targetLang = document.querySelector("#targetLang").value;

    if(!text) return false;

    const userMessage = document.createElement("div");
    userMessage.className = 'chat__message chat__message--user';
    userMessage.textContent = text;

    const messagesContainer = document.querySelector(".chat__messages");
    messagesContainer.appendChild(userMessage);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    //Peticion ajax al backend
    try {
        const response = await fetch("/api/traducir", {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify({
                text,
                targetLang
            })
        });

        const data = await response.json();

        const botMessage = document.createElement("div");
        botMessage.className = "chat__message chat__message--boot";
        botMessage.textContent = data.translatedText;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        
    } catch (error) {
        console.log("Error:", error);
    }


    inputText.value = "";
});
