import React from "react";
import { Popup } from "semantic-ui-react";

export default function PopupGlobal({ content, children, header }) {
  return (
    <Popup inverted content={content} header={header} trigger={children} />
  );
}
