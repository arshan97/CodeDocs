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

const Preview = ({ code }: { code: string }) => {
  const iframe = useRef<any>(null);

  const handleLoad = () => {
    // After the iframe resets and loads the new srcDoc content, post the code
    iframe.current?.contentWindow?.postMessage(code, "*");
  };

  useEffect(() => {
    // Reset the iframe by setting the srcDoc, which will trigger the onLoad event
    iframe.current.srcdoc = html;
    // setTimeout(() => {
    //   iframe.current?.contentWindow?.postMessage(code, "*");
    // }, 50);
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
