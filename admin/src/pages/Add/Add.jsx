// // import React, { useState } from 'react'
// // import './Add.css'
// // import { assets, url } from '../../assets/assets';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// // const Add = () => {


// //     const [image, setImage] = useState(false);
// //     const [data, setData] = useState({
// //         name: "",
// //         description: "",
// //         price: "",
// //         category: "Salad"
// //     });

// //     const onSubmitHandler = async (event) => {
// //         event.preventDefault();

// //         if (!image) {
// //             toast.error('Image not selected');
// //             return null;
// //         }

// //         const formData = new FormData();
// //         formData.append("name", data.name);
// //         formData.append("description", data.description);
// //         formData.append("price", Number(data.price));
// //         formData.append("category", data.category);
// //         formData.append("image", image);
// //         const response = await axios.post(`${import.meta.env.VITE_API}/api/food/add`, formData);
// //         if (response.data.success) {
// //             toast.success(response.data.message)
// //             setData({
// //                 name: "",
// //                 description: "",
// //                 price: "",
// //                 category: data.category
// //             })
// //             setImage(false);
// //         }
// //         else {
// //             toast.error(response.data.message)
// //         }
// //     }

// //     const onChangeHandler = (event) => {
// //         const name = event.target.name;
// //         const value = event.target.value;
// //         setData(data => ({ ...data, [name]: value }))
// //     }

// //     return (
// //         <div className='add'>
// //             <form className='flex-col' onSubmit={onSubmitHandler}>
// //                 <div className='add-img-upload flex-col'>
// //                     <p>Upload image</p>
// //                     <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
// //                     <label htmlFor="image">
// //                         <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
// //                     </label>
// //                 </div>
// //                 <div className='add-product-name flex-col'>
// //                     <p>Product name</p>
// //                     <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
// //                 </div>
// //                 <div className='add-product-description flex-col'>
// //                     <p>Product description</p>
// //                     <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
// //                 </div>
// //                 <div className='add-category-price'>
// //                     <div className='add-category flex-col'>
// //                         <p>Product category</p>
// //                         <select name='category' onChange={onChangeHandler} >
// //                             <option value="Salad">Salad</option>
// //                             <option value="Rolls">Rolls</option>
// //                             <option value="Deserts">Deserts</option>
// //                             <option value="Sandwich">Sandwich</option>
// //                             <option value="Cake">Cake</option>
// //                             <option value="Pure Veg">Pure Veg</option>
// //                             <option value="Pasta">Pasta</option>
// //                             <option value="Noodles">Noodles</option>
// //                         </select>
// //                     </div>
// //                     <div className='add-price flex-col'>
// //                         <p>Product Price</p>
// //                         <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
// //                     </div>
// //                 </div>
// //                 <button type='submit' className='add-btn' >ADD</button>
// //             </form>
// //         </div>
// //     )
// // }

// // export default Add



// import React, { useState } from 'react';
// import './Add.css';
// import { assets, url } from '../../assets/assets';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Add = () => {
//   const [image, setImage] = useState(false);
//   const [data, setData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: 'Salad',
//   });

//   const url = import.meta.env.VITE_API;

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('description', data.description);
//     formData.append('price', data.price);
//     formData.append('category', data.category);
//     formData.append('image', image);

//     try {
//       // const res = await axios.post(`${url}/api/food/add`, formData, {
//       //   withCredentials: true,
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data'
//       //   }
//       // });
//       const res = await axios.post(`${url}/api/food/add`, formData, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       toast.success("Item added successfully");
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Error adding item");
//     }
//   };


//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="add">
//       <form className="flex-col" onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex-col">
//           <p>Upload image</p>
//           <input
//             onChange={(e) => {
//               setImage(e.target.files[0]);
//               e.target.value = '';
//             }}
//             type="file"
//             accept="image/*"
//             id="image"
//             hidden
//           />
//           <label htmlFor="image">
//             <img
//               src={!image ? assets.upload_area : URL.createObjectURL(image)}
//               alt=""
//             />
//           </label>
//         </div>

//         <div className="add-product-name flex-col">
//           <p>Product name</p>
//           <input
//             name="name"
//             value={data.name}
//             onChange={onChangeHandler}
//             type="text"
//             placeholder="Type here"
//             required
//           />
//         </div>

//         <div className="add-product-description flex-col">
//           <p>Product description</p>
//           <textarea
//             name="description"
//             value={data.description}
//             onChange={onChangeHandler}
//             rows={6}
//             placeholder="Write content here"
//             required
//           />
//         </div>

//         <div className="add-category-price">
//           <div className="add-category flex-col">
//             <p>Product category</p>
//             <select name="category" onChange={onChangeHandler} value={data.category}>
//               <option value="Salad">Salad</option>
//               <option value="Rolls">Rolls</option>
//               <option value="Deserts">Deserts</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Cake">Cake</option>
//               <option value="Pure Veg">Pure Veg</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//             </select>
//           </div>

//           <div className="add-price flex-col">
//             <p>Product Price</p>
//             <input
//               type="number"
//               name="price"
//               value={data.price}
//               onChange={onChangeHandler}
//               placeholder="25"
//               required
//             />
//           </div>
//         </div>

//         <button type="submit" className="add-btn">
//           ADD
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Add;



import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const api = import.meta.env.VITE_API || 'https://cafe-resto-production.up.railway.app';

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const res = await axios.post(`${api}/api/food/add`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        toast.success("Item added successfully");
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad',
        });
        setImage(null);
      } else {
        toast.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Error adding item");
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <input
            type="file"
            accept="image/*"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="image">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="upload preview"
            />
          </label>
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Cold Drink">Cold Drinks</option>
              <option value="Hot Drink">Hot Drinks</option>
              <option value="Snacks">Snacks</option>
              <option value="Ice-Cream">Ice-Cream</option>
              <option value="Soups">Soups</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="25"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
