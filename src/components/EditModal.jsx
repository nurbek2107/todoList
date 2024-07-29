import React, { useState, useEffect } from "react";
import FormInput from "../components/FormInput";

const EditModal = ({ isOpen, onClose, onSave, todo }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    age: "",
    familyName: "",
    email: "",
  });

  useEffect(() => {
    if (todo) {
      setFormData(todo);
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-10">
      <div className="p-8 rounded shadow-lg w-96 bg-base-100">
        <h2 className="text-2xl mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormInput
            type="text"
            labelText="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <FormInput
            type="text"
            labelText="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <FormInput
            type="text"
            labelText="Family Name"
            name="familyName"
            value={formData.familyName}
            onChange={handleChange}
          />
          <FormInput
            type="email"
            labelText="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-4">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
