document.addEventListener('DOMContentLoaded', () => 
{
	if(!getCurrentUser() && !window.location.pathname.includes("login.html"))
		window.location.href = "login.html"

	if(getCurrentUser() && window.location.pathname.includes("login.html"))
		window.location.href = "home.html"
});

async function login(email, password){
	fetch(`https://banco-de-dados.prizinhaw.repl.co/pacientes`)
		.then(c => c.json())
		.then((data) => {
			const user = data.find(c => c.email === email && c.senha === password);

			if(user){
				setCurrentUser(user);
				window.location.href = "home.html"
			} else { 
				alert("Usuário ou senha inválidos, tente novamente")
			}
		})
}

function logout(){ 
	localStorage.clear(); 
}

function setCurrentUser(user){ localStorage.setItem("user", JSON.stringify(user)); }
function getCurrentUser(){ return JSON.parse(localStorage.getItem("user")) }


const usuarios = []
