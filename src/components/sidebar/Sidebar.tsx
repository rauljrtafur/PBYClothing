import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import styles from './Sidebar.module.scss'
import { NavLink, Link } from 'react-router-dom';

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
import { MAN, WOMAN, BOY, COLLECTIONS, US, NEWS, CONTACT, Unisex } from '../../consts/clothe-names';
import Footer from '../footer/Footer';

const Sidebar = ({toggled, handleToggleSidebar, dataCompany}) =>{


    return (
      <>
        <ProSidebar
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
        color="#000000"
        className={styles.pro_sidebar}
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
          MENÚ
        </div>
      </SidebarHeader>
      <SidebarContent>
            <Menu iconShape="circle">
                <MenuItem title={MAN.toUpperCase()} >
                  <NavLink to="/hombre" activeClassName={styles.activeRoute}>
                      <span>{MAN.toUpperCase()}</span>
                  </NavLink>
                </MenuItem>
                <MenuItem title={WOMAN.toUpperCase()} >
                  <NavLink to="/mujer" activeClassName={styles.activeRoute}>
                      <span>{WOMAN.toUpperCase()}</span>
                  </NavLink>
                </MenuItem>
                <MenuItem title={COLLECTIONS.toUpperCase()} >
                  <NavLink to="/colecciones" activeClassName={styles.activeRoute}>
                      <span>{COLLECTIONS.toUpperCase()}</span>
                  </NavLink>
                </MenuItem>
                <MenuItem  onClick={handleToggleSidebar}>
                    <NavLink to="/nosotros">
                    <span>{US.toUpperCase()}</span>
                    </NavLink>
                </MenuItem>
                <MenuItem >
                <NavLink to="/noticias">
                    <span>{NEWS.toUpperCase()}</span>
                    </NavLink>
                </MenuItem>
                <MenuItem >
                <NavLink to="/contacto" activeClassName={styles.activeRoute}>
              <span>{CONTACT.toUpperCase()}</span>
            </NavLink>
                </MenuItem>
            </Menu>
      </SidebarContent>

      <SidebarFooter>
        <div className={styles.imgPBY}>
          <img src={dataCompany.LogoEncabezado}  alt="" />
        </div>
      </SidebarFooter>
    </ProSidebar>
      </>
    );
}

function mapStateToProps(state) {
    const { products, shoppingCart, session } = state
    return { products, shoppingCart, session }
  }
  
  export default connect(mapStateToProps)(Sidebar)