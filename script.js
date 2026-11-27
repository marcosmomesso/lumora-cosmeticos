// ===== Menu do celular =====
const botaoMenu = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');

botaoMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
});
menu.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', false);
  })
);

// ===== Filtro por tipo de pele =====
const botoesFiltro = document.querySelectorAll('.filtro__btn');
const linhas = document.querySelectorAll('[data-linha]');
const avisoVazio = document.querySelector('.filtro__vazio');

botoesFiltro.forEach((botao) =>
  botao.addEventListener('click', () => {
    const pele = botao.dataset.pele;
    botoesFiltro.forEach((b) => b.classList.toggle('ativo', b === botao));

    let totalVisivel = 0;
    linhas.forEach((linha) => {
      let visiveisNaLinha = 0;
      linha.querySelectorAll('.produto').forEach((produto) => {
        const mostra = pele === 'todos' || produto.dataset.pele === pele;
        produto.hidden = !mostra;
        if (mostra) {
          visiveisNaLinha++;
          produto.classList.add('visivel');
        }
      });
      linha.hidden = visiveisNaLinha === 0; // esconde a linha inteira se ficar vazia
      totalVisivel += visiveisNaLinha;
    });
    avisoVazio.hidden = totalVisivel > 0;
  })
);

// ===== Animação de entrada ao rolar =====
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visivel');
          observador.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.revelar').forEach((el) => observador.observe(el));
} else {
  document.documentElement.classList.add('sem-js');
}
