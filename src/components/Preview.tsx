import { useEffect, useRef } from "react";
import "../styles/Preview.css";

const html = `
<html>
  <head></head>
  <body>
  <div id="root"></div>
  <script>
    window.addEventListener('message', (event) => {
      try {
        eval(event.data)
      } catch(err) {
       const root = document.querySelector('#root')
       root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
       console.error(err);
      }
    }, false)
  </script>
  </body>
</html>
`;

const Preview = ({ code }: { code: string }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    // After the iframe resets and loads the new srcDoc content, post the code
    iframe.current?.contentWindow?.postMessage(code, "*");
  };

  useEffect(() => {
    // Reset the iframe by setting the srcDoc, which will trigger the onLoad event
    if (iframe.current) {
      iframe.current.srcdoc = html;
    }
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="CodeDocs"
        srcDoc={html}
        sandbox="allow-scripts allow-modals"
        onLoad={handleLoad}
      />
    </div>
  );
};

export default Preview;
