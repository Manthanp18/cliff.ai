import React, { useState, useEffect } from "react";
import { upload, getSheet } from "../urls/file";
import Link from "next/link";

import { useRouter } from "next/router";
export default function Modal({ modal, driveData }) {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(true);
  let [sheetId, setSheetId] = useState("");
  let [sheetDatas, setSheetData] = useState();
  let [tabId, setTabId] = useState();
  //   let [result1, setResult1] = useState([]);
  // console.log(JSON.parse(tabId));
  // console.log(tabId);
  let result = sheetDatas?.data?.data?.sheets.filter(
    (o1) => o1.properties.title == tabId
  );
  //   console.log([result]);

  useEffect(() => {
    async function handleSubmit() {
      const tokens = JSON.parse(
        window.localStorage.getItem("tokens") || "null"
      );

      const sheetData = await getSheet(tokens, sheetId);
      setSheetData(sheetData);
      //   console.log(sheetData);
    }
    handleSubmit();
  }, [sheetId]);

  let handleFruitChange = (e) => {
    setSheetId(e.target.value);
  };
  let handleTabChange = (e) => {
    console.log(e.target.value);
    setTabId(e.target.value);
  };
  let onSubmit = () => {
    router.push(
      {
        pathname: "/dashboard",
        query: {
          data: JSON.stringify(result),
        }, // the data,
      },
      "/dashboard"
    );
  };

  return (
    <>
      <>
        {showModal ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col p-5 border-b border-solid border-slate-200 rounded-t">
                  <select
                    onChange={handleFruitChange}
                    className=" mb-1 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="⬇️ Select a Sheet ⬇️">
                      {" "}
                      Select a Sheet
                    </option>

                    {driveData?.data?.data?.map((fruit) => (
                      <option value={fruit.id}>{fruit.name}</option>
                    ))}
                  </select>
                  {sheetId && (
                    <select
                      onChange={handleTabChange}
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option
                        value="⬇️ Select a Tab ⬇️"

                        // className="w-full py-3 border-2"
                      >
                        {" "}
                        Select a Tab
                      </option>

                      {sheetDatas?.data?.data?.sheets.map((fruit, x) => (
                        <option
                          key={fruit.properties.title}
                          value={fruit.properties.title}
                        >
                          {fruit.properties.title}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                {/*body*/}

                <div className="flex items-center justify-between px-3 py-2  border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {/* <Link
                    href={{
                      pathname: "/dashboard",
                      query: {
                        data: JSON.stringify(result),
                      }, // the data
                    }}
                  >
                    <a>Confirm</a>
                  </Link> */}
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onSubmit}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
      </>
    </>
  );
}
