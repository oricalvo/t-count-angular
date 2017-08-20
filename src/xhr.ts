import {Counter} from "t-count";
import {NgZone} from "@angular/core";

export class CounterXHR extends Counter {
    private ngZone: NgZone;

    constructor() {
        super("XHR")
    }

    init(ngZone: NgZone) {
        this.ngZone = ngZone;
    }

    patch() {
        const me = this;

        const send = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function() {
            const xhr = this;

            if(!me.ngZone) {
                console.warn("No ngZone. Did you call init ?")
                return;
            }

            if (!(<any>xhr)["profiler_patched"]) {
                (<any>xhr)["profiler_patched"] = true;

                //
                //  loadstart is raised just before HTTP request is sent
                //
                me.ngZone.runOutsideAngular(()=> {
                    xhr["profiler_send"] = performance.now();

                    //xhr.addEventListener("loadstart", onLoadStart);
                    xhr.addEventListener("readystatechange", onReadyStateChange);
                });
            }

            me.inc();

            return send.apply(xhr, arguments);
        }

        function onReadyStateChange(this: XMLHttpRequest) {
            const xhr = this;

            if(xhr.readyState == 4) {
                const before = (<any>xhr)["profiler_send"];
                if (before) {
                    const after = performance.now();
                    me.update(after - before, false);
                }
            }
        }

        // function onLoadStart(this: XMLHttpRequest) {
        //     const xhr = <any>this;
        //
        //     xhr["profiler_send"] = performance.now();
        // }

        return [this];
    }
}
