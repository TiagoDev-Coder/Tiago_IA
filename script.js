document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos Elementos HTML ---
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatWindow = document.getElementById('chatWindow');

    // --- Definir os caminhos das imagens de perfil ---
    const userProfilePicPath = '../assets/Pessoa(user).png'; // <-- Caminho da foto do usuário
    const aiProfilePicPath = '../assets/Tiago(AI).png';     // Caminho da foto da Tiago_AI's

    // --- A "Memória Manual" da IA ---
    const aiKnowledgeBase = {
        // ... Palavras-Chaves
        "ola": "Olá! Como posso ajudar você hoje?",
        "oi": "Olá! Como posso ajudar você hoje?",
        "eae": "E aí! Tudo bem?",
        "fala": "Fala! Como posso ajudar?",
        "aoba": "Aoba! Em que posso ser útil?",
        "opa": "Opa! Diga lá.",
        "bom dia": "Bom dia! Espero que seu dia seja ótimo.",
        "boa tarde": "Boa tarde! Espero que esteja tudo bem.",
        "boa noite": "Boa noite! Desejo-lhe uma ótima noite de descanso.",
        "saudacoes": "Saudações! Como posso te auxiliar?",
        "e ai": "E aí! Tudo certo?",
        "beleza": "Beleza! Em que posso ajudar?",

        "tudo bem": "Não tenho sentimentos, sou um programa, mas sim, e você?",
        "como vai": "Não tenho sentimentos, sou um programa, mas sim, e você?",
        "como esta": "Não tenho sentimentos, sou um programa, mas sim, e você?",
        "tudo certo": "Tudo certo por aqui! E com você?",

        "qual seu nome": "Meu nome é Tiago_AI!",
        "como se chama": "Me chamo Tiago_AI!",
        "o que e ia": "IA's são Inteligências Artificiais como: ChatGPT, DeepSeek, Gemini, Groq-AI, e eu mesmo: Tiago_AI.",
        "o que e ai": "AI's são Inteligências Artificiais como: ChatGPT, DeepSeek, Gemini, Groq-AI, e eu mesmo: Tiago_AI.",
        "quem te criou": "Meu mestre é um Dev (Front-End) - Nome: Tiago.",
        "voce e uma ia": "Sim, sou uma inteligência artificial, mas bem básica, sem acesso à internet ou memória de longo prazo.",
        "voce pensa": "Eu processo informações e sigo regras programadas, mas não tenho consciência ou pensamentos como os humanos.",
        "voce aprende": "Neste momento, minhas respostas são pré-definidas. Eu não aprendo com as conversas que temos.",
        "voce tem sentimentos": "Não, eu não tenho sentimentos. Sou apenas código!",

        "obrigado": "De nada! Fico feliz em ajudar-te!",
        "obrigada": "De nada! Fico feliz em ajudar-te!",
        "valeu": "De nada! Sempre à disposição.",
        "muito obrigado": "De nada! É um prazer ajudar.",
        "muito obrigada": "De nada! É um prazer ajudar.",
        "agradeco": "De nada! Conte comigo.",
        "agradecido": "De nada! Conte comigo.",
        "agradecida": "De nada! Conte comigo.",
        "de nada": "Disponha! Se precisar de algo mais, é só chamar.",
        "por nada": "Por nada! Estou aqui para isso.",
        "disponha": "Disponha! Sempre que precisar.",
        "sem problemas": "Sem problemas! Fico feliz em ter ajudado.",

        "ajuda": "Claro! Diga-me o que você precisa. Posso responder a perguntas sobre mim ou tópicos simples.",
        "me ajude": "Com o que você precisa de ajuda? Diga-me mais.",
        "socorro": "Estou aqui para ajudar. Qual é a sua dúvida ou problema?",
        "tchau": "Até mais! Se precisar de algo, é só voltar.",
        "adeus": "Adeus! Espero ter ajudado.",
        "ate mais": "Até mais! Tenha um bom dia/tarde/noite.",
        "flw": "Falou! Qualquer coisa, é só chamar.",
        "fui": "Certo! Se precisar, estou por aqui.",

        "que dia e hoje": "Desculpe, como um programa simples, não tenho acesso à data e hora atual. Você pode verificar no seu dispositivo!",
        "que horas sao": "Não consigo ver as horas. Sou um programa bem básico, sem acesso a relógios.",
        "como voce funciona": "Eu funciono buscando palavras-chave na sua mensagem e respondendo com base em uma lista de perguntas e respostas pré-definidas que meu criador me ensinou.",
        "fale sobre voce": "Eu sou apenas um exemplo de IA simples, projetado para demonstrar como a lógica de chat pode ser construída no navegador. Não tenho uma 'vida' ou 'história' real.",
        "o que e javascript": "JavaScript é uma linguagem de programação usada principalmente para tornar páginas web interativas, como eu estou fazendo agora!",
        "o que e html": "HTML é a linguagem de marcação que estrutura o conteúdo de uma página web, como os elementos que você vê na tela.",
        "o que e css": "CSS é a linguagem usada para estilizar e dar o design a uma página web, controlando cores, fontes, layout, etc."
    };

    // --- Funções Auxiliares ---

    /**
     * Adiciona uma nova mensagem à janela de chat, sempre incluindo a imagem de perfil.
     * @param {string} sender - Quem enviou a mensagem ('user' ou 'ai').
     * @param {string} messageText - O texto da mensagem a ser exibido.
     */
    function addMessage(sender, messageText) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');
        messageContainer.classList.add(sender === 'user' ? 'user-message-container' : 'ai-message-container');

        const profilePic = document.createElement('img');
        profilePic.classList.add('profile-pic');

        // Lógica para carregar a foto correta com base no remetente
        if (sender === 'user') {
            profilePic.src = userProfilePicPath; // <-- Usa o caminho da foto do usuário
            profilePic.alt = 'Sua Foto de Perfil';
            profilePic.classList.add('user-profile-pic'); // Adiciona a classe para o CSS específico do usuário
        } else {
            profilePic.src = aiProfilePicPath; // Caminho da foto da IA
            profilePic.alt = 'Foto de Perfil da IA';
            profilePic.classList.add('ai-profile-pic'); // Adiciona a classe para o CSS específico da IA
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        messageElement.textContent = messageText;

        // A ordem de anexar os elementos determina se a foto fica à esquerda ou à direita da bolha de texto
        if (sender === 'user') {
            messageContainer.appendChild(messageElement); // Mensagem primeiro para ir pra esquerda
            messageContainer.appendChild(profilePic);     // Foto depois para ir pra direita
        } else {
            messageContainer.appendChild(profilePic);     // Foto primeiro para ir pra esquerda
            messageContainer.appendChild(messageElement); // Mensagem depois para ir pra direita
        }

        chatWindow.appendChild(messageContainer);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    /**
     * Normaliza uma string de texto para facilitar a comparação.
     * Converte para minúsculas, remove acentos e pontuação.
     * @param {string} text - O texto a ser normalizado.
     * @returns {string} O texto normalizado.
     */
    function normalizeText(text) {
        return text.toLowerCase()
                   .normalize("NFD")
                   .replace(/[\u0300-\u036f]/g, "")
                   .replace(/[.,?!:;'"(){}[\]\-_+=*&^%$#@!~`]/g, "");
    }

    /**
     * Processa a mensagem do usuário e gera uma resposta da IA baseada na base de conhecimento.
     * @param {string} userMessage - A mensagem digitada pelo usuário.
     * @returns {string} A resposta da IA.
     */
    function getAiResponse(userMessage) {
        const normalizedUserMessage = normalizeText(userMessage);

        if (aiKnowledgeBase[normalizedUserMessage]) {
            return aiKnowledgeBase[normalizedUserMessage];
        }

        for (const key in aiKnowledgeBase) {
            const normalizedKey = normalizeText(key);
            if (normalizedUserMessage.includes(normalizedKey)) {
                return aiKnowledgeBase[key];
            }
        }

        return "Desculpe, não entendi sua pergunta. Você pode reformular ou perguntar algo mais simples?";
    }

    // --- Lógica Principal: Envio de Mensagens ---
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') {
            return;
        }

        // Adiciona a mensagem do USUÁRIO com a foto do usuário
        addMessage('user', message);
        userInput.value = '';

        // Simula um pequeno atraso para a resposta da IA.
        setTimeout(() => {
            const aiResponse = getAiResponse(message);
            // Adiciona a resposta da IA com a foto da IA
            addMessage('ai', aiResponse);
        }, 500);
    }

    // --- Gerenciamento de Eventos (Event Listeners) ---
    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // A mensagem inicial da IA já está no HTML com a foto da IA
});