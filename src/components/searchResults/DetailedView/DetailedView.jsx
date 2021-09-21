import React, { useState } from "react";
import "./DetailedView.css";
import linkIcon from "../../../media/linkIcon.png";
import { useDispatch } from "react-redux";
import { toggleDatailedViewById } from "../../searchResults/searchResultsSlice";
import {
  formatTime,
  formatUps,
  isImg,
  formatEmbeded,
} from "../../../Helpers/HELPERS";
import { markdown } from "../../../Helpers/drawdown";

//===========================================

export function DetailedView({ post }) {
  const dispatch = useDispatch();
  //Turn detailed view off when clicked on overlay or X button
  const handleClick = () => [dispatch(toggleDatailedViewById(post.id))];

  //Format retrieved markdown text to HTML
  const formatedText = post.text ? markdown(post.text) : "";

  //check if provided link is an img
  const checkImg = isImg(post.imgURL);

  return (
    <div>
      <div className="overlay">
        <div className="details-container">
          <span className="btn-exit" onClick={handleClick}>
            X
          </span>
          <h2>{post.title}</h2>
          {/* Display if there is a valid img link */}
          {checkImg && (
            <img className="img-post" src={post.imgURL} alt="media" />
          )}
          {/* Display video if there is any */}
          {post.videoURL && (
            <video controls>
              <source src={post.videoURL} />
            </video>
          )}
          {/* Display embeded video if there is any */}
          <div
            dangerouslySetInnerHTML={{ __html: formatEmbeded(post.embededVid) }}
          ></div>
          {!checkImg ? (
            <a href={post.imgURL} target="_blank">
              <img src={linkIcon} alt="" />
            </a>
          ) : (
            ""
          )}
          {/* insert previously formated text */}
          <div
            dangerouslySetInnerHTML={{ __html: formatedText }}
            className="post-text"
          ></div>
          <div></div>
          <span>{post.author}</span>
          <span>{formatTime(post.created)}</span>
        </div>
      </div>
    </div>
  );
}
