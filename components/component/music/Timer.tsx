export interface Timer {
    start()

    restart()

    pause()
}

export function makeTimer(onTimerTick: (number) => void): Timer {
    return new RealTimer(onTimerTick)
}

export class RealTimer implements Timer {
    private timer: NodeJS.Timeout | null = null
    private secPassed: number = 0
    private externalSetSecPassed: (number) => void;

    constructor(onTimerTick: (number) => void) {
        this.externalSetSecPassed = onTimerTick
    }

    private setSecPassed(num: number) {
        this.secPassed = num
        this.externalSetSecPassed(num)
    }

    private clearTimerInstance = () => {
        if (this.timer) clearInterval(this.timer)
        this.timer = null
    };

    /**
     * Timer ticks every second
     */
    public start() {
        this.clearTimerInstance()
        const start = this.secPassed
        const timerStartTime = getUtfSec() - start
        let prevTick = start
        this.setSecPassed(start)
        this.timer = setInterval(() => {
            let tickTime = getUtfSec() - timerStartTime;
            if (tickTime !== prevTick) {
                this.setSecPassed(tickTime)
                prevTick = tickTime
            }
        }, 100)
    }

    public restart() {
        this.clearTimerInstance()
        this.secPassed = 0
        this.start()
    }

    public pause() {
        this.clearTimerInstance()
    }
}

function getUtfSec() {
    return Math.ceil(Date.now() / 1000);
}

export class FakeTimer implements Timer {
    fakeTime: number = 0
    private externalSetSecPassed: (number) => void;

    constructor(onTimerTick: (number) => void) {
        this.externalSetSecPassed = onTimerTick
    }

    pause() {
    }

    restart() {
        this.fakeTime = 0
        this.start()
    }

    start() {
        this.externalSetSecPassed(this.fakeTime)
    }

    tick(times?: number) {
        for (let step = 0; step < (times ?? 1); step++) {
            this.fakeTime++
            this.externalSetSecPassed(this.fakeTime)
        }
    }
}