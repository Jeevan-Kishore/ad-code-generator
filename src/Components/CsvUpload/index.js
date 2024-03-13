'use client';

import Link from 'next/link';
import Papa from 'papaparse';
import { useState } from 'react';

export function CsvUpload() {
  const [jsonData, setJsonData] = useState([]);

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
        },
        header: true,
      });
    }
  };

  return (
    <>
      <div className="mt-4 flex text-sm leading-6 text-gray-600">
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
      <div>
        <ul className="divide-y divide-gray-100 columns-2">
          {jsonData.map(
            ({
              Id: adUnitID,
              Code: adCode,
              Name: adName,
              Sizes: adSizes,
              'Parent Id': parentID,
            }) => (
              <li key={adUnitID} className="flex justify-between gap-x-6 py-5">
                <Link
                  href={`/generate-widget?adUnitID=${adUnitID}&adCode=${adCode}&adSizes=${adSizes}&parentId=${parentID}`}
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {adCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">{adName}</p>
                    <p className="text-sm leading-6 text-gray-900">{adSizes}</p>
                  </div>
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </>
  );
}
