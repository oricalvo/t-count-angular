import {Counter} from "t-count";
import {Http} from "@angular/http";
import {NgZone} from "@angular/core";

export class CounterHttp extends Counter {
    constructor() {
        super("angular.Http");
    }

    init(http: Http, ngZone: NgZone) {
        const me = this;

        ngZone.runOutsideAngular(() => {
            const originalRequest = http.request;
            http["request"] = function patchAngularHttpReuqest() {
                const before = performance.now();

                const observable = originalRequest.apply(this, arguments);

                return observable.map(x => {
                    const after = performance.now();
                    me.update(after - before);

                    return x;
                });

                // observable.subscribe(function(value) {
                //     const after = performance.now();
                //     me.update(after-before);
                // }, function(err) {
                //     const after = performance.now();
                //     me.update(after-before);
                // });

                //return observable;
            }
        });
    }
}
