/* =========================================================
   CATÁLOGO LUIZA RABELO
   Edite só este arquivo para trocar peças, preços e fotos.
   - preco: 0 mostra "Sob consulta"
   - fotos: nomes dos arquivos em img/fotos/ (sem o "-m")
   - novidade: true coloca a peça em "Novidades"
   - tamanhos: [] esconde a escolha de tamanho
   ========================================================= */

window.LR_CONFIG = {
  whatsapp: "5561982809293",
  instagram: "https://www.instagram.com/luizarabelodf/",
  mapa: "https://www.google.com/maps/search/?api=1&query=Luiza+Rabelo+Quadra+8+Sobradinho+DF"
};

window.LR_CATEGORIAS = [
  { id: "novidades",  nome: "Novidades",  capa: "look-colecao-verao27-bordado-offwhite" },
  { id: "vestidos",   nome: "Vestidos",   capa: "look-vestido-off-white-flores-terracota" },
  { id: "alfaiataria",nome: "Alfaiataria",capa: "look-colete-calca-offwhite-inverno26" },
  { id: "conjuntos",  nome: "Conjuntos",  capa: "look-conjunto-azul-tela-duas-modelos" },
  { id: "jeans",      nome: "Jeans",      capa: "look-jaqueta-jeans-bordada" },
  { id: "semijoias",  nome: "Semijoias",  capa: null }
];

const ROUPA = ["PP", "P", "M", "G", "GG"];
const JEANS = ["36", "38", "40", "42", "44", "46"];

