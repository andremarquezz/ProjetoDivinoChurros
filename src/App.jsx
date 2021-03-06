import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './Components/Header';
import BannerName from './Components/BannerName';
import MenuContainer from './Components/MenuContainer';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import './App.css';
import SubMenuContainer from './Components/SubMenuContainer';
import MenuCard from './Components/MenuCard';
import {
  imageChurrosBanner,
  imageChurrosGourmet,
  imageChurrosTodos,
  imageChurrosTradicional,
} from './Components/Data';
import AllFlavors from './Components/AllFlavors';
import TraditionalFlavors from './Components/TraditionalFlavors';
import GourmetFlavors from './Components/GourmetFlavors';
import CartItem from './Components/CartItem';
import { useStateValue } from './Components/StateProvider';

function App() {
  const [allFlavors, setAllFlavors] = useState(true);
  const [traditionalFlavors, setTraditional] = useState(false);
  const [gourmetFlavors, setGourmet] = useState(false);
  const [{ cart }] = useStateValue();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleFlavors = (type) => {
    if (type === 'all') {
      setAllFlavors(true);
      setTraditional(false);
      setGourmet(false);
    }
    if (type === 'traditional') {
      setAllFlavors(false);
      setTraditional(true);
      setGourmet(false);
    }
    if (type === 'gourmet') {
      setAllFlavors(false);
      setTraditional(false);
      setGourmet(true);
    }
  };
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <main>
          <div className="mainContainer">
            <div className="banner">
              <BannerName name={'Jey'} discount="1 Gratis" link="#" />
              <img
                src={imageChurrosBanner}
                alt="Banner Divino Churros"
                className="deliveryPic"
              />
            </div>
            <div className="dishContainer">
              <div className="menuCard">
                <SubMenuContainer name={'Categorias'} />
              </div>
              <div className="rowContainer">
                <div onClick={() => handleFlavors('all')}>
                  <MenuCard
                    imgSrc={imageChurrosTodos}
                    name={'Todos os Sabores'}
                    link="/"
                  />
                </div>
                <div onClick={() => handleFlavors('gourmet')}>
                  <MenuCard
                    imgSrc={imageChurrosGourmet}
                    name={'Churros Gourmet'}
                    link="/1"
                  />
                </div>
                <div>
                  <MenuCard
                    onClick={() => handleFlavors('traditional')}
                    imgSrc={imageChurrosTradicional}
                    name={'Churros Tradicional'}
                    link="/2"
                  />
                </div>
              </div>
              {allFlavors && <AllFlavors />}
              {traditionalFlavors && <TraditionalFlavors />}
              {gourmetFlavors && <GourmetFlavors />}
            </div>
          </div>
          <div className="rightMenu">
            {!cart ? (
              <div>Carrinho Vazio!</div>
            ) : (
              <>
                <div className="cartCheckOutContainer">
                  <div className="cartContainer">
                    <SubMenuContainer name="Carts Items" />
                    <div className="cartItems">
                      {cart &&
                        cart.map(({ id, name, imgSrc, price }) => (
                          <CartItem
                            key={id}
                            name={name}
                            imgSrc={imgSrc}
                            price={price}
                            id={id}
                            total={setTotalPrice}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <div className="totalSection">
                  <h3>Total</h3>
                  <p>
                    <span>R$ </span>
                    {totalPrice}
                  </p>
                </div>
                <button className="checkOut">Finalizar Compra</button>
              </>
            )}
          </div>
        </main>
        <div className="leftMenu">
          <ul id="menu">
            <MenuContainer link="/" icon={<HomeRoundedIcon />} />
            <MenuContainer link="/2" icon={<ChatRoundedIcon />} />
            <MenuContainer link="/3" icon={<AccountBalanceWalletRoundedIcon />} />
            <MenuContainer link="/4" icon={<FavoriteRoundedIcon />} />
            <MenuContainer link="/5" icon={<SummarizeRoundedIcon />} />
            <MenuContainer link="/6" icon={<SettingsIcon />} />
          </ul>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
