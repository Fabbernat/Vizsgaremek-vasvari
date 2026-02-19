# Git tudorial
## ha írtál valami kódot és szeretnéd felpusholni:
### A) opció: gombokkal 
`commit` gomb, majd `push` gomb - (a commit üzenetet meg kell adni)
### B) opció: terminálból
git commit -m "message"
git push

Első alkalommal, üres mappából:
```powershell
echo "# pelda2" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:fabbernatvasvari/pelda2.git
git push -u origin main
```

Első alkalommal, nemüres mappából:
```powershell
git remote add origin git@github.com:fabbernatvasvari/pelda2.git
git branch -M main
git push -u origin main
```

### Gyakori hibák: 
A) "Repository is not initialized"
- "[mappa neve] is not a repository"
- Megoldás:
  1. nyomd meg a "initialize repository" gombot.
  2. lehet hogy lesz egy "add" gomb, azt meg kell nyomni
  3. ezután megnyomni a `commit` gombot, majd `push` gombot


[Dokumentáció - Drive link (jogosultsággal szerkeszthető)](https://drive.google.com/drive/folders/1aNDvjjkcXUT5B-rJQAADJJ4zBr0tpsjz?usp=sharing)

[Követelményspecifikáció - Google Docs (jogosultsággal szerkeszthető)](https://docs.google.com/document/d/1tTPFeNGFQoAREoPDqRaQL0v3-o-OPWzRQ847onGc3uE/edit?usp=sharing)

[Részletes követelményleírás - Google Docs jogosultsággal (szerkeszthető)](https://docs.google.com/document/d/1zPlSvUvIQpHnXcfmNSJ8LxzYlk4Uv5YCd-s_0WlF-PM/edit?usp=sharing)

[Desktop app](https://github.com/fabbernatvasvari/RoyalDelivery-desktop/)

[Hosztolt backend link](https://unpartible-saliently-elena.ngrok-free.dev)

React projekt generátor parancs:
```powershell
npm create vite@latest my-app -- --template react-ts
```
Vue projekt generátor parancs:
```powershell
npm create vite@latest my-app -- --template vue-ts
```
vagy csak egyszerűen (ugyanazt csinálja)
```powershell
npm create vue@latest
```

# plaza-app-nalhi-gurban-fabian

## Ételrendelő app

Újabb nevén Royal Delivery

Vue.js frontend
Node.js + Express backend
SQLite adatbázis