window.LR_PRODUTOS = [
  /* ---------- VESTIDOS ---------- */
  { id: "vestido-flores-terracota", nome: "Vestido Flores Terracota", categoria: "vestidos", preco: 0, novidade: true,
    fotos: ["look-vestido-off-white-flores-terracota", "detalhe-vestido-off-white-flores-terracota"], tamanhos: ROUPA,
    descricao: "Off-white com flores pintadas em terracota e decote coração. Leve, fresco e feito para o verão." },
  { id: "vestido-bordado-branco", nome: "Vestido Bordado Branco", categoria: "vestidos", preco: 0, novidade: true,
    fotos: ["look-vestido-branco-bordado-mar", "look-vestido-branco-bordado-corpo-inteiro"], tamanhos: ROUPA,
    descricao: "Branco com bordado floral delicado e alças finas. Romântico do dia à noite." },
  { id: "vestido-tule-verde-agua", nome: "Vestido de Tule Verde-Água", categoria: "vestidos", preco: 0,
    fotos: ["look-vestido-tule-verde-agua", "look-vestido-verde-agua-fluido"], tamanhos: ROUPA,
    descricao: "Tule fluido com transpasse e manga longa. Fluidez e sofisticação a cada passo." },
  { id: "vestido-rose-babados", nome: "Vestido Rosê de Babados", categoria: "vestidos", preco: 0,
    fotos: ["look-vestido-rose-babados"], tamanhos: ROUPA,
    descricao: "Longo em rosê com camadas de babado. Feminilidade para ocasiões especiais." },
  { id: "vestido-rose-um-ombro", nome: "Vestido Rosê Um Ombro", categoria: "vestidos", preco: 0,
    fotos: ["look-vestido-rose-um-ombro"], tamanhos: ROUPA,
    descricao: "Modelagem assimétrica de um ombro só, em rosê. O tom do momento." },
  { id: "vestido-estampa-azul", nome: "Vestido Estampa Azul", categoria: "vestidos", preco: 0, novidade: true,
    fotos: ["look-vestido-estampa-azul-verao"], tamanhos: ROUPA,
    descricao: "Midi com estampa artística em azul e branco. Verão leve e cheio de presença." },
  { id: "vestido-camel", nome: "Vestido Midi Camel", categoria: "vestidos", preco: 0,
    fotos: ["look-vestido-camel-loja"], tamanhos: ROUPA,
    descricao: "Midi em camel com corte reto. Clássico e atemporal." },
  { id: "vestido-vermelho", nome: "Vestido Vermelho", categoria: "vestidos", preco: 0,
    fotos: ["look-vestido-vermelho-desejo"], tamanhos: ROUPA,
    descricao: "Vermelho intenso com corpo franzido. Uma das peças desejo da coleção." },

  /* ---------- ALFAIATARIA ---------- */
  { id: "colete-calca-off-white", nome: "Colete e Calça Off-White", categoria: "alfaiataria", preco: 0, novidade: true,
    fotos: ["look-colete-calca-offwhite-inverno26", "detalhe-colete-alfaiataria-offwhite"], tamanhos: ROUPA,
    descricao: "Colete frente única com botões e calça de alfaiataria. Coleção Outono Inverno 26." },
  { id: "alfaiataria-bege", nome: "Colete e Calça Bege", categoria: "alfaiataria", preco: 0,
    fotos: ["look-alfaiataria-colete-calca-bege"], tamanhos: ROUPA,
    descricao: "Alfaiataria moderna em bege, com colete de cinto. Elegância sem esforço." },
  { id: "colete-off-white", nome: "Colete de Alfaiataria", categoria: "alfaiataria", preco: 0,
    fotos: ["look-alfaiataria-colete-off-white"], tamanhos: ROUPA,
    descricao: "Colete off-white de corte preciso. Vai do trabalho ao jantar." },
  { id: "calca-alfaiataria-off-white", nome: "Calça de Alfaiataria", categoria: "alfaiataria", preco: 0,
    fotos: ["look-alfaiataria-calca-off-white-sala"], tamanhos: ROUPA,
    descricao: "Calça off-white de cintura alta e caimento reto." },
  { id: "conjunto-camel-camurca", nome: "Conjunto Camel em Camurça", categoria: "alfaiataria", preco: 0,
    fotos: ["look-conjunto-camel-camurca"], tamanhos: ROUPA,
    descricao: "Camel da cabeça aos pés: camisa e calça em camurça, como nas passarelas." },

  /* ---------- CONJUNTOS ---------- */
  { id: "conjunto-verao-27", nome: "Conjunto Bordado Verão 27", categoria: "conjuntos", preco: 0, novidade: true,
    fotos: ["look-colecao-verao27-bordado-offwhite"], tamanhos: ROUPA,
    descricao: "Texturas marcantes e bordado handmade. A abertura da Coleção Verão 27." },
  { id: "conjunto-summer-stripe", nome: "Conjunto Summer Stripe", categoria: "conjuntos", preco: 0, novidade: true,
    fotos: ["look-summer-stripe-conjunto-vestido"], tamanhos: ROUPA,
    descricao: "Listras largas em rosê e vinho. Conforto e elegância na mesma produção." },
  { id: "conjunto-azul-tela", nome: "Conjunto Azul Tela", categoria: "conjuntos", preco: 0,
    fotos: ["look-conjunto-azul-tela-duas-modelos", "look-top-azul-tela-detalhe"], tamanhos: ROUPA,
    descricao: "Top e calça em azul brisa. Onde o verão encontra seu refúgio." },
  { id: "conjunto-mint-bordado", nome: "Conjunto Mint Bordado", categoria: "conjuntos", preco: 0,
    fotos: ["look-conjunto-mint-bordado"], tamanhos: ROUPA,
    descricao: "Bordado minucioso sobre o tom mint, com cortes de alfaiataria." },
  { id: "conjunto-total-white", nome: "Conjunto Total White", categoria: "conjuntos", preco: 0,
    fotos: ["look-conjunto-total-white-loja", "look-total-white-loja"], tamanhos: ROUPA,
    descricao: "Clássico, confortável e atemporal. Indispensável no guarda-roupa." },
  { id: "conjunto-easy-chic", nome: "Conjunto Easy Chic", categoria: "conjuntos", preco: 0,
    fotos: ["look-conjunto-easy-chic-coral"], tamanhos: ROUPA,
    descricao: "Coral vibrante para quem vive o verão com elegância e conforto." },
  { id: "conjunto-algodao-bordado", nome: "Conjunto Algodão Bordado", categoria: "conjuntos", preco: 0,
    fotos: ["look-conjunto-algodao-bordado-branco"], tamanhos: ROUPA,
    descricao: "Nosso algodão bordado exclusivo. Feminino, leve e elegante." },
  { id: "conjunto-bordado-3d", nome: "Conjunto Bordado 3D", categoria: "conjuntos", preco: 0,
    fotos: ["look-conjuntos-bordado-3d-off-white"], tamanhos: ROUPA,
    descricao: "Bordado 3D exclusivo sobre algodão 100%. Um dos statements da coleção." },
  { id: "conjunto-estampa-verao", nome: "Conjunto Estampado", categoria: "conjuntos", preco: 0,
    fotos: ["look-duas-modelos-estampa-verao"], tamanhos: ROUPA,
    descricao: "Estampas delicadas em tons de areia. Natural, fresh e cheio de estilo." },
  { id: "conjunto-marrom", nome: "Conjunto Marrom Clássico", categoria: "conjuntos", preco: 0,
    fotos: ["look-conjunto-marrom-classico"], tamanhos: ROUPA,
    descricao: "Lindo, clássico e atemporal, em marrom café." },

  /* ---------- JEANS ---------- */
  { id: "jaqueta-jeans-bordada", nome: "Jaqueta Jeans Bordada", categoria: "jeans", preco: 0, novidade: true,
    fotos: ["look-jaqueta-jeans-bordada"], tamanhos: ROUPA,
    descricao: "Jeans com bordado floral em relevo. Beleza, conforto e praticidade." },
  { id: "calca-jeans-wide-leg", nome: "Calça Jeans Wide Leg", categoria: "jeans", preco: 0, novidade: true,
    fotos: ["look-calca-jeans-wide-leg"], tamanhos: JEANS,
    descricao: "A modelagem perfeita: cintura alta e perna ampla." },

  /* ---------- SEMIJOIAS ----------
     Sem fotos ainda: a categoria mostra "Peças sob consulta".
     Quando a loja enviar fotos, cadastre aqui (o estado vazio some sozinho):
  { id: "brinco-exemplo", nome: "Nome da peça", categoria: "semijoias", preco: 0,
    fotos: ["nome-do-arquivo"], tamanhos: [], descricao: "Texto curto." }
  */
];
