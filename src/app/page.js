import { CsvUpload } from '../Components/CsvUpload';
import GenerateWidget from './generate-widget/page';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <CsvUpload />
      <GenerateWidget />
    </main>
  );
}
