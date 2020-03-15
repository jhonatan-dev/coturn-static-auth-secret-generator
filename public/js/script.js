"use strict";

const apiURL = "/credenciales";

const getFormInputsData = form => {
  var input = form.getElementsByTagName("input");
  var formData = {};
  for (let i = 0; i < Number(input.length); i++) {
    formData[input[i].name] = input[i].value;
  }
  return formData;
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", e => {
    form.querySelector("#success").innerHTML = "";
    e.preventDefault();
    e.stopPropagation();
  });

  $("#form")
    .parsley()
    .on("form:success", async e => {
      form.querySelector("#btnSubmit").disabled = true;

      try {
        const data = getFormInputsData(form);
        const res = await fetch(apiURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
          mode: "cors",
          cache: "default"
        });
        const response = await res.json();
        const divSuccess = document.createElement("div");
        divSuccess.className = "alert alert-success";
        divSuccess.innerHTML = `<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;  </button><p>Nombre de usuario: <b>${response.username}</b> <br> Contraseña: <b>${response.credential}</b> <br> <i>Nota: Expirará en ${data.time_limit} hora(s) a partir de ahora.</i> </p>`;
        form.querySelector("#success").appendChild(divSuccess);
      } catch (error) {
        console.error(error);
        const divError = document.createElement("div");
        divError.className = "alert alert-danger";
        divError.innerHTML = `<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <strong>Algo fue mal. Error: ${error}</strong>`;
        form.querySelector("#success").appendChild(divError);
      } finally {
        form.reset();
        $("#form")
          .parsley()
          .reset();
        setTimeout(() => {
          form.querySelector("#btnSubmit").disabled = false;
        }, 1000);
      }
    });
});
