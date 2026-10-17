# Luiza Rabelo · site

Site estático (HTML, CSS e JS puros, sem build) da Luiza Rabelo, multimarcas e semijoias em Sobradinho-DF.

## Abrir no computador
Dê dois cliques em `index.html`.

## Páginas
- `index.html`: home (destaque, categorias, novidades, história, a loja, Instagram)
- `loja.html`: todas as peças, com filtro por categoria e ordenação. No site publicado o endereço é limpo: `/loja?cat=vestidos` (sem `.html`, configurado em `vercel.json`)

## Editar peças, preços e fotos
Tudo fica em `js/catalogo.js`:
- `preco: 0` mostra "Sob consulta"
- `fotos`: nomes dos arquivos em `img/fotos/` (sem `.jpg`). Cada foto tem uma versão leve `-m.jpg` usada nas grades
- `novidade: true` coloca a peça em Novidades
- WhatsApp e Instagram em `LR_CONFIG`

## Pedido
A sacola fica salva no navegador e o botão "Finalizar pelo WhatsApp" envia a lista de peças para (61) 98280-9293. Não há pagamento online.

## Pendências
- Semijoias: sem fotos ainda. A categoria mostra "Peças sob consulta" com botão para o WhatsApp; cadastre as peças em `js/catalogo.js` (modelo comentado no fim do arquivo) e o estado some sozinho.
- Preços: todos "Sob consulta" até a loja enviar os valores.

## Cache (importante ao editar)
`css/`, `js/`, `img/` e `fonts/` ficam em cache por 1 ano no navegador (`vercel.json`).
Ao alterar `estilo.css`, `site.js` ou `catalogo.js`, aumente o número do `?v=` nos links do
`index.html` e do `loja.html` (ex.: `?v=2` para `?v=3`); senão quem já visitou continua vendo a versão antiga.
Foto nova: use um nome de arquivo novo, em vez de substituir um arquivo existente.
