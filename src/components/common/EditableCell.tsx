import * as React from 'react';
import { Input, DatePicker } from 'antd';
import * as moment from 'moment';

export interface CellProps {
  editable: boolean;
  value: any;
  onChange: (event: any) => void;
}

const EditableCell = ({ editable, value, onChange }: CellProps) => (
  <div>
    {
      moment.isDate(value)
        ? (editable
          ? <DatePicker
            showTime={true}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
            style={{ margin: '-5px 0' }}
            value={moment(value)}
            onChange={onChange}
          />
          : moment(value).format('YYYY-MM-DD (HH:mm:ss)'))
        :
        (editable
          ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
          : value)
    }
  </div>
);

export default EditableCell;