import { DatePicker } from 'antd';
import { FC } from 'react';
import dayjs from 'dayjs';

export interface DateTimeStampPickerProps {
  value?: number;
  onChange?: (value: number) => void;
}

const DateTimeStampPicker: FC<DateTimeStampPickerProps> = (props) => {
  const { value = 0, onChange } = props;
  return (
    <DatePicker
      value={dayjs(value)}
      style={{ width: '100%' }}
      placeholder="请选择"
      onChange={(date) => {
        onChange?.((date?.unix() || 0) * 1000);
      }}
    />
  );
};

export default DateTimeStampPicker;
