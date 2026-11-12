description: Para que serve a regra
globs: public/*/.html
alwaysApply: false--
# Título da regra
Conteúdo em Markdown:
passos, exemplos e diretrizes

description: HTML5 semântico e acessível no EcoConecta
globs: public/*/.html
alwaysApply: false--
# HTML semântico – EcoConecta
## 1. Objetivo
Páginas semânticas, acessíveis e iguais ao index.html.
## 2. Contexto do projeto
HTML5 + CSS3 puros, sem frameworks. Site em public/,
estilos em public/css/style.css (mobile-first)

## 3. Regras detalhadas- Copie header, menu e footer do index.html.- Um único <h1>; cada section com aria-labelledby.- Toda <img> com alt descritivo; lang="pt-BR".
## 4. Exemplo
<section aria-labelledby="t-proj"><h2 id="t-proj">
## 5. Erros a evitar- Não use <div> no lugar de header, nav, main e footer.- Não use CSS inline nem frameworks.
## 6. Perguntas
Na dúvida sobre conteúdo ou página, pergunte antes

description: Padrões de CSS do site
globs: public/css/*/.css
alwaysApply: false--
# CSS – EcoConecta- Use as variáveis de :root.- Mobile-first: min-width 768/1024px.- Classes em português, padrão BEM:
.card, .card__icone, .botao--primario- Foco visível e contraste AA.
