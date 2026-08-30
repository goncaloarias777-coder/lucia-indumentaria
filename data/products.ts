export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  isNew: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Vestido Siena",
    slug: "vestido-siena",
    category: "Vestidos",
    description: "Vestido femenino de corte elegante, liviano y versátil.",
    price: 58900,
    oldPrice: 69900,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Negro", "Bordo"],
    stock: 12,
    featured: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Blazer Roma",
    slug: "blazer-roma",
    category: "Abrigos",
    description: "Blazer de líneas limpias y silueta estructurada.",
    price: 84900,
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Negro"],
    stock: 8,
    featured: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Camisa Roma",
    slug: "camisa-roma",
    category: "Blusas",
    description: "Camisa minimalista para usar de día o de noche.",
    price: 45900,
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Blanco", "Celeste"],
    stock: 15,
    featured: true,
    isNew: false,
  },
  {
    id: "4",
    name: "Pantalón Milano",
    slug: "pantalon-milano",
    category: "Pantalones",
    description: "Pantalón de calce cómodo y elegante.",
    price: 62900,
    oldPrice: 72900,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    ],
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Negro", "Arena"],
    stock: 6,
    featured: true,
    isNew: false,
  },
  {
    id: "5",
    name: "Top París",
    slug: "top-paris",
    category: "Tops",
    description: "Top femenino de diseño moderno.",
    price: 32900,
    image:
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=900&q=85",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Crema", "Negro"],
    stock: 20,
    featured: false,
    isNew: true,
  },
  {
    id: "6",
    name: "Falda Capri",
    slug: "falda-capri",
    category: "Faldas",
    description: "Falda de silueta femenina con caída elegante.",
    price: 51900,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=900&q=85",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Negro", "Beige"],
    stock: 9,
    featured: false,
    isNew: false,
  },
  {
    id: "7",
    name: "Sweater París",
    slug: "sweater-paris",
    category: "Abrigos",
    description: "Sweater suave, confortable y atemporal.",
    price: 57900,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Crudo", "Gris"],
    stock: 11,
    featured: false,
    isNew: true,
  },
  {
    id: "8",
    name: "Cartera Soho",
    slug: "cartera-soho",
    category: "Accesorios",
    description: "Cartera urbana de diseño sofisticado.",
    price: 74900,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    ],
    sizes: [],
    colors: ["Negro", "Marrón"],
    stock: 5,
    featured: true,
    isNew: false,
  },
];