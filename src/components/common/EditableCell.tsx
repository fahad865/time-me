import * as React from 'react';
import { Input } from 'antd';

export interface CellProps {
  editable: boolean;
  value: any;
  onChange: (event: any) => void;
}

const EditableCell = ({ editable, value, onChange }: CellProps) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

export default EditableCell;