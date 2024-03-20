'use client';

import { v4 as uuidv4 } from 'uuid';

const getSizes = (adSizeString) => {
  if (!adSizeString) return [];
  const adSizes = adSizeString.split(';').reduce((acc, ce) => {
    acc.push(
      ce
        .trim()
        .split('x')
        .map((x) => parseInt(x, 10)),
    );
    return acc;
  }, []);
  return JSON.stringify(adSizes);
};

const getTargetingIds = (customAttribute, adUnitID) => {
  const { targetingId } = customAttribute[adUnitID] || {};
  if (!targetingId) return [];
  const targetingIDArray = targetingId.split(';').reduce((acc, id) => {
    const x = id.trim();
    if (x) acc.push(x);
    return acc;
  }, []);
  return JSON.stringify(targetingIDArray);
};

export const getWidgetCode = (modalBody = {}) => {
  const {
    adCode,
    // adName,
    adSizes,
    adUnitID,
    // index,
    parentID,
    customAttribute,
  } = modalBody;
  const { parentContainerStyles = '', childContainerStyles = '' } = customAttribute[adUnitID] || {};
  const placementID = uuidv4();
  const slotId = `/${parentID}/${adCode}`;
  const sizeArray = getSizes(adSizes);

  return `<div'${parentContainerStyles && ` style="${parentContainerStyles}"`}>
  <div id='${placementID}'${childContainerStyles && ` style="${childContainerStyles}"`}>
    <script type="text/javascript">
      googletag.cmd.push(function() {
        const mappings = googletag
        .sizeMapping()
        .addSize([1000, 0], ${sizeArray})
        .addSize([0, 0], ${sizeArray})
        .build();
        
        googletag.defineSlot('${slotId}', [
          [970, 250],
          [320, 50],
          [970, 90],
          [300, 250],
          [728, 90]
        ], '${placementID}')
        .setTargeting('adTargetingId', ${getTargetingIds(customAttribute, adUnitID)})
        .defineSizeMapping(mappings)
        .addService(googletag.pubads());
        
        googletag.enableServices();
        googletag.display('${placementID}');
      });
    </script>
  </div>
</div>`;
};
