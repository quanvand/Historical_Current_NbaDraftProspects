import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for directives like *ngIf and *ngFor
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { PlayerFacade } from '../../facades/player.facade';
//import { GoogleSheetService } from '../../services/google-sheet.service';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../models/player.model';
import { SearchComponent } from '../search-player/search-player.component'; // Adjust the path as necessary
import { PlayerCardComponent } from '../player-card/player-card.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


//add Filters - for Fields and < > = 
//compare button give list of comparison
//click on player name -- shows top card give info
  //then shows top 5 offense
  //then show top 5 defense
  //then show tpo 5 overall
  //show diamon diagram

@Component({
  selector: 'app-player-table',
  standalone: true, // Marks the component as standalone
  imports: [
    CommonModule, // Import common Angular directives
    FormsModule, // Import FormsModule for ngModel
    SearchComponent,
    PlayerCardComponent
  ],
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css'],
})

export class PlayerTableComponent implements OnInit {
  players$!: Observable<Player[]>;
  private playersSubscription!: Subscription; // Subscription for debugging
  playersList: Player[] = []; // Local list of players
  filteredPlayers: Player[] = []; // Processed players for display
  selectedPlayer: Player | null = null;
  selectedPlayerCard: Player | null = null;

  playerNameInput: string = '';
  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  isLoading: boolean = false;
  isComparingPlayers: boolean = false;
  isComparingPlayersDef: boolean = false;
  isComparingPlayersOff: boolean = false;

  seasons: string[] = [
    '2024', '2023', '2022', '2021', '2020',
    '2019', '2018', '2017', '2016', '2015',
    '2014', '2013', '2012', '2011', '2010'
  ];

  seasonFilter: string[] = [
    '2024', '2023', '2022', '2021', '2020',
    '2019', '2018', '2017', '2016', '2015',
    '2014', '2013', '2012', '2011', '2010'
  ];
  isDropdownOpen: boolean = false; 
  isAllSelected: boolean = true;


  positions: string[] = [
    'PG', 'SG', 'SF', 'PF', 'C'
  ];

  positionsFilter: string[] = [
    'PG', 'SG', 'SF', 'PF', 'C'
  ]

  isPositionsDropdownOpen: boolean = false; 
  isPositionsAllSelected: boolean = true;


  classes: string[] = [
    'Fr', 'So', 'Jr', 'Sr'
  ];

  classFilter: string[] = [
    'Fr', 'So', 'Jr', 'Sr'
  ]

  isClassDropdownOpen: boolean = false; 
  isClassAllSelected: boolean = true;


  selectedViewMode: string = 'Basic'; // Default selected mode
  viewModes: string[] = ['Basic', 'Advance', 'Per 40', 'Percentile', 'Rating', 'Measurement']; 
  sortKey: keyof Player | null = 'season'; // Sorting key//'season'
  sortReverse: boolean = true; // Sorting direction
  isSort: boolean = true; // Sorting direction

  playersCount: number = 0; 


  constructor(
    private playerFacade: PlayerFacade,
    //private googleSheetService: GoogleSheetService
  ) {
    this.searchSubscription = new Subscription();
  }

