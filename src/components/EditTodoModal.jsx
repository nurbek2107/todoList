import { useState } from 'react';

const EditTodoModal = ({ todo, isEditing, onSave, onCancel }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [age, setAge] = useState(todo?.age || '');
  const [familyName, setFamilyName] = useState(todo?.familyName || '');
  const [email, setEmail] = useState(todo?.email || '');
  const [passport, setPassport] = useState(todo?.passport || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...todo, title, age, familyName, email, passport });
  };

  return (
    isEditing && (
      <div className="modal modal-open">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-lg">
              <span className="font-bold">Sarlavha:</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
            <label className="text-lg">
              <span className="font-bold">Yosh:</span>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
            <label className="text-lg">
              <span className="font-bold">Oila nomi:</span>
              <input
                type="text"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
            <label className="text-lg">
              <span className="font-bold">Email:</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
            <label className="text-lg">
              <span className="font-bold">Passport:</span>
              <input
                type="text"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                O'zgarishlarni saqlash
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditTodoModal;
