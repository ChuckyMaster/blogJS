import "./assets/styles/style.scss";
import "./index.scss";

const articleContainerElement = document.querySelector("articles-container");

/******************
 * Fonction qui prend en parametre la liste des artcicles
 * ************************* */

const createArticles = (articles) => {
  // fonction map qui itère sur tout les éléments du tableaux
  //  applique la fonction callback qu'on passe en paramètre qui retourne elle - même une valeur
  const articlesDOM = articles.map((article) => {
    const articleDom = document.createElement("div");
    articleDom.classList.add("article");
    articleDom.innerHTML = `
            <img
            src="${article.img}"
            alt="profile"
          />
          <h2> ${article.title}</h2>
          <p class="article-author"> ${article.author} - ${article.category}  </p>
          <p class="article-content">
           ${article.content}
          </p>

          <div class="article-actions">
            <button class="btn btn-danger" data-id=${article._id} > Supprimer </button>
        
          </div>
            
            
            `;
    return articleDom;
  });

  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);

  console.log(articlesDOM);
};

const fetchArticle = async () => {
  try {
    const response = await fetch("http://restapi.fr/api/article");
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    const articles = await response.json();
    console.log(articles);
    createArticles(articles);
  } catch (e) {
    console.log("e: ", e);
  }
};

fetchArticle();
