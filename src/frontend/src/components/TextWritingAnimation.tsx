import styled from "styled-components";
import {useTheme} from "@/components/ThemeProvider";

type TextWritingAnimationProps = {
    children: string,
    fontSize?: number,
}

const TextWritingAnimation = ({children, fontSize = 200}: TextWritingAnimationProps) => {
    const {theme} = useTheme()
    const textWidth = children.length

    const StyledWrapper = styled.div`
        @keyframes typing {
            from {
                width: 0;
            }
        }

        @keyframes blink-caret {
            50% {
                border-color: transparent;
            }
        }

        /* 
        When you change the amount of characters in the h1, you have to change 
        the with: 14ch and  steps(14, end), if there is 14 characters, put 14, 
        if there is 20 put 20 
        */

        .animation {
            font: bold ${fontSize}% Consolas, Monaco, monospace;
            border-right: .1em solid ${theme === "dark" ? "white" : "black"};
            width: ${textWidth.toString() + ".20ch"};
            white-space: nowrap;
            overflow: hidden;
            -webkit-animation: typing 5s steps(${textWidth.toString()}, end), blink-caret .5s step-end infinite alternate;
        }
    `;

    return (
        <StyledWrapper>
            <div className="animation">{children}</div>
        </StyledWrapper>
    );
};


export default TextWritingAnimation