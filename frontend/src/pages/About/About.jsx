// import React from 'react';

// const About = () => {
//   return (
//     <div className="min-h-screen px-6 py-16 bg-white text-gray-800 flex flex-col items-center">
//       <div className="max-w-3xl text-center">
//         <h1 className="text-4xl font-bold mb-6 border-b-4 inline-block border-yellow-400 pb-2">
//           About Us
//         </h1>
//         <p className="text-lg leading-relaxed">
//           Welcome to <strong>IITianCraft Café</strong> – where innovation meets flavor!
//           We are a next-gen café founded by passionate IITians, blending technology and taste to deliver a seamless dining experience.
//           Whether you’re here to relax, catch up with friends, or work over a great cup of coffee, we’ve got you covered.
//         </p>
//         <p className="text-lg mt-4">
//           From our chef-crafted menu to smart ordering via QR codes and smooth digital payments, every detail is designed with you in mind.
//           Join us and discover a place where great food and great ideas come together.
//         </p>
//         <div className="mt-8">
//           <p className="text-gray-600 text-sm">Crafted with ❤️ by IITian minds</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;



// File: src/pages/About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-heading">About Us</h1>
        <p className="about-text">
          <strong>IITianCraft Café</strong> is more than just a café — it's an experience. Founded by a group of innovative IITians, our mission is to bring together technology, creativity, and great taste under one roof. Whether you're here for a hot cup of coffee, a delicious bite, or a quick study session, we’ve designed everything with purpose.
        </p>
        <p className="about-text">
          With features like <strong>QR code ordering</strong>, <strong>real-time kitchen updates</strong>, and <strong>secure digital payments</strong>, we redefine how you enjoy food. Our café blends the convenience of smart service with the warmth of handcrafted meals.
        </p>
        <p className="about-text">
          Every menu item is curated with attention, using fresh ingredients and bold flavors. Be it a solo visit or a hangout with friends, we make sure you feel right at home. 
        </p>
        <div className="about-highlights">
          <h3>Why Choose IITianCraft Café?</h3>
          <ul>
            <li>Tech-driven dining experience</li>
            <li>Comfortable and ambient spaces</li>
            <li>Expertly crafted food and beverages</li>
            <li>Friendly and professional service</li>
            <li>Easy QR ordering & digital payments</li>
          </ul>
        </div>
        <div className="about-footer">
          <p>Crafted with by IITian minds</p>
        </div>
      </div>
    </div>
  );
};

export default About;
