'use client';

export function AdUnitsTable({
  index,
  adUnitID,
  adCode,
  adName,
  adSizes,
  parentID,
  setOpenModal,
  setModalBody,
  targetingID,
  setTargetingID,
}) {
  const onTargetingIDChange = (value) => {
    const targetIdObject = JSON.parse(JSON.stringify(targetingID));
    targetIdObject[adUnitID] = value;
    setTargetingID(targetIdObject);
  };
  const handleModalOpen = () => {
    setModalBody({
      index,
      adUnitID,
      adCode,
      adName,
      adSizes,
      parentID,
      targetingIDs: targetingID[adUnitID],
    });
    setOpenModal(true);
  };

  return (
    <tr key={adUnitID}>
      <td>
        <span>{adUnitID}</span>
      </td>
      <td>
        <span>{adCode}</span>
      </td>
      <td>
        <span>{adName}</span>
      </td>
      <td>
        <span>{adSizes}</span>
      </td>
      <td>
        <span>{parentID}</span>
      </td>
      <td>
        <input
          label={`targeting id ${index}`}
          name={`targeting id ${index}`}
          type="text"
          onChange={(e) => onTargetingIDChange(e.target.value)}
          placeholder="Targeting ID, spit by ';'"
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
