import { Layout, Button, Drawer, Empty } from 'antd';
import GoodsList from '@/components/goods-list';
import RecordPanel from '@/components/record-panel';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { ProductItem } from '@/types/product';
import { PRODUCT_STORAGE_KEY } from '@/constants';
import './index.less';

const { Header, Footer, Content } = Layout;

export default function App() {
  const [showPanel, setShowPanel] = useState(false);
  const [goodsList, setGoodsList] = useState<ProductItem[]>([]);
  const [selectId, setSelectId] = useState(-1);

  useEffect(() => {
    setGoodsList(getProductStorage());
  }, []);

  const handleRecordButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    setShowPanel(true);
    setSelectId(-1);
  };

  const handleSubmit = (value: ProductItem) => {
    const isEdit = goodsList.some((item) => item.id === value.id);
    const finalGoodsList = isEdit
      ? goodsList.map((item) => {
          if (item.id === value.id) {
            return value;
          }
          return item;
        })
      : [...goodsList, value];

    setGoodsList(finalGoodsList);
    setShowPanel(false);
    setProductStorage(finalGoodsList);
  };

  const handelRecordClick = (record: ProductItem) => {
    setShowPanel(true);
    setSelectId(record.id);
  };

  const getProductStorage = (): ProductItem[] => {
    return JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY) || '[]');
  };

  const setProductStorage = (data: ProductItem[]): void => {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(data));
  };

  const panelData: ProductItem = useMemo(() => {
    const selectItem = goodsList.find((item) => item.id === selectId);
    return (
      selectItem || {
        name: '',
        count: 1,
        id: -1,
        date: Date.now(),
      }
    );
  }, [selectId, goodsList]);

  return (
    <Layout>
      <Header className="header">鲨鱼记账</Header>
      <Content className="content">
        {goodsList.length > 0 ? (
          <GoodsList data={goodsList} onRecordClick={handelRecordClick} />
        ) : (
          <Empty className="empty" description={false} />
        )}
      </Content>
      <Footer className="footer">
        <Button
          className="record-button"
          type="primary"
          shape="circle"
          onClick={handleRecordButtonClick}
        >
          +
        </Button>
      </Footer>

      <Drawer
        open={showPanel}
        onClose={() => setShowPanel(false)}
        closeIcon={null}
        placement="bottom"
        headerStyle={{ display: 'none' }}
        destroyOnClose
      >
        <RecordPanel
          className="panel"
          onSubmit={handleSubmit}
          data={panelData}
        />
      </Drawer>
    </Layout>
  );
}
