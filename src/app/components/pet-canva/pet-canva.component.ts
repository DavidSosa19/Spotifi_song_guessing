import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pet-canva',
  templateUrl: './pet-canva.component.html',
  styleUrl: './pet-canva.component.css'
})
export class PetCanvaComponent implements OnChanges{

  @Output() onArtistSet:EventEmitter<string> = new EventEmitter();
  @Output() onStateChange:EventEmitter<String> = new EventEmitter();
  @Input() target_song:any;
  @Input() guess!:Map<String,boolean>;

  sprite_url!:string;         
  artist!: string;
  clues!: string[];
  guess_map!: Map<String,boolean>;
  track_name!: String;

  constructor(){
    this.sprite_url = "/assets/images/backgrounds/bear.gif";
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['target_song']?.currentValue){
      var new_song = changes['target_song'].currentValue;
      this.track_name = new_song.name;
      this.clues = [
        "You have 3 guesses and can ask for 3 hints",
        `First hint<br>Release date: ${new_song.album.release_date}`,
        `Second hint<br>Album name: ${new_song.album.name}`,
        `Third hint<br>Starts with: ${new_song.name[0]}`
      ]
    }
    if(changes['guess']?.currentValue){
      this.guess_map = changes['guess'].currentValue;
    }
  }

  setArtist(artist:string){
    this.onArtistSet.emit(artist);
  }

  changeState(state:String){
    this.onStateChange.emit(state)
  }

  changeSprite(new_sprite:string){
    this.sprite_url = new_sprite;
  }
}
