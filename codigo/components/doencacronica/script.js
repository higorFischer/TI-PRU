document.addEventListener('DOMContentLoaded', function () {
    const formDoenca = document.getElementById('formDoenca');
    const infoRegistradas = document.getElementById('infoRegistradas');
    const historicoConsultas = document.getElementById('historicoConsultas');

    // Função para adicionar informações registradas à tabela
    function adicionarInformacoes(info) {
        // Criar uma nova linha na tabela
        const table = document.querySelector('table');
        const newRow = table.insertRow(table.rows.length);

        // Preencher as células da nova linha com as informações
        const keys = ['doencacronica', 'datadiagnostico', 'medicamentos', 'ultimaconsulta', 'resumoconsulta', 'procedimentos', 'resultados'];
        keys.forEach((key, index) => {
            const cell = newRow.insertCell(index);
            cell.innerHTML = info[key];
        });

        // Adicionar um botão para excluir a entrada
        const deleteCell = newRow.insertCell(keys.length);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '❌ Excluir';
        deleteButton.addEventListener('click', function () {
            // Remove a linha da tabela e atualiza o localStorage
            table.deleteRow(newRow.rowIndex);
            informacoesRegistradas.splice(newRow.rowIndex - 1, 1);
            localStorage.setItem('informacoesRegistradas', JSON.stringify(informacoesRegistradas));
        });
        deleteCell.appendChild(deleteButton);
    }

    // Carregar e exibir informações armazenadas no localStorage ao carregar a página
    const informacoesArmazenadas = JSON.parse(localStorage.getItem('informacoesRegistradas')) || [];
    informacoesArmazenadas.forEach(info => {
        adicionarInformacoes(info);
    });

    // Event listener para o formulário de Doença Crônica
    formDoenca.addEventListener('submit', function (event) {
        event.preventDefault();
        const info = {};
        const inputs = formDoenca.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type === 'file') {
                info[input.name] = input.files[0];
            } else {
                info[input.name] = input.value;
            }
        });
        if (info['doencacronica']) {
            if (confirm("Possibilidade de aposentadoria. Deseja prosseguir?")) {
                adicionarInformacoes(info);
                // Adicionar informações ao localStorage após a exibição na tabela
                informacoesArmazenadas.push(info);
                localStorage.setItem('informacoesRegistradas', JSON.stringify(informacoesArmazenadas));
            }
        } else {
            alert("Informe o nome da doença crônica.");
        }
    });
});
