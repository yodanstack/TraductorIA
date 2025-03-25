const translateBtn = document.querySelector("#TraslateBtn");

translateBtn.addEventListener('click', async () => {
    
    const text = document.querySelector("#inputText").value.trim();

    const targetLang = document.querySelector("#targetLang").value;

    if(!text) return false;

    const userMessage = document.createElement("div");
    userMessage.className = 'chat__message chat__message--user';
    userMessage.textContent = text;

    const messagesContainer = document.querySelector(".chat__messages");
    messagesContainer.appendChild(userMessage);
    
    messagesContainer.scrollTop = messagesContainer;
});
