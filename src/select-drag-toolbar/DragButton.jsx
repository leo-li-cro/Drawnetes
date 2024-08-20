import HandTool from "../svg-components/HandTool";

function DragButton({ toggleSelect, isSelect }) {

  return (
    <div
      className={`rounded-r-lg ${isSelect ? 'bg-white' : 'bg-pink-600'}`}
      onClick={() => {
        if (isSelect) {
            toggleSelect();
        }
      }}
      >
      <HandTool isSelect={isSelect}/>
    </div>
  );
}

export default DragButton;
