document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("enviarForm")
    .addEventListener("click", function (e) {
      e.preventDefault();
      var usuarioIngresado = document.getElementById("user").value;
      var passwordIngresado = document.getElementById("password").value;

      peticionAPI(usuarioIngresado, passwordIngresado);
    });
});

function peticionAPI(user, password) {
  //Peticion a la API
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((respuesta) => respuesta.json())
    .then((info) => {
      const userSearch = info.find((usuario) => usuario.email === user);
      const mensajeDiv = document.getElementById('mensaje')

      mensajeDiv.innerHTML = "";

      if (userSearch) {
        console.log(
          "Latitud para el usuario",
          userSearch.address.geo.lat
        );
        if (userSearch.address.geo.lat === password) {
          setTimeout(() => {
            window.location.href = "http://localhost:8080/APP/form.html"
          }, 1500);
        } else {
          mensajeDiv.classList.remove('ocultar')
          mensajeDiv.classList.add('mensaje')
          mensajeDiv.innerHTML = "Contraseña Incorrecta"
          setTimeout(() => {
          mensajeDiv.classList.add('ocultar')
        }, 2000);
        }
      } else {
        mensajeDiv.classList.remove('ocultar')
        mensajeDiv.classList.add('mensaje')
        mensajeDiv.innerHTML = "Usuario no encontrado"
        setTimeout(() => {
          mensajeDiv.classList.add('ocultar')
        }, 2000);
      }
    });
}