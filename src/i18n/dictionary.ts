export interface Dictionary {
  metadata: {
    description: string
  }
  common: {
    close: string
    start: string
    back: string
    exit: string
    loadingQuiz: string
    loadingQuestion: string
    loadingResult: string
    invalidResult: string
    switchToPolish: string
    switchToEnglish: string
  }
  landing: {
    tapToStart: string
    logoAlt: string
  }
  catalog: {
    welcome: string
    invitation: string
    randomQuiz: string
    descriptionTitle: string
    rulesTitle: string
    rules: string[]
    gameModeTitle: string
    easyMode: string
    hardMode: string
    guideAlt: string
    quizIconAlt: string
  }
  player: {
    time: string
    secondsAbbreviation: string
    question: string
    enlarge: string
    next: string
    timedOut: string
    correct: string
    incorrect: string
    failedAlt: string
    guideAlt: string
  }
  results: {
    score: string
    passed: string
    failed: string
    guideAlt: string
  }
}
