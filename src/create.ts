export type RouteListener = (path: string) => void;

export const DEFAULT_NAME = 'router';

export interface Router {
    push(path: string): void;
    pop(): void;
    getCurrent(): string;
    getHistorySize(): number;
    addListener(listener: RouteListener): void;
    removeListener(listener: RouteListener): void;
}

export type RouterFactory<T> =
    (options?: T) => Router;

export function create<T>(factory: RouterFactory<T>, options?: T): Router {
    return factory(options);
}
