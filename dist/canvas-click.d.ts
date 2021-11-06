declare const CanvasClickEventMap: {
    readonly start: readonly ["mousedown", "touchstart"];
    readonly move: readonly ["mousemove", "touchmove"];
    readonly end: readonly ["mouseup", "touchend", "touchcancel"];
};
declare type CanvasClickEvents = keyof typeof CanvasClickEventMap;
declare type IClickInfo = {
    identifier?: number;
    pageX: number;
    pageY: number;
};
declare type CanvasClickListener<R> = (click: CanvasClick, type: CanvasClickEvents) => R;
export default class CanvasClick implements IClickInfo {
    readonly identifier: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly x: number;
    readonly y: number;
    constructor(identifier: number, pageX: number, pageY: number, x: number, y: number);
    static addClickListener<R>(types: CanvasClickEvents | CanvasClickEvents[], canvas: HTMLCanvasElement, listener: CanvasClickListener<R>, target?: HTMLElement): void;
    static wrap<T, R>(canvas: HTMLCanvasElement, listener: CanvasClickListener<R>, thisArgs?: T): (this: T, event: MouseEvent | TouchEvent) => any;
    static from(canvas: HTMLCanvasElement, clickInfo: IClickInfo): CanvasClick;
}
export {};
