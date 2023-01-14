const data = {
  productFlashSale: {
    image: '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/display.jpg',
    discount: 35,
    id: 3,
    time: 'Feb 28, 2023 00:00:00'
  },
  productsInCart: [
    {
      name: 'giay nike',
      price: 2000000,
      id: 1,
      saleOff: true,
      discount: 12,
      quantity: 2,
      image: '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
      brand: 'nike'
    },
    {
      name: 'giay adidas',
      price: 3000000,
      id: 2,
      saleOff: false,
      discount: 0,
      quantity: 2,
      image: '/Images/Adidas/FORUM/black/display.webp',
      brand: 'adidas'
    }
  ],
  productsList: [
    {
      id: 1,
      name: 'Air Jordan VIP',
      brand: 'nike',
      price: 2200000,
      isNew: false,
      saleOff: true,
      discount: 12,
      image: [
        '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_1.webp',
        '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_2.webp',
        '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_3.webp',
        '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_4.jpg',
        '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_5.jpg',
        '/Images/Nike/AirJordanXXXVIISP/AirJordanXXXVIISP_6.webp'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 10,
      desc: 'lorem'
    },
    {
      id: 2,
      name: 'Adidas Forum Black',
      brand: 'adidas',
      price: 1500000,
      isNew: false,
      saleOff: false,
      discount: 0,
      image: [
        '/Images/Adidas/FORUM/black/display.webp',
        '/Images/Adidas/FORUM/black/down.webp',
        '/Images/Adidas/FORUM/black/front.webp',
        '/Images/Adidas/FORUM/black/up.webp',
        '/Images/Adidas/FORUM/black/side_left.webp'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 0,
      desc: 'lorem lorem'
    },
    {
      id: 3,
      name: 'Chuck Taylor All Star Lugged 2.0 Counter Climate High Top Black',
      brand: 'converse',
      price: 2600000,
      isNew: false,
      saleOff: true,
      discount: 35,
      image: [
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/display.jpg',
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/back.jpg',
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/front.jpg',
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/up.jpg',
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/down.jpg'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 12,
      desc: 'lorem lorem lorem'
    },
    {
      id: 4,
      name: 'Air Jordan 7 RetroSe',
      brand: 'nike',
      price: 1500000,
      isNew: false,
      saleOff: false,
      discount: 0,
      image: [
        '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_1.webp',
        '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_2.webp',
        '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_3.webp',
        '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_4.webp',
        '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_5.webp',
        '/Images/Nike/AirJordan7RetroSe/AirJordan7RetroSe_6.webp'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 13,
      desc: 'lorem lorem lorem'
    },
    {
      id: 5,
      name: 'Adidas Forum Blue',
      brand: 'adidas',
      price: 1600000,
      isNew: false,
      saleOff: true,
      discount: 15,
      image: [
        '/Images/Adidas/FORUM/blue/display.webp',
        '/Images/Adidas/FORUM/blue/down.webp',
        '/Images/Adidas/FORUM/blue/front.webp',
        '/Images/Adidas/FORUM/blue/side_left.webp',
        '/Images/Adidas/FORUM/blue/up.webp'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 10,
      desc: 'lorem lorem lorem'
    },
    {
      id: 6,
      name: 'Chuck Taylor All Star Lugged 2.0 Counter Climate High Top White',
      brand: 'converse',
      price: 9000000,
      isNew: false,
      saleOff: false,
      discount: 0,
      image: [
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/White/display.jpg',
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/White/back.jpg',
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/White/front.jpg',
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/White/up.jpg',
        '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/White/down.jpg'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 10,
      desc: 'lorem lorem lorem'
    },
    {
      id: 7,
      name: 'Air Force 1 UNDEFEATED',
      brand: 'nike',
      price: 3000000,
      isNew: false,
      saleOff: false,
      discount: 0,
      image: [
        '/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_1.webp',
        '/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_2.webp',
        '/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_3.webp',
        '/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_4.webp',
        '/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_5.webp',
        '/Images/Nike/AirForce1XUNDEFEATED/AirForce1XUNDEFEATED_6.webp'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 11,
      desc: 'lorem lorem lorem'
    },
    {
      id: 8,
      name: 'Adidas Forum White',
      brand: 'adidas',
      price: 1600000,
      isNew: false,
      saleOff: false,
      discount: 0,
      image: [
        '/Images/Adidas/FORUM/white/display.webp',
        '/Images/Adidas/FORUM/white/down.webp',
        '/Images/Adidas/FORUM/white/front.webp',
        '/Images/Adidas/FORUM/white/side_left.webp',
        '/Images/Adidas/FORUM/white/up.webp'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 12,
      desc: 'lorem lorem lorem'
    },
    {
      id: 9,
      name: 'Converse x DRKSHDW TURBOWPN High Top',
      brand: 'converse',
      price: 3600000,
      isNew: false,
      saleOff: true,
      discount: 10,
      image: [
        '/Images/Converse/Converse x DRKSHDW TURBOWPN High Top/display.jpg',
        '/Images/Converse/Converse x DRKSHDW TURBOWPN High Top/back.jpg',
        '/Images/Converse/Converse x DRKSHDW TURBOWPN High Top/front.jpg',
        '/Images/Converse/Converse x DRKSHDW TURBOWPN High Top/up.jpg',
        '/Images/Converse/Converse x DRKSHDW TURBOWPN High Top/down.jpg'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 13,
      desc: 'lorem lorem lorem'
    },
    {
      id: 10,
      name: 'Adidas continental 80',
      brand: 'adidas',
      price: 2000000,
      isNew: true,
      saleOff: true,
      discount: 100,
      image: [
        '/Images/Adidas/CONTINENTAL 80/display.webp',
        '/Images/Adidas/CONTINENTAL 80/back.webp',
        '/Images/Adidas/CONTINENTAL 80/front.webp',
        '/Images/Adidas/CONTINENTAL 80/up.webp',
        '/Images/Adidas/CONTINENTAL 80/down.webp'
      ],
      sizes: [39, 40, 41, 42, 43, 44],
      countInStock: 13,
      desc: 'lorem lorem lorem'
    }
  ]
}

export default data
