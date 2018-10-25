  // Przedzial czasowy -> ile dni, czas pracy -> liczba katerogii taskow, liczba taskow, nazwa, data utworzenia

  export class Callendar{
      constructor(public name: string, public description: string, 
        public startDate: string, public expiringDate: string, 
        public workTime: string, public status?: string, 
        public numberOfWorkDays?: number, public taskCategoryNumber?: number, 
        public tasksCountInCategory?: number){
      }
  }