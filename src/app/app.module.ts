import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInitializeService } from './app-initialize.service';

export function initializeApp(appInitService: AppInitializeService) {
  return (): Promise<any> => { 
    return appInitService.init();
  }
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AppInitializeService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AppInitializeService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
