import { useEffect, useRef, useState } from "react"
import type { KeyboardReactInterface } from "react-simple-keyboard"
import Keyboard from "react-simple-keyboard"
import "react-simple-keyboard/build/css/index.css"
import useAnswers from "@/features/quiz/hooks/use-answers"

const AnswerSelector = () => {
    const keyboard = useRef<KeyboardReactInterface>(null)
    const { selectorInput, handleSelectorInputChange } = useAnswers()
    const [capital, setCapital] = useState(true)

    useEffect(() => {
        if (keyboard.current && selectorInput !== keyboard.current.getInput())
            keyboard.current.setInput(selectorInput)
    }, [selectorInput])

    const onKeyPress = (button: string) => {
        if (button === "{shift}") setCapital(!capital)
        else setCapital(false)
    }

    return <>
        <input type={"text"} value={selectorInput} placeholder={"Tap on the virtual keyboard"} className="text-center" readOnly />
        <Keyboard
            // biome-ignore lint/suspicious/noAssignInExpressions: Library wants ref to be set like this
            keyboardRef={r => (keyboard.current = r)}
            layout={{
                default: [
                    "q w e r t y u i o p",
                    "a s d f g h j k l",
                    "{shift} z x c v b n m {backspace}",
                    "{space}",
                ],
                shift: [
                    "Q W E R T Y U I O P",
                    "A S D F G H J K L",
                    "{shift} Z X C V B N M {backspace}",
                    "{space}",
                ],
            }}
            display={{
                "{backspace}": "⌫",
                "{shift}": "⇧",
            }}
            layoutName={capital ? "shift" : "default"}
            mergeDisplay={true}
            onChange={handleSelectorInputChange}
            onKeyPress={onKeyPress}
        />
    </>
}

export default AnswerSelector