import React from "react";
import style from "@/styles/trip.module.css";

interface SaveButtonProps {
  handleSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ handleSave }) => {
  return (
    <div className={`buttonSave d-grid ${style.buttonSave}`}>
      <button className={`btn btn-success`} onClick={handleSave}>
        Salvar
      </button>
    </div>
  );
};

export default SaveButton;
