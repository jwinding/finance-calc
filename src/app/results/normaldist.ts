export class NormalDist { 
    spareRandom = null;

    normalRandom():number {
	    var val:number, u:number, v:number, s:number, mul:number;

        if(this.spareRandom !== null) {
            val = this.spareRandom;
            this.spareRandom = null;
        }
        else {
            do {
                u = Math.random()*2-1;
                v = Math.random()*2-1;

                s = u*u+v*v;
            } while(s === 0 || s >= 1);
            mul = Math.sqrt(-2 * Math.log(s) / s);
            val = u * mul;
            this.spareRandom = v * mul;
        }
        return val / 14;	// 7 standard deviations on either side
    }

    normalRandomInRange(min:number, max:number):number {
        var val:number;
        do {
            val = this.normalRandom();
        } while(val < min || val > max);
        
        return val;
    }

    normalRandomScaled(mean: number, stddev: number):number {
        var r = this.normalRandomInRange(-1, 1);
        r = r * stddev + mean;
        return r; 
    }
}