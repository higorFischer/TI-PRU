btnCarregar = document.getElementById('btnEnviar')
btnCarregar.addEventListener('click', adicionarPaciente, false)

function adicionarPaciente(e) {
	e.preventDefault();
	var pessoa = {
		'email':document.getElementById("email").value,
		'senha':document.getElementById("senha").value,
		'nome':document.getElementById("nome").value,
		'dataNascimento':document.getElementById("data-nascimento").value,
		'endereco':document.getElementById("endereco").value,
		'sexo':document.getElementById("sexo").value,
		'tipoSanguineo':document.getElementById("tipo-sanguineo").value,
		'etnia': document.getElementById("etnia").value,
		'estadoCivil': document.getElementById("estadoC").value,
		'altura':document.getElementById("altura").value,
		'peso':document.getElementById("peso").value,
	}

	fetch('https://banco-de-dados.prizinhaw.repl.co/pacientes', { 
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(pessoa),
	})
		.then(function (response) { return response.json() })
		.then(data => { 
			console.log(window.location);
			var path = window.location.pathname.split("/");
			window.location.href = path[path.length - 1] = "inicial.html?id="+data.id;
		});
}
