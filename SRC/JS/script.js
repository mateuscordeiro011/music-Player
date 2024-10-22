const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name')
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat')
const songTime = document.getElementById('song-time')
const totalTime = document.getElementById('total-time')


const Tchelo = {
    songName : 'INTRO',
    artist : 'Tchelo Rodrigues, Retroboy',
    file : 'tchelo',
    liked: false
}; 

const centopeiaHumana = {
    songName : 'Centopeia Humana',
    artist : 'Big Rush',
    file : 'centopeia_humana',
    liked: false
};

const deathBattle = {
    songName : 'Death Battle',
    artist : 'Miguel Angeles',
    file : 'death_battle',
    liked: false
}; 

const euLembro = {
    songName : 'Eu Lembro',
    artist : 'Brocasito',
    file : 'eu_lembro',
    liked: false
}; 

const exitPlan = {
    songName : 'Exit Plan',
    artist : 'My Head is Empty',
    file : 'exit_plan',
    liked: false
}; 

const iDontCare = {
    songName : 'I Don\'t care',
    artist : 'Violent Vira',
    file : 'i_dont_care',
    liked: false
}; 

const notAllowed = {
    songName : 'Not Allowed',
    artist : 'Tv Girl',
    file : 'not_allowed',
    liked: false
}; 

const returnToZero = {
    songName : 'Return to Zero Baztebya',
    artist : 'Marc Acardipane, Dayerteq',
    file : 'return_to_zero_baztebya',
    liked: false
}; 

const superficial = {
    songName : 'Superficial',
    artist : 'Aklipe44',
    file : 'superficial',
    liked: false
}; 

const bitchILoveDrugs = {
    songName : 'bitch i love drugs fuck ronald reagan',
    artist : 'Salvinorir-A',
    file : 'bitch_i_love_drugs_fuck_ronald_reagan',
    liked: false
};


let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const playlist = JSON.parse(localStorage.getItem('playlist')) ?? [Tchelo,
    centopeiaHumana,
    deathBattle,
    euLembro,
    exitPlan,
    iDontCare,
    notAllowed,
    returnToZero,
    superficial,
    bitchILoveDrugs];
let playlistShuffled = [...playlist];  
let  index = 0;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play(); 
    isPlaying = true;   
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();  
    isPlaying = false;  
}

function playPauseDecider() {
    if(isPlaying === true){
        pauseSong();
    }else {
        playSong();
    }
}

function likeButtonRender(){
    if(playlistShuffled[index].liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }else{
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function previousSong(){
    if(index === 0){
    index = playlistShuffled.length;
    }else {
        index -= 1;
    }
    iniciarMusica();
    playSong()
}

function nextSong(){
    if(index === playlistShuffled.length - 1){
    index = 0;
    }else {
        index += 1;
    }
    iniciarMusica();
    playSong()
}


function iniciarMusica() {
    cover.src = `SRC/IMG/${playlistShuffled[index].file}.png`;
    song.src = `SRC/AUDIO/${playlistShuffled[index].file}.mp3`;
    songName.innerText = playlistShuffled[index].songName;
    bandName.innerText = playlistShuffled[index].artist;
    likeButtonRender();
}

function atualizarProgress(){
    const larguraBarra = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${larguraBarra}%`);

    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event){
    const width = progressContainer.clientWidth
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;
}


function shuffleArray(preShuffleArray){
    const size = playlistShuffled.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()*size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

 
function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(playlistShuffled); 
        shuffleButton.classList.add('button-active')
    }
    else {
        isShuffled = false;
        playlistShuffled = [...playlist]
        shuffleButton.classList.remove('button-active')
    }
}

function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active')
    }
    else{
        repeatOn = false;
        repeatButton.classList.remove('button-active')
    }
}

function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }
    else{
        playSong();
    }
}

function toHHMMSS( originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime(){
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked(){
    if(playlistShuffled[index].liked === false){
        playlistShuffled[index].liked = true;
    }else {
        playlistShuffled[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(playlist))
}

iniciarMusica();

play.addEventListener('click', playPauseDecider );
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', atualizarProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime)
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked)
repeatButton.addEventListener('click', repeatButtonClicked)
likeButton.addEventListener('click', likeButtonClicked)

