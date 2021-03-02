import React, { useEffect, useState } from 'react'
import styles from './Products.module.scss'
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import ProductDetail from './product-detail/Product-detail';
import { ProductList, ImageBanner } from '../../components';

import { connect } from 'react-redux'
import { MAN, WOMAN, BOY, COLLECTIONS, Unisex } from '../../consts/clothe-names';

const Products = (props) => {

  const { history, products, menu } = props

  let match = useRouteMatch();

  let genreU:any;

  const [productsList, setProductsList] = useState<any[]>([])
  const [menuSelected, setMenuSelected] = useState<any>({})
  const [nameCollection, setNameCollection] = useState<any>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if ((products.products as any[]).length === 0) return
    let currentProduct = (history.location.pathname as string).split('/')[1];
     const query = new URLSearchParams(history.location.search);
    genreU=query.get('s');
    console.log(currentProduct, menu,genreU, typeof genreU);
    if (menu.menu.length > 0){
      applyFilterProducts(currentProduct);
    }
      
  }, [products, menu.menu])

  // Cambio de filtro Nombre Coleccion
  useEffect(() => {
    if (!products.filter) return
    const currentProduct = (history.location.pathname as string).split('/')[1]

    if (currentProduct === COLLECTIONS.toLowerCase()) {
      const newProducts = products.products.filter(item => (item.Nombre_Coleccion as string) === products.filter)
      console.log(newProducts);
      setProductsList(newProducts)
      if (newProducts[0]) setNameCollection(newProducts[0])
    } else {
      const newProducts = products.products.filter(item => (item.Tipo_Producto as string) === products.filter && item.Sexo.toLowerCase() === currentProduct)
      setProductsList(newProducts)
    }

  }, [products.filter])

  //Filtro principal Productos
  const applyFilterProducts = (param: string) => {
    let filter = ''
    let filter2 = ''
    console.log(param);
    switch (param) {
      case MAN.toLowerCase():
        filter = MAN
        filter2 = Unisex
        break;
      case WOMAN.toLowerCase():
        filter = WOMAN
        filter2 = Unisex
        break;
      case BOY.toLowerCase():
        filter = BOY
        break;
      case COLLECTIONS.toLowerCase():
        filter = COLLECTIONS
        console.log(products.products);
        setProductsList(products.products)
        break;
      default:
        break;
    }

    if (filter !== COLLECTIONS) {
      let newProducts
      if (filter2)
        newProducts = products.products.filter(item => item.Sexo === filter || item.Sexo === filter2)
      else
        newProducts = products.products.filter(item => item.Sexo === filter)

      setProductsList(newProducts)
    }

    // seleccionar imagen banner
    let menuFind ='';
    menuFind=menu.menu.find(item => item.Nombre_Menu === filter)==undefined?menu.menu.find(item => item.Nombre_Menu === genreU):menu.menu.find(item => item.Nombre_Menu === filter);
  
     console.log(menuFind , menu.menu, filter);
    if (menuFind) {
      console.log(menuFind);
      setMenuSelected(menuFind);
    }

  }

  return (
    <Switch>
      <Route path={`${match.url}/:productId`} component={ProductDetail} />

      <Route path={`${match.url}`}>
        <ImageBanner
          title={menuSelected.Nombre_Menu}
          subtitle={menuSelected.Descripcion_Menu || ''}
          imgSrc={menuSelected.Imagen}
        // imgSrc={encabezado}
        />
        <div className={styles.products_container}>

          {nameCollection ?
            <div className={styles.products_info}>
              <h4>{nameCollection.Nombre_Coleccion}</h4>
              <p>{nameCollection.Descripcion_Coleccion}</p>
            </div>
            : null}

          <ProductList
            list={productsList}
            onClickItem={(sexo: string, id: number) => {
              history.push({ pathname: `/${sexo.toLowerCase()}/${id}` })
            }} />

        </div>
      </Route>
    </Switch >

  )
}

function mapStateToProps(state) {
  const { products, menu } = state
  return { products, menu }
}

export default connect(mapStateToProps)(Products)
