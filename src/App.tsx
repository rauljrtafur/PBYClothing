import React, { useEffect, useState } from 'react';
import { Switch, Route, HashRouter } from "react-router-dom";
import styles from "./App.module.scss"
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { Header, Footer, Contact, Sidebar} from './components';
import Home from './modules/home/Home';
import Products from './modules/products/Products';
import News from './modules/news/News';
import ShoppingCart from './modules/shopping-cart/ShoppingCart';
import PurchaseData from './modules/purchase-data/PpurchaseData';
import Profile from './modules/profile/Profile';
import shoppingHistory from './modules/shopping-history/shopping-history';
import AboutUs from './modules/about-us/AboutUs';
import NewsDetail from './modules/news/news-detail/News-detail';
import { VscThreeBars, VscClose } from "react-icons/vsc";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import MomentUtils from '@date-io/moment';
// Redux
import { Provider } from 'react-redux'
import store from './store/store'
import { PbyService } from './services/pby-services';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { esES } from '@material-ui/core/locale';
import moment from 'moment';
import "moment/locale/es";
import PurchaseOrder from './modules/purchase-order/PurchaseOrder';

moment.locale('es')

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#000',
      dark: '#505050',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiInputBase: {
      colorSecondary: {
        color: '#fff',
      }
    },
    MuiFormLabel: {
      colorSecondary: {
        color: '#a29c9c',
      }
    },
  }
}, esES);


const App = () => {

  useEffect(() => {
    getDataCompany()
  }, [])

  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const [dataCompany, setDataCompany] = useState<any>({})

  const getDataCompany = () => {
    PbyService.getFooterDataCompany().then(data => {
      if (!data) return
      setDataCompany(data)
    })
  }

  return (
    <HashRouter>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={'es'}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Provider store={store}>
            <Switch>
              <>

              <div className={styles.Sidebar}>
              <Sidebar
                collapsed={false}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                dataCompany={dataCompany}
              />
              </div> 


                <Header logoEncabezado={dataCompany.LogoEncabezado} />
                
              <div className={styles.Hamburguesa} onClick={handleToggleSidebar} >          
               <VscThreeBars  />         
              </div>
                <div className={styles.main_container}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/noticias" component={News} />
                  <Route exact path="/noticias/:newId" component={NewsDetail} />
                  <Route path="/unisex-H" component={Products} />
                  <Route path="/unisex-M" component={Products} />
                   <Route path="/unisex" component={Products} />
                  <Route path="/hombre" component={Products} />
                  <Route path="/mujer" component={Products} />
                  <Route path="/niño" component={Products} />
                  <Route path="/colecciones" component={Products} />
                  <Route path="/perfil" component={Profile} />
                  <Route path="/compras" component={shoppingHistory} />
                  <Route path="/nosotros" component={AboutUs} />
                  <Route path="/contacto" component={Contact} />
                  <Route path="/carrito-de-compras" component={ShoppingCart} />
                  <Route path="/datos-pago" component={PurchaseData} />
                  <Route path="/orden-compra/:id" component={PurchaseOrder} />
                  {/* <Route path="*" component={() => <div>Not Found</div>} /> */}
                </div>
              </>
            </Switch>
          </Provider>
          <Footer dataCompany={dataCompany} />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </HashRouter>
  )
}

export default App;
