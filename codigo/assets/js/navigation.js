document.addEventListener('DOMContentLoaded', () => {
	buildNavbarWithItems([
		{ 
			icon: '<i class="fa fa-laptop-medical"></i>', 
			name: "Home", 
			onclick: () => goTo("home.html")
		},
		{ 
			icon: '<i class="fa fa-vial"></i>', 
			name: "Exames", 
			onclick: () => goTo(`exames.html`)
		},
		{ 
			icon: '<i class="fa fa-pills"></i>', 
			name: "Medicamentos", 
			onclick: () => goTo("medicamentos.html")
		},
		{ 
			icon: '<i class="fa fa-syringe"></i>', 
			name: "Vacinas", 
			onclick: () => goTo(`vacinas.html`)
		},
		{ 
			icon: '<i class="fa fas fa-book-medical"></i>', 
			name: "Doencas", 
			onclick: () => goTo(`doencasCronicas.html`)
		},
		{ 
			icon: '<i class="fa fa-solid fa-hospital"></i>', 
			name: "Postos", 
			onclick: () => goTo(`postos.html`)
		},
		{ 
			icon: '<i class="fa fa-clinic-medical"></i>', 
			name: "Farmacias", 
			onclick: () => goTo(`farmacias.html`)
		},
		
		
	])
});

function buildNavbarWithItems(items){
	var navbar = createNavbar();
	for(var item of items){
		navbar.appendChild(createItem(item))
	}

	buildLogoutButton(navbar);
}

function buildLoginButton(navbar){
	var loginTestItem = createItem({ 
		icon: '<i class="fa fa-sign-in-alt"></i>', 
		name: "Login", 
		onclick: () => { setCurrentUser({ name: "higor", cpf: "123123123-02" }); }
	})
	navbar.appendChild(loginTestItem);
}

function buildLogoutButton(navbar){
	
	var logoutItem = createItem({ 
		icon: '<i class="fa fa-sign-out-alt"></i>', 
		name: "Logout", 
		onclick: () => { 
			logout();
			window.location.href = "login.html"
		}
	})

	logoutItem.classList.add("last-item");
	navbar.appendChild(logoutItem);
}

function goTo(url){
	window.location.href = url+window.location.search;
}

function createNavbar(){
	var navbar = document.getElementById('navbar');
	navbar.classList.add("navbar");
	return navbar;
}

function createItem(item){
	var navbarItem = document.createElement("button");
	navbarItem.classList.add("navbar-item");
	navbarItem.onclick = item.onclick;
	navbarItem.innerHTML += item.icon;
	navbarItem.title = item.name;

	return navbarItem;
}
