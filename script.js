const API_KEY="7b974877233e4d03ac8189912b3418d5";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("Inida"));

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data =  await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer=document.getElementById('card-container');
    const newsCardTemplate=document.getElementById("template-news-card");

    cardContainer.innerHTML="";

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone= newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    // const newsSource= cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

}