import { Button, Form, Input, FormProps, InputNumber } from 'antd';
import { ProductItem } from '@/types/product';
import DateTimeStampPicker from '../date-timestamp-picker';

interface RecordPanelProps extends FormProps {
  onSubmit: (item: ProductItem) => void;
  data: ProductItem;
}

export default function RecordPanel(props: RecordPanelProps) {
  const { onSubmit, data, ...restProps } = props;

  const onFinish = (values: Omit<ProductItem, 'id'>) => {
    const { name, count, date } = values;
    const product: ProductItem = {
      name,
      count,
      date,
      id: data.id !== -1 ? data.id : Math.floor(Math.random() * 100000),
    };
    onSubmit(product);
  };

  return (
    <Form {...restProps} onFinish={onFinish} initialValues={data}>
      <Form.Item
        label="商品名称"
        name="name"
        rules={[{ required: true, message: '请输入商品名称！' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item
        label="数量"
        name="count"
        rules={[{ required: true, message: '请输入商品数量!' }]}
      >
        <InputNumber
          min={1}
          max={10000}
          style={{ width: '100%' }}
          placeholder="请输入"
        />
      </Form.Item>

      <Form.Item
        label="日期"
        name="date"
        rules={[{ required: true, message: '请输入日期!' }]}
      >
        <DateTimeStampPicker />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
