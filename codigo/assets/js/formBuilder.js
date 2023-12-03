function BuildForm({ tagID, formData }){
    var form = buildForm(formData);
 
    document
         .getElementById(tagID)
         .append(form);
}
 
function buildForm(inputs){    
     var form = document.createElement("form");
     
     for(var input of inputs)
         form.append(buildInput(input));
 
     var button = document.createElement("button");
     button.innerHTML = "Submit"
     button.onclick = (e) => {
         e.preventDefault();
         console.log("olá iuri");
     }
 
     form.append(button);
     return form;
 }
 
 
function buildInput(formInput){    
    var container = document.createElement("div");

    var label = document.createElement("label");
    label.htmlFor = formInput.id;
    label.innerHTML = formInput.label;

    var input = document.createElement("input");
    input.id = formInput.id;
    input.type = formInput.type;
    input.placeholder = formInput.placeholder;
    input.name = formInput.name;
    input.autocomplete = formInput.name;

    container.appendChild(label);
    container.appendChild(input);

    return container;
}