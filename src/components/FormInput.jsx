function FormInput({labelText, type, name}) {
    return (
      <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{labelText}</span>
          </div>
          <input
            type={type}
            name={name}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
    );
  }
  
  export default FormInput;
  