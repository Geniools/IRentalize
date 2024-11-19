export {};

declare global {
    interface Window {
        JSONWidget: any
    }
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

