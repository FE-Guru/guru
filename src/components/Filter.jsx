import { useState } from "react";
import { useSelector } from "react-redux";

const Filter = () => {
  const [fllterState, useFllterState] = useState(true);
  const cateType = useSelector((state) => state.findjob.cateType);
  console.log(cateType, fllterState);
  return (
    <div className="filter">
      <div>
        <strong>시간별</strong>
        <progress id="file" max="100" value="70"></progress>
      </div>
      <div>
        <strong>재능별</strong>
        <button>재능무관</button>
      </div>
    </div>
  );
};

export default Filter;
