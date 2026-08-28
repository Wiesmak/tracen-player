import type { Dictionary } from "@/i18n/dictionary"

const dictionary: Dictionary = {
  metadata: {
    description: "Tracen Academy quiz player",
  },
  common: {
    close: "Close",
    start: "Start",
    back: "Back",
    exit: "Exit",
    loadingQuiz: "Loading quiz...",
    loadingQuestion: "Loading question...",
    loadingResult: "Loading result...",
    invalidResult: "Invalid quiz result. Redirecting...",
    switchToPolish: "Switch to Polish",
    switchToEnglish: "Switch to English",
  },
  landing: {
    tapToStart: "Tap to start",
    logoAlt: "Umamusume Stable",
  },
  catalog: {
    welcome: "Welcome to the Umamusume stable!",
    invitation: "Test your knowledge in one of the quizzes below.",
    randomQuiz: "Random quiz",
    descriptionTitle: "Quiz description",
    rulesTitle: "Game rules",
    rules: [
      "Earn as many points as possible by answering questions.",
      "Tap one of the available options to answer.",
      "Some quizzes let you enlarge the image, but doing so reduces the points awarded for a correct answer.",
      "Score at least 50% to receive a reward.",
    ],
    gameModeTitle: "Game mode",
    easyMode: "OPEN",
    hardMode: "GRADED",
    guideAlt: "Tazuna Hayakawa",
    quizIconAlt: "Quiz icon",
  },
  player: {
    time: "Time",
    secondsAbbreviation: "s",
    question: "Question",
    enlarge: "Enlarge",
    next: "Next",
    timedOut: "Time is up...",
    correct: "That's right!",
    incorrect: "No, that is not the correct answer.",
    failedAlt: "Quiz failed to load",
    guideAlt: "Tazuna Hayakawa",
  },
  results: {
    score: "Score",
    passed: "Great result! Ask the host for your reward.",
    failed: "Not quite. Try again!",
    guideAlt: "Tazuna Hayakawa",
  },
}

export default dictionary
