// Renderiza os ícones do Lucide
lucide.createIcons();

// =========================================
// LÓGICA DO SWITCH DE TEMA
// =========================================
const themeToggleCheckbox = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Verifica o armazenamento local na inicialização
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggleCheckbox.checked = true; // Empurra a bolinha do switch para a direita
}

themeToggleCheckbox.addEventListener('change', () => {
    if (themeToggleCheckbox.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
});

// =========================================
// LÓGICA DO DROPDOWN DE IDIOMA
// =========================================
const dropdown = document.getElementById('lang-dropdown');
const langToggleBtn = document.getElementById('lang-toggle-btn');
const currentFlag = document.getElementById('current-flag');
const currentLangText = document.getElementById('current-lang-text');
const elementsToTranslate = document.querySelectorAll('[data-pt][data-en]');

let currentLang = navigator.language.startsWith('pt') ? 'pt' : 'en';

// Abre/fecha o menu ao clicar
langToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que o clique feche imediatamente
    dropdown.classList.toggle('active');
});

// Fecha o menu se clicar em qualquer lugar fora dele
window.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Função para aplicar a tradução (declarada no escopo global para o HTML acessar)
window.setLanguage = function(lang) {
    currentLang = lang;
    
    // Troca os textos do corpo do site
    elementsToTranslate.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    
    // Atualiza o botão do dropdown com o idioma atual
    if (lang === 'pt') {
        currentFlag.innerText = '🇧🇷';
        currentLangText.innerText = 'PT-BR';
        document.documentElement.lang = 'pt-BR';
    } else {
        currentFlag.innerText = '🇺🇸';
        currentLangText.innerText = 'EN-US';
        document.documentElement.lang = 'en-US';
    }
    
    dropdown.classList.remove('active'); // Fecha o menu
};

// Executa na primeira carga da página
window.setLanguage(currentLang);