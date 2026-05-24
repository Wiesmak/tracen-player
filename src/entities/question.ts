export default interface Question {
    id: string
    answerId: string
    text: Nullable<string>
    images: string[]
    audio: Nullable<string>
}