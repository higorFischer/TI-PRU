document.addEventListener("DOMContentLoaded", function () {
	const examDetails = document.getElementById("exam-details");
	const addExamButton = document.getElementById("add-exam-button");

	carregarDados(); 
	
	var pesquisa = document.getElementById("pesquisa");
	pesquisa.oninput = _.debounce(() => {
		console.log(pesquisa.value)
		mostrarPedidos((exam) => {

			for(var prop in exam){
				console.log(exam[prop], pesquisa.value,(''+exam[prop]).includes(pesquisa.value));
				if((''+exam[prop]).includes(pesquisa.value))
					return true;
			}

			return false;
		})
	}, 500)

	async function carregarBase(){
		var resultado = await fetch("https://banco-de-dados.prizinhaw.repl.co/medicamentos");
		var object = await resultado.json();
		return object.reduce((a,b) => { 
			return { ...a, [b.id]: b }
		}, {})
	}



	// Função para carregar os dados a partir do LocalStorage ou do JSON
	function carregarDados() {
		mostrarPedidos((e) => true);
		fetch("https://banco-de-dados.prizinhaw.repl.co/medicamentos")
			.then((response) => response.json())
			.then((data) => {
				var c = document.getElementById("medicine-select");
				for(var exam of  data){
					var option = document.createElement("option");
					option.innerHTML = exam.nome;
					option.value = exam.id;
					c.appendChild(option)
				}

				dadosExames = { pedidos:data }; 
			})
			.catch((error) => { });
	}
	
	// Função para mostrar a lista de pedidos
	function mostrarPedidos(filtro) {
		
		fetch("https://banco-de-dados.prizinhaw.repl.co/medicamentoPaciente")
			.then((response) => response.json())
			.then(async (exames) => {
				var e = await carregarBase();
				examDetails.innerHTML = "";
				for(var exam of exames) 
				{
					if(exam && +exam.paciente == getCurrentUser().id && filtro(exam)) {
						const exameElement = document.createElement("div");
						exameElement.className = "exam-container";
						exameElement.innerHTML = `
							<p><strong>Medicamento:</strong> ${e[exam.medicamento].nome}</p>
							<p><strong>Data:</strong> ${exam.data}</p>
							<p><strong>Resultado:</strong> ${exam.dosagem}</p>
						`;
						examDetails.appendChild(exameElement);
					}
				}
			})
			.catch((error) => { });
	}


	// Função para adicionar um novo exame
	function adicionarExame() {
		const examID = document.getElementById("medicine-select").value;
		const examDate = document.getElementById("medicine-date").value;
		const examValue = document.getElementById("medicine-dosage").value;


		var examePaciente = {
			medicamento: +examID,
			paciente: +getCurrentUser().id,
			dosagem: +examValue,
			data: examDate
		}

		fetch("https://banco-de-dados.prizinhaw.repl.co/medicamentoPaciente", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(examePaciente)
		})
			.then((response) => response.json())
			.then((data) => {
				mostrarPedidos(c => true);
			})
			.catch((error) => {
			});


	}

	addExamButton.addEventListener("click", adicionarExame);
});


function uuidv4() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
	  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
  }