//utilities
import React from "react";
import { useSelector } from "react-redux";
//media and styles
import "./QuickAccessBar.css";

//functions and selectors
import { selectButtons } from "./quickAccessBarSlice";
import { QuickAccesButton } from "./QuickAccessBtn";

export function QuickAccessBar() {
  const buttons = useSelector(selectButtons);
  console.log(buttons);

  //check status of the button to apply style
  // const checkStatus = (id) => {
  //   if (buttons[id].selected) return "-selected";
  //   if (buttons[id].disabled) return "-disabled";
  //   //if non of above default style will be applied
  //   return "";
  // };

  // handle click on quickAccesButton

  return (
    <div className="quickAccesBar-container">
      <div className="content-slection">
        {/* POSTS BUTTON */}
        <button
          id="posts"
          type="button"
          // display button styles by it status
          className={`btn-content`}
          title="Display posts. "
        >
          Posts
        </button>
        {/* SUBREDDITS BUTTON */}
        <button
          id="subreddits"
          type="button"
          // display button styles by it status
          className={`btn-content`}
          title="Display subreddits."
        >
          Subreddits
        </button>
      </div>

      <div className="quickAccess-buttons-container">
        {Object.values(buttons).map((button) =>
          button.type === "quickAccess" ? (
            <QuickAccesButton key={button.id} button={button} />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}
