"use client";
import React from "react";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h4>{title}</h4>
        {(description ?? "")
          .split("\n\n")
          .filter(Boolean)
          .map((para: string, index: number) => (
            <p key={index}>{para}</p>
          ))}
      </div>
    </div>
  );
};

export default CommonModal;
