import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import styles from './Sidebar.module.scss'
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader,  SidebarFooter,  SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { MAN, WOMAN, BOY, COLLECTIONS, US, NEWS, CONTACT, Unisex } from '../../consts/clothe-names';
import Footer from '../footer/Footer';
import { PbyService } from '../../services/pby-services';
import { addProductsAction, setFilterProductsAction, addArticlesAction, addMenuAction, setShowLoginAction, setProductsAction, setSessionAction } from '../../store/actions';

const Sidebar = ({products, toggled, handleToggleSidebar, dataCompany}) =>{
const [productTypes, setProductTypes] = useState<any[]>([])
const [itemHover, setItemHover] = useState('')
const dispatch = useDispatch();

 useEffect(() => {
    getAllProducts()
    getAllArticles()
    getMenuItems()
  }, [])


    useEffect(() => {
    

    // if (targetRef.current) {
    //   setDimensions({
    //     width: targetRef.current.offsetWidth,
    //     height: targetRef.current.offsetHeight
    //   });

    //   console.log(targetRef.current.offsetWidth);
    // }

    // console.log(wd);

    if (products.products.length === 0) return

    // filtro para colecciones
    if (itemHover === COLLECTIONS) {
      let productTypesMap: any[] = [...new Map(products.products.map(item => [item.Nombre_Coleccion, item])).values()];
      productTypesMap = productTypesMap.map(item => {
        return { categoria: COLLECTIONS, subCategoria: item.Nombre_Coleccion, imagen: item.Image_Colecccion }
      })
      setProductTypes(productTypesMap)
      return
    }

    // Resto de categorias
    let prodFilter
    console.log(itemHover );
    if (itemHover === BOY) {
      prodFilter = products.products.filter(item => item.Sexo === itemHover)
      
    } else {
      prodFilter = products.products.filter(item => item.Sexo === itemHover || item.Sexo === Unisex)
      console.log(prodFilter);
    }


    let productTypesMap: any[] = [...new Map(prodFilter.map(item => [item.Tipo_Producto, item])).values()];
    productTypesMap = productTypesMap.map(item => {
      // console.log(`'categoria': ${item.Sexo}, 'subCategoria': ${item.Tipo_Producto}, 'imagen': ${item.Imagen_Tipo_Producto}`);
      return { categoria: item.Sexo, subCategoria: item.Tipo_Producto, imagen: item.Imagen_Tipo_Producto }
    })

    setProductTypes(productTypesMap)
  }, [products, itemHover])

    const getAllProducts = () => {
    PbyService.getAllProducts().then(products => {
      if (!products) return
      dispatch(addProductsAction(products))
    })
  }

  const getAllArticles = () => {
    PbyService.getAllArticles().then(articles => {
      if (!articles) return
      dispatch(addArticlesAction(articles))
    })
  }

  const getMenuItems = () => {
    PbyService.getMenu().then(menu => {
      if (!menu) return
      dispatch(addMenuAction(menu))
    })
  }

 const setFilterSubmenu = (param: string | null) => {
    console.log(param);
    dispatch(setFilterProductsAction(param))
  }

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

                <SubMenu title={MAN.toUpperCase()}>                 

                    {productTypes.map((item, i) => (
                      <MenuItem>
                        <NavLink key={i} to={`/${item.categoria?.toLowerCase()=='unisex'?'unisex?s='+MAN:item.categoria.toLowerCase()}`} className={styles.item_categoria} onClick={() => {
                                // {item.subCategoria}
                              setFilterSubmenu(item.subCategoria)
                              // setShowPasarela(false)
                            }}>{item.subCategoria}
                      </NavLink>
                   </MenuItem> ))}
                 
                </SubMenu>

                <SubMenu title={WOMAN.toUpperCase()}>
                  {productTypes.map((item, i) => (
                      <MenuItem>
                        <NavLink key={i} to={`/${item.categoria?.toLowerCase()=='unisex'?'unisex?s='+WOMAN:item.categoria.toLowerCase()}`} className={styles.item_categoria} onClick={() => {
                                // {item.subCategoria}
                              setFilterSubmenu(item.subCategoria)
                              // setShowPasarela(false)
                            }}>{item.subCategoria}
                      </NavLink>
                   </MenuItem> ))}
                </SubMenu>

                {/* <MenuItem title={MAN.toUpperCase()} >
                  <NavLink to="/hombre" activeClassName={styles.activeRoute}>
                      <span>{MAN.toUpperCase()}</span>
                  </NavLink>
                </MenuItem>
                <MenuItem title={WOMAN.toUpperCase()} >
                  <NavLink to="/mujer" activeClassName={styles.activeRoute}>
                      <span>{WOMAN.toUpperCase()}</span>
                  </NavLink>
                </MenuItem> */}
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