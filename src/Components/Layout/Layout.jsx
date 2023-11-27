// components/Layout.js

import React, { useState } from 'react';
import { Hidden, Drawer, IconButton } from '@material-ui/core';
import { Menu } from 'react-feather';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="flex  h-screen overflow-hidden"> {/* Add the 'sticky' class and 'top-0' to stick to the top */}
      <Hidden mdUp implementation="css">
        <IconButton color="inherit" onClick={handleDrawerOpen}>
          <Menu />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <Sidebar onClose={handleDrawerClose} />
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <Sidebar />
      </Hidden>
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
};

export default Layout;
