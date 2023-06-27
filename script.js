const API_KEY="7b974877233e4d03ac8189912b3418d5";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    if (articles.length === 0) {
        const searchQuery = document.getElementById("search-text").value;
        const noResultMsg = document.createElement("h3");
        noResultMsg.innerHTML = `Sorry, there are no results for <u>${searchQuery}</u>`;
        
    
        const suggestionsMsg = document.createElement("p");
        suggestionsMsg.innerHTML = `<br><b>Suggestions:</b><br>
          - Make sure that all words are spelled correctly.<br>
          - Try different keywords.<br>
          - Try more general keywords.`;
    
        // Append both messages to a container element
        const messagesContainer = document.createElement("div");
        messagesContainer.appendChild(noResultMsg);
        messagesContainer.appendChild(suggestionsMsg);
    
        cardsContainer.appendChild(messagesContainer);
        return;
      }

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString( "en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML= `${article.source.name}• ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })

}

let currentSelectedNav =null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem= document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query = searchText.value.trim();
    if (!query) {
        alert("Please enter a search term.");
        return;
      }
    fetchNews(query);
    currentSelectedNav=null;
})


  