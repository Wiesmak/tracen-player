import type { Dictionary } from "@/i18n/dictionary"

const dictionary: Dictionary = {
  metadata: {
    description: "Odtwarzacz quizów Akademii Tracen",
  },
  common: {
    close: "Zamknij",
    start: "Start",
    back: "Wróć",
    exit: "Wyjdź",
    loadingQuiz: "Ładowanie quizu...",
    loadingQuestion: "Ładowanie pytania...",
    loadingResult: "Ładowanie wyniku...",
    invalidResult: "Nieprawidłowy wynik quizu. Przekierowywanie...",
    switchToPolish: "Przełącz na język polski",
    switchToEnglish: "Przełącz na język angielski",
  },
  landing: {
    tapToStart: "Tap to start",
    logoAlt: "Stajnia Umamusume",
  },
  catalog: {
    welcome: "Witaj w stajni Umamusume!",
    invitation: "Sprawdź swoją wiedzę w jednym z poniższych quizów.",
    randomQuiz: "Losuj quiz",
    descriptionTitle: "Opis quizu",
    rulesTitle: "Zasady gry",
    rules: [
      "Zdobądź jak najwięcej punktów, odpowiadając na pytania.",
      "Aby udzielić odpowiedzi, dotknij jednej z dostępnych opcji.",
      "W niektórych quizach możesz powiększyć obrazek, ale obniży to liczbę punktów za poprawną odpowiedź.",
      "Zdobądź przynajmniej 50% punktów, aby otrzymać nagrodę.",
    ],
    gameModeTitle: "Tryb gry",
    easyMode: "OPEN",
    hardMode: "GRADED",
    guideAlt: "Tazuna Hayakawa",
    quizIconAlt: "Ikona quizu",
  },
  player: {
    time: "Czas",
    secondsAbbreviation: "s",
    question: "Pytanie",
    enlarge: "Powiększ",
    next: "Dalej",
    timedOut: "Czas minął...",
    correct: "Tak jest!",
    incorrect: "Nie, to nie jest poprawna odpowiedź.",
    failedAlt: "Nie udało się załadować quizu",
    guideAlt: "Tazuna Hayakawa",
  },
  results: {
    score: "Wynik",
    passed: "Świetny wynik! Zgłoś się do prowadzącego po nagrodę.",
    failed: "Słabo. Spróbuj jeszcze raz!",
    guideAlt: "Tazuna Hayakawa",
  },
}

export default dictionary
