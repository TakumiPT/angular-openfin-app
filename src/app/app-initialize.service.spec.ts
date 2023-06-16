import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppInitializeService } from './app-initialize.service';

describe('AppInitializeService', () => {
  let service: AppInitializeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitializeService);

    // Mock the fin object
    const mockFin = {
      desktop: {
        main: (callback: () => void) => callback(),
        System: {
          getVersion: (callback: (version: string) => void) => callback('Mock version')
        }
      }
    };

    (window as any).fin = mockFin;
  });

  afterEach(() => {
    // Clean up the fin object
    delete (window as any).fin;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize successfully when fin is available', fakeAsync(() => {
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
    delete (window as any).fin;

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
