export interface Player {
  Name:string;
  name: string;
  school: string;
  class: string;
  "position 1": string;
  'rec rank': string;
  'drafted #': string;
  playstyle: string;
  pts: number;
  trb: number;
  ast: number;
  stl:number;
  blk: number;
  "stops per game": number;
  "fg%": number;
  "3fg%": number;
  "ft%": number;
  "mid fg%": number;
  g: number;
  min: number;
  height: number;
  wingspan: number;
  weight: number;
  "max vertical leap (inches)": number;
  "positional length (h ws) inches": number;
  "3pm per game": number;
  "mid per game": number;
  "season": number;
  "ts%": number;
  "ast/tov": number;
  "# dunks": number;

  'pts 40': number;
  'treb 40': number;
  'oreb 40': number;
  'dreb 40': number;
  'ast 40': number;
  'stl 40': number;
  'blk 40': number;
  'stops 40': number;
  '3pm 40': number;
  'mid made 40': number;
  'close shot 40': number;
  'dunks 40': number;

  "efg%": number;
  "usg%": number;
  obpm: number;
  dbpm: number;
  bpm: number;
  "off rtg": number;
  "def rtg": number;
  per: number;
  
  "bpm percentile": number;
  "efg percentile": number;
  "ts percentile": number;
  "off rating percentile": number;
  "def rating percentile": number;
  "usg percentile": number;

  'points 40 percentile': number;
  'o reb 40 percentile': number;
  'd reb 40 percentile': number;
  'assist 40 percentile': number;
  'block 40 percentile': number;
  'steal 40 percentile': number;
  'stops 40 percentile': number;
  '3pm 40 percentile': number;
  'mid 40 percentile': number;
  'close shot 40 percentile': number;
  'dunks 40 percentile': number;
  'ftr percentile': number;
  'to percentile': number;


  'adjq scoring rating': number;
  'adjq shotcreator tree rating': number;
  'adjq shooting rating': number;
  'adjq playmaking rating': number;
  'adjq rebounding rating': number;
  'adjq off rating': number;
  'adjq def rating': number;
  'adjq ovrl rating': number;
  'potential adjusted ovrl rating': number;
  'potential rating (l class improvement formula)': number;

  'hand length (inches)': number;
  'hand width (inches)': number;
  'three quarter sprint (seconds)': number;
  
  'dbl dbl': number;
  'tpl dbl': number;
  '40 pts': number;
  '20 reb': number;
  '20 ast': number;
}
