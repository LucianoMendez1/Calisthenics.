class Contacto {
    constructor(nombre, correo, mensaje) {

        this.nombre = nombre.toUpperCase();
        this.correo = correo;
        this.mensaje = mensaje;
    }
}

let nombreApellido;
let correoElectronico;
let mensaje;
let contactoDeUsuario;

const expresiones = {
    nombreApellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
    correoElectronico: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    mensaje: /^[a-zA-ZÀ-ÿ\s]{1,500}$/,
}

const campos = {
    nombreApellido: false,
    correoElectronico: false,
    mensaje: false,
}




const enviarContacto = () => {
    nombreApellido = $("#nombreApellido").val();
    correoElectronico = $("#correoElectronico").val();
    mensaje = $("#comentarios").val();

    if (nombreApellido !== " " && correoElectronico !== " " && mensaje !== " ") {

        contactoDeUsuario = new Contacto(nombreApellido, correoElectronico, mensaje);

        localStorage.setItem(`datos-${correoElectronico}`, JSON.stringify(contactoDeUsuario));
        let boton = $("#button-contact")[0];


        setTimeout(() => {
            $("#button-contact").hide();
            $(".spinner").show();
            setTimeout(() => {
                $(".spinner").hide();
                $("#button-contact").show()
                    .css({ "background-color": "green" })
                boton.value = "Enviado!";
               
                setTimeout(() => {
                  
                }, 500);
            }, 400);
        }, 300);
       
    } 
}

