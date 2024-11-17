document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("enviarForm")
      .addEventListener("click", function (e) {
        e.preventDefault();

        var usuarioIngresado = document.getElementById("user").value;
        var mensajeError = document.getElementById("mensaje");

        mensajeError.innerHTML = "";

        // Validación del formulario
        if (!usuarioIngresado.trim()) {
          mensajeError.classList.remove("ocultar");
          mensajeError.classList.add("mensaje");
          mensajeError.innerHTML = "El campo nombre no puede estar vacío.";
          setTimeout(() => {
            mensajeError.classList.add("ocultar");
          }, 2000);
          return; // Salimos de la función si la validación falla
        }

        if (!/^[a-zA-Z\s]+$/.test(usuarioIngresado)) {
          mensajeError.classList.remove("ocultar");
          mensajeError.classList.add("mensaje");
          mensajeError.innerHTML = "El nombre debe contener solo letras.";
          setTimeout(() => {
            mensajeError.classList.add("ocultar");
          }, 2000);
          return; // Salimos si la validación falla
        }

        peticionAPI(usuarioIngresado);
      });
  });

  function peticionAPI(user) {
    //Peticion a la API
    fetch(`https://api.genderize.io?name=${user}`)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        const dataName = document.getElementById("dataName")
        const dataProbability = document.getElementById("dataProbability");
        if (data.gender) {
          if (data.gender === "male") {
            data.gender = "Masculino";
          } else {
            data.gender = "Femenino";
          }
          dataName.classList.remove("ocultar")
          dataProbability.classList.remove("ocultar")
          dataName.innerHTML = `Nombre: ${user}. Genero: ${data.gender}`;
          dataProbability.innerHTML = `Probabilidad: ${data.probability}`;

        //   console.log(`Nombre: ${user}. Genero: ${data.gender}`);
        //   console.log(`Probabilidad: ${data.probability}`);
        } else {
          console.log("No se puede identificar con nada");
        }
      })
      .catch((error) => console.error("Error al obtener el género:", error));

    fetch(`https://api.nationalize.io/?name=${user}`)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        const dataCountry = document.getElementById("dataCountry");
        const lista = document.createElement("ul");
        dataCountry.innerHTML = "";
        data.country.forEach((country) => {
          const item = document.createElement("li");
          item.textContent = `Iniciales de país: ${country.country_id}. Probabilidad: ${country.probability}`;
          lista.appendChild(item);
        //   console.log(
        //     `Iniciales de país: ${country.country_id}. Probabilidad: ${country.probability}`
        //   );
        });
        dataCountry.appendChild(lista);
      });
  }