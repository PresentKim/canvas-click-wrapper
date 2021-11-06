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
declare type CanvasClickEvents = "start" | "move" | "end";
declare type CanvasClickListener<R> = (click: CanvasClick, type: CanvasClickEvents) => R;;

interface CanvasClick {
    readonly identifier: number; //identifer of the click (mouse is 0)
    readonly pageX: number; //Click coordinates in DOM
    readonly pageY: number; //Click coordinates in DOM
    readonly x: number; //Click coordinates in canvas
    readonly y: number; //Click coordinates in canvas

    //wrap method for use CanvasClick on default mouse/touch events
    wrap<T, R>(canvas: HTMLCanvasElement, listener: CanvasClickListener<R>, thisArgs?: T): (this: T, event: MouseEvent | TouchEvent) => any;

    //add mouse/touch events listener to the canvas (start - move - end)
    addClickListener(types: CanvasClickEvents | [CanvasClickEvents], canvas: HTMLCanvasElement, listener: CanvasClickListener<R>, target?: HTMLElement): void;

    //create new CanvasClick from mouse/touch event
    from(canvas: HTMLCanvasElement, clickInfo: { identifier?: number; pageX: number; pageY: number; }): CanvasClick;
}
````

<br>

### Use `wrap()` to simply convert events to canvas data.

````typescript
CanvasClick.wrap = function <T, R>(
        canvas: HTMLCanvasElement,
        listener: CanvasClickListener<R>,
        thisArgs?: T
): (this: T, event: MouseEvent | TouchEvent) => any;
````

#### Expamle:

> ````typescript
> canvas.addEventListener("mousemove", CanvasClick.wrap(canvas, click => {
>     console.log(click.x, click.y);
> }));
> canvas.addEventListener("touchmove", CanvasClick.wrap(canvas, click => {
>     console.log(click.x, click.y);
> }));
> ````  

<br>

### Use `addClickListener` to handle both mouse and click

````typescript
CanvasClick.addClickListener = function (
        types: CanvasClickEvents | [CanvasClickEvents],
        canvas: HTMLCanvasElement,
        listener: CanvasClickListener<R>,
        target?: HTMLElement
): void;
````

#### Expamle:

> ````typescript  
> CanvasClick.addClickListener("move", canvas, click => {
>     console.log("move", click.x, click.y);
> });
> 
> // You can also register multiple events at once.
> CanvasClick.addClickListener(["start", "end"], canvas, (click, type) => {
>     console.log(type, click.x, click.y);
> });
> ````