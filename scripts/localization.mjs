export const englishOrPolish = (polish, english) =>
  typeof english === "string" && english.trim().length > 0 ? english : polish
