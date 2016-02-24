module eVOCus {
    export interface ServerObject {
        id: string;
        update(gametime : number) : void;
        draw(canvas: Canvas) : void;
        synchronize(serverObj: any) : void;
}
} 