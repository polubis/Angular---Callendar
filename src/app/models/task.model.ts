export class Task {
    constructor(public name?: string, public description?: string,
    public addDate?: Date, public startDate?: string, public estimatedEndDate?: string, 
    public startHour?: string, public estimatedHour?: string ){
    }
}
