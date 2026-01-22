import db from './database.js';

const products = [
  {
    id: 1,
    name: "Pizza Margherita",
    price: 2490,
    imageUrl: "/images/pizza-margherita.jpg",
    description: "Paradicsomszósz, mozzarella, bazsalikom",
    isSecondary: 0
  },
  {
    id: 2,
    name: "Hamburger",
    price: 2990,
    imageUrl: "/images/hamburger.jpg",
    description: "Marhahús, sajt, saláta, szósz",
    isSecondary: 0
  }
];

const stmt = db.prepare(`
  INSERT OR REPLACE INTO products
  (id, name, price, imageUrl, description, isSecondary)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const p of products) {
  stmt.run(
    p.id,
    p.name,
    p.price,
    p.imageUrl,
    p.description,
    p.isSecondary
  );
}

console.log('✅ Seed done');
