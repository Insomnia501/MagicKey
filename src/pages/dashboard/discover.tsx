// next
import Head from 'next/head';
// @mui
import { Container, Tabs, Tab } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
import SwipeableViews from 'react-swipeable-views';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
// assets
import { useEffect, useState } from 'react';

export default function DiscoverPage() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { themeStretch } = useSettingsContext();

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    return <p>{props.index}</p>;
  }

  const swichTabF = (index: number) => {
    setValue(index);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'} sx={{marginTop: '0px'}}>
      <Tabs value={value} aria-label="basic tabs example" onChange={handleChange}>
        <Tab label="Top Gainer" />
        <Tab label="Top Loser" />
        <Tab label="Anylysis" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} />
        <TabPanel value={value} index={1} />
        <TabPanel value={value} index={2} />
      </SwipeableViews>
    </Container>
  );
}
