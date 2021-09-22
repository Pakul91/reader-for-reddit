import React, { useEffect } from "react";
import "./DetailedView.css";
import linkIcon from "../../../media/linkIcon.png";
import commentsIcon from "../../../media/commentsIcon.png";
import { useDispatch } from "react-redux";
import { toggleDatailedViewById } from "../../searchResults/searchResultsSlice";
import { loadComments } from "./Comments/commentsSlice";
import {
  formatTime,
  formatUps,
  isImg,
  isVid,
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

  //check if provided url is a valid image
  const checkImg = isImg(post.imgURL);

  //check if provided url is a valid vidoe. If yes, return link if no return fals
  const checkVid = isVid(post.imgURL);

  useEffect(() => {
    dispatch(loadComments(post));
  }, [dispatch, post]);

  return (
    <div>
      <div className="overlay">
        <div className="details-container">
          <div className="top-bar">
            <span className="author">{post.author}</span>
            <span className="posted">{formatTime(post)} ago</span>

            <span className="btn-exit" onClick={handleClick}>
              X
            </span>
          </div>
          <h2 className="h2-post">{post.title}</h2>
          {/* Display if there is a valid img link */}
          {checkImg && (
            <img className="img-post" src={post.imgURL} alt="media" />
          )}
          {/* Display if there is a valid video link */}
          {checkVid && (
            <video controls className="video-post">
              <source src={checkVid} />
              Video not avaiable on your browser!😭
            </video>
          )}

          {/* Display video if there is any */}
          {post.videoURL && (
            <video controls className="video-post">
              <source src={post.videoURL} />
              Video not avaiable on your browser!😭
            </video>
          )}

          {/* Display embeded video if there is any */}
          <div
            className="embeded-post"
            dangerouslySetInnerHTML={{ __html: formatEmbeded(post.embededVid) }}
          ></div>

          {/* insert previously formated text */}
          <div className="text-post">
            <div dangerouslySetInnerHTML={{ __html: formatedText }}></div>
          </div>

          {/* Link to oryginal content */}
          <div className="link-oryginal">
            <a href={post.imgURL} target="_blank" rel="noreferrer">
              <img src={linkIcon} alt="" className="anchor-img" />
            </a>

            <a href={post.imgURL} target="_blank" rel="noreferrer">
              Oryginal content
            </a>
          </div>
          <div className="bottom-bar">
            <span className="upvotes">{formatUps(post)} ups</span>
            <div className="comments">
              <img src={commentsIcon} alt="comments" />
              <span>xxx</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
