
// document.addEventListener("DOMContentLoaded", function() {
//     var formBuilder = require("../../assets/js/formBuilder.js")
//     var form = [
//             {
//                 id: "name",
//                 name: "name",
//                 label: "Nome do remedio",
//                 type: "text",
//                 placeholder: "Insira o Nome Completo"
//             },
//             {
//                 id: "name2",
//                 name: "name2",
//                 label: "Nome do remedio2",
//                 type: "text2",
//                 placeholder: "Insira o Nome Completo2"
//             }
//         ]
//     var tagID = "form";
//     console.log(formBuilder);
//     BuildForm({ tagID, formData: form });
// });  
document.addEventListener("DOMContentLoaded", function() {
    let jsonUrl = 'https://higorjsonserver.higorlopes.repl.co';
    
    let btnCadastrar = document.getElementById('btnCadastrar');
    btnCadastrar.addEventListener('click', criarRemedio, false);

    function criarRemedio() {
        var remedio = {
          'nome':document.getElementById("nome").value,
          'dosagem':document.getElementById("dosagem").value,
          'bula':document.getElementById("bula").value,
          'contraindicacoes':document.getElementById("contraindicacoes").value,
          'colaterais':document.getElementById("colaterais").value
        };
        
        fetch(`${jsonUrl}/remedio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(remedio),
        })
        
          .then(function (response) { return response.json() })
          .then(data => { appendSubmittedFact(data) } )
        };
});  