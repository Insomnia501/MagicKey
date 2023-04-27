// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
import SwipeableViews from 'react-swipeable-views';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
// assets
import { useEffect, useState } from 'react';
import DiscoverPage from './discover';

export default function GeneralEcommercePage() {
  const [value, setValue] = useState(0);

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    if (props.index === 0) {
      return <DiscoverPage />;
    } else {
      return <p>{props.index}</p>;
    }
  }

  const swichTabF = (index: number) => {
    setValue(index);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return <DashboardLayout switchTab={swichTabF}>{getContent()}</DashboardLayout>;

  function getContent() {
    return (
      <>
        <Head>
          <title>Magic Key</title>
        </Head>
        <Container sx={{width: '100vw', marginTop: '40px'}}>
          <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0} />
            <TabPanel value={value} index={1} />
            <TabPanel value={value} index={2} />
          </SwipeableViews>
        </Container>
      </>
    );
  }
}
