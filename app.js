const API_KEY = "41eb66da9fa64cf2bd5563ee78f39ee7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => {
    fetchNews("India");
})
function reload() {
    window.location.reload();
}
async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await response.json();
    // console.log(data);
    bindData(data.articles);
}
function bindData(articles) {
    const mainContainer = document.getElementById('main-container');
    // console.log(mainContainer);
    const template = document.getElementById("template-card");
    // console.log(template);

    mainContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = template.content.cloneNode(true);
        fillDataCard(cardClone, article);
        mainContainer.appendChild(cardClone);
    });
}
function fillDataCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#card-img");
    const newstitle = cardClone.querySelector("#card-title");
    const newsSource = cardClone.querySelector("#card-source");
    const newsdescription = cardClone.querySelector("#card-description");
    //  console.log(newsImg);
    const date = new Date(article.publishedAt).toDateString();
    // console.log(date);

    newsImg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdescription.innerHTML = article.description;
    newsSource.innerHTML = `${article.source.name} > ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })

}
let currentLink = null;
function navbarLink(id) {
    fetchNews(id);
    const navLink = document.getElementById(id);
    currentLink?.classList.remove('active');
    currentLink = navLink;
    currentLink.classList.add('active');
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if (!query) return;
    fetchNews(query);
    currentLink?.classList.remove('active');
    currentLink = null;
})

searchInput.addEventListener('keypress', (event) => {
    const query = searchInput.value;
    if (!query) return;
    if (event.key === 'Enter') {
        fetchNews(query);
    }
    currentLink?.classList.remove('active');
    currentLink = null;
})