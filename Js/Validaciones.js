export function valida(input){
    const tipoDeInput = input.dataset.tipo // con data set objenemos la coleccion de todos los datas y el .tipo hace referencia al data-tipo de html 
    if(validadores [tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = " ";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

    const tipoDeErrores = [
        "valueMissing",
        "typeMismatch",
        "patternMismatch",
        "customError",
    ]

    const mensajeDeError = {
        nombre : {
            valueMissing: "El campo nombre no puede quedar vacio ",
            
        },

        email:{
            valueMissing: "El campo correo no puede quedar vacio",
            typeMismatch: "El correo no es valido",
        },

        password:{
            valueMissing: "El campo contraseña no puede quedar vacio ",
            patternMismatch:"Debe contener, entre 6 y 12 caracteres, letra mayuscula y minuscula, un numero y no puede contener caracteres especiales."
        },
        
        nacimiento:{
            valueMissing: "El campo nacimiento no puede quedar vacio ",
            customError: "Debes tener al menos 18 años de edad",
        },
        numero:{
            valueMissing: "Este campo no puede estar vacio",
            patternMismatch: " El formato requerido es xxx-xxx-xxxx",
        },
        direccion:{
            valueMissing:"este campo no puede quedar vacio",
            patternMismatch:"La direccion debe contener entre 10 a 40 caracteres",
        },
        ciudad:{
            valueMissing:"este campo no puede quedar vacio",
            patternMismatch:"La ciudad debe contener entre 10 a 40 caracteres",
        },
        estado:{
            valueMissing:"este campo no puede quedar vacio",
            patternMismatch:"El estado debe contener entre 10 a 40 caracteres",
        }
    }
}
const validadores = {
    nacimiento : input => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    })  

    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = " ";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return(diferenciaFechas <= fechaActual);
}