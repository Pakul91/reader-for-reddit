import React from "react";
import "./QuickAccessBar.css";
import hotIcon from "../../media/hotIcon.png";
import newIcon from "../../media/newIcon.png";
import topIcon from "../../media/topIcon.png";
import risingIcon from "../../media/risingIcon.png";

export function QuickAccessBar() {
  return (
    <div className="quickAccesBar-container">
      <div className="content-slection">
        <button
          type="button"
          className="btn-content btn-content-active"
          title="Display posts. "
        >
          Posts
        </button>
        <button
          type="button"
          className="btn-content"
          title="Display subreddits."
          disabled="true"
        >
          Subreddits
        </button>
      </div>

      <div className="quickAccess-buttons">
        <div className="btn-quickAccess">
          <span>HOT</span>
          <img
            src={hotIcon}
            alt="hot categories"
            title="Hotest post today"
          ></img>
        </div>

        <div className="btn-quickAccess">
          <span>NEW</span>
          <img
            src={newIcon}
            alt="Hot categories"
            title="New post from today"
          ></img>
        </div>

        <div className="btn-quickAccess">
          <span>TOP</span>
          <img
            src={topIcon}
            alt="hot categories"
            title="Most popular posts"
          ></img>
        </div>

        <div className="btn-quickAccess">
          <span>RISING</span>
          <img
            src={risingIcon}
            alt="hot categories"
            title="Gaining interest"
          ></img>
        </div>
      </div>
    </div>
  );
}
