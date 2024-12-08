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
       const root = document.querySelector('#root')
       root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
       console.error(err);
    }

    window.addEventListener('error', (event) => {
      event.preventDefault()
      handleError(event.error)
    })

    window.addEventListener('message', (event) => {
      try {
        eval(event.data)
      } catch(err) {
        handleError(err)
      }
    }, false)
  </script>
  </body>
</html>
`;

const Preview = ({ code, error }: { code: string; error: string }) => {
  const iframe = useRef<any>(null);

  // const handleLoad = () => {
  //   // After the iframe resets and loads the new srcDoc content, post the code
  //   iframe.current?.contentWindow?.postMessage(code, "*");
  // };

  useEffect(() => {
    // Reset the iframe by setting the srcDoc, which will trigger the onLoad event
    iframe.current.srcdoc = html;
    // iframe.current?.contentWindow?.postMessage(code, "*");

    setTimeout(() => {
      iframe.current?.contentWindow?.postMessage(code, "*");
    }, 10);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="CodeDocs"
        srcDoc={html}
        sandbox="allow-scripts allow-modals"
        // onLoad={handleLoad}
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
