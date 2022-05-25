import { createContext, useState } from 'react';

const TitleBarContext = createContext({
        backButton: false,
        titleText: "",
        toggleBackButton: (dummy) => {},
        changeTitle: (dummy) => {}

})

export function TitleBarContextProvider(props) {
    const [backButton, setBackButton] = useState(false);
    const [titleText, setTitleText] = useState("");

    function toggleBackButtonHandler(value) {
        setBackButton(value)
    }

    function changeTitleHandler(str) {
        setTitleText(str);
    } 

    const context = { 
        backButton: backButton,
        titleText: titleText,
        toggleBackButton: toggleBackButtonHandler,
        changeTitle: changeTitleHandler
    }

    return <TitleBarContext.Provider value={context}>
        {props.children}
    </TitleBarContext.Provider>
}

export default TitleBarContext