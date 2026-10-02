# Plano — Silent Concert

## Escopo
Criar uma página única narrativa para apresentar o Silent Concert como uma experiência musical imersiva, íntima e coletiva. A página deve transformar o conteúdo da apresentação em uma experiência contínua de rolagem, usando o vídeo enviado como fundo atmosférico, uma linguagem lo-fi e uma paleta off-white. Fraunces fica reservada aos headings principais.

## Direção de design

- **Movimento:** lo-fi editorial / diário visual de escuta, com textura analógica, composição assimétrica e ritmo de filme contemplativo.
- **Princípios:** silêncio como espaço; intimidade sem excesso; matéria orgânica; clareza poética.
- **Filosofia de cor:** o off-white é a base quente e respirável; marrom-escuro e carvão dão contraste de texto; terracota funciona como cor própria do projeto, lembrando terra, pele e fita analógica; um verde-musgo pontual conecta a paisagem e a ancestralidade.
- **Paradigma de layout:** narrativa vertical em camadas, com títulos deslocados, blocos que entram como anotações e seções que alternam sobreposição no vídeo e áreas de leitura em papel.
- **Elementos de assinatura:** moldura de viewfinder no hero; linhas finas e marcadores numerados; textura de grão e pequenos rótulos de arquivo/cassete.
- **Interação:** a rolagem deve parecer uma escuta gradual; links e cards respondem com deslocamentos mínimos, sublinhados desenhados e mudanças suaves de contraste.
- **Animação:** entrada por fade + translate curto; marquee discreto de palavra-chave; parallax muito leve no vídeo; sem transições rápidas ou efeitos chamativos.
- **Tipografia:** Fraunces para os headings principais; Inter/system sans para corpo, labels e navegação. Hierarquia com headings grandes, frases curtas e muito espaço negativo.
- **Essência da marca:** um concerto de música, palavra e escuta que transforma presença coletiva em experiência íntima. Personalidade: ancestral, sensorial, acolhedora.
- **Voz:** poética, direta e convidativa. Exemplos: “Escutar também é entrar.” / “Um concerto ouvido em conjunto — e sentido por dentro.”
- **Wordmark:** “SILENT / CONCERT” em duas linhas, Fraunces com espaçamento generoso e um pequeno traço de frequência entre as palavras.
- **Cor proprietária:** terracota queimado `#A75B42`, usado apenas em detalhes de orientação e chamadas.

## Implementação

- Aplicação web estática em Vite + JavaScript modular, sem backend ou banco.
- `index.html` para a narrativa e metadados; `src/styles.css` para a direção visual; `src/main.js` para navegação, reveal on scroll e interações leves.
- Vídeo do usuário servido por `/manus-storage/gemini_generated_video_8245c421_bafd625d.mp4` como background do hero e faixa atmosférica.
- `public/manus-routes.json` declara a rota única `/`.
- O conteúdo inclui abertura, pilares da experiência, dois formatos, motivo dos fones, experiência ao vivo, artistas e chamada para contratação.

## Estrutura

- `index.html`: marcação semântica da página e conteúdo editorial.
- `src/styles.css`: tokens, layout, tipografia, responsividade, textura e movimento.
- `src/main.js`: menu mobile, reveal por IntersectionObserver, ano/metadata e pequenos estados de interação.
- `public/manus-routes.json`: manifesto de rotas obrigatório.
- `plan.md`: decisões de implementação e design.
- `TODO.md`: resultados e critérios de entrega.
