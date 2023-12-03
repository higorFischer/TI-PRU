document.addEventListener('load', carregarDados, false);

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

	async function carregarDoencas(){
		var resultado = await fetch("https://banco-de-dados.prizinhaw.repl.co/doencasCronicas");
		var object = await resultado.json();
		return object.reduce((a,b) => { 
			return { ...a, [b.id]: b }
		}, {})
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

	
	async function carregarDoencasPaciente(){
		var base = await carregarDoencas();

		var resultado = await fetch("https://banco-de-dados.prizinhaw.repl.co/doencasCronicasPaciente");
		var object = await resultado.json();
		var array=  object.filter(c => +c.paciente == +getCurrentUser().id).map((c) =>{
			return { ...c, diagnostico: base[c.diagnostico] }
		})
		return array.length < 4 ? array : array.slice(Math.max(array.length - 4, 1));
	}


	async function montarDoencas(){
		var exames = await carregarDoencasPaciente();
		var container = document.getElementById("doencas");
		container.innerHTML = exames?.length
		console.log(exames)
		container.title = exames.map(e => e.diagnostico.nome)
	}

	async function montarMedicamentos(){
		var exames = await carregarRemediosPaciente();
		var container = document.getElementById("remedios");
		container.innerHTML = exames?.length
		container.title = exames.map(e => e.medicamento.nome)
	}

	async function montarDoencasCronicas(){
		var exames = await carregarVacinasPaciente();
		var container = document.getElementById("");
		container.innerHTML = exames?.length
		container.title = exames.map(e => e.medicamento.nome)
	}
	montarDoencas();
	montarMedicamentos();
	montarDoencasCronicas();
}
