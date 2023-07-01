import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import store from "../store/store";
import { getPrecioConDescuento } from "../shared/utils";

const clienteAxios = axios.create({
  baseURL: "https://www.pbyclothing.com",
  // baseURL: 'https://localhost:44336'
});

const getAllProducts = () => {
  return clienteAxios
    .post<any[]>(`api/products`)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const getAllArticles = () => {
  return clienteAxios
    .post<any[]>(`api/articles`)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const getMenu = () => {
  return clienteAxios
    .post<any[]>(`api/Menu`)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const getProductDetail = (Id: string) => {
  return clienteAxios
    .post<any[]>(`api/productDetail`, { Id })
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const getSocialNetwork = () => {
  return clienteAxios
    .post<any[]>(`api/SocialNetwork`)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const getArticleBlog = () => {
  return clienteAxios
    .post<any[]>(`api/ArticleBlog`)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const getFooterMenu = () => {
  return clienteAxios
    .post<any[]>(`api/Footer/FooterMenu`)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const getFooterDataCompany = () => {
  return clienteAxios
    .post<any[]>(`api/Footer/DataCompany`)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const getCountries = (countrySearch: string) => {
  return clienteAxios
    .post<any[]>(`api/location/country`, { Data: countrySearch })
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const getCities = (countyCode: string) => {
  return clienteAxios
    .post<any[]>(`api/location/city`, { Data: "", DataId: countyCode })
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};
const OrderBuyHistoryByPerson = (Id) => {
  return clienteAxios
    .post<any[]>(`api/NewOrderBuy/ListOrderBuyByPerson`, { Id })
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const listProductByOrderBuy = (Id) => {
  return clienteAxios
    .post<any[]>(`api/NewOrderBuy/ListProductByOrderBuy`, { Id })
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const validationCode = (code: string, Email: string) => {
  return clienteAxios
    .post<any[]>(`api/validacionCode`, { Data: code.trim(), Email })
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const login = (Identification: string, password: string) => {
  return clienteAxios
    .post<any[]>(`Acceso/AuthService`, { Identification, password })
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const newsLetterRegister = (
  FirstName: string,
  LastName: string,
  Email: string
) => {
  return clienteAxios
    .post<any[]>(`api/Register/NewsLetterRegister`, {
      FirstName,
      LastName,
      Email,
    })
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const register = (registerData) => {
  return clienteAxios
    .post<any[]>(`api/Register/PersonRegister`, registerData)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const updatePerson = (person) => {
  return clienteAxios
    .post<any[]>(`api/Register/PersonUpdate`, person)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const sendContact = (contact) => {
  return clienteAxios
    .post<any[]>(`api/Register/SendContact`, contact)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const newOrderBuy = (DatosFactura: any) => {
  const storeRedux = store.getState();

  const { shoppingCart, session } = storeRedux;

  let PriceTotal = 0;
  const Products = shoppingCart.products.map((item) => {
    PriceTotal += getPrecioConDescuento(
      item.Precio,
      item.C__Descuento,
      item.Aplica_Descuento
    );
    return {
      ProductId: item.Id_Producto_Detalle,
      Cantidad: item.CantidadCompra,
      Precio: getPrecioConDescuento(
        item.Precio,
        item.C__Descuento,
        item.Aplica_Descuento
      ),
    };
  });

  const data = {
    PriceTotal,
    PriceDiscount: shoppingCart.promotionalCode
      ? (PriceTotal * Number(shoppingCart.promotionalCode.discountValue)) / 100
      : 0,
    PriceDelivery: DatosFactura.PriceDelivery,
    DatosFactura: {
      ...DatosFactura,
      PersonId: session.session ? session.session.PersonId : null,
    },
    Products,
    PromotionalCode: shoppingCart.promotionalCode
      ? shoppingCart.promotionalCode.code
      : null,
    PercentPromotionalCode: shoppingCart.promotionalCode
      ? shoppingCart.promotionalCode.discountValue
      : 0,
  };

  return clienteAxios
    .post<any[]>(`api/NewOrderBuy`, data)
    .then((response) => {
      return resolveResponse(response);
    })
    .catch((error) => {
      //(error);
      toast.error(error.message);
    });
};

const resolveResponse = (response: AxiosResponse) => {
  if (response.status !== 200) return false;
  if (!response.data) return false;
  const data = response.data;
  return data;
};

export const PbyService = {
  getAllProducts,
  getAllArticles,
  getMenu,
  getProductDetail,
  getSocialNetwork,
  getArticleBlog,
  getFooterMenu,
  getFooterDataCompany,
  getCountries,
  getCities,
  newOrderBuy,
  validationCode,
  login,
  register,
  newsLetterRegister,
  OrderBuyHistoryByPerson,
  updatePerson,
  listProductByOrderBuy,
  sendContact,
};
