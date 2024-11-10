import { ResizableBox } from "react-resizable";
import "../styles/Resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: any;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      minConstraints={[Infinity, 50]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      height={500}
      width={Infinity}
      resizeHandles={["s"]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
