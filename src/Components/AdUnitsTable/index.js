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
  customAttribute,
  setCustomAttribute,
}) {
  const onCustomAttrChange = (key, value) => {
    const customAttrObject = JSON.parse(JSON.stringify(customAttribute));
    const existingValues = customAttrObject[adUnitID];
    customAttrObject[adUnitID] = { ...existingValues, ...{ [key]: value } };
    setCustomAttribute(customAttrObject);
  };
  const handleModalOpen = () => {
    setModalBody({
      index,
      adUnitID,
      adCode,
      adName,
      adSizes,
      parentID,
      customAttribute,
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
        <input
          label={`targeting id ${index}`}
          name={`targeting id ${index}`}
          type="text"
          onChange={(e) => onCustomAttrChange('targetingId', e.target.value)}
          placeholder="Targeting ID, spit by ';'"
        />
      </td>
      <td>
        <input
          label={`parent container styles ${index}`}
          name={`parent container styles ${index}`}
          type="text"
          onChange={(e) => onCustomAttrChange('parentContainerStyles', e.target.value)}
          placeholder="Parent container styles"
        />
      </td>
      <td>
        <input
          label={`child container styles ${index}`}
          name={`child container styles ${index}`}
          type="text"
          onChange={(e) => onCustomAttrChange('childContainerStyles', e.target.value)}
          placeholder="Child container styles"
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
