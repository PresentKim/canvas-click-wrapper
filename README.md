# canvas-click-wrapper

Light wrapper that handles touch and mouse clicks as coordinates on the canvas

## Installation

> ````sh  
> npm install canvas-click-wrapper --save  
> yarn add canvas-click-wrapper 
> ````  

## Usage

### Import library

> ````javascript 
> import CanvasClickWrapper from 'canvas-click-wrapper';  
> //or  
> var CanvasClickWrapper = require('canvas-click-wrapper');  
> ````  

### CanvasClick spec:
````typescript
interface CanvasClick {
    readonly identifier: number; //identifer of the click (mouse is 0)
    readonly pageX: number; //Click coordinates in DOM
    readonly pageY: number; //Click coordinates in DOM
    readonly x: number; //Click coordinates in canvas
    readonly y: number; //Click coordinates in canvas

    //wrap method for use CanvasClick on default mouse/touch events
    static wrap<T, R>(canvas: HTMLCanvasElement, listener: (click: CanvasClick) => R, thisArgs?: T): (this: T, event: MouseEvent | TouchEvent) => any;
    
    //add mouse/touch events listener to the canvas (start - move - end)
    static addStartListener(canvas: HTMLCanvasElement, listener: (click: CanvasClick) => any, target?: HTMLElement): void;
    static addMoveListener(canvas: HTMLCanvasElement, listener: (click: CanvasClick) => any, target?: HTMLElement): void;
    static addEndListener(canvas: HTMLCanvasElement, listener: (click: CanvasClick) => any, target?: HTMLElement): void;

    //create new CanvasClick from mouse/touch event
    static from(canvas: HTMLCanvasElement, clickInfo: { identifier?: number; pageX: number; pageY: number; }): CanvasClick;
````

<br>

### Use `wrap()` to simply convert events to canvas data.
````typescript
wrap<T, R>(
    canvas: HTMLCanvasElement,
    listener: (click: CanvasClick) => R, 
    thisArgs?: T
): (this: T, event: MouseEvent | TouchEvent) => any;
````

> ````typescript
> canvas.addEventListener("mousemove", CanvasClick.wrap(canvas, click => {
>     console.log(click.x, click.y);
> }));
> canvas.addEventListener("touchmove", CanvasClick.wrap(canvas, click => {
>     console.log(click.x, click.y);
> }));
> ````  

### Use `add*Listener` to handle both mouse and click
````typescript
addStartListener(
    canvas: HTMLCanvasElement, 
    listener: (click: CanvasClick) => any, 
    target?: HTMLElement
): void;
addMoveListener(canvas: HTMLCanvasElement, listener: (click: CanvasClick) => any, target?: HTMLElement): void;
addEndListener(canvas: HTMLCanvasElement, listener: (click: CanvasClick) => any, target?: HTMLElement): void;
````

> ````typescript  
> CanvasClick.addMoveListener(canvas, click => {
>     console.log(click.x, click.y);
> });
> ````