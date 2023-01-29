import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { customReset } from "./customReset";

const globalStyle = createGlobalStyle`
    ${reset};
    ${customReset};
`;

export default globalStyle;
