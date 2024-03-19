'use client';

import { useState } from 'react';

export function AdUnitsTable({
  index,
  adUnitID,
  adCode,
  adName,
  adSizes,
  parentID,
  setOpenModal,
  changeJSONAttributes,
  setModalBody,
}) {
  const [targetingID, setTargetingID] = useState({});
  const onTargetingIDChange = (value) => {
    const targetIdObject = JSON.parse(JSON.stringify(targetingID));
    targetIdObject[adUnitID] = value;
    setTargetingID(targetIdObject);
  };
  const handleModalOpen = () => {
    setModalBody({
      index, adUnitID, adCode, adName, adSizes, parentID,
    });
    setOpenModal(true);
  };
  return (
    <tr key={adUnitID}>
      <td>
        <input
          disabled
          label={adUnitID}
          name={adUnitID}
          value={adUnitID}
          type="text"
          onChange={(e) => changeJSONAttributes(e, { adUnitID })}
          placeholder="Type AD UNIT ID"
        />
      </td>
      <td>
        <input
          disabled
          label={adCode}
          name={adCode}
          value={adCode}
          type="text"
          onChange={(e) => changeJSONAttributes(e, adCode)}
          placeholder="Type AD Code"
        />
      </td>
      <td>
        <input
          disabled
          label={adName}
          name={adName}
          value={adName}
          type="text"
          onChange={(e) => changeJSONAttributes(e, adName)}
          placeholder="Type Ad Name"
        />
      </td>
      <td>
        <input
          disabled
          label={adSizes}
          name={adSizes}
          value={adSizes}
          type="text"
          onChange={(e) => changeJSONAttributes(e, adSizes)}
          placeholder="Type Ad Sizes, spit by ';'"
        />
      </td>
      <td>
        <input
          disabled
          label={parentID}
          name={parentID}
          value={parentID}
          type="text"
          onChange={(e) => changeJSONAttributes(e, parentID)}
          placeholder="Type Email"
        />
      </td>
      <td>
        <input
          label={`targeting id ${index}`}
          name={`targeting id ${index}`}
          type="text"
          onChange={(e) => onTargetingIDChange(e.target.value)}
          placeholder="Type Email"
        />
      </td>
      <td>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleModalOpen}
        >
          Generate
        </button>
      </td>
    </tr>
  );
}
