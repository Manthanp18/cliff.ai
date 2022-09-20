import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function dashboard() {
  const router = useRouter();

  const coloumNumber = JSON.parse(router?.query?.data);
  // const coloumNumber = router.query;
  const columnCount = coloumNumber[0].properties.gridProperties.columnCount;

  return (
    <>
      <div className="flex flex-col items-center py-32">
        <div className="text-2xl text-bg">Column Count : {columnCount}</div>
        <button
          className="py-6 text-red-500 background-transparent font-bold uppercase px-6  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={() => (window.location.href = "/subscription")}
        >
          Back
        </button>
      </div>
    </>
  );
}
