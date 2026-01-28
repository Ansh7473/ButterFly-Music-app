const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const trackName = document.querySelector('.track-name');
const trackArtist = document.querySelector('.track-artist');
const progressBar = document.querySelector('.progress-fill');
const progressContainer = document.querySelector('.progress-bar');
const volumeBar = document.querySelector('.volume-bar');
const albumArt = document.querySelector('.album-art'); // Select the Art Box

let songList = [];
let currentIndex = 0;

// 1. FETCH TRAVIS SCOTT SONGS
let currentTerm = "travis+scott";

async function getMusic(term = currentTerm) {
    // 1. Update the search term if provided
    currentTerm = term;
    
    // 2. Format the term for the URL (spaces become +)
    // "term" parameter must be URL-encoded
    const formattedTerm = term.replace(/\s+/g, '+');
    
    const url = `https://itunes.apple.com/search?term=${formattedTerm}&entity=song&limit=10`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results.length > 0) {
            // Mapping iTunes JSON response keys to our player format
            songList = data.results.map(song => ({
                name: song.trackName,
                artist_name: song.artistName,
                audio: song.previewUrl, // 30-second preview URL
                cover: song.artworkUrl100.replace('100x100', '600x600') // Get High Res Image
            }));

            console.log(`Playlist Loaded for: ${term}`);
            
            // Reset index and load the first new song
            currentIndex = 0;
            loadSong(currentIndex);
            
            // Optional: Update the "Hero" text to match the search
            document.querySelector('.hero-content h1').innerText = term.replace(/\+/g, ' ');
            document.querySelector('.hero-content .stats').innerText = "Top Results";
            
        } else {
            alert("No songs found! Try a different artist.");
        }
    } catch (error) {
        console.error("iTunes API failed:", error);
    }
}

// --- NEW SEARCH LISTENER ---
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keypress', (e) => {
    // Check if the user hit "Enter"
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            getMusic(query); // Call API with new name
            searchInput.blur(); // Remove focus (hide keyboard on mobile)
        }
    }
});
// 2. LOAD SONG (Now with Album Art & Defaults)
function loadSong(index) {
    const track = songList[index];
    
    // Update Text
    trackName.innerText = track.name;
    trackArtist.innerText = track.artist_name;
    
    // Update Audio
    audio.src = track.audio;
    
    // UPDATE ALBUM ART (This was missing!)
    if (track.cover) {
        albumArt.style.backgroundImage = `url(${track.cover})`;
        albumArt.style.backgroundSize = "cover";
        albumArt.style.backgroundPosition = "center";
    }

    // Force Buffer
    audio.preload = "auto"; 
    audio.load(); 
}

// 3. PLAY/PAUSE
playBtn.addEventListener('click', () => {
    if (!audio.src) return;
    if (audio.paused) {
        audio.play().catch(e => console.log("Buffering..."));
    } else {
        audio.pause();
    }
});

// --- ICON MANAGERS ---
audio.addEventListener('waiting', () => {
    playBtn.classList.remove('fa-circle-play', 'fa-circle-pause');
    playBtn.classList.add('fa-spinner', 'fa-spin');
});

audio.addEventListener('playing', () => {
    playBtn.classList.remove('fa-spinner', 'fa-spin', 'fa-circle-play');
    playBtn.classList.add('fa-circle-pause');
});

audio.addEventListener('pause', () => {
    playBtn.classList.remove('fa-spinner', 'fa-spin', 'fa-circle-pause');
    playBtn.classList.add('fa-circle-play');
});

// 4. NEXT / PREV
document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songList.length;
    loadSong(currentIndex);
    audio.play();
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songList.length) % songList.length;
    loadSong(currentIndex);
    audio.play();
});

// 5. PROGRESS BAR & TIME
audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
        
        // Update Time Text
        const currentMins = Math.floor(audio.currentTime / 60);
        const currentSecs = Math.floor(audio.currentTime % 60);
        const durationMins = Math.floor(audio.duration / 60);
        const durationSecs = Math.floor(audio.duration % 60);

        document.getElementById('current-time').innerText = 
            `${currentMins}:${currentSecs < 10 ? '0' : ''}${currentSecs}`;
            
        document.getElementById('duration').innerText = 
            `${durationMins}:${durationSecs < 10 ? '0' : ''}${durationSecs}`;
    }
});

// 6. SEEKING
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    if(audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
    }
});

// 7. VOLUME CONTROL (Fixed Visuals)
// Initialize Volume at 100%
// 7. VOLUME CONTROL (Updated)
// Set default volume to 100%
audio.volume = 1.0;

// Force the visual bar to be full width on load
const volumeFill = document.querySelector('.volume-fill');
if (volumeFill) volumeFill.style.width = "100%";

volumeBar.addEventListener('click', (e) => {
    // 1. Calculate the click position
    const width = volumeBar.clientWidth;
    const clickX = e.offsetX;
    let vol = clickX / width;

    // 2. Safety limits (cannot go below 0 or above 1)
    if (vol < 0) vol = 0;
    if (vol > 1) vol = 1;

    // 3. Update the Audio Logic
    audio.volume = vol;

    // 4. Update the Visual White Line
    // We re-select it here just to be safe
    document.querySelector('.volume-fill').style.width = `${vol * 100}%`;
    
    console.log(`Volume: ${Math.round(vol * 100)}%`);
});

getMusic();