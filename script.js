const accesskey ="egEcWeB4rbi-Lt-iqxVChVx9YN3whHVPpzL-J1okM3E";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const spinner = document.getElementById("spinner");
 


let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    // Spinner ko dikhane se pehle
    spinner.style.display = "block";

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    const results = data.results;

    // Clear existing content before appending new results
    searchResult.innerHTML = "";
    searchResult.style.display = "none";



    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    // Delay ke liye setTimeout ka istemal karo
    setTimeout(() => {
        // Spinner ko chhupao
        spinner.style.display = "none";

        // Results ko dikhao
        showMoreBtn.style.display = "block";
        searchResult.style.display = "block";


    }, 1000); // Yahan 2000 milliseconds (2 seconds) ka delay hai, aap ise apne requirements ke mutabiq adjust kar sakte hain.
}





searchForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    page = 1;
    searchImage();
})
showMoreBtn.addEventListener("click", ()=>{
    page++
    searchImage();
})