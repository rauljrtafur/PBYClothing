import React from 'react';
import { connect } from 'react-redux'

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Sidebar = ({toggled, handleToggleSidebar}) =>{
    return (
      <>
        <ProSidebar
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          Titulo
        </div>
      </SidebarHeader>
            <Menu iconShape="circle">
                <MenuItem >Dashboard</MenuItem>
                <SubMenu title="Components" >
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
                </SubMenu>
            </Menu>
            </ProSidebar>
      </>
    );
}

function mapStateToProps(state) {
    const { products, shoppingCart, session } = state
    return { products, shoppingCart, session }
  }
  
  export default connect(mapStateToProps)(Sidebar)