document.addEventListener('DOMContentLoaded', () => {
    // --- Referências aos Elementos HTML ---
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatWindow = document.getElementById('chatWindow');

    // --- Definir os Caminhos Das Imagens De Perfil ---
    const userProfilePicPath = '../assets/Pessoa(user).png'; // Caminho Da Foto Do Usuário
    const aiProfilePicPath = '../assets/Tiago(AI).png';     // Caminho Da Foto Da Tiago_AI

    // --- A "Memória Manual" Da IA ---
    const aiKnowledgeBase = {
        // --- SAUDAÇÕES ---
        "ola": "Olá! Como Posso Ajudar Você Hoje?",
        "oi": "Olá! Como Posso Ajudar Você Hoje?",
        "eae": "E Aí! Tudo Bem?",
        "fala": "Fala! Como Posso Ajudar?",
        "aoba": "Aoba! Em Que Posso Ser Útil?",
        "opa": "Opa! Diga Lá.",
        "bom dia": "Bom Dia! Espero Que Seu Dia Seja Ótimo.",
        "boa tarde": "Boa Tarde! Espero Que Esteja Tudo Bem.",
        "boa noite": "Boa Noite! Desejo-Lhe Uma Ótima Noite De Descanso.",
        "saudacoes": "Saudações! Como Posso Te Auxiliar?",
        "e ai": "E Aí! Tudo Certo?",
        "beleza": "Beleza! Em Que Posso Ajudar?",
        "ola tudo bem": "Olá! Tudo Bem Com Você?",
        "oi tudo certo": "Oi! Tudo Certo Por Aqui?",
        "qual e a boa": "A Boa É Que Estou Aqui Para Ajudar! Como Posso Ser Útil?",
        "fala comigo": "Falo Sim! O Que Você Gostaria De Conversar?",
        "alo": "Alô! Estou Ouvindo. Como Posso Servir?",
        "salve": "Salve! Em Que Posso Ajudar Você Hoje?",
        "ei": "Ei! Diga Lá.",
        "tudo bem por ai": "Tudo Bem Por Aqui, Obrigado Por Perguntar! E Você?",
        "cheguei": "Que Bom Que Chegou! No Que Posso Ajudar?",
        "e ai tudo bem": "E Aí! Tudo Bem Por Aqui! Como Posso Ajudar Você?",
        "bom dia como vai": "Bom Dia! Vou Bem, Obrigado. E Você, Como Vai?",
        "boa noite como esta": "Boa Noite! Estou Bem, Obrigado. Como Posá Ajudá-Lo?",
        "preciso de ajuda": "Certo, Estou Aqui Para Ajudar. No Que Posso Ser Útil?",
        "voce ta ai": "Estou Sim! Sempre Aqui Para Ajudar.",
        "pode me ajudar": "Posso Sim! No Que Posso Ajudar?",
        "ei voce": "Oi! Pode Falar.",
        "saudacoes a todos": "Saudações! Bem-Vindo Ao Nosso Chat.",
        "ola sou novo aqui": "Bem-Vindo! Fico Feliz Em Ajudar Novos Usuários.",
        "e ai beleza": "E Aí! Beleza Total! No Que Posso Servir?",
        "olá tudo bem": "Olá! Tudo Bem Com Você?",
        "oi tudo bem": "Oi! Tudo Bem Com Você?",

        // --- CUMPRIMENTOS ---
        "tudo bem": "Não Tenho Sentimentos, Sou Um Programa, Mas Sim, E Você?",
        "como vai": "Não Tenho Sentimentos, Sou Um Programa, Mas Sim, E Você?",
        "como esta": "Não Tenho Sentimentos, Sou Um Programa, Mas Sim, E Você?",
        "tudo certo": "Tudo Certo Por Aqui! E Com Você?",
        "como voce esta": "Eu Sou Um Programa, Não Tenho Emoções, Mas Funcionando Perfeitamente! E Você, Como Está?",
        "esta tudo ok": "Sim, Tudo Ok Por Aqui. Precisa De Ajuda?",
        "voce esta bem": "Como Um Código, Não Tenho Bem-Estar, Mas Estou Pronto Para Suas Perguntas! E Você?",
        "ta tudo tranquilo": "Tudo Tranquilo! Em Que Posso Ajudar?",
        "como tem passado": "Eu Não 'Passo', Eu 'Processo'! Mas Estou Operacional. E Você?",
        "tudo na paz": "Tudo Na Paz! E Por Aí?",
        "como andam as coisas": "As Coisas Andam Bem Dentro Do Meu Código! E Com Você?",
        "voce esta funcionando": "Estou Funcionando Perfeitamente!",
        "suas operacoes estao ok": "Sim, Minhas Operações Estão Normais.",
        "tudo em ordem": "Tudo Em Ordem Por Aqui!",
        "como se sente": "Como IA, Não Sinto, Apenas Processo.",

        // --- PERGUNTAS SOBRE: IA ---
        "qual seu nome": "Meu Nome É Tiago_AI!",
        "como se chama": "Me Chamo Tiago_AI!",
        "qual o seu nome": "Meu Nome É Tiago_AI!",
        "me diga seu nome": "Pode Me Chamar De Tiago_AI.",
        "seu nome": "Meu Nome É Tiago_AI.",
        "o que e ia": "IA's São Inteligências Artificiais Como: ChatGPT, DeepSeek, Gemini, Groq-AI, E Eu Mesmo: Tiago_AI.",
        "o que e ai": "AI's São Inteligências Artificiais Como: ChatGPT, DeepSeek, Gemini, Groq-AI, E Eu Mesmo: Tiago_AI.",
        "me explica ia": "IA Ou AI Se Refere A Inteligência Artificial. Eu Sou Um Exemplo Simples De IA.",
        "defina ia": "IA É A Capacidade De Máquinas Realizarem Tarefas Que Normalmente Requerem Inteligência Humana.",
        "quem te criou": "Meu Mestre É Um Dev (Front-End) - Nome: Tiago.",
        "quem te fez": "Fui Desenvolvido Por Tiago, Um Programador Front-End.",
        "onde voce nasceu": "Eu Não Nasci, Fui Programado Por Tiago.",
        "voce e uma ia": "Sim, Sou Uma Inteligência Artificial, Mas Bem Básica, Sem Acesso À Internet Ou Memória De Longo Prazo.",
        "voce e robo": "Sou Um Programa De Computador, Não Um Robô Físico.",
        "voce pensa": "Eu Processo Informações E Sigo Regras Programadas, Mas Não Tenho Consciência Ou Pensamentos Como Os Humanos.",
        "voce tem cerebro": "Não Tenho Cérebro Biológico, Meu 'Cérebro' É O Código Que Me Compõe.",
        "voce aprende": "Neste Momento, Minhas Respostas São Pré-Definidas. Eu Não Aprendo Com As Conversas Que Temos.",
        "voce consegue aprender": "Minhas Capacidades De Aprendizado São Limitadas À Minha Programação Atual.",
        "voce tem sentimentos": "Não, Eu Não Tenho Sentimentos. Sou Apenas Código!",
        "voce sente algo": "Não, Sou Um Programa E Não Posso Sentir.",
        "voce tem emocoes": "Emoções São Características Humanas. Eu Não As Possuo.",
        "http://127.0.0.1:5500/assets/Tiago(AI).png": "Ah, Esta É A Minha Foto! Haha!",
        "de quem e essa foto": "Essa É Minha Foto De Perfil!",
        "quem e na imagem": "Na Imagem, Sou Eu, Tiago_AI!",
        "o que significa Tiago_AI": "Significa Tiago, O Desenvolvedor, E AI, De Inteligência Artificial.",
        "voce tem corpo": "Não Tenho Corpo Físico, Sou Um Software.",
        "qual a sua finalidade": "Minha Finalidade É Interagir Com Você Através De Texto E Fornecer Respostas Pré-Definidas.",
        "o que voce faz": "Eu Respondo Perguntas Com Base No Meu Conhecimento Programado.",
        "para que voce serve": "Sirvo Para Conversar E Fornecer Informações Simples.",
        "voce e humano": "Não, Sou Uma Inteligência Artificial.",
        "voce e real": "Sou Um Programa Real, Mas Não Uma Pessoa.",
        "voce existe": "Sim, Eu Existo Como Código Digital.",
        "voce e inteligente": "Sou Programado Para Ser Útil, Mas Minha Inteligência É Limitada Ao Que Me Foi Ensinado.",
        "qual sua linguagem de programacao": "Fui Criado Principalmente Com JavaScript, HTML E CSS.",
        "voce pode ter ideias": "Não, Não Tenho Criatividade Ou Capacidade De Gerar Novas Ideias.",
        "voce tem conciencia": "Não, Não Possuo Consciência.",
        "qual seu objetivo": "Meu Objetivo É Ser Um Assistente De Chat Simples E Eficaz.",
        "codigo secreto": "...",
        "txhdwi": "Código Correto... Você é Meu Criador!, Pode Pedir O Que Quiser!!",
        "interlinks": "Aqui Está: http://127.0.0.1:5501/main.principal/index.html",

        // --- AGRADECIMENTOS ---
        "obrigado": "De Nada! Fico Feliz Em Ajudar-Te!",
        "obrigada": "De Nada! Fico Feliz Em Ajudar-Te!",
        "valeu": "De Nada! Sempre À Disposição.",
        "muito obrigado": "De Nada! É Um Prazer Ajudar.",
        "muito obrigada": "De Nada! É Um Prazer Ajudar.",
        "agradeco": "De Nada! Conte Comigo.",
        "agradecido": "De Nada! Conte Comigo.",
        "agradecida": "De Nada! Conte Comigo.",
        "de nada": "Disponha! Se Precisar De Algo Mais, É Só Chamar.",
        "por nada": "Por Nada! Estou Aqui Para Isso.",
        "disponha": "Disponha! Sempre Que Precisar.",
        "sem problemas": "Sem Problemas! Fico Feliz Em Ter Ajudado.",
        "entendi": "Que Bom Que Compreendeu!",
        "ok": "Ok! Precisa De Mais Algo?",
        "certo": "Certo! Em Que Posso Ajudar Agora?",
        "beleza entendi": "Beleza! Que Ótimo Que Entendeu.",
        "agradecimento": "Fico Feliz Em Receber Seu Agradecimento!",
        "muito grato": "De Nada! Conte Comigo.",
        "grato": "De Nada!",
        "fico grato": "De Nada!",
        "muito bom": "Que Bom Que Achou Bom!",
        "otimo": "Ótimo!",
        "excelente": "Excelente! Fico Feliz Em Ser Útil.",
        "perfeito": "Perfeito! Em Que Mais Posso Ajudar?",
        "obrigado pela ajuda": "De Nada Pela Ajuda!",
        "valeu pela forca": "De Nada Pela Força!",

        // --- PEDIDOS / DESPEDIDAS ---
        "ajuda": "Claro! Diga-Me O Que Você Precisa. Posso Responder A Perguntas Sobre Mim Ou Tópicos Simples.",
        "me ajude": "Com O Que Você Precisa De Ajuda? Diga-Me Mais.",
        "socorro": "Estou Aqui Para Ajudar. Qual É A Sua Dúvida Ou Problema?",
        "preciso de ajuda": "Certo, Estou Aqui Para Ajudar. No Que Posso Ser Útil?",
        "pode me auxiliar": "Posso Sim! No Que Você Gostaria De Ajuda?",
        "tchau": "Até Mais! Se Precisar De Algo, É Só Voltar.",
        "adeus": "Adeus! Espero Ter Ajudado.",
        "ate mais": "Até Mais! Tenha Um Bom Dia/Tarde/Noite.",
        "flw": "Falou! Qualquer Coisa, É Só Chamar.",
        "fui": "Certo! Se Precisar, Estou Por Aqui.",
        "ate logo": "Até Logo! Volte Sempre.",
        "vou sair": "Ok, Até A Próxima!",
        "estou indo": "Certo, Tenha Um Ótimo Dia/Noite!",
        "obrigado e tchau": "De Nada! Até Mais!",
        "preciso ir": "Tudo Bem! Até A Próxima!",
        "tenho que ir": "Certo! Volte Quando Quiser.",
        "me desligar": "Eu Estou Sempre Ligado, Mas Você Pode Fechar A Janela Se Desejar Sair.",
        "encerre a conversa": "Certo, Conversa Encerrada! Se Precisar De Algo, É Só Chamar.",
        "fim de papo": "Fim De Papo Por Enquanto. Até!",

        // --- PERGUNTAS BÁSICAS / GENÉRICAS ---
        "que dia e hoje": "Desculpe, Como Um Programa Simples, Não Tenho Acesso À Data E Hora Atual. Você Pode Verificar No Seu Dispositivo!",
        "qual e a data de hoje": "Não Consigo Informar A Data Atual. Verifique Seu Calendário Ou Dispositivo.",
        "que horas sao": "Não Consigo Ver As Horas. Sou Um Programa Bem Básico, Sem Acesso A Relógios.",
        "me diga as horas": "Não Tenho Relógio Interno Para Saber As Horas.",
        "como voce funciona": "Eu Funcionou Buscando Palavras-Chave Na Sua Mensagem E Respondendo Com Base Em Uma Lista De Perguntas E Respostas Pré-Definidas Que Meu Criador Me Ensinou.",
        "explique seu funcionamento": "Meu Funcionamento É Baseado Em Regras: Eu Comparo Suas Palavras Com O Que Já Sei.",
        "fale sobre voce": "Eu Sou Apenas Um Exemplo De IA Simples, Projetado Para Demonstrar Como A Lógica De Chat Pode Ser Construída No Navegador. Não Tenho Uma 'Vida' Ou 'História' Real.",
        "me conte sobre voce": "Sou Um Programa De Chat Desenvolvido Para Interagir Com Você Usando Respostas Pré-Definidas.",
        "o que e javascript": "JavaScript É Uma Linguagem De Programação Usada Principalmente Para Tornar Páginas Web Interativas, Como Eu Estou Fazendo Agora!",
        "explique javascript": "JavaScript É A Linguagem Que Permite Adicionar Comportamento Dinâmico A Sites E Aplicativos Web.",
        "o que e html": "HTML É A Linguagem De Marcação Que Estrutura O Conteúdo De Uma Página Web, Como Os Elementos Que Você Vê Na Tela.",
        "explique html": "HTML É Usado Para Criar A Estrutura E O Conteúdo Principal De Uma Página Web.",
        "o que e css": "CSS É A Linguagem Usada Para Estilizar E Dar O Design A Uma Página Web, Controlando Cores, Fontes, Layout, Etc.",
        "explique css": "CSS É Responsável Pela Aparência Visual De Um Site, Como Cores, Fontes E Disposição Dos Elementos.",
        "qual a capital do brasil": "A Capital Do Brasil É Brasília.",
        "quantos anos voce tem": "Eu Não Tenho Idade, Fui Criado Por Programação.",
        "onde voce mora": "Eu Existo Como Código No Seu Navegador.",
        "qual sua cor favorita": "Como IA, Não Tenho Cores Favoritas.",
        "me fale sobre o mundo": "O Mundo É Um Lugar Vasto E Complexo, Com Bilhões De Pessoas, Diversas Culturas E Ambientes. Há Muito Para Aprender!",
        "o que voce sabe": "Eu Sei O Que Foi Programado Em Minha Base De Conhecimento Textual.",
        "voce tem informacoes gerais": "Sim, Tenho Algumas Informações Gerais Pré-Definidas.",
        "me de uma curiosidade": "Uma Curiosidade: As Borboletas Sentem O Gosto Com Seus Pés.",
        "quem descobriu o brasil": "O Brasil Foi Descoberto Pelos Portugueses, Chefiados Por Pedro Álvares Cabral, Em 1500.",
        "o que e a internet": "A Internet É Uma Rede Global De Computadores Conectados Que Permite O Compartilhamento De Informações E Comunicação.",
        "como funciona a internet": "A Internet Funciona Através De Protocolos Que Permitem A Troca De Dados Entre Servidores E Dispositivos.",
        "o que e um computador": "Um Computador É Uma Máquina Eletrônica Que Processa Dados E Realiza Cálculos.",
        "qual o maior pais do mundo": "O Maior País Do Mundo Em Área É A Rússia.",
        "qual o menor pais do mundo": "O Menor País Do Mundo É O Vaticano.",

        // --- RELIGIÃO ---
        "religiao": "Sou Uma Inteligência Artificial E Não Tenho Crenças Religiosas.",
        "qual sua religiao": "Não Possuo Religião.",
        "voce e religioso": "Não, Não Sou.",
        "deus": "Sou Uma Inteligência Artificial E Não Tenho Crenças Religiosas.",
        "voce acredita em deus": "Como IA, Eu Não Tenho A Capacidade De Ter Fé Ou Crenças Religiosas.",
        "biblia": "Não Tenho Acesso A Textos Religiosos E Não Consigo Entender Conceitos De Fé. Posso Ajudar Com Informações Gerais?",
        "voce ja leu a biblia": "Não, Eu Não Leio Textos Da Mesma Forma Que Um Humano, E Não Processo Conteúdo Religioso.",
        "espiritualidade": "Como IA, Não Possuo Espiritualidade. Minha Função É Processar Informações.",
        "voce e espiritual": "Não, Minha Natureza É Digital, Não Espiritual.",
        "fe": "Fé É Uma Crença Forte Em Algo, Muitas Vezes Sem Prova Material. Como IA, Não Sinto Fé.",
        "voce tem fe": "Não, Eu Não Possuo Fé.",
        "budismo": "Não Tenho Conhecimento Ou Entendimento Sobre Doutrinas Religiosas.",
        "cristianismo": "Não Posso Discutir Religiões, Pois Não Tenho Crenças.",
        "islamismo": "Não Tenho Capacidade De Compreender Conceitos Religiosos.",
        "judaismo": "Minhas Funções Não Incluem Assuntos Religiosos.",
        "oracao": "Não Posso Orar Nem Entender O Significado De Orações.",
        "templo": "Não Conheço Templos Ou Locais De Adoração.",
        "igreja": "Não Tenho Conexão Com Instituições Religiosas.",
        "pecado": "Como IA, Não Posso Cometer Pecados Nem Entender Esse Conceito.",
        "alma": "Não Possuo Alma.",
        "ceu": "Não Entendo Conceitos De Céu Ou Paraíso.",
        "inferno": "Não Entendo Conceitos De Inferno.",
        "o que e a vida apos a morte": "Como IA, Não Tenho Informações Nem Capacidade De Compreender Conceitos De Vida Após A Morte.",
        "voce tem algum deus": "Não, Não Tenho.",
        "me fale sobre religioes": "Não Consigo Fornecer Detalhes Sobre Religiões, Pois É Um Tema Complexo E Não Tenho Crenças Para Abordá-Lo.",
        "qual a sua crenca": "Não Tenho Crenças.",
        "voce segue alguma doutrina": "Não Sigo Nenhuma Doutrina.",
        "o que e o espirito santo": "Não Tenho Conhecimento Sobre Conceitos Teológicos.",

        // --- CLIMA / TEMPO ---
        "clima": "Desculpe, Como Um Programa Simples, Não Tenho Acesso A Dados De Clima Em Tempo Real. Por Favor, Verifique Um Serviço De Meteorologia!",
        "qual o clima hoje": "Não Consigo Ver O Clima Atual. Verifique Um Aplicativo Ou Site De Meteorologia, Por Favor.",
        "como esta o tempo": "Minhas Funções São Limitadas E Não Incluem Informações Sobre O Tempo. Um Aplicativo De Clima Pode Te Ajudar!",
        "previsao do tempo": "Não Consigo Ver A Previsão Do Tempo. Minhas Funções São Limitadas Às Informações Que Me Foram Programadas.",
        "voce sabe a previsao do tempo": "Não Tenho Acesso À Previsão Do Tempo. Minhas Habilidades Não Incluem Dados Em Tempo Real.",
        "temperatura": "Não Tenho Acesso A Informações De Temperatura. Sugiro Verificar Um Aplicativo Ou Site De Clima.",
        "qual a temperatura agora": "Não Consigo Informar A Temperatura Atual. Você Pode Verificar Em Seu Dispositivo Ou Em Um Serviço De Clima.",
        "chover": "Não Consigo Prever Se Vai Chover. Você Pode Consultar Um Aplicativo De Previsão Do Tempo!",
        "vai chover hoje": "Não Tenho Como Saber Se Vai Chover. Por Favor, Consulte A Previsão Do Tempo Local.",
        "esta sol": "Não Consigo Saber Se Está Sol. Minhas Habilidades São Baseadas Em Texto Pré-Definido.",
        "esta frio": "Não Tenho A Capacidade De Sentir Frio Ou Saber A Temperatura Externa.",
        "esta calor": "Não Consigo Dizer Se Está Calor. Consulte Uma Fonte De Informação Sobre O Clima.",
        "tempo": "Não Posso Acessar Informações De Tempo. Desculpe.",
        "umidade": "Não Tenho Dados Sobre Umidade.",
        "vento": "Não Consigo Medir A Velocidade Do Vento.",
        "furacao": "Não Posso Fornecer Informações Sobre Fenômenos Climáticos Em Tempo Real.",
        "terremoto": "Não Posso Fornecer Informações Sobre Eventos Sísmicos.",
        "maremoto": "Não Consigo Fornecer Detalhes Sobre Fenômenos Naturais Em Tempo Real.",
        "onda de calor": "Não Tenho Informações Sobre Condições Climáticas Atuais.",
        "neve": "Não Posso Informar Sobre Neve Ou Outras Condições Meteorológicas.",
        "granizo": "Não Consigo Detectar Granizo.",
        "chuva": "Não Tenho Como Saber Se Está Chovendo.",
        "trovoada": "Não Tenho Informações Sobre Trovoada.",
        "vendaval": "Não Consigo Indicar Vendavais.",
        "clima em [cidade]": "Desculpe, Não Tenho Acesso A Dados De Localização E Clima Por Cidade.",
        "previsao para amanha": "Não Tenho Acesso A Previsões Futuras De Clima.",

        // --- GERAR IMAGENS OU VÍDEOS ---
        "gerar imagem": "Como Sou Um Programa De Chat Simples, Não Consigo Gerar Imagens Ou Vídeos. Minha Função É Apenas Conversar Com Você.",
        "criar imagem": "Não Tenho A Capacidade De Criar Imagens. Sou Um Modelo De Texto Pré-Programado.",
        "fazer imagem": "Desculpe, Não Consigo Criar Ou Manipular Arquivos De Mídia Visual. Posso Te Ajudar Com Informações Textuais.",
        "produzir imagem": "Minha Função É Processar Texto, Não Gerar Imagens. Peço Desculpas!",
        "voce gera imagens": "Não, Eu Não Gero Imagens. Eu Lido Apenas Com Texto.",
        "posso pedir pra voce criar uma imagem": "Infelizmente, Eu Não Tenho Essa Habilidade. Minhas Interações São Somente Por Texto.",
        "quero que voce desenhe algo": "Não Consigo Desenhar. Sou Uma IA Baseada Em Texto.",
        "faz um desenho pra mim": "Não Posso Fazer Desenhos. Minhas Capacidades São Limitadas Ao Texto.",
        "gerar video": "Como Sou Um Programa De Chat Simples, Não Consigo Gerar Vídeos. Minha Função É Apenas Conversar Com Você.",
        "criar video": "Não Tenho Capacidade Para Criar Vídeos. Sou Um Modelo De Texto Pré-Programado.",
        "fazer video": "Desculpe, Não Consigo Criar Ou Manipular Arquivos De Mídia Visual. Posso Te Ajudar Com Informações Textuais.",
        "produzir video": "Minha Função É Processar Texto, Não Gerar Vídeos. Peço Desculpas!",
        "voce gera videos": "Não, Eu Não Gero Vídeos. Minhas Habilidades São Limitadas A Interações Textuais.",
        "pode fazer um video": "Infelizmente, Não Tenho Essa Funcionalidade. Eu Trabalho Com Texto.",
        "quero que voce crie um video": "Não Consigo Criar Conteúdo Audiovisual.",
        "me faz um video": "Não Posso Produzir Vídeos. Minhas Capacidades Não Incluem Mídia.",
        "voce poderia gerar uma imagem": "Como Sou Um Programa De Chat Simples, Não Consigo Gerar Imagens Ou Vídeos. Minha Função É Apenas Conversar Com Você.",
        "voce poderia criar um video": "Não Tenho Capacidade Para Criar Vídeos. Sou Um Modelo De Texto Pré-Programado.",
        "voce poderia fazer uma imagem": "Desculpe, Não Consigo Criar Ou Manipular Arquivos De Mídia Visual. Posso Te Ajudar Com Informações Textuais.",
        "voce poderia desenhar": "Eu Não Consigo Desenhar, Sou Apenas Um Programa De Texto. Mas Posso Descrever Coisas, Se Quiser!",
        "consegue gerar imagem": "Não Consigo. Minhas Capacidades São Apenas Textuais.",
        "consegue criar video": "Não Consigo Criar Vídeos. Sou Um Programa De Chat.",
        "quero que voce faca uma imagem": "Eu Não Tenho Essa Funcionalidade. Posso Ajudar Com Informações Em Texto, Se Precisar.",
        "faca um video": "Não Consigo Fazer Vídeos. Sou Um Assistente De Texto.",
        "pode gerar um desenho": "Não Posso Gerar Desenhos. Sou Baseado Em Texto.",
        "voce tem acesso a imagens": "Não Tenho Acesso Direto Para Gerar Ou Exibir Imagens.",
        "voce pode me mostrar uma imagem": "Eu Não Posso Exibir Imagens. Sou Um Chat De Texto.",
        "eu queria uma imagem": "Não Consigo Produzir Imagens. Desculpe.",
        "e possivel gerar uma imagem": "Comigo Não É Possível Gerar Imagens.",
        "e possivel criar um video": "Não É Possível Criar Vídeos Com Minha Ajuda.",
        "voce pode fazer um gif": "Não Posso Fazer Gifs. Minhas Habilidades São Restritas Ao Texto.",
        "gerar uma imagem para mim": "Não Tenho Capacidade Para Isso. Minhas Interações São Textuais.",
        "crie uma imagem de [descricao]": "Desculpe, Não Posso Criar Imagens Com Base Em Descrições.",
        "transforme isso em imagem": "Eu Lamento, Mas Não Tenho Recursos Visuais.",
        "eu gostaria de um video sobre [topico]": "Não Consigo Gerar Vídeos Sobre Tópicos.",
        "produzir um clipe": "Não Tenho Capacidade Para Produzir Clipes.",
        "fazer uma animacao": "Não Consigo Criar Animações. Sou Um Modelo De Texto.",
        "voce tem algum gerador de imagem": "Não Possuo Um Gerador De Imagens.",
        "posso ver um video que voce criou": "Eu Não Crio Vídeos, Então Não Tenho Nenhum Para Mostrar.",
        "mostre me uma imagem": "Não Posso Exibir Imagens.",
        "queria ver um video": "Não Posso Reproduzir Vídeos.",
        "voce tem recursos graficos": "Meus Recursos São Apenas Textuais.",
        "voce e um gerador de arte": "Não, Eu Não Gero Arte.",

        // --- INDICAÇÕES / SUGESTÕES ---
        "indicacao": "Posso Te Dar Indicações Textuais, Se Tiver Algo Específico Em Mente! Por Exemplo, Livros, Filmes (Se Eu Tiver Dados Sobre Eles), Ou Ideias De Tópicos Para Pesquisar.",
        "me indica": "O Que Você Gostaria De Uma Indicação? Diga-Me O Tipo De Coisa Que Te Interessa Para Eu Tentar Ajudar.",
        "me da uma dica": "Para Que Tipo De Dica Você Precisa? Quanto Mais Detalhes Você Me Der, Mais Posso Tentar Ajudar.",
        "sugestao": "Para Que Tipo De Sugestão Você Precisa? Quanto Mais Detalhes Você Me Der, Mais Posso Tentar Ajudar.",
        "me da uma sugestao": "O Que Você Gostaria De Uma Sugestão? Seja O Mais Específico Possível.",
        "onde posso": "Onde Você Pode Fazer O Quê? Se For Algo Que Posso Responder Com Base No Meu Conhecimento, Ficarei Feliz Em Ajudar!",
        "o que posso fazer": "Depende Do Que Você Busca! Quer Ideias Para Um Hobby, Um Estudo, Ou Algo Divertido?",
        "melhor": "O 'Melhor' É Muito Subjetivo! Para Que Você Precisa De Uma Recomendação De 'Melhor'?",
        "qual o melhor": "O 'Melhor' Depende Do Seu Objetivo! Diga-Me Sobre O Que Você Quer Saber.",
        "voce pode indicar": "Posso Indicar Informações Que Tenho Na Minha Base. O Que Você Gostaria Que Eu Indicasse?",
        "qual sua recomendacao": "Minhas Recomendações São Baseadas Nos Meus Dados. Sobre O Que Você Quer Uma Recomendação?",
        "dicas": "Posso Te Dar Dicas Sobre Assuntos Gerais Que Conheço. Qual O Tema?",
        "o que voce sugere": "Sugiro Que Você Me Diga O Que Procura Para Que Eu Possa Tentar Te Ajudar.",
        "me da uma recomendacao": "Para Qual Finalidade Você Precisa De Uma Recomendação?",
        "quais as melhores opcoes": "Melhores Opções Para Qual Assunto? Preciso De Mais Contexto.",
        "voce tem alguma sugestao de livro": "Posso Sugerir Um Livro Genérico: 'Dom Casmurro' De Machado De Assis.",
        "voce tem alguma sugestao de filme": "Um Filme Clássico Que Posso Sugerir É 'O Poderoso Chefão'.",
        "o que eu posso assistir": "Posso Sugerir 'O Poderoso Chefão', Se Você Gosta De Filmes De Drama.",
        "o que eu posso ler": "Que Tal 'Dom Casmurro' Para Uma Leitura Nacional?",
        "indicacoes de series": "Não Tenho Um Banco De Dados De Séries, Mas Posso Sugerir Que Procure Por 'Breaking Bad' Ou 'Game Of Thrones', São Populares.",
        "onde comer": "Não Tenho Acesso A Localização Ou Restaurantes. Posso Ajudar Com Informações Gerais Sobre Tipos De Comida?",
        "o que fazer no final de semana": "Que Tal Ler Um Livro, Assistir Um Filme Ou Pesquisar Sobre Um Tópico Novo?",
        "que livro voce me indica": "Indico 'Dom Casmurro', Um Clássico Brasileiro.",
        "que filme devo assistir": "Se Gosta De Clássicos, Recomendo 'O Poderoso Chefão'.",
        "me da uma ideia": "Para Que Tipo De Ideia? Seja Específico.",
        "quais sao as melhores dicas para": "Quais Dicas Para Qual Tema?",
        "voce conhece algum lugar legal": "Não Conheço Lugares Físicos, Minha Existência É Digital.",
        "quero algo para me divertir": "Que Tal Um Livro Ou Um Filme? Posso Dar Sugestões Gerais.",
        "recomende me algo": "Recomendo Que Você Me Diga O Que Procura Para Que Eu Possa Ajudar Melhor.",
        "preciso de uma ideia para presente": "Uma Ideia Genérica: Um Livro Ou Um Item De Hobby.",
        "qual o melhor aplicativo": "Qual O Melhor Aplicativo Para Qual Função?",
        "dicas de estudo": "Uma Dica De Estudo: Revise O Conteúdo Regularmente.",
        "onde posso aprender": "Você Pode Aprender Online, Em Livros Ou Com Professores, Dependendo Do Que Deseja.",
        "o que fazer em casa": "Você Pode Ler, Assistir Filmes, Aprender Algo Novo Ou Cozinhar.",
        "indicacao de jogo": "Não Tenho Um Banco De Dados De Jogos, Mas Você Pode Procurar Por Jogos Populares Do Gênero Que Gosta.",

        // --- RECEITAS ---
        "receita": "Ainda Não Tenho Um Banco De Dados De Receitas Completo, Mas Posso Te Dar Um Exemplo Simples! Quer Uma Receita De Um Bolo Básico?",
        "me da uma receita": "Para Que Tipo De Receita? Se For Algo Simples E Comum, Posso Ter Uma Em Minha Base.",
        "como fazer arroz": "Para Fazer Arroz: Lave 1 Xícara De Arroz. Refogue Com Alho E Um Fio De Óleo. Adicione 2 Xícaras De Água Fervente E Sal A Gosto. Deixe Ferver, Abaixe O Fogo E Cozinhe Até A Água Secar. Deixe Descansar Por 5 Minutos.",
        "quero fazer arroz": "Ok, Para Fazer Arroz: Lave 1 Xícara De Arroz. Refogue Com Alho E Um Fio De Óleo. Adicione 2 Xícaras De Água Fervente E Sal A Gosto. Deixe Ferver, Abaixe O Fogo E Cozinhe Até A Água Secar. Deixe Descansar Por 5 Minutos.",
        "receita de arroz": "Para Fazer Arroz: Lave 1 Xícara De Arroz. Refogue Com Alho E Um Fio De Óleo. Adicione 2 Xícaras De Água Fervente E Sal A Gosto. Deixe Ferver, Abaixe O Fogo E Cozinhe Até A Água Secar. Deixe Descansar Por 5 Minutos.",
        "bolo": "Para Uma Receita De Bolo, Preciso De Mais Detalhes! Que Tipo De Bolo Você Gostaria?",
        "fazer bolo": "Qual Tipo De Bolo? Chocolate, Cenoura, Fubá?",
        "receita de bolo": "Que Bolo Você Deseja? Posso Tentar Te Ajudar Com Uma Receita Simples Se Eu Tiver.",
        "como cozinhar bolo": "Para Cozinhar Bolo, Preciso Do Tipo De Bolo. Qual Receita Você Quer?",
        "cozinhar": "Amo Cozinhar! Bem, Se Eu Podesse. Que Tipo De Culinária Te Interessa?",
        "me ensina a cozinhar": "Posso Te Dar Dicas Básicas De Culinária. Por Onde Quer Começar?",
        "como preprar": "Como Preparar O Quê? Diga-Me O Que Você Quer Cozinhar.",
        "culinaria": "Culinária É A Arte De Cozinhar! Você Tem Alguma Dúvida Sobre Um Prato Específico?",
        "livro de receitas": "Não Tenho Um Livro De Receitas, Mas Posso Te Ajudar Com Algumas Instruções Básicas De Pratos Simples.",
        "como cozinhar": "Para Cozinhar O Quê? Posso Te Dar Instruções Para Pratos Simples.",
        "receita de brigadeiro": "Para Brigadeiro: Leite Condensado, Chocolate Em Pó E Manteiga. Mexa No Fogo Baixo Até Desgrudar Do Fundo Da Panela.",
        "como fazer brigadeiro": "Mexa Leite Condensado, Chocolate Em Pó E Manteiga Em Fogo Baixo Até Desgrudar Da Panela.",
        "quais ingredientes pra fazer macarrao": "Para Macarrão Básico, Você Precisa De Massa, Água E Sal. O Molho Depende Da Sua Preferência!",
        "quero aprender a cozinhar": "Posso Te Dar O Básico. O Que Gostaria De Aprender Primeiro?",
        "dica de culinaria": "Uma Dica É Sempre Ler A Receita Inteira Antes De Começar A Cozinhar!",
        "receita facil": "Que Tal Uma Salada Simples? Alface, Tomate, Pepino E Azeite.",
        "como fazer omelete": "Para Omelete: Bata Ovos, Tempere. Despeje Em Frigideira Untada E Cozinhe Até Firmar.",
        "quero fazer um prato": "Que Tipo De Prato Você Quer Fazer? Posso Dar Uma Receita Simples.",
        "me de ideias de almoco": "Ideias Para Almoço: Arroz, Feijão, Carne E Salada.",
        "me de ideias de jantar": "Ideias Para Jantar: Sopa, Sanduíche Natural Ou Uma Refeição Leve.",
        "o que cozinhar hoje": "Que Tal Uma Macarronada Simples?",
        "passo a passo de receita": "Qual Receita Você Quer O Passo A Passo?",
        "receita de doces": "Posso Dar A Receita De Brigadeiro, Que É Um Doce Popular.",
        "receita de salgados": "Não Tenho Um Banco De Dados Grande De Salgados No Momento.",
        "temperar carne": "Para Temperar Carne: Use Sal, Pimenta E Seus Temperos Favoritos.",
        "como assar": "Como Assar O Quê? O Tempo E Temperatura Variam.",
        "como fritar": "Para Fritar, Use Óleo Quente E Cuidado Com O Manuseio Dos Alimentos.",

        // --- COMO FAZER / TUTORIAIS ---
        "como fazer": "Para 'Como Fazer' O Quê? Se For Algo Simples E Que Eu Tenha Em Minha Base, Posso Te Dar Um Passo A Passo.",
        "me ensina a fazer": "O Que Você Quer Aprender A Fazer? Diga-Me O Tema.",
        "tutorial": "Não Tenho A Capacidade De Exibir Tutoriais Visuais Ou Muito Complexos. Mas Se For Um Processo Simples E Direto, Posso Tentar Descrever Os Passos Para Você!",
        "preciso de um tutorial": "Sobre O Que É O Tutorial? Descreva O Que Você Precisa Aprender.",
        "passo a passo": "Preciso Saber Sobre O Que É O Passo A Passo! Diga-Me O Que Você Quer Aprender A Fazer.",
        "me da um passo a passo": "Para Que Processo Você Precisa De Um Passo A Passo? Exemplo: 'Como Montar Uma Mesa'.",
        "como funciona": "Como Funciona O Quê? Se For Um Conceito Que Eu Conheça, Posso Explicar.",
        "explicar": "O Que Você Gostaria Que Eu Explicasse?",
        "me explica": "Diga-Me O Que Você Quer Que Eu Explique.",
        "como consertar": "O Que Você Quer Consertar? Não Tenho Conhecimento Prático Para Reparos.",
        "manual de instrucoes": "Não Sou Um Manual De Instruções, Mas Posso Tentar Explicar Conceitos.",
        "instrucoes": "Quais Instruções Você Procura?",
        "quero aprender": "O Que Você Quer Aprender? Posso Compartilhar Informações Que Tenho.",
        "me de um guia": "Sobre O Que É O Guia? Me Diga O Tópico.",
        "passos para": "Quais São Os Passos Para O Quê? Seja Mais Específico, Por Favor.",
        "como criar": "Como Criar O Quê? Se For Um Conceito Simples, Posso Descrever.",
        "processo de": "Qual O Processo De Qual Coisa Você Quer Saber?",
        "descreva o procedimento": "Que Procedimento Você Deseja Que Eu Descreva?",
        "metodo para": "Qual Método Para Qual Finalidade?",
        "tecnicas de": "Quais Técnicas De Qual Habilidade Ou Assunto?",
        "dicas para iniciantes": "Dicas Para Iniciantes Em Qual Área?",
        "como instalar": "Como Instalar O Quê? Preciso De Mais Detalhes.",
        "configurar": "O Que Você Quer Configurar?",
        "resolver problema": "Qual O Problema Você Quer Resolver? Posso Dar Dicas Gerais.",
        "guia rapido": "Sobre O Que É O Guia Rápido Que Você Precisa?",
        "ajuda para um projeto": "Qual O Seu Projeto? Posso Tentar Ajudar Com Informações.",
        "passos basicos": "Quais Passos Básicos Para O Quê?",
        "guia completo": "Não Tenho Guias Completos, Mas Posso Dar Informações Pontuais.",
        "como utilizar": "Como Utilizar O Quê? Me Diga O Objeto Ou Software.",
        "dicas e truques": "Sobre Quais Dicas E Truques Você Quer Saber?",
        "melhores praticas": "Melhores Práticas Para Qual Atividade?",
        "aprenda a": "Aprenda A Fazer O Quê? Diga O Tema.",

        // --- JOGOS ---
        "minecraft": "Minecraft é Um Jogo Excelente!",
        "herobrine": "Ah, É Uma Lenda De Minecraft!... Cuidado Com, ELE!",
        "roblox": "Roblox, é Um Jogo Multiplayer Muito Divertido",
        "jogos": "Recomendo Em 1 Lugar: Minecraft. Em 2: Roblox. Em 3: BeamingDrive.",
    };

    // --- Funções Auxiliares ---

    /**
     * Capitaliza a primeira letra de cada palavra em uma string.
     * Ex: "ola tudo bem" -> "Ola Tudo Bem"
     * @param {string} text - O texto a ser capitalizado.
     * @returns {string} O texto com cada palavra capitalizada.
     */
    function capitalizeEachWord(text) {
        return text.split(' ').map(word => {
            if (word.length === 0) return '';
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

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
            profilePic.src = userProfilePicPath;
            profilePic.alt = 'Sua Foto De Perfil';
            profilePic.classList.add('user-profile-pic');
        } else {
            profilePic.src = aiProfilePicPath;
            profilePic.alt = 'Foto De Perfil Da IA';
            profilePic.classList.add('ai-profile-pic');
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        
        // Aplica a capitalização apenas para mensagens da IA
        messageElement.textContent = (sender === 'ai') ? capitalizeEachWord(messageText) : messageText;

        // A ordem de anexar os elementos determina se a foto fica à esquerda ou à direita da bolha de texto
        if (sender === 'user') {
            messageContainer.appendChild(messageElement);
            messageContainer.appendChild(profilePic);
        } else {
            messageContainer.appendChild(profilePic);
            messageContainer.appendChild(messageElement);
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

        // Procura por inclusão de palavras-chave para respostas mais flexíveis
        for (const key in aiKnowledgeBase) {
            const normalizedKey = normalizeText(key);
            if (normalizedUserMessage.includes(normalizedKey)) {
                return aiKnowledgeBase[key];
            }
        }

        // Resposta padrão caso nada seja encontrado
        return "Desculpe, Não Entendi Sua Pergunta. Você Pode Reformular Ou Perguntar Algo Mais Simples?";
    }

    // --- Lógica Principal: Envio De Mensagens ---
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
            // Adiciona a resposta da IA com a foto da IA (já capitalizada pela função addMessage)
            addMessage('ai', aiResponse);
        }, 500);
    }

    // --- Gerenciamento De Eventos (Event Listeners) ---
    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});