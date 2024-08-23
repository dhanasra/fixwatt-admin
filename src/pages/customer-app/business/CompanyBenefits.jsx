import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Stack } from '@mui/material';
import BUSINESS_ICON_1 from "../../../assets/benefits-1.png";
import BUSINESS_ICON_2 from "../../../assets/benefits-2.png";
import BUSINESS_ICON_3 from "../../../assets/benefits-3.png";
import BUSINESS_ICON_4 from "../../../assets/benefits-4.png";

const AutoSwitchingVerticalTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabCount = 3; // Number of tabs

  const items = [
    {
      icon: BUSINESS_ICON_1,
      title: "Dependable & Flexible Workforce",
      content: "Leverage our cloud-based labor pool for your blue-collar needs. Opt for a pay-as-you-go model instead of maintaining a permanent payroll."
    },
    {
      icon: BUSINESS_ICON_2,
      title: "Labor Management Platform",
      content: "Monitor all labor activities and completed tasks, ensuring you only pay for the work that gets done."
    },
    {
      icon: BUSINESS_ICON_3,
      title: "Delegate Labor-Intensive Tasks",
      content: "Eliminate the hassle of managing your own technical staff. We supply and oversee pre-screened blue-collar workers, allowing you to focus on your main operations."
    },
    {
      icon: BUSINESS_ICON_4,
      title: "Streamlined Monthly Invoicing",
      content: "Receive a single, consolidated invoice each month for all labor and services provided."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % tabCount);
    }, 3000); // Switch tabs every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabsData = [
    { title: 'Tab 1', content: 'Content 1' },
    { title: 'Tab 2', content: 'Content 2' },
    { title: 'Tab 3', content: 'Content 3' },
  ];

  return (
    <Stack direction={"row"} sx={{ height: 500, alignItems: "center", justifyContent: "center", width: "100%" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={activeTab}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider,' }}
      >
        {items.map((tab, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ textAlign: 'left', p: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: activeTab === index ? 'bold' : 'normal',
                    color: activeTab === index ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {tab.title}
                </Typography>
                {activeTab === index && (
                  <Typography
                    variant="h6"
                    sx={{ color: 'text.secondary', marginTop: '8px' }}
                  >
                    {tab.content}
                  </Typography>
                )}
              </Box>
            }
            sx={{
              alignItems: 'flex-start',
              backgroundColor: activeTab === index ? 'action.selected' : 'inherit',
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ p: 3,  }}>
        <Box component={"img"} src={items[activeTab].icon} sx={{width: "400px", height: "400px", m: "40px"}}/>
      </Box>
    </Stack>
  );
};

export default AutoSwitchingVerticalTabs;
