const FormInputs = ({ handleCreateFolder }) => {
  return (
    <div>
      <form
        onSubmit={handleCreateFolder}
        className="card flex-shrink-0 w-full max-w-sm mx-auto mt-20 shadow-2xl bg-base-100"
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Folder Name</span>
            </label>
            <input
              type="text"
              placeholder="Folder Name"
              name="folderName"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Create Folder</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormInputs;
