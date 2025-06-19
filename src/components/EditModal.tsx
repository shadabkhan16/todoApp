"use client";
import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

interface EditModalProps {
  task: {
    id: number;
    text: string;
  };
  onSave: (id: number, newText: string) => void;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ task, onSave, onCancel }) => {
  const [text, setText] = useState<string>(task.text);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSave(task.id, text);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Edit Task
        </h3>
        <form onSubmit={handleSave}>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Update your task"
          />
          <div className="flex justify-end mt-6 space-x-3">
            <Button
              onClick={onCancel}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white focus:ring-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
