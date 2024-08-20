import SelectButton from './SelectButton';
import DragButton from './DragButton';

function SelectDragToolbar({ toggleSelect, isSelect }) {

  return (
    <div className="border border-gray flex rounded-lg">
      <SelectButton toggleSelect={toggleSelect} isSelect={isSelect} />
      <DragButton toggleSelect={toggleSelect} isSelect={isSelect} />
    </div>
  );
}

export default SelectDragToolbar;