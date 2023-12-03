document.addEventListener("DOMContentLoaded", function() {
  let jsonUrl = 'https://jsonserver.iurisaad.repl.co';

  // Verifica se o elemento com ID "usuario" existe no DOM
  const elemento = document.getElementById("usuarios");
  console.log(elemento)
  // Verifica se o elemento foi encontrado
  if (elemento) {
    // O elemento existe, agora podemos manipulá-lo
    window.addEventListener('load', carregarUsuarios, false);

    let btnCadastrar = document.getElementById('btnCadastrar');
    btnCadastrar.addEventListener('click', criarUsuario, false);

    function carregarUsuarios() {
      fetch(`${jsonUrl}/usuarios`)
        .then(function (response) { return response.json() })
        .then(function(db) {
          let textoHTML = '';

          for (i=0; i < db.length; i++) {
            let usuario = db[i];
            textoHTML +=
            `	<li>
                ${usuario.nome} - ${usuario.idade} anos <a href=""><span>Excluir</span></a>
                <br>
                ${usuario.sexo}
              </li>`;
          }

          // Define o conteúdo no elemento "usuario"
          elemento.innerHTML = textoHTML;
        });
    }

    function criarUsuario() {
      usuario = {
        'nome':document.getElementById("nome").value,
        'idade':document.getElementById("idade").value,
        'sexo':document.getElementById("sexo").value,
        'raça':document.getElementById("raca").value,
        'gestante':document.getElementById("gestante").value,
        'email':document.getElementById("email").value
      };
     
      fetch(`${jsonUrl}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      })
      
        .then(function (response) { return response.json() })
        .then(data => { appendSubmittedFact(data) } )
      };
}});