import db from './database.js';

const products = [
  {
    id: 1,
    name: "Pizza Margherita",
    price: 2490,
    imageUrl: "/images/pizza-margherita.jpg",
    description: "Paradicsomszósz, mozzarella, bazsalikom"  },
  {
    id: 2,
    name: "Hamburger",
    price: 2990,
    imageUrl: "/images/hamburger.jpg",
    description: "Marhahús, sajt, saláta, szósz"  }
];

const stmt = db.prepare(`
  INSERT OR REPLACE INTO products
  (id, name, price, imageUrl, description)
  VALUES (?, ?, ?, ?, ?)
`);

for (const p of products) {
  stmt.run(
    p.id,
    p.name,
    p.price,
    p.imageUrl,
    p.description  );
}

console.log('✅ Seed done');
