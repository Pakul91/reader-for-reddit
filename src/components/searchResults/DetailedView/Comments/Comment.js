import React from "react";
import "./Comment.css";
import { formatTime } from "../../../../Helpers/HELPERS";
import { markdown } from "../../../../Helpers/drawdown";

export function Comment({ comment }) {
  return (
    <div className="comment-container">
      <div className="comment-details">
        <span className="author">{comment.author}</span>
        <span className="posted">{formatTime(comment)}</span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: markdown(comment.body) }}
        className="text-post comment-body"
      ></div>
    </div>
  );
}
