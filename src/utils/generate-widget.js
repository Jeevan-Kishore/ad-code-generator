'use client';

import { v4 as uuidv4 } from 'uuid';

const getSizes = (adSizeString) => {
  if (!adSizeString) return [];
  const adSizes = adSizeString.split(';').reduce(
    (acc, ce) => {
      const [x, y] = ce
        .trim()
        .split('x')
        .map((a) => parseInt(a, 10));

      /*
          Special case for ad size 300x250
        */
      if (x === 300 && y === 250) {
        acc.web.push([x, y]);
        acc.mobile.push([x, y]);
        return acc;
      }

      if (x > 320) {
        acc.web.push([x, y]);
        return acc;
      }
      acc.mobile.push([x, y]);
      return acc;
    },
    { mobile: [], web: [] },
  );
  return adSizes;
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

const getSizesTemplate = (adSizes) => {
  const { mobile = [], web = [] } = getSizes(adSizes);
  const desktopTemplate = web.length
    ? `.addSize([1000, 0], ${JSON.stringify(web)})`
    : '';
  const mobileTemplate = mobile.length
    ? `.addSize([0, 0], ${JSON.stringify(mobile)})`
    : '';
  return `${desktopTemplate}${mobileTemplate}`;
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

  return `<div'${parentContainerStyles && ` style="${parentContainerStyles}"`}>
  <div id='${placementID}'${childContainerStyles && ` style="${childContainerStyles}"`}>
    <script type="text/javascript">
      googletag.cmd.push(function() {
        const mappings = googletag
        .sizeMapping()
        ${getSizesTemplate(adSizes)}
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
