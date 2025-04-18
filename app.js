
async function searchLyrics() {
    const searchBox = document.getElementById("search-box2").value;
    const list = document.getElementById("single-result2");
    const url = `https://api.lyrics.ovh/suggest/${searchBox}`;
    const response = await fetch(url);

    var data = await response.json();

    displaySongs(data.data);
}

const displaySongs = songs=>{
    const songContainer = document.getElementById("song-container");

    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML =`
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick ="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>        
        `
        songContainer.appendChild(songDiv);
    });
    
}

 const getLyrics= async(artist,title)=>{
    const lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const response = await fetch(lyricsUrl);
        const data = await response.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError('Sorry,I can not find the lyrics.Please try again later!');
    }
}
const displayLyrics = lyrics=>{
    const lyricsDiv = document.getElementById("song-div");
    lyricsDiv.innerHTML = lyrics;
}

const displayError = error=>{
    const errorMsg = document.getElementById("song-div");
    errorMsg.innerHTML = error;
}