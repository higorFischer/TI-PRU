let btnCadastrar = document.getElementById('btnCadastrar');
btnCadastrar.addEventListener('click', criarUsuario, false);

function criarUsuario() {
  usuario = {
    "nome":"Larissa",
    "idade":"18",
    "sexo":"Feminino",
    "raça":"Idigena",
    "comorbidade": [
      "nenhuma"
    ],
    "gestante":false,
    "e-mail":"larissa123@gmail.com",
    "vacinas":
    {
      "vacinasaplicadas": [
        {
          "nome":"Hepatite B",
          "vencimento":"24/12/2024"
        },
        {
          "nome":"Hepatite A",
          "vencimento":"24/11/2023"
        }
      ]
    }
  }
  fetch('https://jsonserver.iurisaad.repl.co/usuarios/', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuarios),
  })
    .then(function (response) { return response.json() })
    .then(data => { appendSubmittedFact(data) } )
}
