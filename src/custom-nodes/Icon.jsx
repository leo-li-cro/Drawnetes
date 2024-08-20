import { Handle } from '@xyflow/react';

function Icon(props) {

  const { data, selected } = props;

  const imgSrc = `icons/k8s/${data.name}.png`;

  return (
    <div className={`border-2 ${selected ? 'border-blue-400' : ''}`}>
      <img src={imgSrc} style={{ width: 60, height: 60 }} />
      <Handle id='1' type='target' position='top' />
      <Handle id='2' type='target' position='left' />
      <Handle id='3' type='source' position='right' />
      <Handle id='4' type='source' position='bottom' />
    </div>
  );
}

export default Icon;