  async ngOnInit() {
    console.log('PlayerTableComponent is loaded');
    
    const sheetId = '11HHOY8M-AIE8KvCK28iHDkei_sJQXU_hdAI39UyJS0E'; // Google Sheet ID
    const range = 'draft_db2.0'; // Sheet tab name
  
    try {
      this.searchSubscription = this.searchSubject
        .pipe(debounceTime(400)) // Adjust the debounce time as needed
        .subscribe(searchTerm => {
          this.searchPlayer(searchTerm);
        });

      fetch("/players.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
      })
      .then(json => {
        const data = json; // Assign the data if needed
        console.log('data', data);
        
        if (data.length > 0) {
          const playerKeys = [
            "RealGM ID", "Name", "School", "Class", "Position 1", "Updated", "Playstyle", "Season", "Height", 
            "Weight", "Conference", "G", "TS%", "eFG%", "USG%", "OBPM", "DBPM", "BPM", "DPORPAG", "AST/TOV", 
            "OFF RTG", "DEF RTG", "FG%", "3FG%", "Mid FG%", "FT%", "FTR", "# Dunks", "Rec Rank", "Drafted #", 
            "MIN", "FGM", "FGA", "3PM", "3PA", "3PM Per Game", "Mid Made", "Mid Per Game", "PTS", "TRB", "ORB", 
            "AST", "STL", "BLK", "STK", "Stops Per Game", "Stops", "Points Per", "TO Per", "PER", "PER Grade", 
            "BPM Percentile", "eFg Percentile", "TS Percentile", "Off Rating Percentile", "Def Rating Percentile", 
            "AdjQ ShotCreator Tree Rating", "AdjQ Scoring Rating", "AdjQ Shooting Rating", "AdjQ Playmaking Rating", 
            "AdjQ Rebounding Rating", "AdjQ Def Rating", "AdjQ Off Rating", "AdjQ Ovrl Rating", 
            "Potential Adjusted Ovrl Rating", "Potential Rating (L Class Improvement Formula)", 
            "Improvement Percentile", "Improvement", "Positional Length (H WS) inches", "HAND LENGTH (inches)", 
            "HAND WIDTH (inches)", "HEIGHT W/O SHOES", "STANDING REACH", "WEIGHT (LBS)", "WINGSPAN", 
            "Lane Agility Time (seconds)", "Shuttle Run (seconds)", "Three Quarter Sprint (seconds)", 
            "Standing Vertical Leap (inches)", "Max Vertical Leap (inches)", "MAX REACH", 
            "Max Bench Press (repetitions)", "PTS 40", "TREB 40", "OREB 40", "DREB 40", "AST 40", "STL 40", 
            "BLK 40", "STOPS 40", "3PM 40", "MID MADE 40", "CLOSE SHOT 40", "DUNKS 40", 
            "Points 40 Percentile", "O Reb 40 Percentile", "D Reb 40 Percentile", "Assist 40 Percentile", 
            "Block 40 Percentile", "Steal 40 Percentile", "Stops 40 Percentile", "3PM 40 Percentile", 
            "Mid 40 Percentile", "Close Shot 40 Percentile", "DUNKS 40 Percentile", "FTR Percentile", 
            "TO Percentile", "USG Percentile", "Dbl Dbl", "Tpl Dbl", "40 Pts", "20 Reb", "20 Ast"
          ];

          // Dynamically map each record to a Player object using playerKeys
          const players = data.map((record: any) => {
            console.log('Current record:', record); // Log each record
            const player: { [key: string]: any } = {}; // Create an empty object for each player
            playerKeys.forEach((key) => {
              const uncapitalizedKey = key.toLowerCase(); 
              player[uncapitalizedKey] = record[key] ?? null; // Assign value or null if undefined
            });
            return player;
          });
          console.log('players', players);
  
          this.playerFacade.loadPlayers(players);
          this.players$ = this.playerFacade.players$;
          this.playersSubscription = this.players$.subscribe((emittedPlayers) => {
            console.log('Emitted players from state:', emittedPlayers);
            this.filteredPlayers = emittedPlayers || []; 
            this.playersList = emittedPlayers || []; 
            this.applyFilters(); 
          });
        } else {
          console.warn('No data returned from Google Sheets.');
        }
      })

      //const data = await this.googleSheetService.getPlayerRecords(sheetId, range);

      /*if (data.length > 0) {
        const headers = data[0].map((header: string) => header.toLowerCase());
        console.log('headers', headers);
        const playerKeys = [
          'name', 'school', 'class', 'position 1', 'playstyle', 'pts', 'trb', 'ast', 'stl', 'blk', 
          'fg%', '3fg%', 'ft%', 'mid fg%', 'g', 'min', 'height', 'wingspan', 'weight', 'max vertical leap (inches)',
          'positional length (h ws) inches', '3pm per game', 'mid per game', 'season', 'stops per game',
          'ts%', 'ast/tov', '# dunks', 'efg%', 'usg%', 'obpm', 'dbpm', 'bpm', 'off rtg', 'def rtg', 'per',
          'rec rank', 'drafted #',

          'pts 40', 'treb 40', 'oreb 40', 'dreb 40', 'ast 40', 'stl 40', 
          'blk 40', 'stops 40', '3pm 40', 'mid made 40', 'close shot 40', 'dunks 40',

          'bpm percentile', 'efg percentile', 'ts percentile', 'off rating percentile', 'def rating percentile', 
          'usg percentile', 'to percentile', 

          'points 40 percentile', 'o reb 40 percentile', 'd reb 40 percentile', 'assist 40 percentile', 'block 40 percentile', 
          'steal 40 percentile', 'stops 40 percentile', '3pm 40 percentile', 'mid 40 percentile', 'close shot 40 percentile',
          'ftr percentile', 'dunks 40 percentile',

          'adjq scoring rating', 'adjq shotcreator tree rating', 'adjq shooting rating', 'adjq playmaking rating',
          'adjq rebounding rating', 'adjq off rating', 'adjq def rating', 'adjq ovrl rating',
          'potential adjusted ovrl rating', 'potential rating (l class improvement formula)',
          'hand length (inches)', 'hand width (inches)', 'three quarter sprint (seconds)',

          'dbl dbl', 'tpl dbl', '40 pts', '20 reb', '20 ast'
        ];
  
        const players: Player[] = data.slice(1).map((row: any) => {
          const player: Partial<Player> = {};
          playerKeys.forEach((key) => {
            const headerIndex = headers.indexOf(key);
            if (headerIndex !== -1) {
              player[key as keyof Player] = row[headerIndex];
            }
          });
          console.log('player',player);
          return player as Player;
        });

        this.playerFacade.loadPlayers(players);
        this.players$ = this.playerFacade.players$;
        this.playersSubscription = this.players$.subscribe((emittedPlayers) => {
          console.log('Emitted players from state:', emittedPlayers);
          this.filteredPlayers = emittedPlayers || []; 
          this.playersList = emittedPlayers || []; 
          this.applyFilters(); 
        });
      } else {
        console.warn('No data returned from Google Sheets.');
      }*/
    } catch (error) {
      console.error('Error fetching or processing Google Sheets data:', error);
    }
  }

  //defense 
    // PG,SG,SF,PF --> def potential --> 65+ steal or block percentile, 60 def rating, def ovrl rating 65
  
  applyFilters() {
    this.isLoading = true;
    setTimeout(() => {
      let filteredPlayers = this.playersList;

      // Filter by selected seasons if any are selected
      filteredPlayers = filteredPlayers.filter(player => 
        player['season'] && this.seasonFilter.includes(String(player['season']))
      );

      filteredPlayers = filteredPlayers.filter(player => 
        player['position 1'] && this.positionsFilter.includes(String(player['position 1']))
      );

      filteredPlayers = filteredPlayers.filter(player => 
        player.class && this.classFilter.includes(String(player.class))
      );

      //just get Search Player by Name
      if (!this.isComparingPlayers && this.playerNameInput.trim()) {
        const lowerCaseSearchTerm = this.playerNameInput;
        filteredPlayers = filteredPlayers.filter(player => {
          if (typeof player.name === 'string') {
            return player.name.toLowerCase().includes(lowerCaseSearchTerm);
          }       
          return false;
        });
      }

      //get Compare Players
      if(this.isComparingPlayers && this.selectedPlayer && this.selectedPlayer.height != null && this.selectedPlayer.wingspan != null &&
        this.selectedPlayer["adjq def rating"] != null && this.selectedPlayer["block 40 percentile"] != null &&
        this.selectedPlayer["steal 40 percentile"] != null && this.selectedPlayer["stops 40 percentile"] != null){
        
        let threshold = 2;
        
        let selectedPlayer = this.selectedPlayer;

        const selectedPlayerHeight = Number(this.convertHeight(this.selectedPlayer.height));
        const selectedPlayerWingspan = Number(this.convertHeight(this.selectedPlayer.wingspan));

        const currentCombined = selectedPlayerHeight + selectedPlayerWingspan;

        if(this.isComparingPlayersOff){
          if(selectedPlayerHeight >= 84) {
            threshold = 7;
          } else {
            threshold = 4;
          }
        }

        filteredPlayers = filteredPlayers.filter(player => {
          if(player.height == null || player.wingspan == null) {
            return false;
          }

          const playerHeight = Number(this.convertHeight(player.height));
          const playerWingspan = Number(this.convertHeight(player.wingspan));

          const playerCombined =  playerHeight + playerWingspan;
          const difference = Math.abs(currentCombined - playerCombined);

          if(difference <= threshold) {           
            if(this.isComparingPlayersDef){
              if(player["adjq def rating"] == null || player["block 40 percentile"] == null || player["steal 40 percentile"] == null
                || player["stops 40 percentile"] == null) {
                  return false;
              }

              if(selectedPlayer["adjq def rating"] == null || selectedPlayer["block 40 percentile"] == null ||
                 selectedPlayer["steal 40 percentile"] == null || selectedPlayer["stops 40 percentile"] == null){
                  return false;
              }

              const selectedPlayerDefRating = selectedPlayer["adjq def rating"];
              const selectedPlayerBlockPercentile = selectedPlayer["block 40 percentile"];
              const selectedPlayerStealPercentile = selectedPlayer["steal 40 percentile"];
              const selectedPlayerStopPercentile = selectedPlayer["stops 40 percentile"];

              const playerDefRating = player["adjq def rating"];
              const playerBlockPercentile = player["block 40 percentile"];
              const playerStealPercentile = player["steal 40 percentile"];
              const playerStopPercentile = player["stops 40 percentile"];

              const defRatingDifference = Math.abs(selectedPlayerDefRating - playerDefRating);
              const blockDifference = Math.abs(selectedPlayerBlockPercentile - playerBlockPercentile);
              const stealDifference = Math.abs(selectedPlayerStealPercentile - playerStealPercentile);
              const stopDifference = Math.abs(selectedPlayerStopPercentile - playerStopPercentile);

              if(defRatingDifference <= 5 && blockDifference <= 15 && stealDifference <= 15 && stopDifference <= 10){
                
                return true;
              }
            }
          
            if(this.isComparingPlayersOff){ //points per percentile
              if(player["adjq off rating"] == null || player["adjq scoring rating"] == null || player["adjq shotcreator tree rating"] == null || 
                 player["adjq shooting rating"] == null || player["adjq playmaking rating"] == null ||
                 player["3pm 40 percentile"] == null || player["mid 40 percentile"] == null || player["close shot 40 percentile"] == null ||
                 player["points 40 percentile"] == null || player["assist 40 percentile"] == null) {
                  return false;
              }

              if(selectedPlayer["adjq off rating"] == null || selectedPlayer["adjq scoring rating"] == null || selectedPlayer["adjq shotcreator tree rating"] == null || 
                 selectedPlayer["adjq shooting rating"] == null || selectedPlayer["adjq playmaking rating"] == null ||
                 selectedPlayer["3pm 40 percentile"] == null || selectedPlayer["mid 40 percentile"] == null || selectedPlayer["close shot 40 percentile"] == null ||
                 selectedPlayer["points 40 percentile"] == null || player["assist 40 percentile"] == null) {
                 return false;
              }
          

              const selectedPlayerOffRating = selectedPlayer["adjq off rating"];
              const selectedPlayerScoringRating = selectedPlayer["adjq scoring rating"];
              const selectedPlayerShotcreatorRating = selectedPlayer["adjq shotcreator tree rating"];
              const selectedPlayerShootingRating = selectedPlayer["adjq shooting rating"];
              const selectedPlayerPlaymakingRating = selectedPlayer["adjq playmaking rating"];
              const selectedPlayer3pmRating = selectedPlayer["3pm 40 percentile"];
              const selectedPlayerMidRating = selectedPlayer["mid 40 percentile"];
              const selectedPlayerCloseshotRating = selectedPlayer["close shot 40 percentile"];
              const selectedPlayerPointPerRating = selectedPlayer["points 40 percentile"];
              const selectedPlayerAssistPerRating = selectedPlayer["assist 40 percentile"];
              
              const playerOffRating = player["adjq off rating"];
              const playerScoringRating = player["adjq scoring rating"];
              const playerShotcreatorRating = player["adjq shotcreator tree rating"];
              const playerShootingRating = player["adjq shooting rating"];
              const playerPlaymakingRating = player["adjq playmaking rating"];
              const player3pmRating = player["3pm 40 percentile"];
              const playerMidRating = player["mid 40 percentile"];
              const playerCloseshotRating = player["close shot 40 percentile"];
              const playerPointPerRating = player["points 40 percentile"];
              const playerAssistPerRating = player["assist 40 percentile"];

              const offRatingDifference =  Math.abs(selectedPlayerOffRating - playerOffRating);
              const scoringDifference =  Math.abs(selectedPlayerScoringRating - playerScoringRating);
              const shotcreatorDifference =  Math.abs(selectedPlayerShotcreatorRating - playerShotcreatorRating);
              const shootingDifference =  Math.abs(selectedPlayerShootingRating - playerShootingRating);
              const playmakingDifference =  Math.abs(selectedPlayerPlaymakingRating - playerPlaymakingRating);
              const threepmDifference =  Math.abs(selectedPlayer3pmRating - player3pmRating);
              const midDifference =  Math.abs(selectedPlayerMidRating - playerMidRating);
              const closeshotDifference =  Math.abs(selectedPlayerCloseshotRating - playerCloseshotRating);
              const pointsperDifference =  Math.abs(selectedPlayerPointPerRating - playerPointPerRating);
              const assistPerDifference =  Math.abs(selectedPlayerAssistPerRating - playerAssistPerRating);
                 
              if(selectedPlayerPlaymakingRating  <= 45) {
                if(assistPerDifference <= 25 && (pointsperDifference <= 15 || scoringDifference <= 10) && shootingDifference <= 12.5 && shotcreatorDifference <= 12.5){                
                  return true;
                } else {
                  return false;
                  }
              } else {
                if((assistPerDifference <= 10 || playmakingDifference <= 15) && (pointsperDifference <= 15 || scoringDifference <= 10) && shootingDifference <= 20 && shotcreatorDifference <= 12.5){                
                  return true;
                } else {
                  return false;
                  }
              }
            }          
          }
          return false;
        });
        if(this.isSort == false) {
          if(this.isComparingPlayersDef){
            this.sortKey = "potential adjusted ovrl rating";
          }

          if(this.isComparingPlayersOff){
            this.sortKey = "potential adjusted ovrl rating";
          }
          this.sortReverse = true;
        }
      }
      
      //remove null when asc sort
      /*if (this.sortKey && !this.sortReverse && this.sortKey != 'drafted #') {
        filteredPlayers = filteredPlayers.filter((player) => {
          const value = player[this.sortKey!];
          return value !== null && value !== undefined && value !== '' && value !== '-';
        });
      }*/
    

      if (this.sortKey) {
        filteredPlayers.sort((a, b) => {
          const fieldA = a[this.sortKey!] as any;
          const fieldB = b[this.sortKey!] as any;
      
          // Handle null or undefined values explicitly
          if (fieldA == '' && fieldB == '') return 0; // Both are null, considered equal
          if (fieldA == '') return 1; // Null goes to the bottom
          if (fieldB == '') return -1; // Null goes to the bottom
      
          // Parse values to ensure numeric sorting
          const parsedA = parseFloat(fieldA) || 0;
          const parsedB = parseFloat(fieldB) || 0;
      
          if (parsedA < parsedB) return this.sortReverse ? 1 : -1;
          if (parsedA > parsedB) return this.sortReverse ? -1 : 1;
          return 0;
        });
      }
        

      //if comparing players, add player to top of list
      if (this.isComparingPlayers && this.selectedPlayer?.name) {
        const playerIndex = filteredPlayers.findIndex(player => player?.name === this.selectedPlayer?.name);
        
        if (playerIndex !== -1) {
          filteredPlayers.splice(playerIndex, 1); // Remove from current position
        }
      
        filteredPlayers.unshift(this.selectedPlayer);
      }
      

      this.filteredPlayers = filteredPlayers;
      this.playersCount = filteredPlayers.length;
      this.isLoading = false;
      this.isSort = false;
    }, 500);
  }

  sortBy(key: keyof Player) {
    if (this.sortKey === key) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortKey = key;
      this.sortReverse = true;
    }
    this.isSort = true;
    this.applyFilters(); 
  }

  clearSorting(): void {
    this.sortKey = 'season';
    this.sortReverse = true;
    this.applyFilters(); 
  }

  clearComparePlayer(): void {
    this.isComparingPlayers = false;
    this.isComparingPlayersDef = false;
    this.isComparingPlayersOff = false;
    this.selectedPlayer = null;

    this.sortKey = 'season';
    this.sortReverse = true;
    this.applyFilters();
  }
  

  onViewModeChange(mode: string) {
    this.selectedViewMode = mode;
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  searchPlayer(searchTerm: string): void {   
    this.playerNameInput = searchTerm.toLowerCase();
    this.applyFilters(); 
  }

  comparePlayerOff(player: Player): void {
    this.isComparingPlayers = true;
    this.isComparingPlayersOff = true;
    this.selectedPlayer = player;
    this.applyFilters(); 
  }

  comparePlayerDef(player: Player): void {
    this.isComparingPlayers = true;
    this.isComparingPlayersDef = true;
    this.selectedPlayer = player;
    this.applyFilters(); 
  }

  convertHeight(heightNum: number): number {
    const heightStr = heightNum.toString();
    const [feetStr, inchesStr] = heightStr.split('.');
  
    // Convert feet to inches
    const feetInInches = parseInt(feetStr, 10) * 12;
  
    // Handle the decimal part
    let additionalInches = 0;
    if (inchesStr) {
      if (inchesStr === '10' || inchesStr === '11') {
        additionalInches = parseInt(inchesStr, 10); // Treat .10 as 10 inches and .11 as 11 inches
      } else {
        additionalInches = parseInt(inchesStr[0], 10) || 0; // Use only the first digit for other cases
      }
    }
  
    return feetInInches + additionalInches;
  }
  
  getPlayerCard(event: MouseEvent, player: Player): void {
    event.preventDefault(); // Prevent scrolling to the top
    this.selectedPlayerCard = player;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

    if(!this.isDropdownOpen) {
      this.applyFilters(); 
    }
  }

  selectAllSeasons() {
    this.seasonFilter = [...this.seasons]; // Select all seasons
  }
  
  deselectAllSeasons() {
    this.seasonFilter = []; // Clear all selections
  }

  toggleSelectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // Select all seasons
      this.seasonFilter = [...this.seasons];
      this.isAllSelected = true;
    } else {
      // Deselect all seasons
      this.seasonFilter = [];
      this.isAllSelected = false;
    }
  }

  toggleSeason(season: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // Add the selected season
      this.seasonFilter.push(season);
    } else {
      // Remove the deselected season
      const index = this.seasonFilter.indexOf(season);
      if (index !== -1) {
        this.seasonFilter.splice(index, 1);
      }
    }
  }
  
  //
  togglePositionsDropdown() {
    this.isPositionsDropdownOpen = !this.isPositionsDropdownOpen;

    if(!this.isPositionsDropdownOpen) {
      this.applyFilters(); 
    }
  }

  selectAllPositions() {
    this.positionsFilter = [...this.positions]; // Select all seasons
  }
  
  deselectAllPositions() {
    this.positionsFilter = []; // Clear all selections
  }

  togglePositionsSelectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.positionsFilter = [...this.positions];
      this.isPositionsAllSelected = true;
    } else {
      this.positionsFilter = [];
      this.isPositionsAllSelected = false;
    }
  }

  togglePosition(position: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.positionsFilter.push(position);
    } else {
      const index = this.positionsFilter.indexOf(position);
      if (index !== -1) {
        this.positionsFilter.splice(index, 1);
      }
    }
  }
  /*
    class: string[] = [
    'Fr', 'So', 'Jr', 'Sr'
  ];

  classFilter: string[] = [
    'Fr', 'So', 'Jr', 'Sr'
  ]

  isClassDropdownOpen: boolean = false; 
  isClassAllSelected: boolean = true;
  */

  toggleClassDropdown() {
    this.isClassDropdownOpen = !this.isClassDropdownOpen;

    if(!this.isClassDropdownOpen) {
      this.applyFilters(); 
    }
  }

  selectAllClass() {
    this.classFilter = [...this.classes]; // Select all seasons
  }
  
  deselectAllClass() {
    this.classFilter = []; // Clear all selections
  }

  toggleClassSelectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.classFilter = [...this.classes];
      this.isClassAllSelected = true;
    } else {
      this.classFilter = [];
      this.isClassAllSelected = false;
    }
  }

  toggleClass(playerClass: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.classFilter.push(playerClass);
    } else {
      const index = this.classFilter.indexOf(playerClass);
      if (index !== -1) {
        this.classFilter.splice(index, 1);
      }
    }
  }

  ngOnDestroy() {
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
