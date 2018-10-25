export const callendarFormSettings = [
    { label: "Nazwa kalendarza", name: "callendarName", validationRules: {
        isRequired: true, 
        minLength: 5,
        maxLength: 100
    }, type: "text", placeholder: "wpisz nazwę kalendarza...", validationRulesDescription: [
        "Pole nazwa kalendarza jest wymagane",
        "To pole musi mieć więcej niż 4 znaki",
        "To pole nie może mieć więcej niż 100 znaków"
    ]},

    { label: "Opis", name: "description", validationRules: {
        minLength: 5,
        maxLength: 150
    }, type: "textarea", placeholder: "wpisz opis...", validationRulesDescription: [
        "To pole musi mieć więcej niż 4 znaki",
        "To pole nie może mieć więcej niż 100 znaków",
    ]},

    { label: "Data rozpoczęcia", name: "startDate", validationRules: {
        isRequired: true,
        isHigherThanToday: true
    }, type: "date", class: "date", validationRulesDescription: [
        "Pole data rozpoczęcia jest wymagane",
        "Pole data rozpoczecia nie może odnosić się do przeszłości"
    ]},

    { label: "Data zakończenia", name: "endDate", validationRules: {
        isRequired: true
    }, type: "date", class: "date", validationRulesDescription: [
        "Pole data zakończenia jest wymagane"
    ]},
    { label: "Czas pracy", name: "workTime", validationRules: {
        isRequired: true,
        workTime: "12:30"
    }, type: "time", class: "time", validationRulesDescription: [
        "Pole czas pracy jest wymagane",
        "Czas pracy nie może przekraczać 12.5 godziny"
    ]}
  ];