import React from "react";
import { Popup } from "semantic-ui-react";

export default function PopupGlobal({ content, children }) {
  return <Popup inverted content={content} trigger={children} />;
}
