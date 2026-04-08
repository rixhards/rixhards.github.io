/**
 * Portfólio — Script principal
 *
 * Módulos:
 * - Theme toggle (dark/light mode com persistência em localStorage)
 * - Language switcher (PT-BR / EN-US com detecção automática)
 * - Event delegation para modais e dropdown
 */

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza os ícones do Lucide
    lucide.createIcons();

    initTheme();
    initLanguage();
    initDropdown();
    initEventDelegation();
});

/* ===========================================
   THEME TOGGLE
   =========================================== */

/**
 * Inicializa o tema com base na preferência salva no localStorage.
 * Escuta mudanças no checkbox do toggle.
 */
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
        const isLight = toggle.checked;
        document.body.classList.toggle('light-mode', isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

/* ===========================================
   LANGUAGE SWITCHER
   =========================================== */

/** Idioma ativo no momento. */
let currentLang = navigator.language.startsWith('pt') ? 'pt' : 'en';

/**
 * Inicializa o seletor de idioma: aplica traduções na primeira carga
 * e registra listeners nos botões do dropdown.
 */
function initLanguage() {
    // Botões dentro do dropdown de idioma
    const langButtons = document.querySelectorAll('.dropdown-content [data-lang]');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });

    // Aplica o idioma detectado na carga inicial
    setLanguage(currentLang);
}

/**
 * Aplica o idioma selecionado a todos os elementos com atributos data-pt / data-en.
 * Atualiza o botão do dropdown e o atributo lang do documento.
 * @param {string} lang - Código do idioma ('pt' ou 'en')
 */
function setLanguage(lang) {
    currentLang = lang;

    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    const currentFlag = document.getElementById('current-flag');
    const currentLangText = document.getElementById('current-lang-text');

    if (lang === 'pt') {
        currentFlag.textContent = '🇧🇷';
        currentLangText.textContent = 'PT-BR';
        document.documentElement.lang = 'pt-BR';
    } else {
        currentFlag.textContent = '🇺🇸';
        currentLangText.textContent = 'EN-US';
        document.documentElement.lang = 'en-US';
    }

    // Fecha o dropdown após selecionar
    const dropdown = document.getElementById('lang-dropdown');
    dropdown.classList.remove('active');
}

/* ===========================================
   DROPDOWN
   =========================================== */

/**
 * Inicializa o dropdown de idioma: toggle ao clicar e fecha ao clicar fora.
 */
function initDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    const toggleBtn = document.getElementById('lang-toggle-btn');

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('active');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ===========================================
   EVENT DELEGATION (modais)
   =========================================== */

/**
 * Escuta cliques em todo o documento e despacha ações com base no
 * atributo data-action do elemento clicado.
 */
function initEventDelegation() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;

        switch (action) {
            case 'open-modal': {
                const modalId = target.dataset.target;
                const modal = document.getElementById(modalId);
                if (modal) modal.showModal();
                break;
            }
            case 'close-modal': {
                const dialog = target.closest('dialog');
                if (dialog) dialog.close();
                break;
            }
        }
    });

    // Fecha o modal ao clicar no backdrop (área fora do conteúdo)
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.close();
            }
        });
    });
}