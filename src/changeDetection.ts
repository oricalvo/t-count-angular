import {ApplicationRef, NgZone} from '@angular/core';
import {Counter} from "t-count";

export class CounterChangeDetection extends Counter {
    constructor() {
        super("Change Detection")
    }

    init(applicationRef: ApplicationRef, ngZone: NgZone) {
        ngZone.runOutsideAngular(() => {
            this.profile(applicationRef, "tick");
        });
    }
}
