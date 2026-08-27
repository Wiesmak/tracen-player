export default interface Question {
  id: string
  answerId: string
  text: Nullable<string>
  text_en: Nullable<string>
  images: string[]
  audio: Nullable<string>
}
