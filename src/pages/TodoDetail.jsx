// src/pages/TodoDetail.js
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

const TodoDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const todo = location.state?.todo;

  const [title, setTitle] = useState(todo?.title || '');
  const [age, setAge] = useState(todo?.age || '');
  const [familyName, setFamilyName] = useState(todo?.familyName || '');
  const [email, setEmail] = useState(todo?.email || '');
  const [passport, setPassport] = useState(todo?.passport || '');

  const [isEditing, setIsEditing] = useState(false);

  if (!todo) {
    return <p>Tanlangan ToDo yo'q</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const todoDoc = doc(db, "todos", todo.id);
      await updateDoc(todoDoc, {
        title,
        age,
        familyName,
        email,
        passport
      });
      toast.success("ToDo muvaffaqiyatli yangilandi");
      setIsEditing(false);
      navigate("/");
    } catch (error) {
      toast.error("ToDo yangilanishida xatolik yuz berdi");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">ToDo Tafsilotlari</h1>
      <div className="card bg-base-100 shadow-xl p-5">
        <div className='flex'>
          <div className=''>
            <img src="https://images.wallpaperscraft.ru/image/single/fon_temnyj_piatna_51861_300x168.jpg" alt="" />
          </div>
          <div className='ml-5'>
            <h1 className='text-xl font-bold'>{todo.title}</h1>
            <p>Yosh: {todo.age}</p>
            <p>Oila nomi: {todo.familyName}</p>
            <p>Email: {todo.email}</p>
            <p>Passport: {todo.passport}</p>
          </div>
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={() => setIsEditing(true)}
        >
          Tahrirlash
        </button>
      </div>

      {isEditing && (
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
                  onClick={() => setIsEditing(false)}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetail;
