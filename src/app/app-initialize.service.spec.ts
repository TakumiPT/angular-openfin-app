import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppInitializeService } from './app-initialize.service';

describe('AppInitializeService', () => {
  let service: AppInitializeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitializeService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize successfully when fin is available', fakeAsync(() => {

    // Mock the fin object
    const mockFin = {
      desktop: {
        main: (callback: () => void) => callback(),
        System: {
          getVersion: (callback: (version: string) => void) => callback('Mock version')
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fin = mockFin;
    
    let resolved = false;
    let rejected = false;

    service.init().then(() => {
      resolved = true;
    }).catch(() => {
      rejected = true;
    });

    tick();

    expect(resolved).toBe(true);
    expect(rejected).toBe(false);
  }));

  it('should reject initialization when fin is not available', fakeAsync(() => {
    // Remove the mock fin object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fin = null;

    let resolved = false;
    let rejected = false;

    service.init().then(() => {
      resolved = true;
    }).catch(() => {
      rejected = true;
    });

    tick();

    expect(resolved).toBe(false);
    expect(rejected).toBe(true);
  }));
});
