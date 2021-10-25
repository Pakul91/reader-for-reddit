import React, { useEffect, useState } from "react";
import "./DetailedView.css";
import linkIcon from "../../../media/linkIcon.png";
import commentsIcon from "../../../media/commentsIcon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  loadComments,
  selectComments,
  selectFailedToLoadComments,
  selectCommentsError,
} from "./Comments/commentsSlice";
import {
  formatTime,
  formatNumber,
  isImg,
  isVid,
  formatEmbeded,
} from "../../../Helpers/HELPERS";
import { markdown } from "../../../Helpers/drawdown";
import { Comment } from "./Comments/Comment";
import { ErrorBox } from "../../ErrorBox/ErrorBox";
import { useHistory } from "react-router-dom";

//===========================================

export function DetailedView({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [commentsActive, setCommentsActive] = useState(false);
  //Check if comments failed to load
  const failedToLoad = useSelector(selectFailedToLoadComments);
  //Error msg if error
  const commentsError = useSelector(selectCommentsError);
  //Turn detailed view off when clicked  X button
  const handleClick = () => {
    history.push("/posts");
  };
  //Toggle coments on/off
  const toggleComments = (e) => {
    e.stopPropagation();
    if (!commentsById) return;
    setCommentsActive(commentsActive ? false : true);
  };
  //Format retrieved markdown text to HTML
  const formatedText = post.text ? markdown(post.text) : "";
  //check if provided url is a valid image
  const checkImg = isImg(post.imgURL);
  //check if provided url is a valid vidoe. If yes, return link if no return fals
  const checkVid = isVid(post.imgURL);
  //load comments from the stay if there are any
  const allComments = useSelector(selectComments);
  //comments for the specyfic post
  const commentsById = allComments[post.id];

  //load comments when detailed View rendered
  useEffect(() => {
    //check if there are comments for this post in the state
    if (!commentsById) dispatch(loadComments(post));

    //close detailed view when press escape
    const handleEscPress = (e) => {
      history.push("/posts");
    };

    document.addEventListener("keydown", handleEscPress);
    //clearing event listener on dismount
    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [history, dispatch, post, commentsById]);

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
            <video controls muted={false} className="video-post">
              <source src={post.videoURL} />
              Video not avaiable on your browser!😭
            </video>
          )}

          {/* Display embeded video if there is any */}

          <div
            className="embeded-post"
            dangerouslySetInnerHTML={{
              __html: formatEmbeded(post.embededVid),
            }}
          ></div>

          {/* insert previously formated text */}
          <div className="text-post">
            <div dangerouslySetInnerHTML={{ __html: formatedText }}></div>
          </div>

          {/* Link to oryginal content */}
          <div className="bottom-bar">
            <div className="link-oryginal">
              <a href={post.imgURL} target="_blank" rel="noreferrer">
                <img src={linkIcon} alt="" className="anchor-img" />
              </a>

              <a href={post.imgURL} target="_blank" rel="noreferrer">
                Oryginal content
              </a>
            </div>
            <span className="upvotes">{formatNumber(post.ups)} ups</span>
            <div className="comments" onClick={toggleComments}>
              <img src={commentsIcon} alt="comments" />

              <span>{commentsById ? commentsById.length : " ..."}</span>
            </div>
          </div>

          {/* ----------COMMENTS--------- */}
          {failedToLoad && commentsActive && <ErrorBox error={commentsError} />}
          {/* If comments are set active render provided coments */}
          {!failedToLoad &&
            commentsActive &&
            commentsById &&
            Object.values(commentsById).map((comment) => {
              if (!comment.author) {
                return "";
              }
              return <Comment key={comment.id} comment={comment} />;
            })}
        </div>
      </div>
    </div>
  );
}
