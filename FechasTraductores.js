/**
 * Este archivo contiene métodos para transformar las fechas en formato YYYY-MM-DD y YYYY-MM-DD HH:MM:SS a formatos humanamente legibles.
 * Está construida como una colección de funciones para ser utilizada en ReactJS, debería funcionar en cualquier versión a partir de la 16, aunque debería poder 
 * ser útil incluso en versiones más antiguas.
 */

/**
 * Utilizando los métodos nativos de JavaScript para el control de fechas, se obtiene una cadena con la fecha en YYYY-MM-DD HH:MM:SS con la fecha y hora 
 * del momento del llamado.
 * @returns {string} La fecha actual en formato YYYY-MM-DD HH:MM:SS
 */
export const getDate = () => {
    let now = new Date();

    // Obtener los componentes de la fecha y hora
    let year = now.getFullYear();
    let month = ('0' + (now.getMonth() + 1)).slice(-2);
    let day = ('0' + now.getDate()).slice(-2);
    let hours = ('0' + now.getHours()).slice(-2);
    let minutes = ('0' + now.getMinutes()).slice(-2);
    let seconds = ('0' + now.getSeconds()).slice(-2);

    // Construir la cadena de fecha y hora en el formato deseado (YYYY-MM-DD HH:MM:SS)
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Recibe una caean de texto con la fecha en formato YYYY-MM-DD HH:MM:SS y la transforma en un formato con el nombre del mes y el día de la semana en formato corto de 3 letras cada uno.
 * Ejemcplo de salida: "Lun 15-Feb-2021". Recibe atributos opcionales para persnoalizar el mensaje de error y/o el separador de los componentes de la fecha.
 * @param {string} date Cadena de texto con la fecha en formato YYYY-MM-DD HH:MM:SS
 * @param {string | null} msj Atributo opcional, mensaje que se motrará en caso de que la cadena recibida no sea compatible con el formato esperado.
 * @param {boolean} conHora Atributo opcional, si es verdadero se incluirá la hora en el resultado, de lo contrario solo se mostrará la fecha.
 * @param {string | null} separador Atributo opcional, separador que se utilizará entre los componentes de la fecha.
 * @returns {string} La fecha en formato corto con el nombre del día de la semana y el mes en formato corto.
 */
export const fechaDiaCorto = (date, msj = "No disponible", conHora = false, separador = "-") => {
    if (!date || typeof date != 'string' || isNaN(Date.parse(date))) return msj;
    let now = new Date(date);
    let meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    let dias_semana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    // Obtener los componentes de la fecha y hora
    let year = now.getFullYear();
    let month = meses[now.getMonth()];
    let day = now.getDate();
    let dia_semana = dias_semana[now.getDay()];

    // Construir la cadena de fecha y hora en el formato deseado (lunes 15 de febrero)
    return `${dia_semana} ${day}${separador}${month}${separador}${year}${conHora ? ` ${soloHora(date)}` : ""}`;
}

/**
 * Recibe una fecha en formato YYYY-MM-DD HH:MM:SS y retorna solo la hora en formato de 12 horas, ejemplo de salida: "11:37 pm".
 * @param {string} date Cadena de texto con la fecha en formato YYYY-MM-DD HH:MM:SS
 * @param {string | null} msj Atributo opcional, mensaje que se motrará en caso de que la cadena recibida no sea compatible con el formato esperado.
 * @returns {string} La hora en formato de 12 horas.
 */
export const soloHora = (date, msj = "No disponible") => {
    if (!date || typeof date != 'string' || isNaN(Date.parse(date))) return msj;

    let hour = date.substring(11, 13);
    let meridiano = parseInt(hour) >= 12 ? "pm" : "am";
    hour = parseInt(hour) > 12 ? parseInt(hour) - 12 : hour;
    hour = +hour > 9 ? hour : `0${+hour}`;
    let minutes = date.substring(14, 16);
    minutes = minutes > 9 ? minutes : `0${minutes}`;

    return `${hour}:${minutes} ${meridiano}`;
}

/**
 * Recibe una fecha en formato YYYY-MM-DD HH:MM:SS y retorna solo la fecha en formato largo, ejemplo de salida: "Lunes 15/Febrero/2021".
 * @param {string} date Cadena de texto con la fecha en formato YYYY-MM-DD HH:MM:SS
 * @param {string | null} msj Atributo opcional, mensaje que se motrará en caso de que la cadena recibida no sea compatible con el formato esperado.
 * @param {boolean} conHora Atributo opcional, si es verdadero se incluirá la hora en el resultado, de lo contrario solo se mostrará la fecha.
 * @param {string | null} separador Atributo opcional, separador que se utilizará entre los componentes de la fecha.
 * @returns {string} La fecha en formato largo con el nombre del día de la semana y el mes en formato completo.
 */
export const fechaDiaLargo = (date, msj = "No disponible", conHora = false, separador = "/") => {
    if (!date || typeof date != 'string' || isNaN(Date.parse(date))) return msj;
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let dias_semana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    let fechaDate = new Date(date);
    let dia_semana = dias_semana[fechaDate.getDay()];
    let day = fechaDate.getDate();
    let month = meses[fechaDate.getMonth()];
    let year = fechaDate.getFullYear();

    return `${dia_semana} ${day}${separador}${month}${separador}${year}${conHora ? ` ${soloHora(date)}` : ""}`;
}

/**
 * Proporciona la fecha  con el nombre del mes en formato completo, ejemplo de salida: "15/Febrero/2021".
 * @param {string} date Cadea de texto con la fecha en formato YYYY-MM-DD HH:MM:SS
 * @param {string | null} msj cadena de texto que se mostrará en caso de que la fecha no sea válida
 * @param {boolean} conHora si es verdadero se incluirá la hora en el resultado, de lo contrario solo se mostrará la fecha
 * @param {string | null} separador cadena de texto que se utilizará para separar los componentes de la fecha
 * @returns cadena de texto con la fecha en formato largo con el nombre del mes en formato completo o el mensaje de error.
 */
export const soloFechaLargo = (date, msj = "No disponible", conHora = false, separador = "/") => {
    if (!date || typeof date != 'string' || isNaN(Date.parse(date))) return msj;
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let mont = parseInt(date.substring(5, 7));
    let year = date.substring(0, 4);
    let day = date.substring(8, 10);

    return `${day}${separador}${meses[mont - 1]}${separador}${year}${conHora ? ` ${soloHora(date)}` : ""}`;
}

/**
 * Proporciona la fecha  con el nombre del mes en formato corto de 3 letras, ejemplo de salida: "15/Feb/2021".
 * @param {string} date Cadea de texto con la fecha en formato YYYY-MM-DD HH:MM:SS
 * @param {string | null} msj cadena de texto que se mostrará en caso de que la fecha no sea válida
 * @param {boolean} conHora si es verdadero se incluirá la hora en el resultado, de lo contrario solo se mostrará la fecha
 * @param {string | null} separador cadena de texto que se utilizará para separar los componentes de la fecha
 * @returns cadena de texto con la fecha en formato largo con el nombre del mes en formato completo o el mensaje de error.
 */
export const soloFechacorto = (date, msj = "No disponible", conHora = false, separador = "/") => {
    if (!date || typeof date != 'string' || isNaN(Date.parse(date))) return msj;
    let meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    let mont = parseInt(date.substring(5, 7));
    let year = date.substring(0, 4);
    let day = date.substring(8, 10);

    return `${day}${separador}${meses[mont - 1]}${separador}${year}${conHora ? ` ${soloHora(date)}` : ""}`;
}

