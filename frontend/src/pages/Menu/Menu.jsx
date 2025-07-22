// import React, { useState } from 'react'
// // import Header from '../../components/Header/Header'
// import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
// import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
// // import AppDownload from '../../components/AppDownload/AppDownload'

// const Menu = () => {

//   const [category,setCategory] = useState("All")

//   return (
//     <>
//       {/* <Header/> */}
//       <ExploreMenu setCategory={setCategory} category={category}/>
//       <FoodDisplay category={category}/>
//       {/* <AppDownload/> */}
//     </>
//   )
// }

// export default Menu;



import React, { useState } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Menu = () => {
  const [category, setCategory] = useState('All');

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Menu;
