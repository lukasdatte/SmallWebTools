$(() => {
    const input = $("#input");
    input.on("keyup" /*"input keydown keyup mousedown mouseup select contextmenu drop"*/, () => {
        let val = input.val().toString().replace("/",":").replace(/[^\d:+-\s]/g,"");
        input.val(val);

        //collapse signs
        const times : Time[] = [];
        const split = val.split(/(?=[-+])/);

        let negative = false;
        for (let s of split) {
            switch (s) {
                case "+":
                    break;
                case "-":
                    negative = !negative;
                    break;
                default:
                    if(s.length == 0)
                        break;
                    if(s.charAt(0) == "-")
                        negative = !negative;
                    times.push(Time.fromString(s, negative));
                    negative = false;
                    break;
            }
        }

        //calc result
        const resultTime = new Time(0,0);
        for (let time of times) {
            resultTime.add(time);
        }

        $("#output").text(resultTime.toString());
    });
});

class Time {
    positive: boolean;
    hour: number;
    minute: number;

    constructor(hour: number, minute: number, positive : boolean = null) {
        let cleanTime = Time.cleanTime(hour, minute);
        this.hour = cleanTime.hour;
        this.minute = cleanTime.minute;

        let newPositive;
        if(positive != null) {
            if (cleanTime.positive == false && positive)
                throw new Error("Illegales Argument, Munite und Stunden vorzeichen negativ passt nicht für das gegebene positive vorzeichen");
            newPositive = positive;
        }
        else
            newPositive = cleanTime.positive;
        this.positive = newPositive;
    }

    add (t : Time){
        let cleanTime = Time.cleanTime(0, this.asMinutes() + t.asMinutes());
        this.hour = cleanTime.hour;
        this.minute = cleanTime.minute;
        this.positive = cleanTime.positive;
    }

    inMinutes(){
        return this.hour*60 + this.minute;
    }

    toString () {
        return `${this.positive ? "" : "-"}${this.hour}:${this.minute}h  ${this.positive ? "" : "-"}${this.inMinutes()}min  ${Math.ceil((this.inMinutes())/6)}x6min  ${Math.ceil((this.inMinutes())/10)}x10min  ${Math.ceil((this.inMinutes())/12)}x12min  ${Math.ceil((this.inMinutes())/30)}x30min`;
    }

    asMinutes() {
        return (this.hour * 60 + this.minute) * (this.positive ? 1 : -1)
    }

    static cleanTime(hour: number, minute: number) {
        let positive = true;
        if(hour < 0 || minute < 0){
            if(hour != 0 && minute != 0 && hour < 0 != minute < 0)
                return null;
            positive = false;
            hour *= -1;
            minute *= -1;
        }
        let minutesExclHours = minute % 60;
        hour = hour + (minute - minutesExclHours) / 60;
        minute = minutesExclHours;
        return {hour: hour, minute: minute, positive: positive};
    }

    static fromString(string : string, forcedNegative = false) : Time {
        string = string.replace(/[^\d:]/g,"");
        const numbers = string.split(":");
        if(numbers.length == 1)
            return new Time(0, Number.parseInt(numbers[0]), !forcedNegative);
        if(numbers.length == 2) {
            return new Time(Number.parseInt(numbers[0]), Number.parseInt(numbers[1]), !forcedNegative);
        }
        return null;
    }
}