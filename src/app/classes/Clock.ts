

export class Clock {
    time: string = "00:00:00";
    clockHandler: any;
    target: HTMLElement;

    getTime() {
        var date = new Date();
        return [date.getHours(), date.getMinutes(), date.getSeconds()]
            .map(current => current >= 10 ? current : "0" + current).join(":");
    }

    start(): void {
        var that = this;
        this.clockHandler = setInterval(function() {
            that.target.innerHTML = that.getTime();
        }, 1000);
    }

    stop(): void {
        clearInterval(this.clockHandler);
    }

    bindTo(elem): void {
        this.target = elem;
    }
}
