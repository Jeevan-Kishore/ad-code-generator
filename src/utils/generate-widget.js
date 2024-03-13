import { minify } from 'html-minifier-terser';
import { v4 as uuidv4 } from 'uuid';

export const generateWidgetUtil = async ({
  adUnitID,
  adCode,
  adSizes,
  parentId,
}) => {
  console.log(adUnitID, adCode, adSizes, parentId);
  if (!parentId) {
    return null;
  }
  const placementID = uuidv4();
  const slotId = `/${parentId}/${adCode}`;
  console.log(slotId);
  const template = `<div class="sticky-ad right">
  <div id='${placementID}' style='min-width: 160px; min-height: 600px;'>
    <script type="text/javascript">
      googletag.cmd.push(function() {
        var tnieLeaderboard2 = googletag.sizeMapping().
        addSize([1000, 0], [
          [728, 90],
          [970, 90],
          [970, 250]
        ]).
        addSize([0, 0], [
          [320, 50],
          [300, 250]
        ]).
        build();
        googletag.defineSlot('/3167926/NIE_HP_728x90_970x250_970x90_320x50_300x250', [
          [970, 250],
          [320, 50],
          [970, 90],
          [300, 250],
          [728, 90]
        ], '[unique-id]').defineSizeMapping(tnieLeaderboard2).addService(googletag.pubads());
        googletag.enableServices();
        googletag.display('[unique-id]');
      });
    </script>
  </div>
</div>`;
  return minify(template);
};
