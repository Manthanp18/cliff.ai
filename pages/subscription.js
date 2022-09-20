import { Fragment, useEffect, useState } from "react";
import { getAuthUrl, getToken } from "./urls/auth";
import { upload, getSheet } from "./urls/file";
// import "../App.css";
import FormFields from "./components/Form";
import ProgressViewer from "./components/ProgressViewer";
import Modal from "./components/Modal";

function Homepage() {
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [driveData, setDriveData] = useState();
  const [sheetData, setSheetData] = useState();
  const [modal, setModal] = useState(false);

  // console.log(sheetId);
  useEffect(() => {
    const tokens = JSON.parse(window.localStorage.getItem("tokens") || "null");
    const url = new URL(window.location.href);

    let fileUrl = url.searchParams.get("url");
    const urlInput = document.getElementById("url");
    if (fileUrl) {
      window.localStorage.setItem("fileurl", fileUrl);
    } else {
      fileUrl = window.localStorage.getItem("fileurl");
    }
    if (fileUrl && urlInput) urlInput.value = fileUrl;

    if (tokens && new Date(tokens.expiry_date) > new Date()) {
      setAuth(true);
      const userData = JSON.parse(
        window.localStorage.getItem("user") || "null"
      );
      if (userData) setUser(userData);
      return;
    } else {
      window.localStorage.removeItem("tokens");
      window.localStorage.removeItem("user");
    }

    const code = url.searchParams.get("code");

    if (code) {
      getToken(code).then((data) => {
        if (data.success) {
          window.localStorage.setItem("tokens", JSON.stringify(data.tokens));
          window.localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          setAuth(true);
        }
      });
    }
  }, []);
  async function handleAuthClick() {
    setBtnLoading(true);
    const data = await getAuthUrl();
    if (data.success) {
      window.location.href = data.authUrl;
    }
    setBtnLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBtnLoading(true);

    const tokens = JSON.parse(window.localStorage.getItem("tokens") || "null");
    // console.log(tokens);
    if (!tokens) {
      setAuth(false);
      setUser(null);
      return;
    }
    const drivedata = await upload(tokens);

    // console.log(data);
    setDriveData(drivedata);

    setModal(true);
    setBtnLoading(false);
  }

  function handleLogout() {
    setAuth(false);
    window.localStorage.removeItem("tokens");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("uploadData");
    setUser(null);
  }

  return (
    <div className="px-52 py-36">
      <div className="flex justify-end">
        <FormFields
          isAuth={isAuth}
          handleAuthClick={handleAuthClick}
          isBtnLoading={isBtnLoading}
        />
      </div>
      {!isAuth && (
        <div className="flex justify-center py-10 text-transparent text-5xl bg-clip-text bg-gradient-to-r from-red-400 to-pink-900">
          No Account Added
        </div>
      )}
      {/* <div onClick={handleSubmit}>Hello</div> */}
      {isAuth && (
        <div className="flex justify-between w-full mt-10 border-2 rounded-full py-3 px-4 bg-slate-200">
          <div className="flex  ">
            <img className="w-10 h-10 rounded-full" src={user.picture} alt="" />
            <div className="px-3 pt-2">{user.name}</div>
          </div>
          <div className="flex">
            <div
              onClick={handleSubmit}
              className=" mx-5 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
            >
              Add Sheet
            </div>
            <div
              onClick={handleLogout}
              className=" text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
            >
              Remove
            </div>
          </div>
          {modal ? <Modal driveData={driveData} modal={modal} /> : null}
        </div>
      )}
    </div>
  );
}

export default Homepage;
