backend/
├─ src/
│  ├─ app.js              ← alkalmazás belépési pont
│  ├─ server.js           ← szerver indítás
│  │
│  ├─ db/
│  │  ├─ database.js        ← SQLite kapcsolat
│  │  └─ migrate.js         ← táblák létrehozása
│  │
│  ├─ routes/
│  │  └─ product.routes.js    ← REST végpontok (URL-ek)
│  │  └─ products.js        ← REST endpointok
│  │
│  ├─ controllers/
│  │  └─ product.controller.js ← üzleti logika
│  │
│  ├─ services/
│  │  └─ product.service.js   ← adatkezelés
│  │
│  ├─ data/
│  │  └─ products.json        ← ideiglenes adatforrás
│  │
│  └─ public/
│     └─ images/
│        ├─ pizza-margherita.jpg
│        ├─ hamburger.jpg
│        └─ caesar-salad.jpg
│
├─ package.json
└─ README.md
