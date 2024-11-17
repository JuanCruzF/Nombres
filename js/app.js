// seleccionamos todos los elementos que poseen la
// clase "formulario__input"
var inputs = document.getElementsByClassName("formulario__input");
// console.log(inputs);
//mostramos por consola el segundo elemento del array ;
// console.log(inputs[1]);

//recorremos el array de inputs con un for

for (let i = 0; i < inputs.length; i++) {
  //agregamos la "escucha" del evento Keyup ,que es
  //cuando termina de escribir
  function updateLabel() {
    if (this.value.length >= 1) {
      //chequeamos si el input contiene algun caracter escrito
      // seleccionamos el siguiente elemento y le agregamos la clase
      // "fijar" (esto es similar a lo que realizamos en el StyleSheet.css con el selector hermano "+")
      this.nextElementSibling.classList.add("fijar");
    } else {
      //en el caso de que no tenga escrito  o que
      //borremos lo que teniamos escrito en el
      //input removemos la clase fijar
      this.nextElementSibling.classList.remove("fijar");
    }
  }
  inputs[i].addEventListener("keyup", updateLabel);
  inputs[i].addEventListener("input", updateLabel);
  inputs[i].addEventListener("change", updateLabel);
}
