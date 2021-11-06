type FlattenArrayMap<T> = T[keyof T] extends any[] ? T[keyof T][number] : never;

function findKeyOfArrayMap<T, V extends ReadonlyArray<U>, U>(map: { [key: string]: V }, el: U): string | undefined {
    for (const key in map) {
        if (map[key].includes(el)) {
            return key;
        }
    }
    return undefined;
}

const CanvasClickEventMap = {
    start: ["mousedown", "touchstart"],
    move: ["mousemove", "touchmove"],
    end: ["mouseup", "touchend", "touchcancel"]
} as const;
type CanvasClickEvents = keyof typeof CanvasClickEventMap;
type DomClickEvents = FlattenArrayMap<typeof CanvasClickEventMap>;

type IClickInfo = {
    identifier?: number;
    pageX: number;
    pageY: number;
}

type CanvasClickListener<R> = (click: CanvasClick, type: CanvasClickEvents) => R;

export default class CanvasClick implements IClickInfo {
    public constructor(
            public readonly identifier: number,
            public readonly pageX: number,
            public readonly pageY: number,
            public readonly x: number,
            public readonly y: number,
    ) {
    }

    public static addClickListener<R>(types: CanvasClickEvents | CanvasClickEvents[], canvas: HTMLCanvasElement, listener: CanvasClickListener<R>, target: HTMLElement = canvas): void {
        for (const type of types instanceof Array ? types : [types]) {
            for (const eventType of CanvasClickEventMap[type]) {
                target.addEventListener(eventType as DomClickEvents, CanvasClick.wrap(canvas, listener));
            }
        }
    }

    public static wrap<T, R>(
            canvas: HTMLCanvasElement,
            listener: CanvasClickListener<R>,
            thisArgs?: T,
    ): (this: T, event: MouseEvent | TouchEvent) => any {
        return (event: MouseEvent | TouchEvent) => {
            const type = findKeyOfArrayMap(CanvasClickEventMap, event.type) as CanvasClickEvents | undefined;
            if (type === undefined) {
                throw new Error(`Unknown event type: ${event.type}`);
            }
            if (event instanceof MouseEvent) {
                if (event.button === 0) {
                    listener.call(thisArgs, CanvasClick.from(canvas, event), type);
                }
            } else if (event instanceof TouchEvent) {
                const length = event.changedTouches.length;
                for (let i = 0; i < length; ++i) {
                    listener.call(thisArgs, CanvasClick.from(canvas, event.changedTouches[i]), type);
                }
            }
        }
    }

    public static from(canvas: HTMLCanvasElement, clickInfo: IClickInfo): CanvasClick {
        const canvasBounds = canvas.getBoundingClientRect();
        return new CanvasClick(
                clickInfo.identifier ?? 0,
                clickInfo.pageX,
                clickInfo.pageY,
                (clickInfo.pageX - canvasBounds.left - window.scrollX) / (canvas.clientWidth / (canvas.width || canvas.clientWidth)),
                (clickInfo.pageY - canvasBounds.top - window.scrollY) / (canvas.clientHeight / (canvas.height || canvas.clientHeight))
        );
    }
}