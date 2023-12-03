document.addEventListener("DOMContentLoaded", function() {
    var loginButton = document.getElementById("login");

    loginButton.onclick = (e) => {
        e.preventDefault();

        const auth = {}
        for(var item of e.target.form){
            if(item.name != '') auth[item.name] = item.value;
        }

        login(auth.email, auth.password);
    }
});
