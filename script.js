function executarSistema() {

    try {

        // Dados de entrada
        const inputNome = document.getElementById("inputNome");
        const inputIdade = document.getElementById("inputIdade");
        const inputValor = document.getElementById("inputValor");
        const inputCupom = document.getElementById("inputCupom");

        // Dados de saída
        const msg = document.getElementById("mensagem-autorizacao");
        const lista = document.getElementById("lista-estoque");
        const relatorio = document.getElementById("relatorio-final");

        const btn = document.getElementById("btnFinalizar");

        btn.disabled = true;
        btn.innerText = "Processando...";

        const nome = inputNome.value.trim();
        const idade = parseInt(inputIdade.value);
        const valor = parseFloat(inputValor.value);
        const cupom = inputCupom.value === "true";

        // Validação
        if (!nome || isNaN(idade) || isNaN(valor)) {
            msg.innerText = "Preencha todos os campos corretamente!";
            msg.style.color = "#ff4444";

            btn.disabled = false;
            btn.innerText = "Finalizar Venda";
            return;
        }

        // Regra de negócio
        if (idade >= 16) {

            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#00ff88";

            // Desconto
            let valorFinal = (valor > 500 || cupom)
                ? valor * 0.85
                : valor;

            // Estoque
            let estoque = [
                "Placa de Vídeo",
                "Processador",
                "Memória RAM"
            ];

            lista.innerHTML = "";

            estoque.forEach(item => {
                const li = document.createElement("li");
                li.innerText = `Item ${item} reservado.`;
                lista.appendChild(li);
            });

            // Relatório
            relatorio.style.display = "block";

            relatorio.innerHTML = `
                <strong>RESUMO DO PEDIDO</strong><br><br>

                Cliente: ${nome}<br>
                Idade: ${idade}<br>
                Total Original: R$ ${valor.toFixed(2)}<br>
                Cupom Aplicado: ${cupom ? "Sim" : "Não"}<br><br>

                <strong>
                    Total com Desconto: R$ ${valorFinal.toFixed(2)}
                </strong>
            `;

        } else {

            msg.innerText = "Venda bloqueada: Menor de 16 anos.";
            msg.style.color = "#ff4444";

            relatorio.style.display = "none";
            lista.innerHTML = "";
        }

    } catch (error) {

        console.error(error);

        document.getElementById("mensagem-autorizacao").innerText =
            "Ocorreu um erro ao processar a venda.";

    } finally {

        const btn = document.getElementById("btnFinalizar");

        btn.disabled = false;
        btn.innerText = "Finalizar Venda";
    }
}


// ALTERAR TEMA
function alterarTema() {

    document.body.classList.toggle("dark");

    const toggle = document.getElementById("tema-toggle");

    if (document.body.classList.contains("dark")) {
        toggle.checked = true;
    } else {
        toggle.checked = false;
    }
}


// Inicia em modo escuro
window.onload = () => {

    document.body.classList.add("dark");

    const toggle = document.getElementById("tema-toggle");

    if (toggle) {
        toggle.checked = true;
    }
};
let zoomAtual = 100;

function alterarZoom(valor) {
    zoomAtual += valor;
    document.body.style.zoom = zoomAtual + "%";
}