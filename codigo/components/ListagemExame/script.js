document.addEventListener("DOMContentLoaded", function () {
    const carregarDadosButton = document.getElementById("carregar-dados-button");
    const examsContainer = document.getElementById("exams-container");
    const examDetails = document.getElementById("exam-details");
    const addExamButton = document.getElementById("add-exam-button");

    let dadosExames = [];

    // Função para carregar os dados a partir do LocalStorage ou do JSON
    function carregarDados() {
        // Verifica se há dados no LocalStorage
        if (localStorage.getItem("dadosExames")) {
            dadosExames = JSON.parse(localStorage.getItem("dadosExames"));
        } else {
            // Se não houver dados no LocalStorage, carrega a partir do JSON de exemplo
            fetch("https://banco-de-dados.prizinhaw.repl.co/pedidos")
                .then((response) => response.json())
                .then((data) => {
                   console.log (data)
                    dadosExames = { pedidos:data}; 

                })
                .catch((error) => {
                    console.error("Erro ao carregar os dados: " + error);
                });
        }
        mostrarPedidos();
    }


    // Função para mostrar a lista de pedidos
    function mostrarPedidos() {
        examsContainer.innerHTML = "";
        examDetails.innerHTML = "";

        dadosExames.pedidos.forEach((pedido, index) => {
            const pedidoElement = document.createElement("div");
            pedidoElement.className = "pedido";
            pedidoElement.textContent = `Pedido ${pedido.numeroPedido}`;
            pedidoElement.addEventListener("click", () => {
                mostrarExames(pedido, index);
            });
            examsContainer.appendChild(pedidoElement);
        });
    }

    // Função para mostrar os detalhes de um pedido
    function mostrarExames(pedido, index) {
        examDetails.innerHTML = "";
        const pedidoTitle = document.createElement("h2");
        pedidoTitle.textContent = `Detalhes do Pedido ${pedido.numeroPedido}`;
        examDetails.appendChild(pedidoTitle);

        pedido.exames.forEach((exame) => {
            const exameElement = document.createElement("div");
            exameElement.className = "exame";
            exameElement.innerHTML = `
                <p><strong>Nome do Exame:</strong> ${exame.nome}</p>
                <p><strong>Data:</strong> ${exame.data}</p>
                <p><strong>Resultado:</strong> ${exame.resultado}</p>
                <p><strong>Valor de Referência:</strong> ${exame.referencia}</p>
            `;
            examDetails.appendChild(exameElement);
        });
    }

    // Função para adicionar um novo exame
    function adicionarExame() {
        const numeroPedido = document.getElementById("numero-pedido").value;
        const examName = document.getElementById("exam-name").value;
        const examDate = document.getElementById("exam-date").value;
        const examResult = document.getElementById("exam-result").value;
        const referenceValue = document.getElementById("reference-value").value;

        if (numeroPedido && examName && examDate && examResult && referenceValue) {
            const novoExame = {
                nome: examName,
                data: examDate,
                resultado: examResult,
                referencia: referenceValue,
            };

            // Verifica se o pedido já existe
            const pedidoExistente = dadosExames.pedidos.find((pedido) => pedido.numeroPedido === numeroPedido);

            if (pedidoExistente) {
                pedidoExistente.exames.push(novoExame);
            } else {
                const novoPedido = {
                    numeroPedido: numeroPedido,
                    exames: [novoExame],
                };
                dadosExames.pedidos.push(novoPedido);
            }

            // Requisição POST para enviar os dados para o banco de dados
            fetch('https://banco-de-dados.prizinhaw.repl.co/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosExames.pedidos),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Dados enviados com sucesso:', data);
                })
                .catch(error => {
                    console.error('Erro ao enviar os dados:', error);
                });

             // Atualiza o LocalStorage
             localStorage.setItem("dadosExames", JSON.stringify(dadosExames));


            // Limpa o formulário
            document.getElementById("numero-pedido").value = "";
            document.getElementById("exam-name").value = "";
            document.getElementById("exam-date").value = "";
            document.getElementById("exam-result").value = "";
            document.getElementById("reference-value").value = "";

            mostrarPedidos();
        }
    }

    carregarDadosButton.addEventListener("click", carregarDados);
    addExamButton.addEventListener("click", adicionarExame);

    carregarDados(); 
});
