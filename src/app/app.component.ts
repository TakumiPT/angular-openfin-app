import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-openfin-app';

  constructor() {
    this.init();
  }

  init() {
    try {
      fin.desktop.main(() => this.initWithOpenFin());

    } catch (err) {
      this.initNoOpenFin();
    }
  };

  initWithOpenFin() {
    const mainWin = fin.desktop.Window.getCurrent();
    console.log(mainWin);

    fin.desktop.System.getVersion( (version) => {
      try {
        console.log("OpenFin version " + version);
        
      } catch (err) {
        console.log(err);
      }
    });

  }

  initNoOpenFin() {
    alert("OpenFin is not available - you are probably running in a browser.");
  }
}
