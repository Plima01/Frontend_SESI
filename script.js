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

        btn.disale = true;
        btn.innerText = "processando...";

        const nome = inputNome.value.trin();
        const idade = parseInt(inputIdade.value);
        const valor = parseFloat(inputValor.value);
        const cupom = inputCupom.value === "true";


        // Verifica se os elementos existem no DOM
        if (!msg || !lista || !relatorio) {
            alert("Erro: elementos de saída não encontrados.");
            return;
        }
        // Validação para campos vazios
        if (!nome || isNaN(idade) || isNaN(valor)) {
            msg.innerText = "preencha todos os campos corretamente!";
            msg.style.color = "#ff4444";
            return;
        }

        // Regra de negócio
        if (idade >= 16) {
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#00ff88";

            // Desconto
            let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

            // Estoque
            let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
            lista.innerHTML = ""; // Limpa a lista anterior

            estoque.forEach(item => {
                const li = document.createElement("li");
                li.innerText = `item ${item} reservado`;
                lista.appendChild(li);
            });
            relatorio.style.display = "block";
            relatorio.innerHTML = `
            <strong>Relatório de Venda:</strong><br>
            Cliente: ${nome}<br>
            total original: R$ ${valor.toFixed(2)}<br>
            <strong>Valor final: R$ ${valorFinal.toFixed(2)}<strong>
        `;
        } else {
            msg.innerText = `Venda não autorizada: ${nome} (idade insuficiente)`;
            msg.style.color = "#ff4444";
            lista.innerHTML = "";
            relatorio.style.display = "none";
        }
    } catch (error) {

    }
}
