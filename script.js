/**
 * Portfólio — Script principal
 *
 * Módulos:
 * - Theme toggle (dark/light mode com persistência em localStorage)
 * - Language switcher (PT-BR / EN-US com detecção automática)
 * - Vanta.js integration (FOG effect with Cyan palette)
 * - Event delegation para modais e dropdown
 */

let vantaEffect = null;

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza os ícones do Lucide
    lucide.createIcons();

    initTheme();
    initLanguage();
    initDropdown();
    initEventDelegation();
});

/* ===========================================
   THEME TOGGLE & VANTA.JS
   =========================================== */

function initVanta(isLight) {
    if (vantaEffect) {
        vantaEffect.destroy();
    }

    // Temática focada no Cyan (0x00ffff) - Light levemente mais escuro
    const highlightColor = isLight ? 0x008b8b : 0x00ffff; // Teal escuro (Light) / Cyan neon brilhante (Dark)
    const midtoneColor   = isLight ? 0x00d2d2 : 0x008080; // Ciano denso / Teal médio
    const lowlightColor  = isLight ? 0x8ce6e6 : 0x003333; // Azul-esverdeado claro / Teal muito escuro
    const baseColor      = isLight ? 0xd0e8e8 : 0x000508; // Fundo cinza-ciano escurecido (Light) / Preto abissal (Dark)

    vantaEffect = VANTA.FOG({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: highlightColor,
        midtoneColor: midtoneColor,
        lowlightColor: lowlightColor,
        baseColor: baseColor,
        blurFactor: 0.51,
        speed: -0.20,
        zoom: 0.10
    });
}

function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    let isLight = false;

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        toggle.checked = true;
        isLight = true;
    }

    // Initialize the background effect with the correct theme
    if (typeof VANTA !== 'undefined') {
        initVanta(isLight);
    }

    toggle.addEventListener('change', () => {
        isLight = toggle.checked;
        document.body.classList.toggle('light-mode', isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Re-initialize Vanta when theme changes for proper colors
        if (typeof VANTA !== 'undefined') {
            initVanta(isLight);
        }
    });
}

/* ===========================================
   LANGUAGE SWITCHER
   =========================================== */

let currentLang = navigator.language.startsWith('pt') ? 'pt' : 'en';

function initLanguage() {
    const langButtons = document.querySelectorAll('.dropdown-content [data-lang]');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });

    setLanguage(currentLang);
}

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

    const dropdown = document.getElementById('lang-dropdown');
    dropdown.classList.remove('active');
}

/* ===========================================
   DROPDOWN
   =========================================== */

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

    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.close();
            }
        });
    });
}