# Historical-Current_Nba_Draft_Prospects
The goal of this project is to webscrape Nba draft prospect data to create a visualize datatable and compare current and historical draft prospects

Data has already been webscraped from Barttorvik and RealGM, dating back to 2010 and only include ncaa players. 

This project will query [from a private database], these already-scaped ncaa player records and surface it on a data table. 

- in the CLI - use 'ng serve' to run the Angular App
then open 'http://localhost:4200/' in your browser.
 

player.models file
  - holds all the fields related to a Ncaa college player's fields.
  - "RealGM ID	Name	School	Class	Position 1	Updated	Playstyle	Season	Height	Weight	Conference	G	TS%	eFG%	USG%	OBPM	DBPM	BPM	DPORPAG	AST/TOV	OFF RTG	DEF RTG	FG%	3FG%	Mid FG%	FT%	FTR	# Dunks	Rec Rank	Drafted #	MIN	FGM	FGA	3PM	3PA	3PM Per Game	Mid Made	Mid Per Game	PTS	TRB	ORB	AST	STL	BLK	STK	Stops Per Game	Stops	Points Per	TO Per	PER	PER Grade	BPM Percentile	eFg Percentile	TS Percentile	Off Rating Percentile	Def Rating Percentile	AdjQ ShotCreator Tree Rating	AdjQ Scoring Rating	AdjQ Shooting Rating	AdjQ Playmaking Rating	AdjQ Rebounding Rating	AdjQ Def Rating	AdjQ Off Rating	AdjQ Ovrl Rating	Potential Adjusted Ovrl Rating	Potential Rating (L Class Improvement Formula)	Improvement Percentile	Improvement	Positional Length (H WS) inches	HAND LENGTH (inches)	HAND WIDTH (inches)	HEIGHT W/O SHOES	STANDING REACH	WEIGHT (LBS)	WINGSPAN	Lane Agility Time (seconds)	Shuttle Run (seconds)	Three Quarter Sprint (seconds)	Standing Vertical Leap (inches)	Max Vertical Leap (inches)	MAX REACH	Max Bench Press (repetitions)	PTS 40	TREB 40	OREB 40	DREB 40	AST 40	STL 40	BLK 40	STOPS 40	3PM 40	MID MADE 40	CLOSE SHOT 40	DUNKS 40	Points 40 Percentile	O Reb 40 Percentile	D Reb 40 Percentile	Assist 40 Percentile	Block 40 Percentile	Steal 40 Percentile	Stops 40 Percentile	3PM 40 Percentile	Mid 40 Percentile	Close Shot 40 Percentile	DUNKS 40 Percentile	FTR Percentile	TO Percentile	USG Percentile	Dbl Dbl	Tpl Dbl	40 Pts	20 Reb	20 Ast"

  - 
# LoadNbaProspects

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
