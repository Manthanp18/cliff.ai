import React, { Fragment } from "react";
// import { ReactComponent as DriveIcon } from "../icons/drive.svg";

function FormFields({ isAuth, isBtnLoading, handleAuthClick }) {
  const handleChange = (e) => {
    const value = e.target.value;
    window.localStorage.setItem("fileurl", value);
  };

  return (
    <Fragment>
      <div className="">
        {isAuth ? (
          <button
            disabled={isBtnLoading}
            onClick={handleAuthClick}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="button"
          >
            {/* <DriveIcon /> */}
            Add Google account
          </button>
        ) : (
          <Fragment>
            <button
              disabled={isBtnLoading}
              onClick={handleAuthClick}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              type="button"
            >
              {/* <DriveIcon /> */}
              Add Google Account
            </button>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default FormFields;
