import { useEffect, useRef } from "react";
import "../styles/Preview.css";

const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
         const root = document.querySelector('#root');
         root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
         console.error(err);
      };

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error || event.message);
      });

      window.addEventListener('message', (event) => {
        const root = document.querySelector('#root');
        root.innerHTML = ''; // Clear previous content
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview = ({ code, error }: { code: string; error: string }) => {
  const iframe = useRef<any>(null);

  const handleLoad = () => {
    iframe.current?.contentWindow?.postMessage(code, "*");
  };

  useEffect(() => {
    console.log("Code sent to iframe:", code); // Debug bundled code
    iframe.current.srcdoc = html;
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="CodeDocs"
        srcDoc={html}
        sandbox="allow-scripts allow-same-origin"
        onLoad={handleLoad}
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
