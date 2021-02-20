import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom';
import FormRegisterModal from '../form-register-modal/Form-register-modal';
import { FiUser, FiShoppingCart, FiLogIn } from "react-icons/fi";
import { VscThreeBars, VscClose } from "react-icons/vsc";
import LoginModal from '../login-modal/Login-modal';

import { RegisterModal } from '..';
import { ItemShoppingCart } from '../../modules/shopping-cart/Item-shopping-cart/ItemShoppingCart';
import { Badge, Button, Menu, MenuItem } from '@material-ui/core';
import { PbyService } from '../../services/pby-services';

// React redux
import { useDispatch } from 'react-redux'
import { addProductsAction, setFilterProductsAction, addArticlesAction, addMenuAction, setShowLoginAction, setProductsAction, setSessionAction } from '../../store/actions';
import { connect } from 'react-redux'
import { MAN, WOMAN, BOY, COLLECTIONS, US, NEWS, CONTACT, Unisex } from '../../consts/clothe-names';


const Header = (props) => {

  const { products, shoppingCart, session, logoEncabezado = '' } = props

  const [showPasarela, setShowPasarela] = useState(false)
  // const [pasarelaList, setPasarelaList] = useState<any[]>([])
  const [productTypes, setProductTypes] = useState<any[]>([])
  const [itemHover, setItemHover] = useState('')
  const [showModal, setShowModal] = useState<boolean>(true)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false)
  const [showShoopinCartPreview, setShowShoopinCartPreview] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [mainMenuVisible, setMainMenuVisible] = useState<boolean>(true)
  const [stateCollectionMenu, setCollectionMenu] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    getAllProducts()
    getAllArticles()
    getMenuItems()
    setProductsSaved()
    setSessionSaved()
  }, [])

  useEffect(() => {
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
    if (itemHover === BOY) {
      prodFilter = products.products.filter(item => item.Sexo === itemHover)
    } else {
      prodFilter = products.products.filter(item => item.Sexo === itemHover || item.Sexo === Unisex)
    }


    let productTypesMap: any[] = [...new Map(prodFilter.map(item => [item.Tipo_Producto, item])).values()];
    productTypesMap = productTypesMap.map(item => {
      return { categoria: item.Sexo, subCategoria: item.Tipo_Producto, imagen: item.Imagen_Tipo_Producto }
    })

    setProductTypes(productTypesMap)
  }, [products, itemHover])

  useEffect(() => {
    setShowLoginModal(session.showLogin)
  }, [session.showLogin])

  useEffect(() => {

  }, [session.session])

  const setProductsSaved = () => {
    const strLS = localStorage.getItem('products');
    if (!strLS) return
    const products = JSON.parse(strLS)
    dispatch(setProductsAction(products))
  }

  const setSessionSaved = () => {
    const strLS = localStorage.getItem('session');
    if (!strLS) return
    const sessioLS = JSON.parse(strLS)
    dispatch(setSessionAction(sessioLS))
  }

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
    dispatch(setFilterProductsAction(param))
  }

  return (
    <header className={styles.header} onPointerLeave={() => setShowPasarela(false)}>

      <LoginModal show={showLoginModal}
        onClosed={() => {
          dispatch(setShowLoginAction(false))
        }}
        openRegisterModal={() => {
          setShowRegisterModal(true)
          dispatch(setShowLoginAction(false))
        }} />
      <RegisterModal show={showRegisterModal}
        openLoginModal={() => {
          setShowRegisterModal(false)
          dispatch(setShowLoginAction(true))
        }}
        onClosed={() => setShowRegisterModal(false)} />
      <FormRegisterModal show={showModal} onClosed={() => setShowModal(false)} />

      <div className={styles.header_container}>
        <div className={styles.iconButtonMenu}>
          {mainMenuVisible
            ? <VscClose onClick={() => setMainMenuVisible((current) => !current)} />
            : <VscThreeBars onClick={() => setMainMenuVisible((current) => !current)} />
          }
        </div>

        <div className={styles.image_content}
          onPointerOver={() => setShowPasarela(false)}>
          <NavLink to="/">
            <img src={logoEncabezado} alt="" />
          </NavLink>
        </div>

        <div className={styles.navigation} style={{ display: mainMenuVisible ? 'flex' : 'none' }}>
          <li className={styles.item_li}
            onPointerOver={() => {
              if (showShoopinCartPreview) return
              setShowPasarela(true)
              setItemHover(MAN)
            }}>
            <NavLink to="/hombre" activeClassName={styles.activeRoute} onClick={() => setFilterSubmenu(null)}>
              <span>{MAN.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onPointerOver={() => {
              if (showShoopinCartPreview) return
              setShowPasarela(true)
              setCollectionMenu(false)
              setItemHover(WOMAN)
            }}>
            <NavLink to="/mujer" activeClassName={styles.activeRoute} onClick={() => setFilterSubmenu(null)}
              onPointerOver={() => {
                setCollectionMenu(false)
              }}>
              <span>{WOMAN.toUpperCase()}</span>
            </NavLink>
          </li>
          {/* <li className={styles.item_li}
            onPointerOver={() => {
              if (showShoopinCartPreview) return
              setShowPasarela(true)
              setItemHover(BOY)
            }}>
            <NavLink to="/niño" activeClassName={styles.activeRoute} onClick={() => setFilterSubmenu(null)}>
              <span>{BOY.toUpperCase()}</span>
            </NavLink>
          </li> */}
          <li className={styles.item_li}
            onPointerOver={() => {
              if (showShoopinCartPreview) return
              setShowPasarela(true)
              setItemHover(COLLECTIONS)
            }}>
            <NavLink to="/colecciones" activeClassName={styles.activeRoute} onClick={(e) => {
              e.preventDefault()
              setFilterSubmenu(null)

            }} onPointerOver={() => { setCollectionMenu(true) }}>
              <span>{COLLECTIONS.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onPointerOver={() => {
              setShowPasarela(false)
            }}>
            <NavLink to="/nosotros" activeClassName={styles.activeRoute}>
              <span>{US.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onClick={() => {
            }}
            onPointerOver={() => { }}>
            <NavLink to="/noticias" activeClassName={styles.activeRoute}>
              <span>{NEWS.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onPointerOver={() => {
              // setShowPasarela(true)
            }}>
            <NavLink to="/contacto" activeClassName={styles.activeRoute}>
              <span>{CONTACT.toUpperCase()}</span>
            </NavLink>
          </li>
        </div>

        <div className={styles.icon_buttons} style={{ display: mainMenuVisible ? 'flex' : 'none' }}>

          {session.session ?
            <div className={styles.loggedContent}>
              <span style={{ fontSize: '.6em' }}>Hola {session.session.FirstName}</span>
              <FiUser aria-controls="simple-menu" aria-haspopup="true"
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }} />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null); }}
              >
                <MenuItem onClick={() => { setAnchorEl(null) }}>
                  <NavLink className={styles.linkItem} to="/perfil">Mi perfil</NavLink>
                </MenuItem>
                <MenuItem onClick={() => { setAnchorEl(null) }}>
                  <NavLink className={styles.linkItem} to="/compras">Compras realizadas</NavLink>
                </MenuItem>
                {session.session.TypeUser == 19 ?
                  <MenuItem onClick={() => { setAnchorEl(null) }}>
                    <a href="https://www.pbyclothing.com/Inicio" target="_blank" className={styles.linkItem}>Administrar sitio</a>
                  </MenuItem>
                  : null}
                {/* <MenuItem onClick={() => { setAnchorEl(null); }}>Mi cuenta</MenuItem> */}
                <MenuItem onClick={() => {
                  dispatch(setSessionAction(null))
                  setAnchorEl(null)
                }}>
                  <NavLink className={styles.linkItem} to="/">Cerrar sesión</NavLink>
                </MenuItem>
              </Menu>
            </div>
            :
            <FiLogIn onClick={() => {
              dispatch(setShowLoginAction(true))
            }} />
          }

          <Badge badgeContent={shoppingCart.products.length} color="primary" onClick={() => setShowShoopinCartPreview(true)}>
            <FiShoppingCart />
          </Badge>
        </div>
      </div>
      {/* LogoEncabezado */}
      <div className={styles.pasarela_products} style={{ height: showPasarela ? '270px' : 0, opacity: showPasarela ? '1' : '0' }}>
        <div className={styles.pasarela_content} >
          <ul className={styles.new_arrivals} >
            {!stateCollectionMenu && <a>CATEGORÍAS</a>}

            {!stateCollectionMenu && productTypes.map((item, i) => (
              <NavLink key={i} to={`/${item.categoria?.toLowerCase()}`} className={styles.item_categoria} onClick={() => {

                setFilterSubmenu(item.subCategoria)
                setShowPasarela(false)
              }}>{item.subCategoria}</NavLink>
            ))}
          </ul>
          <ul className={styles.images_list} style={{paddingRight: stateCollectionMenu ? '18%': 0}}>
            {productTypes.slice(0, 5).map((item, i) => (
              <NavLink key={i} to={`/${item.categoria?.toLowerCase()}`} onClick={() => {
                setFilterSubmenu(item.subCategoria)
                setShowPasarela(false)
                // history.push({ pathname: `/${item.Sexo}` })
              }} className={styles.item_nav}>
                <img src={item.imagen} alt={item.categoria} />
                <span>{item.subCategoria}</span>
              </NavLink>
            ))}
          </ul>

        </div>
      </div>


      {showShoopinCartPreview ? (
        <div className={styles.shopping_content} onClick={() => setShowShoopinCartPreview(false)}>
          <div className={styles.container}>
            <div className={styles.body_shopping}>
              <div className={styles.header_shopping}>
                <h5>Carrito de Compras</h5>
                <i
                  className={styles.close_icon + ' material-icons'}
                  onClick={() => { }}>
                  highlight_off</i>

              </div>
              {shoppingCart.products.map((item, i) => (
                <ItemShoppingCart preview key={i} dataProduct={item} />
              ))}
            </div>
            <div>
              <NavLink to="/carrito-de-compras" activeClassName={styles.activeRoute}>
                <Button color="primary" style={{ width: '100%', marginTop: '2em' }} onClick={() => {
                  // history.push({ pathname: '/datos-pago' })
                }} variant="contained" disabled={shoppingCart.products.length === 0}>Carito de Compras</Button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : null}

    </header>
  )
}

function mapStateToProps(state) {
  const { products, shoppingCart, session } = state
  return { products, shoppingCart, session }
}

export default connect(mapStateToProps)(Header)