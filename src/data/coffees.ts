import {
  Americano,
  Arabe,
  CafeComLeite,
  CafeGelado,
  Cappuccino,
  ChocolateQuente,
  Cubano,
  ExpressoCremoso,
  ExpressoTradicional,
  Havaiano,
  Irlandes,
  Latte,
  Macchiato,
  Mocha,
} from '../../public/images/Coffes'

export interface Coffee {
  id: number
  name: string
  description: string
  tag: string[]
  price: number
  img: string
  quantity: number
}

export const coffees: Coffee[] = [
  {
    id: 1,
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    price: 9.9,
    img: ExpressoTradicional,
    tag: ['Tradicional'],
    quantity: 1,
  },
  {
    id: 2,
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    price: 9.9,
    img: Americano,
    tag: ['Tradicional'],
    quantity: 1,
  },
  {
    id: 3,
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    price: 9.9,
    img: ExpressoCremoso,
    tag: ['Tradicional'],
    quantity: 1,
  },
  {
    id: 4,
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    price: 9.9,
    img: CafeGelado,
    tag: ['Tradicional'],
    quantity: 1,
  },
  {
    id: 5,
    name: 'Café com Leite',
    description: 'Meiio a meio de e xpresso tradicional com leite vaporizado',
    price: 9.9,
    img: CafeComLeite,
    tag: ['Tradicional', 'com Leite'],
    quantity: 1,
  },
  {
    id: 6,
    name: 'Latte',
    description:
      'Uma dose de café expresso com o dobro del eite e espuma cremosa',
    price: 9.9,
    img: Latte,
    tag: ['Tradicional', 'com Leite'],
    quantity: 1,
  },
  {
    id: 7,
    name: 'Capuccino',
    description:
      'Bebida com canela feita de doses iguais de café, leite e espuma',
    price: 9.9,
    img: Cappuccino,
    tag: ['Tradicional', 'com Leite'],
    quantity: 1,
  },
  {
    id: 8,
    name: 'Macchiato',
    description:
      'Café expresso misturado com um pouco de leite quente e espuma',
    price: 9.9,
    img: Macchiato,
    tag: ['Tradicional', 'com Leite'],
    quantity: 1,
  },
  {
    id: 9,
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    price: 9.9,
    img: Mocha,
    tag: ['Tradicional', 'com Leite'],
    quantity: 1,
  },
  {
    id: 10,
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    price: 9.9,
    img: ChocolateQuente,
    tag: ['Tradicional', 'com Leite'],
    quantity: 1,
  },
  {
    id: 11,
    name: 'Cubano',
    description:
      'Drink gelado de café expresso com rum, creme de leite e hortelã',
    price: 9.9,
    img: Cubano,
    tag: ['Tradicional'],
    quantity: 1,
  },
  {
    id: 12,
    name: 'havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    price: 9.9,
    img: Havaiano,
    tag: ['Especial'],
    quantity: 1,
  },
  {
    id: 13,
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    price: 9.9,
    img: Arabe,
    tag: ['Especial'],
    quantity: 1,
  },
  {
    id: 14,
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    price: 9.9,
    img: Irlandes,
    tag: ['Especial', 'Alcoólico'],
    quantity: 1,
  },
]
