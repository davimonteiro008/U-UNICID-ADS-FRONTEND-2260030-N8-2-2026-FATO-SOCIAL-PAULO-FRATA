# Portal Fato Social — Impacto Socioambiental e Inclusão Digital

Portal institucional acessível (WCAG 2.1 AA) e totalmente responsivo (Mobile-First) desenvolvido em HTML5 semântico, CSS3 moderno e JavaScript modular com persistência em `localStorage`.

## Estrutura do Projeto

- `index.html`: Página inicial com banner institucional, indicadores de impacto, frentes de atuação, vídeo integrado do YouTube com atalhos diretos e simulador de doação.
- `sobre.html`: História, missão, valores e pilares de governança.
- `projetos.html`: Detalhamento dos eixos de Triagem Solidária, Inclusão Digital e Pontos de Coleta.
- `impacto.html`: Dashboard de transparência, prestação de contas responsiva e acompanhamento local via `localStorage`.
- `galeria.html`: Galeria fotográfica com registros reais, filtros por categoria e lightbox acessível.
- `noticias.html` (e `noticiais.html`): Portal de notícias e editais com busca em tempo real, filtros e modal de leitura.
- `midia.html` + `js/midia.js`: Central multimídia conectada com:
  - **Vídeos Integrados do YouTube (`#videos-youtube`)**: Palco conectado via `youtube-nocookie.com`, playlist interativa, capítulos com salto direto de tempo (`start=`), leitura de parâmetros de rota (`?video=ods|economia|coleta`) e fallback automático para o vídeo institucional HTML5 local (`assets/video/video-fatosocial.mp4`) com legendas `.vtt`.
  - **Podcast Vozes do Bairro (`#podcast-vozes`)**: Player conectado com seleção de episódios (`?episodio=ep01|ep02|ep03`), transcrição sincronizada clicável (`[00:00]`, `[00:02]`, `[00:04]`), controle de velocidade (`1.0x`, `1.25x`, `1.5x`), leitura em voz alta (PT-BR) e salvamento do último episódio ouvido no `localStorage`.
  - **Mapa Interativo (`#mapa-coleta`)**: Localização da sede e pontos de coleta no Tatuapé, São Paulo.
- `contato.html`: Formulário de contato e voluntariado com validação JS, salvamento automático de rascunho e área de doações/PIX.
- `acessibilidade.html`: Declaração WCAG 2.1 AA, painel de alto contraste/fonte e tabela responsiva de atalhos de teclado.
- `orcamento_hospedagem.html`: Comparativo técnico e simulador de custos de hospedagem.
