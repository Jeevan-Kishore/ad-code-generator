'use client';

import Papa from 'papaparse';
import { useState, useEffect } from 'react';
import { initFlowbite } from 'flowbite';
import { CodeModal } from '../CodeModal';
import { AdUnitsTable } from '../AdUnitsTable';

export function CsvUpload() {
  const [jsonData, setJsonData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalBody, setModalBody] = useState({});

  useEffect(() => {
    initFlowbite();
  }, []);

  const changeJSONAttributes = ({ key, value, index }) => {
    const deepCloneJSON = JSON.parse(JSON.stringify(jsonData));
    const jsonAtIndex = deepCloneJSON[index];
    const mutatedData = { ...jsonAtIndex, ...{ [key]: value } };
    deepCloneJSON[index] = mutatedData;
    setJsonData(deepCloneJSON);
  };

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
      <CodeModal
        modalBody={modalBody}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
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
                Targeting ID
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jsonData.map(
              (
                {
                  '#Id': adUnitID,
                  Code: adCode,
                  Name: adName,
                  Sizes: adSizes,
                  'Parent Id': parentID,
                },
                index,
              ) => (
                <AdUnitsTable
                  key={adUnitID}
                  setOpenModal={setOpenModal}
                  index={index}
                  adCode={adCode}
                  adName={adName}
                  adSizes={adSizes}
                  adUnitID={adUnitID}
                  parentID={parentID}
                  changeJSONAttributes={changeJSONAttributes}
                  setModalBody={setModalBody}
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
