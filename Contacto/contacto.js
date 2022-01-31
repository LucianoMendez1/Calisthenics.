class Contacto {
    constructor(fullName, correo, mensaje){
       
        this.nombre = fullName.toUpperCase();
        this.correo = correo;
        this.mensaje = mensaje;
    }
}

let nombreApellido;
let correoElectronico;
let mensaje;
let contactoDeUsuario;

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    mensaje: /^[a-zA-ZÀ-ÿ\s]{1,500}$/,
}

const campos = {
	nombre: false,
	correo: false,
	mensaje:false,
}



const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
	
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "mensaje":
			validarCampo(expresiones.mensaje, e.target, 'mensaje');
		break;
	}
}

const enviarContacto = () => {
    nombreApellido = $("#nombreApellido")[0].value;
    correoElectronico = $("#correoElectronico")[0].value;
    mensaje = $("#comentarios")[0].value;
    
    if(nombreApellido !==" " && correoElectronico !== ""  && mensaje !== "") {
        
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
                  
                   alert("Comentario Enviado con exito");
                   
                }, 500);
            }, 400);
        }, 300);
    } else {
        alert("Error al enviar el comentario ");
        $("#button-contact").click(() => {
            $(".p-alert").fadeIn();
            setTimeout(() => {
                $(".p-alert").fadeOut();
            }, 100);
        })
    }
}
