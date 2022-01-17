import { createGlobalStyle } from "styled-components";

const Typography = createGlobalStyle`
    body, input, textarea, button {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: "Inter", sans-serif;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0;
        color: ${(props) => props.theme.colors.TEXT};
    }
    a {
        text-decoration: none;
        color: ${(props) => props.theme.colors.TEXT_ACTION};
    }
    strong, button, b {
        font-weight: 700;
    }
    small {
        font-size: 11px;
        letter-spacing: 0.15px;
        line-height: 16px;
    }
    label, .light {
        color: ${(props) => props.theme.colors.TEXT_LIGHT_1};
    }
    h1, h2, h3 {
        font-weight: 500;
        letter-spacing: -0.15px;
    }
    h3 {
        font-size: 15px;
        line-height: 24px;
    }
    h2 {
        font-size: 17px;
        line-height: 28px;
    }
    h1 {
        font-size: 19px;
        line-height: 28px;
    }
`;

export default Typography;
