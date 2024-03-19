import { useRef, useEffect } from 'react';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import { getWidgetCode } from '../../utils/generate-widget';

hljs.registerLanguage('javascript', javascript);

export function ModalContent({ modalBody }) {
  const codeRef = useRef(null);
  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);
  return (
    <div className="space-y-6">
      <pre>
        <code className="javascript" ref={codeRef}>
          {getWidgetCode(modalBody)}
        </code>
      </pre>
    </div>
  );
}
