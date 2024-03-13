import { generateWidgetUtil } from '../../utils/generate-widget';

export default async function GenerateWidget({ searchParams = {} }) {
  const widgetTemplate = await generateWidgetUtil(searchParams);
  return widgetTemplate;
}
