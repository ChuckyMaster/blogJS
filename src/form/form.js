import "../assets/styles/style.scss";

import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
//tableau d'erreurs
let errors = [];

//recupérer l'even submit du formulaire
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const article = Object.fromEntries(formData.entries());

  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);

      //fetch

      //creation de collection api test
      const response = await fetch("http://restapi.fr/api/article", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.error("e: ", e);
    }
  }

  //retourne un element itérable ( quelque chose qu'on peut parcourir avec un for of)
  //const entries = formData.entries();

  //objet natif "Array" avec la methode from
  // const array = Array.from(entries);
  // console.log(array);

  //methode opti pour recuperer les input avec entries - methode formEntries
  //const obj = Object.fromEntries(entries);

  //transformer obj en format json
  //const json = JSON.stringify(obj);

  // **********************************************************************//

  //***Code Opti */
  const json = JSON.stringify(Object.fromEntries(formData.entries()));
  console.log(json);
});

//MESSAGE ERROR  / VERIF
const formIsValid = (article) => {
  if (!article.author || !article.category || !article.content) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
