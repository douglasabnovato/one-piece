/**
 * PROJETO ONE PIECE WIKI - main.js
 * Foco: Manipulação de DOM, Fetch API e UX Moderno
 * Business Unit: ByteClass (learnTECH)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar funções
  carregarPersonagens();
  gerenciarHeader();
  configurarFormulario();
});

/* ============================================================
   1. CARREGAMENTO DE PERSONAGENS (FETCH LOCAL/API)
   ============================================================ */
async function carregarPersonagens() {
  const container = document.getElementById("container-personagens");

  try {
    // Simulando delay de rede para mostrar efeito de loading (opcional)
    // await new Promise(res => setTimeout(res, 800));

    const response = await fetch("./personagens.json");

    if (!response.ok) throw new Error("Erro ao carregar dados locais");

    const personagens = await response.json();
    renderizarCards(personagens);
  } catch (error) {
    console.error("Erro:", error);
    container.innerHTML = `
            <p class="erro">Não foi possível carregar os piratas. 
            Verifique o arquivo personagens.json.</p>
        `;
  }
}

function renderizarCards(lista) {
  const container = document.getElementById("container-personagens");

  // Limpa o parágrafo de "Carregando..."
  container.innerHTML = "";

  lista.forEach((p, index) => {
    const card = document.createElement("article");
    card.classList.add("card-pirata");

    // Adicionando delay dinâmico para animação Stagger no CSS
    card.style.animationDelay = `${(index + 1) * 0.1}s`;

    card.innerHTML = `
            <div class="card-imagem">
                <img src="src/imagens/${p.imagem}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/350x450?text=Pirata'">
            </div>
            <div class="card-info">
                <h3>${p.nome}</h3>
                <span class="alcunha">${p.alcunha}</span>
                <p>${p.descricao}</p>
                <div class="recompensa">${p.recompensa}</div>
            </div>
        `;

    container.appendChild(card);
  });
}

/* ============================================================
   2. UX: GERENCIAMENTO DO HEADER (SCROLL)
   ============================================================ */
function gerenciarHeader() {
  const header = document.querySelector(".main-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.padding = "0.5rem 5%";
      header.style.background = "rgba(10, 10, 10, 0.98)";
    } else {
      header.style.padding = "1rem 5%";
      header.style.background = "rgba(10, 10, 10, 0.95)";
    }
  });
}

/* ============================================================
   3. FORMULÁRIO: ENVIO E VALIDAÇÃO
   ============================================================ */
function configurarFormulario() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Captura de dados
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData);

    // Simulação de envio para o dono do site
    console.log(
      "%c Envio de Mensagem One Piece ",
      "background: #ff4500; color: white; padding: 5px;",
    );
    console.table(dados);

    // Feedback visual para o aluno/usuário
    const botao = form.querySelector("button");
    const textoOriginal = botao.innerHTML;

    botao.innerHTML = "Enviado com Sucesso! ⚓";
    botao.style.background = "#28a745";
    form.reset();

    setTimeout(() => {
      botao.innerHTML = textoOriginal;
      botao.style.background = "";
    }, 3000);
  });
}

/* ============================================================
   4. EFEITO DE REVELAÇÃO (INTERSECTION OBSERVER)
   ============================================================ */
// Faz a seção de história aparecer suavemente quando entra na tela
const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

const historySection = document.querySelector(".history-container");
if (historySection) {
  historySection.style.opacity = "0";
  historySection.style.transform = "translateY(50px)";
  historySection.style.transition = "all 1s ease-out";
  observer.observe(historySection);
}
