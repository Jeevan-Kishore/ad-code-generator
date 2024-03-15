import { minify } from 'html-minifier-terser';
import { v4 as uuidv4 } from 'uuid';

export const generateWidgetUtil = async ({
  adCode,
  // adSizes,
  parentId,
}) => {
  if (!parentId) {
    return null;
  }
  const placementID = uuidv4();
  const slotId = `/${parentId}/${adCode}`;
  const template = `<div class="sticky-ad right">
  <div id='${placementID}' style='min-width: 160px; min-height: 600px;'>
    <script type="text/javascript">
      googletag.cmd.push(function() {
        const mappings = googletag.sizeMapping()
        .addSize([1000, 0], [
          [728, 90],
          [970, 90],
          [970, 250]
        ])
        .addSize([0, 0], [
          [320, 50],
          [300, 250]
        ])
        .build();
        googletag.defineSlot('${slotId}', [
          [970, 250],
          [320, 50],
          [970, 90],
          [300, 250],
          [728, 90]
        ], '${placementID}').defineSizeMapping(mappings).addService(googletag.pubads());
        googletag.enableServices();
        googletag.display('${placementID}');
      });
    </script>
  </div>
</div>`;
  return minify(template);
};
