import React from "react";
import "./QuickAccessBar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectButtons, toggleContent } from "./quickAccessBarSlice";
import { applyStyleByStatus } from "../../Helpers/HELPERS";

export function ContentBtn({ button }) {
  const dispatch = useDispatch();
  const buttons = useSelector(selectButtons);

  // Apply css selector by buttons status
  const style = applyStyleByStatus(buttons, button.id);
  // Capitalise first letter of the id
  const body = `${button.id[0].toUpperCase()}${button.id.slice(1)}`;

  const handleContentBtnClick = () => {
    //If button is selected or disabled return
    if (buttons[button.id].selected || buttons[button.id].disabled) return;
    //Toggle status between content buttons
    dispatch(toggleContent());
  };
  return (
    <button
      onClick={handleContentBtnClick}
      id={button.id}
      type={button.id}
      // display button styles by it status
      className={`btn-content${style}`}
      title={button.title}
    >
      {body}
    </button>
  );
}
