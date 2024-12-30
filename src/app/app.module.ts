import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { routes } from './app.routes';
import { PlayerState } from './state/player.state';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms'; // Import FormsModule



@NgModule({
  declarations: [
    AppComponent, // Root component
  ],
  imports: [
    BrowserModule, // Core Angular features
    FormsModule,
    CommonModule, // Provides directives like *ngIf and *ngFor
    RouterModule.forRoot(routes), // Configure application routes
    NgxsModule.forRoot([PlayerState]),
  ],
  providers: [],
  bootstrap: [AppComponent], // Bootstrap the root component
})
export class AppModule {}
