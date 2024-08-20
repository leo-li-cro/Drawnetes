import PointerTool from "../svg-components/PointerTool";

function SelectButton({ toggleSelect, isSelect }) {



  return (
    <div
      className={`rounded-l-lg ${isSelect ? 'bg-pink-600' : 'bg-white'}`}
      onClick={() => {
        if (!isSelect) {
          toggleSelect();
        }
      }}>
      <PointerTool isSelect={isSelect} />
    </div>
  );
}

export default SelectButton;