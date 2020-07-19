declare class Time {
    positive: boolean;
    hour: number;
    minute: number;
    constructor(hour: number, minute: number, positive?: boolean);
    add(t: Time): void;
    inMinutes(): number;
    toString(): string;
    asMinutes(): number;
    static cleanTime(hour: number, minute: number): {
        hour: number;
        minute: number;
        positive: boolean;
    };
    static fromString(string: string, forcedNegative?: boolean): Time;
}
