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
    // 1. Evitar cache de scroll (força iniciar no topo)
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 2. Limpar qualquer tralha de hash na URL sem recarregar a página
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }

    // 3. Interceptar cliques das âncoras locais (ex: #contato) para não sujar a URL, scrollando manual
    document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const urlArgs = this.getAttribute('href').split('#');
            const page = urlArgs[0];
            const hash = '#' + urlArgs[1];
            
            const isSamePage = !page || (page === 'index.html' && window.location.pathname.endsWith('index.html')) || (page === 'index.html' && window.location.pathname === '/');
            
            if (isSamePage) {
                const target = document.querySelector(hash);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Renderiza os ícones do Lucide
    lucide.createIcons();

    if (typeof VANTA !== 'undefined') {
        initVanta();
    }
    initLanguage();
    initDropdown();
    initEventDelegation();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = currentLang === 'pt' ? "Enviando..." : "Sending...";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const endpointURL = "https://formspree.io/f/xbdqlkkj";

                const response = await fetch(endpointURL, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert(currentLang === 'pt' ? "Mensagem enviada com sucesso!" : "Message sent successfully!");
                    contactForm.reset();
                } else {
                    alert(currentLang === 'pt' ? "Ocorreu um erro ao enviar. Tente novamente." : "An error occurred. Please try again.");
                }
            } catch (error) {
                alert(currentLang === 'pt' ? "Erro de conexão." : "Connection error.");
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

/* ===========================================
   VANTA.JS
   =========================================== */

function initVanta() {
    if (vantaEffect) {
        vantaEffect.destroy();
    }

    const vantaEl = document.getElementById("vanta-bg");
    if (!vantaEl) return;

    const customColorStr = vantaEl.getAttribute("data-project-color");
    const customHighlight = customColorStr ? parseInt(customColorStr, 16) : null;

    // Temática focada no Cyan (0x00ffff) ou na cor customizada do projeto
    const highlightColor = customHighlight !== null ? customHighlight : 0x00ffff;
    const midtoneColor = customHighlight !== null ? customHighlight : 0x008080;
    const lowlightColor = 0x003333; // Teal muito escuro
    const baseColor = 0x000508; // Preto abissal (Dark)

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

    const plElements = document.querySelectorAll('[data-pt-placeholder][data-en-placeholder]');
    plElements.forEach(el => {
        el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
    });


    const currentFlag = document.getElementById('current-flag');
    const currentLangText = document.getElementById('current-lang-text');

    if (lang === 'pt') {
        currentFlag.src = 'https://flagcdn.com/w20/br.png';
        currentFlag.srcset = 'https://flagcdn.com/w40/br.png 2x';
        currentFlag.alt = 'BR';
        currentLangText.textContent = 'PT-BR';
        document.documentElement.lang = 'pt-BR';
    } else {
        currentFlag.src = 'https://flagcdn.com/w20/us.png';
        currentFlag.srcset = 'https://flagcdn.com/w40/us.png 2x';
        currentFlag.alt = 'US';
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