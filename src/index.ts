import {Profiler} from "t-count";
import {CounterChangeDetection} from "./changeDetection";
import {CounterComponents} from "./components";
import {CounterHttp} from "./http";

export {CounterChangeDetection} from "./changeDetection";
export {CounterComponents} from "./components";
export {CounterHttp} from "./http";

export const ANGULAR_COUNTERS = [
    CounterChangeDetection,
    CounterComponents,
    CounterHttp,
];
