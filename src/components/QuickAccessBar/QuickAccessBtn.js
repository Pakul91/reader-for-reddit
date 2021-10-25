import React from "react";
import "./QuickAccessBar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectButtons, quickAccessBtnClick } from "./quickAccessBarSlice";
import { applyStyleByStatus } from "../../Helpers/HELPERS";
import { media } from "../../media/media";
import { useHistory } from "react-router-dom";

export function QuickAccesBtn({ button }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const buttons = useSelector(selectButtons);

  // Apply css selector by buttons status
  const style = applyStyleByStatus(buttons, button.id);

  const handleQuickAccesBtnClick = () => {
    dispatch(quickAccessBtnClick({ buttons, buttonId: button.id }));
    history.push("/posts");
  };
  return (
    <div className={`btn-quickAccess${style}`}>
      <span className="btn-quickAccess-label">{button.id.toUpperCase()}</span>

      <img
        onClick={handleQuickAccesBtnClick}
        src={media[`${button.id}Icon`]}
        id={button.id}
        alt={button.id}
        title={button.title}
      ></img>
    </div>
  );
}
