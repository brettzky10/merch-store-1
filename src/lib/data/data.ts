export interface Artwork {
    id: number;
    name: string;
    price: number;
    category: string;
    images: string[];
  }
  
  export const artworks: Artwork[] = [
    {
      id: 1,
      name: "Abstract Harmony",
      price: 1299.99,
      category: "Paintings",
      images: ["/placeholder.svg?height=300&width=400&text=Abstract+Harmony"]
    },
    {
      id: 2,
      name: "Serene Sculpture",
      price: 2499.99,
      category: "Sculptures",
      images: ["/placeholder.svg?height=300&width=400&text=Serene+Sculpture"]
    },
    {
      id: 3,
      name: "Urban Landscape",
      price: 899.99,
      category: "Photography",
      images: ["/placeholder.svg?height=300&width=400&text=Urban+Landscape"]
    },
    {
      id: 4,
      name: "Digital Dreams",
      price: 599.99,
      category: "Digital Art",
      images: ["/placeholder.svg?height=300&width=400&text=Digital+Dreams"]
    },
    {
      id: 5,
      name: "Vibrant Strokes",
      price: 1599.99,
      category: "Paintings",
      images: ["/placeholder.svg?height=300&width=400&text=Vibrant+Strokes"]
    },
    {
      id: 6,
      name: "Metallic Waves",
      price: 3299.99,
      category: "Sculptures",
      images: ["/placeholder.svg?height=300&width=400&text=Metallic+Waves"]
    },
    {
      id: 7,
      name: "Nature's Patterns",
      price: 799.99,
      category: "Photography",
      images: ["/placeholder.svg?height=300&width=400&text=Nature's+Patterns"]
    },
    {
      id: 8,
      name: "Futuristic Visions",
      price: 699.99,
      category: "Digital Art",
      images: ["/placeholder.svg?height=300&width=400&text=Futuristic+Visions"]
    }
  ];
  
  export const categories = ["Paintings", "Sculptures", "Photography", "Digital Art"];