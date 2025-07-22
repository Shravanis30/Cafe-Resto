import React, { useContext, useEffect, useRef } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';
import coldDrink from '../../assets/coldDrink.png'
import hotDrink from '../../assets/hotDrinks.png'
import snacks from '../../assets/snacks.png'
import icecream from '../../assets/icecream.png'
import soups from '../../assets/soups.png'

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const extendedMenuList = [
    ...(menu_list || []),
    { menu_name: 'Cold Drinks', menu_image: coldDrink  },
    { menu_name: 'Hot Drinks', menu_image: hotDrink },
    { menu_name: 'Snacks', menu_image: snacks },
    { menu_name: 'Ice Cream', menu_image: icecream },
    { menu_name: 'Soups', menu_image: soups },
  ];

  // 🧠 Auto-scroll effect with reset when reaching end
  useEffect(() => {
    const scroll = scrollRef.current;

    const autoScroll = () => {
      if (!scroll) return;

      const maxScrollLeft = scroll.scrollWidth - scroll.clientWidth;

      if (scroll.scrollLeft >= maxScrollLeft - 10) {
        // 👇 Reset to beginning smoothly
        scroll.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll.scrollBy({ left: 150, behavior: 'smooth' });
      }
    };

    scrollIntervalRef.current = setInterval(autoScroll, 2000);

    // 🧹 Clean-up
    return () => clearInterval(scrollIntervalRef.current);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      <div className="explore-menu-wrapper">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <div className="explore-menu-list" ref={scrollRef}>
          {extendedMenuList.map((item, index) => (
            <div
              key={index}
              onClick={() => setCategory(category === item.menu_name ? 'All' : item.menu_name)}
              className="explore-menu-list-item"
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={category === item.menu_name ? "active" : ""}
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
