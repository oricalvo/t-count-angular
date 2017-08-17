import * as core from '@angular/core';
import {Counter} from "t-count";

export class CounterComponents extends Counter {
    constructor() {
        super("Components", {noAvg: true, noLastValue: true})
    }

    //
    //  below patch method is tricky and is based on Angular current implementation (See Component implementation
    //  inside Angular own source code)
    //
    patch() {
        const me = this;

        const originalComponent = core.Component;

        function ComponentEx(objOrType) {
            if (this instanceof ComponentEx) {
                Object.assign(this, objOrType);

                return this;
            }

            var annotationInstance = new (ComponentEx as any)(objOrType);

            var TypeDecorator = (function TypeDecorator(cls) {
                var annotations = Reflect["getOwnMetadata"]('annotations', cls) || [];
                annotations.push(annotationInstance);
                Reflect["defineMetadata"]('annotations', annotations, cls);

                me.patchComponentType(cls);

                return cls;
            });

            return TypeDecorator;
        }

        ComponentEx.prototype = Object.create(originalComponent.prototype);
        ComponentEx.prototype.toString = function () {
            return "@" + name;
        };

        Object.defineProperty(core, "Component", {
            get: function () {
                return ComponentEx;
            }
        });

        return [this];
    }

    private patchComponentType(cls) {
        const me = this;

        const originalNgOnInit = cls.prototype.ngOnInit;
        cls.prototype.ngOnInit = function () {
            me.inc();

            if (originalNgOnInit) {
                return originalNgOnInit.apply(this, arguments);
            }
        }

        const originalNgOnDestroy = cls.prototype.ngOnDestroy;
        cls.prototype.ngOnDestroy = function () {
            me.dec();

            if (originalNgOnDestroy) {
                return originalNgOnDestroy.apply(this, arguments);
            }
        }
    }
}
