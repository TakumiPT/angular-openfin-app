import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitializeService {

  constructor() { }

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (fin) {
        try {
          fin.desktop.main(() => this.checkOpenFinVersion());
    
        } catch (err) {
          this.initNoOpenFin(err);
        }
        resolve();
      } else {
        reject(new Error('OpenFin not found.'));
      }
    });
  }


  private checkOpenFinVersion() {
    fin.desktop.System.getVersion( (version) => {
      try {
        console.log("OpenFin version " + version);
        
      } catch (err) {
        console.error(err);
      }
    });

  }

  private initNoOpenFin(err: unknown) {
    console.error("OpenFin is not available - you are probably running in a browser.", err);
  }
}
