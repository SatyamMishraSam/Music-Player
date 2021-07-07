    const audio = document.querySelector("audio");
    const play = document.getElementById('play');
    const img = document.querySelector('img');
    const title = document.getElementById('title');
    const artist= document.getElementById('artist');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    let progress=document.getElementById('progress');

    let total_duration=document.getElementById('total');
    const current=document.getElementById('current');
    const progress_div=document.getElementById('progress_div');
    

   
    const songs = [
    {
      name:"Loot Liya",
      title:" Loot Liya",
      artist: " pata nahi"
    },
    {
      name:"ink",
      title:" Ink",
      artist: "karan aujla"
    },
    {
      name:"Talja",
      title:"Talja",
      artist: "Jassa Dhillon"
    },
]


    let isPlaying = false;

   const playMusic = ()=>{
       
        isPlaying = true; //make isPlaying to true , means start playing
        audio.play(); //start playing
        play.classList.replace('fa-play', 'fa-pause'); //change the logo to pause
        img.classList.add("anime"); //animation
        
    };


   const pauseMusic = ()=>{

        isPlaying = false; // make isPlaying as a false
        audio.pause(); //and pause the audio
        play.classList.replace('fa-pause','fa-play'); //change the logo to play
        img.classList.remove("anime"); //animation
        
    };

    play.addEventListener("click",()=>{
        isPlaying ? pauseMusic() :playMusic(); //when we click on play button then check these conditions.
    })

    const fetchSong = (songs)=>{
        title.textContent = songs.title;
        artist.textContent = songs.artist;
        audio.src = "music/" + songs.name + ".mp3";
        img.src = "images/" + songs.name + ".jpg";

    };

    // fetchSong(songs[0]);
    songIndex=0;

    const nextSong = () =>{
        songIndex = (songIndex+1) % songs.length;
        fetchSong(songs[songIndex]);
    }
    const prevSong = () =>{
        songIndex = (songIndex -1 + songs.length) %songs.length;
        fetchSong(songs[songIndex]);
    }

    // progress js

    audio.addEventListener('timeupdate',(event)=>{
        
        const {currentTime , duration}  = event.srcElement; //object destructring
        // console.log(currentTime); //this will console current time
        // console.log(duration); // this will console total duration
    
        let progress_time = (currentTime /duration )*100; // progress percentage
        progress.style.width = `${progress_time}%`

        // time update as increase
        let minutes =  Math.floor(duration / 60);
        let second = Math.floor(duration % 60);
        
        let tot_duration = `${minutes}:${second}`;
        if(duration){
        total_duration.textContent = `${tot_duration}`;
        }

        // current update as increase
        let minutes_current =  Math.floor(currentTime / 60);
        let second_current = Math.floor(currentTime % 60);
        
        if(second_current<10){
            second_current = `0${second_current}`
        }
        let tot_current = `${minutes_current}:${second_current}`;
      
        if(currentTime){
        current.textContent = `${tot_current}`;
        }

    })
    
    progress_div.addEventListener('click',(event)=>{

        const {duration} =audio;
        let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    // offsetX means total section and clientWIdth means where we clicked

        // console.log(duration)  total duration
        // console.log(move_progress);  //which time second we are clicking

        audio.currentTime = move_progress;
    })

    audio.addEventListener("ended",nextSong);


    next.addEventListener('click',nextSong);
    prev.addEventListener('click',prevSong);

    