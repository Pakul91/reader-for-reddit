import React from "react";
import "./ErrorBox.css";
import { media } from "../../media/media";

export function ErrorBox(error) {
  console.log(media.errorIcon);
  return (
    <div className="errorBox-container">
      {navigator.onLine && (
        <div className="errorIcon-container">
          <img src={media.errorIcon} alt="errorIcon" />
        </div>
      )}
      <p className="error-message">{error.error}</p>
    </div>
  );
}
