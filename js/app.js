//Variables documento
//Inputs
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

//Variables
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
};

//Clases
class Citas{
    constructor(){
        this.citas = [];
    };

    agregarCita(cita){
        this.citas = [...this.citas, cita];

    };
};

class UI{

    imprimirAlerta(mensaje, tipo){

        //Crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        //Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else{
            divMensaje.classList.add('alert-success');
        };

        //Agregar mensaje al div
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    };

    imprimirCitas({citas}){

        this.limpiarHTML();
        
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-tittle', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span>  ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span>  ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span>  ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span>  ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span>  ${sintomas}
            `;

            //Agregar los parrafos al Divcita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        });
    };

    //Limpiar HTML
    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        };
    };
};

//Instanciar clases
const ui = new UI();
const administrarCitas = new Citas();

//eventListeners
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
};

//Funciones
//Agrega datos al objeto
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
};

//Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();

    //Extraer informacion del obj de citas
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    };

    //Generar un ID unico
    citaObj.id = Date.now();

    //Creando una nueva cita
    administrarCitas.agregarCita({...citaObj});

    //Reiniciar obj
    reiniciarObjeto();

    //Reiniciar formulario
    formulario.reset();

    //Mostrar HTML de las citas
    ui.imprimirCitas(administrarCitas);
};

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
};