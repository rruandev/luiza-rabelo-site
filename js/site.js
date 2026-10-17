/* =========================================================
   LUIZA RABELO · comportamento do site
   Grades de produto, modal, sacola e envio pelo WhatsApp.
   Os dados ficam em js/catalogo.js.
   ========================================================= */
(function () {
  "use strict";

  const CFG = window.LR_CONFIG;
  const CATS = window.LR_CATEGORIAS;
  const PRODUTOS = window.LR_PRODUTOS;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const porId = Object.fromEntries(PRODUTOS.map(p => [p.id, p]));
  const nomeCat = id => (CATS.find(c => c.id === id) || {}).nome || "";

  const JOIA_SVG =
    '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="38" r="15"/><path d="M24 24l8-10 8 10M24 24h16M27 24l5 6 5-6"/></svg>';
  const joiaVazia = (txt = "Em breve") => `<div class="joia-vazia">${JOIA_SVG}<span>${txt}</span></div>`;

  const foto = (nome, mobile) => `img/fotos/${nome}${mobile ? "-m" : ""}.jpg`;
  const preco = v => (v > 0 ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "Sob consulta");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- WhatsApp ---------- */
  const linkWhats = msg => `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`;
  $$("a[data-whats]").forEach(a => { a.href = linkWhats(a.dataset.whats); a.target = "_blank"; a.rel = "noopener"; });
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-whats]");
    if (!a) return;
    e.preventDefault();
    window.open(linkWhats(a.dataset.whats), "_blank", "noopener");
  });

  /* ---------- toast ---------- */
  const toastEl = $("[data-toast]");
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("visivel");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("visivel"), 2600);
  }

  /* ---------- menu mobile ---------- */
  const menu = $("#menu"), menuBtn = $("#menuBtn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const aberto = menu.classList.toggle("aberto");
      menuBtn.setAttribute("aria-expanded", aberto);
    });
    $$("a", menu).forEach(a => a.addEventListener("click", () => {
      menu.classList.remove("aberto");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }
  const ajustaTopo = () => {
    const t = $("#topo");
    if (t) document.documentElement.style.setProperty("--altura-topo", t.offsetHeight - 1 + "px");
  };
  ajustaTopo();
  window.addEventListener("resize", ajustaTopo);

  /* ---------- cartões ---------- */
  function cartao(p) {
    const f = p.fotos;
    const midia = f.length
      ? `<img src="${foto(f[0], true)}" alt="${esc(p.nome)}" loading="lazy">` +
        (f[1] ? `<img class="foto-2" src="${foto(f[1], true)}" alt="" loading="lazy">` : "")
      : joiaVazia();
    return `<article class="produto" data-id="${p.id}">
      <div class="produto-midia">
        <button class="produto-foto" data-abrir="${p.id}" aria-label="Ver ${esc(p.nome)}">${p.novidade ? '<span class="selo">Novo</span>' : ""}${midia}</button>
        <button class="produto-add" data-abrir="${p.id}" aria-label="Escolher tamanho de ${esc(p.nome)}">Escolher</button>
      </div>
      <button class="produto-link" data-abrir="${p.id}" tabindex="-1">
        <span class="produto-nome">${esc(p.nome)}</span>
        <span class="produto-preco">${preco(p.preco)}</span>
      </button>
    </article>`;
  }

  /* categorias da home */
  const catBox = $("[data-categorias]");
  if (catBox) {
    catBox.innerHTML = CATS.map(c => `
      <a class="categoria" href="loja.html?cat=${c.id}">
        <div class="categoria-foto">${c.capa ? `<img src="${foto(c.capa, true)}" alt="${c.nome}" loading="lazy">` : joiaVazia("Sob consulta")}</div>
        <span class="categoria-nome">${c.nome}</span>
      </a>`).join("");
  }

  /* novidades da home */
  $$('[data-grade="novidades"]').forEach(g => {
    const lim = +g.dataset.limite || 8;
    g.innerHTML = PRODUTOS.filter(p => p.novidade).slice(0, lim).map(cartao).join("");
  });

  /* ---------- página loja ---------- */
  const gradeLoja = $('[data-grade="todas"]');
  if (gradeLoja) {
    const params = new URLSearchParams(location.search);
    let cat = params.get("cat") || "todas";
    if (cat !== "todas" && !CATS.some(c => c.id === cat)) cat = "todas";
    let ordem = "padrao";
    const filtros = $("[data-filtros]"), qtd = $("[data-qtd]"), titulo = $("[data-loja-titulo]");
    const vazio = $("[data-vazio]"), ordenar = $("[data-ordenar]");

    filtros.innerHTML = [{ id: "todas", nome: "Todas" }, ...CATS]
      .map(c => `<button class="filtro" data-cat="${c.id}" aria-pressed="false">${c.nome}</button>`).join("");

    function desenha() {
      let lista = cat === "todas" ? PRODUTOS.slice()
        : cat === "novidades" ? PRODUTOS.filter(p => p.novidade)
        : PRODUTOS.filter(p => p.categoria === cat);
      if (ordem === "az") lista.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
      if (ordem === "novidades") lista.sort((a, b) => (b.novidade ? 1 : 0) - (a.novidade ? 1 : 0));
      gradeLoja.classList.remove("entrando");
      gradeLoja.innerHTML = lista.map(cartao).join("");
      void gradeLoja.offsetWidth;
      gradeLoja.classList.add("entrando");
      vazio.hidden = lista.length > 0;
      if (!lista.length) {
        const joias = cat === "semijoias";
        $("[data-vazio-titulo]", vazio).textContent = joias ? "Peças sob consulta" : "Nenhuma peça por aqui";
        $("[data-vazio-txt]", vazio).textContent = joias
          ? "Estamos preparando as fotos das semijoias. Peça modelos e valores pelo WhatsApp e enviamos para você."
          : "Nenhuma peça nesta categoria por enquanto.";
        const lk = $("[data-vazio-link]", vazio);
        lk.dataset.whats = joias ? "Olá! Gostaria de ver as semijoias disponíveis." : "Olá! Procuro uma peça que não encontrei no site.";
        lk.href = linkWhats(lk.dataset.whats);
        lk.textContent = joias ? "Ver semijoias pelo WhatsApp" : "Pergunte pelo WhatsApp";
      }
      $(".filtros-direita").hidden = !lista.length;
      $(".loja-sub").hidden = !lista.length;
      qtd.textContent = !lista.length ? "" : lista.length === 1 ? "1 peça" : `${lista.length} peças`;
      titulo.textContent = cat === "todas" ? "Todas as peças" : nomeCat(cat);
      document.title = `${cat === "todas" ? "Loja" : nomeCat(cat)} · Luiza Rabelo`;
      $$(".filtro", filtros).forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === cat));
      const ativo = $(`.filtro[data-cat="${cat}"]`, filtros);
      if (ativo) filtros.scrollLeft = ativo.offsetLeft - (filtros.clientWidth - ativo.offsetWidth) / 2;
      $$("#menu a").forEach(a => {
        const m = a.getAttribute("href").match(/cat=([\w-]+)/);
        if (m && m[1] === cat) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      });
    }

    filtros.addEventListener("click", e => {
      const b = e.target.closest(".filtro");
      if (!b) return;
      cat = b.dataset.cat;
      history.replaceState(null, "", cat === "todas" ? "loja.html" : `loja.html?cat=${cat}`);
      desenha();
    });
    ordenar.addEventListener("change", () => { ordem = ordenar.value; desenha(); });

    /* links do menu trocam o filtro sem recarregar */
    $$("#menu a").forEach(a => {
      const m = a.getAttribute("href").match(/^loja\.html\?cat=([\w-]+)/);
      if (!m) return;
      a.addEventListener("click", e => {
        e.preventDefault();
        cat = m[1];
        history.replaceState(null, "", `loja.html?cat=${cat}`);
        desenha();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    desenha();
  }

  /* ---------- sacola (salva no navegador) ---------- */
  const CHAVE = "lr-sacola-v1";
  let sacola = [];
  try { sacola = JSON.parse(localStorage.getItem(CHAVE)) || []; } catch (e) { sacola = []; }
  sacola = sacola.filter(i => porId[i.id]);
  const salva = () => { try { localStorage.setItem(CHAVE, JSON.stringify(sacola)); } catch (e) { /* modo privado */ } };

  const sacolaEl = $("#sacola");
  const itensEl = $("[data-sacola-itens]"), vaziaEl = $("[data-sacola-vazia]"), fimEl = $("[data-sacola-fim]");

  function contaSacola(pulo) {
    const n = sacola.reduce((s, i) => s + i.qtd, 0);
    $$("[data-sacola-qtd]").forEach(el => {
      el.textContent = n;
      el.hidden = n === 0;
      if (pulo) { el.classList.remove("pulo"); void el.offsetWidth; el.classList.add("pulo"); }
    });
  }

  function desenhaSacola() {
    vaziaEl.hidden = sacola.length > 0;
    fimEl.hidden = sacola.length === 0;
    itensEl.innerHTML = sacola.map((i, idx) => {
      const p = porId[i.id];
      const img = p.fotos.length ? `<img src="${foto(p.fotos[0], true)}" alt="">` : joiaVazia();
      return `<li class="sacola-item">
        ${img}
        <div>
          <p class="si-nome">${esc(p.nome)}</p>
          <p class="si-det">${i.tam ? `Tamanho ${esc(i.tam)} · ` : ""}${preco(p.preco)}</p>
          <div class="qtd" aria-label="Quantidade">
            <button data-menos="${idx}" aria-label="Diminuir">−</button><span>${i.qtd}</span><button data-mais="${idx}" aria-label="Aumentar">+</button>
          </div>
        </div>
        <button class="si-remover" data-remover="${idx}">Remover</button>
      </li>`;
    }).join("");
    contaSacola();
  }

  let focoSacola = null;
  function abreSacola() {
    focoSacola = document.activeElement;
    if (toastEl) toastEl.classList.remove("visivel");
    desenhaSacola();
    sacolaEl.hidden = false;
    document.body.style.overflow = "hidden";
    $(".sacola-topo .fechar", sacolaEl).focus();
  }
  function fechaSacola() {
    sacolaEl.hidden = true; document.body.style.overflow = "";
    if (focoSacola && document.contains(focoSacola)) focoSacola.focus();
  }

  document.addEventListener("click", e => {
    if (e.target.closest("[data-abrir-sacola]")) abreSacola();
    if (e.target.closest("[data-fechar-sacola]")) fechaSacola();
    const menos = e.target.closest("[data-menos]"), mais = e.target.closest("[data-mais]"), rem = e.target.closest("[data-remover]");
    if (mais) sacola[+mais.dataset.mais].qtd++;
    if (menos) { const i = sacola[+menos.dataset.menos]; i.qtd--; if (i.qtd < 1) sacola.splice(+menos.dataset.menos, 1); }
    if (rem) sacola.splice(+rem.dataset.remover, 1);
    if (mais || menos || rem) { salva(); desenhaSacola(); }
  });

  function adiciona(id, tam) {
    const ex = sacola.find(i => i.id === id && i.tam === tam);
    if (ex) ex.qtd++; else sacola.push({ id, tam, qtd: 1 });
    salva();
    contaSacola(true);
  }

  $("[data-enviar-pedido]").addEventListener("click", () => {
    if (!sacola.length) return;
    const linhas = sacola.map(i => {
      const p = porId[i.id];
      return `• ${i.qtd}x ${p.nome}${i.tam ? ` (tam. ${i.tam})` : ""}: ${preco(p.preco)}`;
    });
    const msg = `Olá, Luiza Rabelo! Montei minha sacola pelo site:\n\n${linhas.join("\n")}\n\nPodem confirmar disponibilidade, valores e frete?`;
    window.open(linkWhats(msg), "_blank", "noopener");
  });

  /* ---------- modal de produto ---------- */
  const modal = $("#modalProduto");
  let atual = null, tamEscolhido = null, ultimoFoco = null;

  function abreProduto(id) {
    const p = porId[id];
    if (!p) return;
    atual = p; tamEscolhido = null; ultimoFoco = document.activeElement;
    $("[data-mp-fotos]", modal).innerHTML = p.fotos.length
      ? p.fotos.map((f, i) => `<img src="${foto(f)}" alt="${esc(p.nome)}${i ? `, foto ${i + 1}` : ""}">`).join("")
      : joiaVazia("Fotos pelo WhatsApp");
    $("[data-mp-cat]", modal).textContent = nomeCat(p.categoria);
    $("[data-mp-nome]", modal).textContent = p.nome;
    $("[data-mp-preco]", modal).textContent = preco(p.preco);
    $("[data-mp-desc]", modal).textContent = p.descricao;
    const box = $("[data-mp-tamanhos]", modal);
    box.hidden = !p.tamanhos.length;
    $("[data-mp-lista]", modal).innerHTML = p.tamanhos
      .map(t => `<button class="tamanho" data-tam="${t}" aria-pressed="false">${t}</button>`).join("");
    $("[data-mp-erro]", modal).hidden = true;
    $("[data-mp-whats]", modal).href = linkWhats(`Olá! Tenho interesse em "${p.nome}". Pode me passar mais detalhes?`);
    $("[data-mp-whats]", modal).target = "_blank";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".fechar", modal).focus();
  }
  function fechaProduto() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (ultimoFoco) ultimoFoco.focus();
  }

  document.addEventListener("click", e => {
    const ab = e.target.closest("[data-abrir]");
    if (ab) { abreProduto(ab.dataset.abrir); return; }
    if (e.target.closest("[data-fechar]")) fechaProduto();
    const t = e.target.closest("[data-tam]");
    if (t) {
      tamEscolhido = t.dataset.tam;
      $$("[data-tam]", modal).forEach(b => b.setAttribute("aria-pressed", b === t));
      $("[data-mp-erro]", modal).hidden = true;
    }
  });

  $("[data-mp-add]", modal).addEventListener("click", () => {
    if (atual.tamanhos.length && !tamEscolhido) {
      $("[data-mp-erro]", modal).hidden = false;
      return;
    }
    adiciona(atual.id, tamEscolhido);
    fechaProduto();
    toast(`${atual.nome} foi para a sacola`);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Tab") {
      const alvo = !modal.hidden ? $(".modal-caixa", modal) : !sacolaEl.hidden ? $(".sacola-painel", sacolaEl) : null;
      if (!alvo) return;
      const foc = $$("button, a[href], select, [tabindex]:not([tabindex='-1'])", alvo).filter(el => !el.closest("[hidden]") && !el.disabled);
      if (!foc.length) return;
      const pri = foc[0], ult = foc[foc.length - 1];
      if (!alvo.contains(document.activeElement)) { e.preventDefault(); pri.focus(); }
      else if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
      else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
      return;
    }
    if (e.key !== "Escape") return;
    if (!modal.hidden) fechaProduto();
    else if (!sacolaEl.hidden) fechaSacola();
  });

  /* ---------- loja aberta agora? (horário de Brasília) ---------- */
  const status = $("[data-status-loja]");
  if (status) {
    try {
      const partes = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "short", hour: "numeric", hour12: false })
        .formatToParts(new Date());
      const dia = partes.find(p => p.type === "weekday").value.replace(".", "");
      const h = +partes.find(p => p.type === "hour").value;
      const util = ["seg", "ter", "qua", "qui", "sex"].includes(dia);
      const aberta = (util && h >= 9 && h < 18) || (dia === "sáb" && h >= 9 && h < 14);
      status.textContent = aberta ? "Aberta agora" : "Fechada agora · responderemos no próximo horário";
    } catch (e) { /* sem Intl: não mostra */ }
  }

  /* ---------- revelar ao rolar ---------- */
  if ("IntersectionObserver" in window) {
    const alvos = $$(".categoria, .historia-foto, .historia-txt, .historia-desenho, .loja-cartao, .insta-grade a, [data-grade='novidades'] .produto");
    const io = new IntersectionObserver(ents => ents.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visto"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    alvos.forEach((el, i) => { el.classList.add("revelar"); el.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(el); });
  }

  contaSacola();
})();
