import React, { useState, useEffect } from "react";
import "./App.css";

interface IBlockProps {
  cellNum: number;
  minPassed: number;
}

interface IBlockRowProps {
  rowNum: number;
  minPassed: number;
}

const Block = (props: IBlockProps) => {
  const style = ["block"];
  if (props.cellNum <= props.minPassed) {
    style.push("passed");
  }
  return <span className={style.join(" ")} />;
};

const BlockRow = (props: IBlockRowProps) => {
  return (
    <div className="block-row">
      {[...Array(211)].map((_, i) => {
        const index = 211 * props.rowNum + i;
        return (
          <Block cellNum={index} key={index} minPassed={props.minPassed} />
        );
      })}
    </div>
  );
};

const OverralStatus = (props: { minPassed: number }) => {
  return (
    <div
      style={{
        position: "relative",
        top: "20px",
        color: "#ccc",
        fontWeight: "bold",
        fontSize: "1.2em",
      }}
    >
      Minute {`${props.minPassed} of 40320`}
    </div>
  );
};

function App() {
  const [minPassed, setMinPassed] = useState(0);

  const calculateMinutesPassed = () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 7, 30, 12, 0, 0);
    const diffInMs = now.getTime() - startDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    setMinPassed(diffInMinutes);
  };

  useEffect(() => {
    calculateMinutesPassed();
    const cancellationToken = setInterval(calculateMinutesPassed, 1000 * 15);
    return () => clearInterval(cancellationToken);
  }, []);

  return (
    <div className="App">
      <div>
        {[...Array(210)].map((_, i) => (
          <BlockRow key={`row-${i}`} rowNum={i} minPassed={minPassed} />
        ))}
      </div>
      <OverralStatus minPassed={minPassed} />
    </div>
  );
}

export default App;
