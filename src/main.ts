import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngxs/store'; // Correct way to provide NGXS
import { PlayerState } from './app/state/player.state'; // Your NGXS state
import { provideHttpClient } from '@angular/common/http'; // Import HttpClient


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Provide the routing
    provideStore([PlayerState]), // Provide NGXS state using provideStore
    provideHttpClient()
  ],
}).catch((err) => console.error(err));

