# rixhards.github.io

Portfólio pessoal de **Richard Fagundes Rodrigues** — Desenvolvedor iOS.  
Projeto estático hospedado no GitHub Pages, feito com HTML, CSS e JavaScript puros.

---

## ✨ Features

- **Dark / Light Mode** — toggle com persistência em `localStorage`
- **Internacionalização (i18n)** — troca de idioma PT-BR ↔ EN-US via dropdown
- **Layout responsivo** — CSS Grid para desktop, coluna única para mobile
- **Carrosséis horizontais** — scroll snap nativo para cards de projetos e pesquisas
- **Modais nativos** — `<dialog>` do HTML5, sem dependências de JS externo
- **Ícones** — [Lucide Icons](https://lucide.dev) via CDN

## 🛠 Stack

| Camada | Tecnologia |
|--------|------------|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 (custom properties, grid, scroll-snap) |
| Lógica | JavaScript vanilla (ES6+) |
| Ícones | Lucide Icons |
| Fonte | Inter (Google Fonts) |
| Hospedagem | GitHub Pages |

## 📁 Estrutura do Projeto

```
rixhards.github.io/
├── index.html      # Página principal
├── style.css       # Design tokens + estilos organizados por seção
├── script.js       # Tema, idioma, dropdown e modais (event delegation)
├── imgs/           # Imagens e assets
│   └── Coin.png
└── README.md
```

## 🚀 Rodar Localmente

```bash
# Clonar o repositório
git clone https://github.com/rixhards/rixhards.github.io.git
cd rixhards.github.io

# Servir com qualquer server estático, ex:
python3 -m http.server 8000

# Abrir no navegador
open http://localhost:8000
```

## 📄 Licença

MIT © Richard Fagundes Rodrigues