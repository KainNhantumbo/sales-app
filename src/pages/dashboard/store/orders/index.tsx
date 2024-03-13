import Layout from '@/components/layout';
import { constants } from '@/data/constants';
import { _storeOrders as Container } from '@/styles/common/store-orders';

export default function Page() {

  
  return (
    <Layout metadata={{ title: ` ${constants.defaultTitle} | Store Orders` }}>
      <Container></Container>
    </Layout>
  );
}
