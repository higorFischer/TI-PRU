function procuraExame() {
    const nomeExame = document.getElementById('entrada').value.toLowerCase()
    fetch('dados.json')
        .then(response => response.json())
        .then(dados => {
            const verifica = dados.Exames.filter(exame => exame.nome.toLowerCase().includes(nomeExame))
            mostraTabela(verifica)
        })
}

function mostraTabela(dados) {
    const corpoTab = document.querySelector("table tbody");
    corpoTab.innerHTML = ""
    dados.forEach(valor => {
        const linha = corpoTab.insertRow();
        const nome = linha.insertCell(0)
        const data = linha.insertCell(1)
        const resultado = linha.insertCell(2)
        const retorno = linha.insertCell(3)
        nome.innerHTML = valor.nome
        data.innerHTML = valor.data
        resultado.innerHTML = valor.resultado
        retorno.innerHTML = valor.retorno
    });
}
