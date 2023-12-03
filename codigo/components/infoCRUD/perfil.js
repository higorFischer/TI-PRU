document.addEventListener('load', carregarDados, false);

	let urgentButton = document.getElementById("urgentButton");
	if(urgentButton){
		urgentButton.addEventListener("click", () => {
			let id = new URLSearchParams(window.location.search).get("id");
			var path = window.location.pathname.split("/");
			window.location.href = path[path.length - 1] = "urgencia.html"; 
		})
	}

	console.log("urgencia")

	let nomePrinc = document.querySelector('#nomePrinc') ?? { innerHTML: ""};
	let endPrinc = document.querySelector('#endPrinc') ?? { innerHTML: ""} 
	let nome = document.querySelector('#nome') ?? { innerHTML: ""};
	let dataNasc = document.querySelector('#dataNasc') ?? { innerHTML: ""};
	let endereco = document.querySelector('#endereco') ?? { innerHTML: ""};
	let sexo = document.querySelector('#sexo') ?? { innerHTML: ""};
	let sangue = document.querySelector('#sangue') ?? { innerHTML: ""};
	let etnia = document.querySelector('#etnia') ?? { innerHTML: ""};
	let estadoC = document.querySelector('#estadoC') ?? { innerHTML: ""};
	let alt = document.querySelector('#alt') ?? { innerHTML: ""};
	let peso = document.querySelector('#peso') ?? { innerHTML: ""};
	let alergia = document.querySelector('#alergia') ?? { innerHTML: ""};
	let remedio = document.querySelector('#remedio') ?? { innerHTML: ""};
	let vacina = document.querySelector('#vacina') ?? { innerHTML: ""};
	let historico = document.querySelector('#historico') ?? { innerHTML: ""};
	let exame = document.querySelector('#exame') ?? { innerHTML: ""};
	let descricaoExame = document.querySelector('#descricaoExame') ?? { innerHTML: ""};
	let cirurgia = document.querySelector('#cirurgia') ?? { innerHTML: ""};
	let descricaoCirurgia = document.querySelector('#descricaoCirurgia') ?? { innerHTML: ""};
	let internacao = document.querySelector('#internacao') ?? { innerHTML: ""};
	let descricaoInternacao = document.querySelector('#descricaoInternacao') ?? { innerHTML: ""};
	carregarDados();

	function carregarDados() {
		let id = getCurrentUser().id

		fetch(`https://banco-de-dados.prizinhaw.repl.co/pacientes/${id}`) 
		.then(function (response) { return response.json() })
		.then(function(db) {
			nomePrinc.innerHTML = db.nome;
			endPrinc.innerHTML = db.endereco;
			nome.innerHTML = db.nome;
			dataNasc.innerHTML = db.dataNascimento;
			endereco.innerHTML = db.endereco;
			sexo.innerHTML = db.sexo;
			sangue.innerHTML = db.tipoSanguineo;
			etnia.innerHTML = db.etnia;
			estadoC.innerHTML = db.estadoCivil;
			alt.innerHTML = db.altura;
			peso.innerHTML = db.peso;
			alergia.innerHTML = db.alergias;
			remedio.innerHTML = db.medicamentosEmUso;
			vacina.innerHTML = db.vacinasRecebidas;
			historico.innerHTML = db.historicoDeDoencas;
			exame.innerHTML = db.exame; 
			descricaoExame.innerHTML = db.descricaoExame; 
			cirurgia.innerHTML = db.cirurgia; 
			descricaoCirurgia.innerHTML = db.descricaoCirurgia; 
			internacao.innerHTML = db.internacao;
			descricaoInternacao.innerHTML = db.descricaoInternacao;
		})


	async function carregarRemedios(){
		var resultado = await fetch("https://banco-de-dados.prizinhaw.repl.co/medicamentos");
		var object = await resultado.json();
		return object.reduce((a,b) => { 
			return { ...a, [b.id]: b }
		}, {})
	}

	async function carregarVacinas(){
		var resultado = await fetch("https://banco-de-dados.prizinhaw.repl.co/vacinas");
		var object = await resultado.json();
		return object.reduce((a,b) => { 
			return { ...a, [b.id]: b }
		}, {})
	}

	async function carregarExames(){
		var resultado = await fetch("https://banco-de-dados.prizinhaw.repl.co/exames");
		var object = await resultado.json();
		return object.reduce((a,b) => { 
			return { ...a, [b.id]: b }
		}, {})
	}

	async function carregarExamesPaciente(){
		var base = await carregarExames();

		var resultado = await fetch("https://banco-de-dados.prizinhaw.repl.co/examesPaciente");
		var object = await resultado.json();
		var array=  object.filter(c => +c.paciente == +getCurrentUser().id).map((c) =>{
			return { ...c, exame: base[c.exame] }
		})
		return array.length < 5 ? array : array.slice(Math.max(array.length - 5, 1));
	}

	async function carregarRemediosPaciente(){
		var base = await carregarRemedios();

		var resultado = await fetch("https://banco-de-dados.prizinhaw.repl.co/medicamentoPaciente");
		var object = await resultado.json();
		var array=  object.filter(c => +c.paciente == +getCurrentUser().id).map((c) =>{
			return { ...c, medicamento: base[c.medicamento] }
		})
		return array.length < 4 ? array : array.slice(Math.max(array.length - 4, 1));
	}

	async function carregarVacinasPaciente(){
		var base = await carregarVacinas();

		var resultado = await fetch("https://banco-de-dados.prizinhaw.repl.co/vacinaPaciente");
		var object = await resultado.json();
		var array=  object.filter(c => +c.paciente == +getCurrentUser().id).map((c) =>{
			return { ...c, vacina: base[c.vacina] }
		})
		return array.length < 4 ? array : array.slice(Math.max(array.length - 4, 1));
	}

	async function montarExames(){
		var exames = await carregarExamesPaciente();
		var container = document.getElementById("exam-container");

		container.innerHTML = "";
		for(var exam of exames){
			var c = createExamContainer(exam.exame.nome, exam.valor, exam.exame.unidade, exam.exame.referenciaMax, exam.exame.referenciaMin);
			container.innerHTML += c;
		}
	}

	async function montarMedicamentos(){
		var exames = await carregarRemediosPaciente();
		var container = document.getElementById("medicines-container");

		container.innerHTML = "";
		for(var exam of exames){
			var c = createList(exam.medicamento.nome, exam.dosagem, exam.medicamento.unidade);
			container.innerHTML += c;
		}
	}

	async function montarVacinas(){
		var exames = await carregarVacinasPaciente();
		var container = document.getElementById("vaccines-container");
		var list = document.createElement("ul");

		container.innerHTML = "";
		for(var exam of exames){
			var listItem = document.createElement("li");
			listItem.innerHTML = `${exam.vacina.nome}`;
			list.appendChild(listItem);
		}
		container.appendChild(list);
	}

	

	function createList(nome, value, unidade){
		return `<div class=" text-center p-2 m-2" style="border-radius: 8px; box-shadow: 1px 1px 3px 1px rgba(0,0,0,.2);width: 50%;">
			<div>
				<p class="mb-0" style="font-weight: bold;color: rgba(0,0,0, .5);font-size: .77rem;">${nome}</p>
				<p style="font-size: .85rem; flex: 0 0 30%;">${value} ${unidade}</p>
			</div>
		</div>
		`
	}

	function createExamContainer(nome, value, unidade, min = 0, max = 100){
		return `<div class="d-flex justify-content-between align-items-center mb-1">
			<div style="width: 30%">
				<p class="mb-0" style="font-weight: bold;color: rgba(0,0,0, .5);font-size: .77rem;">${nome}</p>
				<p style="font-size: .85rem; flex: 0 0 30%;">${value} ${unidade}</p>
			</div>
			<div style="width: 70%" class="d-flex justify-content-between align-items-end ">
				<div class="progress rounded w-100" style="height: 5px">
					<div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="${value}" aria-valuemin="${min}" aria-valuemax="${max}}"></div>
				</div>
			</div>
		</div>
		`
	}
	
	montarExames();
	montarMedicamentos();
	montarVacinas();
}
