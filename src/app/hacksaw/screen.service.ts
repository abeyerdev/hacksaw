import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ScreenService {

    constructor() {
        try {
            this.screenWidth = window.innerWidth;
            this.screenHeight = window.innerHeight;
            window.addEventListener('resize', (event) => this.onResize(event));
        } catch (err) {
            console.warn(`Screen sizes aren't available, using defaults.`, err);
        }
    }

    private resizeSource = new Subject<any>();
    screenResized = this.resizeSource.asObservable();
    screenHeight = 1080;
    screenWidth = 1920;
    
    onResize(event) {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;       
        this.resizeSource.next({ screenHeight: this.screenHeight, screenWidth: this.screenWidth});
    }
}