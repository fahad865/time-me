import * as React from 'react';
import { Input, DatePicker, InputNumber } from 'antd';
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
            allowClear={false}
            format="DD-MM-YYYY HH:mm:ss"
            placeholder="Select Time"
            style={{ width: '100%', margin: '-5px 0' }}
            value={moment(value)}
            onChange={e => onChange(e ? e.toDate() : value)}
          />
          : moment(value).format('DD-MM-YYYY (HH:mm:ss)'))
        :
        (editable
          ? typeof value === 'number' ?
            <InputNumber value={value} style={{ width: '100%' }} onChange={onChange} /> :
            <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
          : value)
    }
  </div>
);

export default EditableCell;