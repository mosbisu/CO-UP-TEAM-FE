import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5F99FF;
    border-radius: 5px;
  }
}
body {
  background-color: white;
  font-family: "AppleSDGothicNeo";
}
button{
  outline: none;
  border: none;
  background-color: transparent;
}
details > summary::-webkit-details-marker {
  display: none;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	/* font: inherit; */
	vertical-align: baseline;
}
svg {
  color: rgba(0, 0, 0, 0.7)
}
nav {
  background-color: white;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
textarea {
  border-width: 0px;
}
ol, ul {
	list-style: none;
}
input {
  outline:none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
  text-decoration: none;
  color: black;
}
@media (max-width:551px) {
  &::-webkit-scrollbar {
    display: none;
  }
}

/* mui modal */
.css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}
.css-6hp17o-MuiList-root-MuiMenu-list{
  padding: 0;
  width: 100%;
}
abbr[title]{
  text-decoration: none;
  cursor: auto;
}

/* react-slick */
.slick-arrow::before{
  font-size: 50px;
}
.slick-arrow.slick-prev{
  position: absolute;
  top: 265px;
  left: -54px;
}
.slick-dots li button:before{
  line-height: 4;
  font-size: 14px;
  width: 17px;
  height: 17px;
}
.slick-dots li.slick-active button:before{
  color: #5F99FF;
}

/* editor */
.toastui-editor-defaultUI{
  border: none;
}
.toastui-editor-defaultUI .ProseMirror{
  padding-left: 46px;
  padding-top: 30px;
}
`;
