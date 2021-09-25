//utilities
import React from "react";
import { useSelector } from "react-redux";
//media and styles
import "./QuickAccessBar.css";

//functions and selectors
import { selectButtons } from "./quickAccessBarSlice";
import { QuickAccesBtn } from "./QuickAccessBtn";
import { ContentBtn } from "./ContentBtn";
// import

export function QuickAccessBar() {
  const buttons = useSelector(selectButtons);

  return (
    <div className="quickAccesBar-container">
      <div className="content-slection-container">
        {/* RENDER BUTTONS WITH TYPE OF 'content' */}
        {Object.values(buttons).map((button) =>
          button.type === "content" ? (
            <ContentBtn key={button.id} button={button} />
          ) : (
            ""
          )
        )}
      </div>
      {/* RENDER BUTTONS WITH TYPE OF 'quickAccess' */}
      <div className="quickAccess-buttons-container">
        {Object.values(buttons).map((button) =>
          button.type === "quickAccess" ? (
            <QuickAccesBtn key={button.id} button={button} />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}
