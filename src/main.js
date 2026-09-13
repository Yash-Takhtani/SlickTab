const API_key = import.meta.env.VITE_APOD_API;

const app = document.querySelector("#app");
const body = document.querySelector("body");
let selectedSearchURL = "https://www.google.com/search?q=" 

let searchbtn;
// &date=2026-9-10
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_key}`)
.then(response => response.json())
.then( data => {   
    let content;
    if (data.media_type == "image"){
        content = `<img src=${data.url} id="apod"></img>`;
    }else if (data.media_type == "video"){
        content = `<video src=${data.url} id="apod" autoplay muted loop playsinline></video>`;
        
    }else{
        content = `<iframe src=${data.url} id="apod"></iframe>`;
    }
    app.innerHTML += `
    ${content}
    <h1 id="img_h1">${data.title}</h1>
    <p id="explanation">${data.explanation}</p>`;
    console.log(data);
})
.then(() => {
app.innerHTML += `
    <div id="search">
        <label for="searchengines"><img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.google.com&size=64" id="favicon"></label>
        <select id="searchengines" name="searchengines">
        <option value="google">Google</option>
        <option value="brave">Brave</option>
        <option value="chatgpt">Chat GPT</option>
        <option value="claude">Claude</option>
        </select>
        <input autocomplete="off" type="text" id="searchinp" placeholder="Search ..."></input>
        <button id="searchbutton"><img id="searchimage" src="https://www.pixsector.com/cache/e7836840/av6584c34aabb39f00a10.png"></img></button>
        </div>
        `
        searchbtn = document.querySelector("#searchbutton");
        searchbtn.addEventListener('click', () => {
        console.log('Button was pressed!');
        let inp = (document.querySelector("#searchinp").value.trim())
        if (inp){
            let query = encodeURIComponent(inp);
            window.location.href = selectedSearchURL + query; 
        }
        })
})
.catch(err => {
    document.querySelector("#app").innerHTML += `<p>Error: ${err.message}</p>`;
});



app.addEventListener("change", function(event) {
    if (event.target && event.target.id === "searchengines") {
        console.log(event.target.value);
        if (event.target.value == "google"){
            document.querySelector("#favicon").src = "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.google.com&size=64";
            selectedSearchURL = "https://www.google.com/search?q=";
        }else if (event.target.value == "brave"){
            document.querySelector("#favicon").src = "https://www.google.com/s2/favicons?domain=search.brave.com&sz=64";
            selectedSearchURL = "https://search.brave.com/search?q=";
        }else if (event.target.value == "chatgpt"){
            document.querySelector("#favicon").src = "https://www.google.com/s2/favicons?domain=chatgpt.com&sz=64";
            selectedSearchURL = "https://chatgpt.com/?q=";
        }else if (event.target.value == "claude"){
            document.querySelector("#favicon").src = "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://claude.ai&size=64";
            selectedSearchURL = "https://claude.ai/?q=";
        };
    }
});
