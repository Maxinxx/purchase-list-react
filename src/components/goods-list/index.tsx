import { FC, useMemo } from 'react';
import { List, Divider } from 'antd';
import { ProductGroup, ProductItem } from '@/types/product';
import dayjs from 'dayjs';

interface GoodsListProps {
  data: ProductItem[];
  onRecordClick: (record: ProductItem) => void;
}

const GoodsList: FC<GoodsListProps> = (props) => {
  const { data, onRecordClick } = props;

  function transformRecords(records: ProductItem[]) {
    const groupObject = records.reduce((prev, cur) => {
      const { name, count, date, id } = cur;
      const dateString = dayjs(date).format('YYYY-MM-DD');
      if (prev[dateString]) {
        prev[dateString].push(cur);
      } else {
        prev[dateString] = [cur];
      }
      return prev;
    }, {} as Record<string, ProductItem[]>);

    const groups = Object.keys(groupObject)
      .map((date) => {
        const pg: ProductGroup = {
          date: date,
          group: groupObject[date],
        };
        return pg;
      })
      .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
    return groups;
  }

  const sortedData = useMemo(() => {
    return transformRecords(data);
  }, [data]);

  return (
    <List
      split={false}
      itemLayout="vertical"
      dataSource={sortedData}
      renderItem={(group) => (
        <List.Item key={group.date}>
          <>
            <Divider>{group.date}</Divider>
            <List
              split={false}
              dataSource={group.group}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  onClick={() => {
                    onRecordClick(item);
                  }}
                >
                  <div>{item.name}</div>
                  <div>{item.count}</div>
                </List.Item>
              )}
            ></List>
          </>
        </List.Item>
      )}
    ></List>
  );
};

export default GoodsList;
