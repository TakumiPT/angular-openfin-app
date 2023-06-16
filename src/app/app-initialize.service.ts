import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitializeService {


  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (fin) {
        fin.desktop.main(() => this.checkOpenFinVersion());
        resolve();
      } else {
        reject(new Error('OpenFin not found.'));
      }
    });
  }


  private checkOpenFinVersion() {
    fin.desktop.System.getVersion((version) => {
      console.log("OpenFin version " + version);
    });

  }
}
