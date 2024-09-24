import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrl: './music-details.component.css'
})
export class MusicDetailsComponent implements OnChanges{

  @Output() onTrackSelect: EventEmitter<string> = new EventEmitter();
  @Output() onVolumeChange: EventEmitter<number> = new EventEmitter();
  @Output() onArtistSelect: EventEmitter<string> = new EventEmitter();
  @Output() onChangeState: EventEmitter<string> = new EventEmitter();
  @Input() musicPlaying:boolean = false;
  @Input() isGameStarted:boolean = false;
  @Input() artist_input!:string;
  @Input() message_state!:String;

  selectedRow!:any;
  suggestions!:any[];
  track_icon!:string;
  show_searches!:boolean;
  current_volume!:number;
  searchType!:string;
  
  constructor(private spotifyService: SpotifyService){
    this.searchType = 'artists';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['artist_input']?.currentValue){
      this.search(changes['artist_input']?.currentValue);
    }
    if(changes['message_state']?.currentValue){
      if(changes['message_state']?.currentValue == 'tracks'){
        this.resetTableToTracks();
      }else if(changes['message_state']?.currentValue == 'reload_game_input'){
        this.resetTableToArtists();
      }
    }
  }

  getAlbumImage(album:any){
    return album.images[0].url;
  }

  resetTableToArtists(){
    this.searchType = 'artists';
    this.suggestions = [];
  }

  resetTableToTracks(){
    this.searchType = 'tracks';
    this.suggestions = [];
  }

  onRowSelect(){
    if(this.searchType == 'artists'){
      this.onArtistSelect.emit(this.selectedRow);
      this.resetTableToTracks();
    }else if(this.searchType == 'tracks'){
      this.onTrackSelect.emit(this.selectedRow);
    }
  }

  setVolume(){
    this.onVolumeChange.emit(this.current_volume);
  }

  search(sugestion:string){
    if(this.searchType == 'artists'){
      this.searchArtists(sugestion);
    }else if(this.searchType == 'tracks'){
      this.searchTracks(sugestion);
    }
  }

  searchArtists(sugestion:string){
    var token = sessionStorage.getItem('token');
    if(token){
      this.spotifyService.getArtists(`${sugestion}`,JSON.parse(token).access_token).subscribe(
        (res)=>{    
          this.suggestions = res.body.artists.items;
          this.show_searches = true;
        }
      )
    }
  }

  searchTracks(sugestion:string){
    var token = sessionStorage.getItem('token');
    if(token){
      this.spotifyService.getItems(`${sugestion}`,JSON.parse(token).access_token).subscribe(
        (res)=>{    
          this.suggestions = res.body.tracks.items;
          this.show_searches = true;
        }
      )
    }
  }
}
