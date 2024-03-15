'use client';

import Papa from 'papaparse';
import { useState, useEffect } from 'react';
import { initFlowbite } from 'flowbite';

const onChange = () => {};

export function CsvUpload() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    initFlowbite();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        beforeFirstChunk: (chunk) => {
          const lines = chunk.split('\n');
          if (
            lines[0]
            && lines[0].search(
              "#Note: Please remove semicolon (;) from your file editor's list of delimiter or separator characters.",
            )
          ) {
            lines.splice(0, 1);
          }
          return lines.join('\n');
        },
        complete: (result) => {
          setJsonData(result.data);
          console.log(result.data);
        },
        header: true,
      });
    }
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <p>asdasdasdasd</p>
      </div>
      <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
        >
          <span>Upload a file</span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept=".csv"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <div className="shadow-md sm:rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Ad unit ID
              </th>
              <th scope="col" className="px-6 py-3">
                Ad Code
              </th>
              <th scope="col" className="px-6 py-3">
                Ad Name
              </th>
              <th scope="col" className="px-6 py-3">
                Ad Sizes
              </th>
              <th scope="col" className="px-6 py-3">
                Parent ID
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jsonData.map(
              ({
                '#Id': adUnitID,
                Code: adCode,
                Name: adName,
                Sizes: adSizes,
                'Parent Id': parentID,
              }) => (
                <tr key={adUnitID}>
                  <td>
                    <input
                      label={adUnitID}
                      name={adUnitID}
                      value={adUnitID}
                      type="text"
                      onChange={(e) => onChange(e, adUnitID)}
                      placeholder="Type AD UNIT ID"
                    />
                  </td>
                  <td>
                    <input
                      label={adCode}
                      name={adCode}
                      value={adCode}
                      type="text"
                      onChange={(e) => onChange(e, adCode)}
                      placeholder="Type AD Code"
                    />
                  </td>
                  <td>
                    <input
                      label={adName}
                      name={adName}
                      value={adName}
                      type="text"
                      onChange={(e) => onChange(e, adName)}
                      placeholder="Type Ad Name"
                    />
                  </td>
                  <td>
                    <input
                      label={adSizes}
                      name={adSizes}
                      value={adSizes}
                      type="text"
                      onChange={(e) => onChange(e, adSizes)}
                      placeholder="Type Ad Sizes, spit by ';'"
                    />
                  </td>
                  <td>
                    <input
                      label={parentID}
                      name={parentID}
                      value={parentID}
                      type="text"
                      onChange={(e) => onChange(e, parentID)}
                      placeholder="Type Email"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      data-modal-target="default-modal"
                      data-modal-toggle="default-modal"
                    >
                      Generate
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
