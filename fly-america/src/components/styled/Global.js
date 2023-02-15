import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Oswald:wght@700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans', sans-serif;
    width: 100vw;
    min-height: 100vh;
    position: relative;
}

img {
    max-width: 100%;
    height: auto;
}

h1, h2 {
    font-family: 'Oswald', sans-serif;
}

.no-scroll {
    overflow: hidden;
}

`;

export default GlobalStyles;
