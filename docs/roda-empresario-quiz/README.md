# Roda do Empresário - Quiz

Projeto de quiz estático (HTML/CSS/JS) para a "Roda do Empresário".

## Estrutura
- `index.html`: página principal do quiz
- `lead-capture.html`: captura de leads
- `assets/css`: estilos
- `assets/js`: scripts
- `assets/data/questions.json`: perguntas do quiz

## Como abrir localmente
Basta abrir o arquivo `index.html` no navegador (duplo clique). Para evitar problemas de CORS em alguns navegadores, você pode usar um servidor estático simples.

- Node.js (opcional):
  ```bash
  npx serve .
  ```
  Depois acesse `http://localhost:3000`.

## Publicação no GitHub Pages
Este repositório inclui um workflow do GitHub Actions para publicar automaticamente no GitHub Pages.

1. Crie um repositório novo no GitHub (ex.: `seu-usuario/roda-empresario-quiz`).
2. Faça o primeiro push deste projeto para a branch `main`.
3. O workflow `Deploy to GitHub Pages` será executado e publicará o site.
4. Acesse a URL gerada na aba "Deployments" ou em "Settings > Pages".

Não há etapa de build. O conteúdo estático da raiz do repositório é enviado diretamente para o Pages.

## Licença
Distribuído sob a licença MIT. Veja `LICENSE` para mais detalhes.
