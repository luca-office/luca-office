import {css} from "@emotion/react"
import {backgroundColorDarker, inputHeight, shadowTransparencyColor, subHeaderHeight} from "../../styles"

export const styles = {
  titleInput: css({background: backgroundColorDarker}),
  subheader: css({
    background: "white",
    boxShadow: `0px 2px 4px 0px ${shadowTransparencyColor}`,
    borderRadius: "4px 4px 0px 0px",
    height: subHeaderHeight
  }),
  customTextInput: css({
    width: "fit-content",
    padding: (subHeaderHeight - inputHeight) / 2
  }),
  footer: css({
    justifyContent: "flex-end"
  }),
  quillEditor: css({
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    height: "100%"
  }),
  customToolbar: (text: string, title: string, headline: string) => css`
    .quill {
      display: flex;
      flex-direction: column;
    }

    .ql-container {
      min-height: 0;
      flex: 1;
    }

    .ql-editor {
      flex: 1 1 0;
      min-height: 0;
      margin: auto;
      background-color: white;
      box-sizing: border-box;
      line-height: 1.42;
      width: 75vw;
      max-width: 1000px;
      outline: none;
      overflow-y: auto;
      padding: 12px 15px;
      tab-size: 4;
      -moz-tab-size: 4;
      text-align: left;
      white-space: pre-wrap;
      word-wrap: break-word;
      border-top: 30px solid ${backgroundColorDarker};
      border-bottom: 30px solid ${backgroundColorDarker};
      border-left: 70px solid ${backgroundColorDarker};
      border-right: 70px solid ${backgroundColorDarker};
    }

    .ql-toolbar.ql-snow {
      background-color: white;
      border-radius: 4px 4px 0px 0px;
      margin-top: 2px;
      border: unset;
    }

    .ql-snow .ql-picker.ql-header {
      width: 115px;
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
      content: "${text}";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
      content: "${title}";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
      content: "${headline} 1";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
      content: "${headline} 2";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
      content: "${headline} 3";
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
      content: "${headline} 4";
    }
  `
}
