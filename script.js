// =========================================
// LÓGICA DE TEMA (DARK / LIGHT MODE)
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Verifica se o usuário já havia escolhido o tema claro anteriormente
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
}

themeToggleBtn.addEventListener('click', () => {
    // Alterna a classe no body
    document.body.classList.toggle('light-mode');
    
    // Salva a preferência atual no localStorage
    let theme = 'dark';
    if (document.body.classList.contains('light-mode')) {
        theme = 'light';
    }
    localStorage.setItem('theme', theme);
});

// =========================================
// LÓGICA DE IDIOMA (PT-BR / EN-US)
// =========================================
const langToggleBtn = document.getElementById('lang-toggle');
const elementsToTranslate = document.querySelectorAll('[data-pt][data-en]');

// Define o idioma inicial com base no navegador do usuário
let currentLang = navigator.language.startsWith('pt') ? 'pt' : 'en';

function applyLanguage(lang) {
    elementsToTranslate.forEach(el => {
        // Troca o texto interno do elemento pelo valor do atributo correspondente
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    
    // Atualiza o texto do botão para mostrar a opção de troca
    langToggleBtn.innerText = lang === 'pt' ? 'EN' : 'PT-BR';
    
    // Atualiza a semântica da página para leitores de tela
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
}

// Aplica o idioma assim que o script carrega
applyLanguage(currentLang);

langToggleBtn.addEventListener('click', () => {
    // Alterna a variável e reaplica a função
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    applyLanguage(currentLang);
});