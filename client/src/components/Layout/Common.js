import { useContext } from 'react';
import { Layout, Alert } from 'antd';
import { AlertContext } from '../../context/alert';

export function Common({children}) {
  const { Content } = Layout;
  const { alertMessage, alertType, setAlertMessage } = useContext(AlertContext);

  return (
    <div>
      <Layout style={{maxWidth: '720px', margin: '0 auto' }}>
        {alertMessage && (
          <Alert type={alertType} message={alertMessage} banner closable onClose={() => setAlertMessage('')} />
        )}

        <Content style={{ padding: '48px 18px', backgroundColor: '#dddddd'}}>
          {children}
        </Content>
      </Layout>
    </div>
  )
}