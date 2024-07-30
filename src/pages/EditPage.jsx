import { useLocation } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

function EditPage() {
  const { state } = useLocation();
  const [formData, setFormData] = useState(state || { age: '', familyName: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDoc = {
      ...formData,
      uid: state?.uid,
      createAt: serverTimestamp(),
    };
    await addDoc(collection(db, "todos"), newDoc);
    toast.success("Successfully Added");
  };

  return (
    <div className="site-container">
      <div className="pt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 card bg-base-100 w-96 shadow-xl p-5"
        >
          <FormInput
            type="text"
            labelText="ID"
            name="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          <FormInput
            type="text"
            labelText="Family Name"
            name="familyName"
            value={formData.familyName}
            onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
          />
          <div className="w-full pl-3">
            <button type="submit" className="btn btn-active font-bold rounded mt-8 w-80">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPage;
