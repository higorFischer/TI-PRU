// Armazena o conteúdo inicial da div
var conteudoInicial = document.getElementById('conteudoAtual').innerHTML;

// Carrega os exames do arquivo JSON e exibe somente os nomes
fetch('dados.json')
  .then(response => response.json())
  .then(exames => exibirNomesExames(exames.Exames))
  .catch(error => console.error('Erro ao carregar dados.json:', error));

// Exibe somente os nomes dos exames
function exibirNomesExames(exames) {
  var examesContainer = document.getElementById('exames-container');

  exames.forEach(exame => {
    var divExame = criarDivExame(exame.nome);

    // Adiciona evento de clique para mostrar informações completas do exame
    divExame.onclick = () => mostrarInformacaoCompletaPersonalizada(exame);

    examesContainer.appendChild(divExame);
  });
}

// Cria e retorna uma div com o nome do exame
function criarDivExame(nome) {
  var divExame = document.createElement('div');
  divExame.className = 'exame-nome';
  divExame.textContent = nome;
  return divExame;
}

// Mostra todas as informações do exame quando clicado
function mostrarInformacaoCompletaPersonalizada(exame) {
  // Limpa o conteúdo inicial
  document.getElementById('exames-container').innerHTML = '';

  // Adiciona o botão de adicionar informação ao exame específico
  adicionarBotaoAdicionarInformacao(exame);

  // Atualiza o conteúdo do exame na tela
  var novaInformacao = `<h3>${exame.nome}</h3><p><strong>Data:</strong> ${exame.data}</p><p><strong>Resultado:</strong> ${exame.resultado}</p><p><strong>Retorno:</strong> ${exame.retorno}</p>`;

  document.getElementById('conteudoAtual').innerHTML = novaInformacao;

  // Adiciona as informações adicionais à tela
  var informacoesContainer = document.getElementById('informacoes-adicionais');
  informacoesContainer.innerHTML = '';

  for (var dado in exame.informacoesAdicionais) {
    var informacao = document.createElement('p');
    informacao.textContent = dado + ': ' + exame.informacoesAdicionais[dado];
    informacoesContainer.appendChild(informacao);
  }
}

// Adiciona um botão de adicionar informação a um exame específico
function adicionarBotaoAdicionarInformacao(exame) {
  var botaoAdicionarInformacao = document.createElement('button');
  botaoAdicionarInformacao.textContent = 'Adicionar Informação';
  botaoAdicionarInformacao.onclick = () => exibirFormularioAdicionarInformacao(exame.nome);
  document.getElementById('conteudoAtual').appendChild(botaoAdicionarInformacao);
}

// Exibe um formulário para adicionar informações a um exame específico
function exibirFormularioAdicionarInformacao(nomeExame) {
  var formulario = document.createElement('div');
  formulario.innerHTML = `
    <label for="campoDado">Dado:</label>
    <input type="text" id="campoDado" placeholder="Digite o dado">

    <label for="campoValor">Valor:</label>
    <input type="text" id="campoValor" placeholder="Digite o valor">

    <button onclick="adicionarInformacao('${nomeExame}')">Adicionar</button>
  `;

  // Remove o botão de adicionar informação ao exame específico
  var botaoAdicionarInformacao = document.querySelector('.exame-nome button');
  if (botaoAdicionarInformacao) {
    botaoAdicionarInformacao.remove();
  }

  document.getElementById('conteudoAtual').appendChild(formulario);
}

// Adiciona informações ao exame específico
function adicionarInformacao(nomeExame) {
  var dado = document.getElementById('campoDado').value;
  var valor = document.getElementById('campoValor').value;

  // Encontra o exame específico no array de exames
  var exame = dados.Exames.find(exame => exame.nome === nomeExame);

  if (exame) {
    // Cria a propriedade 'informacoesAdicionais' se ainda não existir
    if (!exame.informacoesAdicionais) {
      exame.informacoesAdicionais = {};
    }

    // Adiciona o dado e valor ao exame
    exame.informacoesAdicionais[dado] = valor;

    // Atualiza as informações adicionais na tela
    mostrarInformacaoCompletaPersonalizada(exame);
    
    // Limpa os campos de entrada
    document.getElementById('campoDado').value = '';
    document.getElementById('campoValor').value = '';
  } else {
    console.error('Exame não encontrado');
  }
}

// Restaura a escolha e exibe somente os nomes dos exames
function restaurarEscolha() {
  document.getElementById('conteudoAtual').innerHTML = conteudoInicial;

  // Carrega os exames do arquivo JSON e exibe somente os nomes
  fetch('dados.json')
    .then(response => response.json())
    .then(exames => exibirNomesExames(exames.Exames))
    .catch(error => console.error('Erro ao carregar dados.json:', error));
}
