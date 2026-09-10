    const API_key = import.meta.env.VITE_APOD_API;

    let app = document.querySelector("#app");
    let body = document.querySelector("body");

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_key}&date=2026-9-10`)
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
        <p id="explanation">${data.explanation}</p>
        <input type="text" id="searchinp" placeholder="Search ..."></input>
        `;
        // console.log(data);
    }).catch(err => {
        document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
    });