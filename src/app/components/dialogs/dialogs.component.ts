import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.css'
})
export class DialogsComponent implements OnChanges{

  @Output() onArtistSet:EventEmitter<string> = new EventEmitter();
  @Output() onStateChange:EventEmitter<String> = new EventEmitter();
  @Input() hints!:String[];
  @Input() guess!:Map<String,boolean>;
  @Input() track_name!: any;

  button_icons!: Map<String,String>;
  artist!: string;
  is_message_showing!:boolean;
  message!:String
  messages!:String[];
  current_message!: number;
  message_types!:String[];
  current_message_type!:String;
  current_hint!:number;
  contextual_messages!: String[];
  track!:string;

  constructor(){
    this.initialize();
  }

  initialize(){
    this.message_types = [
      "information",
      "hints",
      "artist_input",
      "reload_hints_input",
      "reload_game_input"
    ]
    this.button_icons = new Map([
      ['information','pi pi-arrow-right'],
      ['hints','pi pi-eye'],
      ['artist_input','pi pi-check'],
      ['reload_hints_input','pi pi-refresh'],
      ['reload_game_input','pi pi-replay'],
      ])
    this.messages = [
      "Hey!",
      "Haven't seen you in a while",
      "Wanna play again?",
      "Cool, remember",
      "You have to guess the song I'm thinking of.",
      "Which artist wanna try with?"
    ]
    this.contextual_messages = [
      "Wanna hear the hints again?",
      "Wanna play again?",
      "Correct!",
      "Try again!",
      "???????!!!",
      `You Lost :(<br>The song was: ${this.track}`

    ]
    this.current_message_type = this.message_types[0];
    this.message = this.messages[0];
    this.current_message = 0;
    this.is_message_showing = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['hints']?.currentValue){
      this.current_hint = 0;
      this.message = this.hints[this.current_hint]
      this.current_message_type = this.message_types[1];
      this.is_message_showing = true;
      this.contextual_messages[5] = `You Lost :(<br>The song was: ${this.track}`;
    }
    if(changes['message_type']?.currentValue){
      this.current_message_type = changes['message_type'].currentValue;
    }
    if (changes['track_name']?.currentValue) {
      this.track = changes['track_name']?.currentValue;
    }
    if(changes['guess']?.currentValue){
      this.checkGuessings();
    }
  }

  checkGuessings(){
    var previous_message = this.message;
    if(this.guess.get('wrong')){
      this.message = this.contextual_messages[3];
      if(this.guess.get('lose')){
        this.checkIfLost();
      }else{
        this.waitAndShowSomeMessage(previous_message,1000)
      }
    }else if (this.guess.get('correct')) {
      this.message = this.contextual_messages[2];
      this.checkIfPlayAgain()
    } else if(this.guess.get('wtf')){
      this.message = this.contextual_messages[4];
      if(this.guess.get('lose')){
        this.checkIfLost();
      }else{
        this.waitAndShowSomeMessage(previous_message,1000)
      }
    }
  }

  checkIfPlayAgain(){
    this.waitAndShowSomeMessage(this.contextual_messages[1],2000);
    this.current_message_type = this.message_types[4];
  }

  checkIfLost(){
    this.waitAndShowSomeMessage(this.contextual_messages[5],2000);
    this.waitAndShowSomeMessage(this.contextual_messages[1],4000);
    this.current_message_type = this.message_types[4];
  }

  waitAndShowSomeMessage(message:String,wait:number){
    setTimeout(()=>{this.message = message},wait);
  }

  doSomething(){
    switch(this.current_message_type){
      case 'information':
        this.switchMessage(this.current_message);
        break;
      case 'hints':
        this.showNextHint(this.current_hint);
        break;
      case 'artist_input':
        // this.setArtist();
        break; 
      case 'reload_hints_input':
        this.reloadHints();
        break;
      case 'reload_game_input':
        this.restartGame();
    }
  }

  restartGame(){
    this.emitState();
    this.current_message_type = this.message_types[0];
    this.current_message = 5;
    this.message = this.messages[5];
  }
  hideMessages(){
    this.message = " ";
    this.is_message_showing = false;
  }

  reloadHints(){
    this.message = this.hints[1];
    this.current_hint = 1;
    this.current_message_type = this.message_types[1];
  }

  showNextHint(current_hint:number){
    if (this.checkMessagesOverflow(this.hints,current_hint + 1)) {
      this.message = this.contextual_messages[0];
      this.current_message_type = this.message_types[3];
    }else{
      this.current_hint++;
      this.message = this.hints[this.current_hint]
    }
  }

  switchMessage(current_message:number){
    if (this.checkMessagesOverflow(this.messages,current_message + 1)) {
      this.message = " "
      this.is_message_showing = false;
      this.current_message_type = this.message_types[2];
    }else{
      this.current_message++;
      this.message = this.messages[this.current_message]
    }
  }
  
  setArtist(){
    this.onArtistSet.emit(this.artist);
  }

  checkMessagesOverflow(array:any[],position:number):boolean{
    return position>=array.length;
  }
  emitState(){
    this.onStateChange.emit(this.current_message_type);
  }
}
