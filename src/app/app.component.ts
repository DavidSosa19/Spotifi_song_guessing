import { Component } from '@angular/core';
import { SpotifyService } from "./services/spotify.service";
import { AuthService } from './services/auth.service';
import {Howl, Howler} from 'howler';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import leven from 'leven';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'spotifi';
  token!:any;
  isPlaying:boolean = false;
  isGameStarted:boolean = false;
  audio_link!:string;
  sound!: any;
  formApp!: UntypedFormGroup;
  current_volume!: number;
  artist_name!:string;
  artist!: any;
  artist_songs!:any[];
  target_song!:any;
  sound_effects!:any;
  sounds!:string[];
  wrong_guesses!: number;
  guess_map!: Map<String,boolean>;
  artist_input!: string;
  message_state!:String;

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
  ){
    
  }


  ngOnInit():void{
    this.initialize();
  }

  initialize(){
    this.authenticate();
    this.setVariables();
    this.sounds = [
      "/assets/music/clue.wav",
      "/assets/music/error.wav",
      "/assets/music/lose.wav",
      "/assets/music/right_guess.wav",
      "/assets/music/weirdahhguess.wav",
      "/assets/music/win.wav"
    ]
    this.guess_map = new Map([
      ['wrong',false],
      ['correct',false],
      ['wtf',false],
      ['won',false],
      ['lose',false]
    ])
  }

  setVariables(){
    this.wrong_guesses = 0;
  }

  authenticate(){
    this.authService.login().subscribe(
      (res)=>{
        this.token = res.body ? res.body : null;
        sessionStorage.setItem('token', JSON.stringify(this.token));
      }
    )
  }

  changeVolume(volume:number){
    if(this.sound){
      this.current_volume = volume/100;
      this.sound.volume(this.current_volume);
    }
  }

  sendInput(input:string){
    this.artist_input = input;
  }

  onMessageStateChange(state:String){
    this.message_state = state;
  }

  setArtist(artist_name:any){
    this.artist_name = artist_name.name;
    this.message_state = 'tracks';
    this.getArtistSongs();
    var token = sessionStorage.getItem('token');
    if(token){
    this.spotifyService.getArtist(`${artist_name}`,JSON.parse(token).access_token).subscribe(
      res=>{
        this.artist = res.body.tracks.items[0].artists[0].name
      }
    )
    }
  }

  getArtistSongs(){
    var token = sessionStorage.getItem('token');
    if(token){
      this.spotifyService.getItems(`${this.artist_name}`,JSON.parse(token).access_token).subscribe(
        res=>{
          this.artist_songs = res.body.tracks.items;
          this.setRandomSong(this.artist_songs);
        }
      )
      }
  }

  setRandomSong(songs:any[]){
    var song_index = Math.floor(Math.random() * (songs.length - 1));
    this.target_song = songs[song_index];
    this.isGameStarted = true;
  }
 
  playSong(track:any){
    if(this.sound){
      Howler.stop();
    }
    setTimeout(
      ()=>{
        this.checkGuessing(track);
        if(track.preview_url){
          this.sound = new Howl({
            src: track.preview_url,
            autoplay: false,
            format: ['mp3'],
            loop: false,
            volume: this.current_volume,
            onend: function() {
            }
          });
          this.sound.play();
          this.isPlaying = true;
        }
      }
      , 1000)
    
    
  }

  checkGuessing(track:any){
    var right_guess:boolean = track.name == this.target_song.name;
    var similarity = leven(track.name,this.target_song.name);
    if(right_guess){
      this.playSoundEffect(this.sounds[3]);
      this.guess_map = new Map(this.guess_map.set('correct',true)) ;
    }else{
      if(similarity > 7){
        this.guess_map = new Map(this.guess_map.set('wtf',true)) ;
        this.playSoundEffect(this.sounds[4]);
      }else{
        this.guess_map = new Map(this.guess_map.set('wrong',true)) ;
        this.playSoundEffect(this.sounds[1]);
      }
      this.wrong_guesses = this.wrong_guesses+1;
      if(this.wrong_guesses>=3){
        this.guess_map = new Map(this.guess_map.set('lose',true)) ;
        setTimeout(()=> this.playSoundEffect(this.sounds[2]),1000);
      }
    }
  }

  playSoundEffect(effect:string){
    this.sound_effects = new Howl({
      src: effect,
      autoplay: false,
      format: ['mp3'],
      loop: false,
      volume: 15,
      onend: function() {
      }
    });
    this.sound_effects.play();
  }
}
