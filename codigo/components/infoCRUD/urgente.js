window.addEventListener('load', carregarDados, false);

let normalButton = document.getElementById("normalButton");
normalButton.addEventListener("click", () => {
  let id = new URLSearchParams(window.location.search).get("id");
  var path = window.location.pathname.split("/");
  window.location.href = path[path.length - 1] = "inicial.html?id="+id; 
})

let nomePrinc = document.querySelector('#nomePrinc');
let endPrinc = document.querySelector('#endPrinc');
let endereco2 = document.querySelector('#endereco2');
let sangue2 = document.querySelector('#sangue2');
let peso2 = document.querySelector('#peso2');
let alergia2 = document.querySelector('#alergia2');
let remedio2 = document.querySelector('#remedio2');
let historico2 = document.querySelector('#historico2');


function carregarDados() {
  let id = new URLSearchParams(window.location.search).get("id");

  console.log(getCurrentUser())

	fetch(`https://banco-de-dados.prizinhaw.repl.co/pacientes/${id}`) 
		.then(function (response) { return response.json() })
		.then(function(db) {
      nomePrinc.innerHTML = db.nome;
      endPrinc.innerHTML = db.endereco;
      endereco2.innerHTML = db.endereco;
      sangue2.innerHTML = db.tipoSanguineo;
      peso2.innerHTML = db.peso;
      alergia2.innerHTML = db.alergias;
      remedio2.innerHTML = db.medicamentosEmUso;
      historico2.innerHTML = db.historicoDeDoencas;
	})
}
