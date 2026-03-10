# Git tutorial
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
vagy ugyanezekkel a gombokkal VSCode-ban.

Első alkalommal, nemüres mappából:
```powershell
git remote add origin git@github.com:fabbernatvasvari/pelda2.git
git branch -M main
git push -u origin main
```
vagy ugyanezekkel a gombokkal VSCode-ban.

### Gyakori hibák: 
A) "Repository is not initialized"
- "[mappa neve] is not a repository"
- Megoldás:
  1. nyomd meg a "initialize repository" gombot.
  2. lehet hogy lesz egy "add" gomb, azt meg kell nyomni
  3. ezután megnyomni a `commit` gombot, majd `push` gombot
     
B) "Fatal, unable to push, refspec failed"

Nem sikerült pusholni, valszeg mert nem a tiéd a repó xd. De a viccet féretéve, valszeg egy 

```git remote add [`origin`, vagy ami a lokális repo neve, de általában `origin`] git@github.com:vizsgaremek-2025-2026-nappali-2-14b/royal-delivery-app-nalhi-gurban-fabian.git``` - (a repó url-je)

vagy rossz branchen vagy

`git switch [jó branch neve]`

vagy 

`git checkout [jó branch neve]`

ha egyik sem, akkor a

`git push --set-upstream origin main`, vagy a `--force` kapcsoló (`git push -u origin main --force` segíthet. Érdemes amúgy **mindig** az -u és a -force kapcsolókat használni, mert kevesebb errort kapunk.

Aztán lehet még hiba az, hogy a remote olyan munkát tartalmaz, ami nálunk lokálisan még nincs meg, ekkor a 
`git fetch -a` és a `git pull -a` parancsok lehúzzák a távoli kódot.

Ezen kívül én még agyba-főbe szoktam használgatni a `git branch -a -v` és a `git remote -v` parancsot, amik csak arra szolgálnak, hogy megtudd éppen milyen branchen és milyen repóban vagy és melyek tartoznak még hozzá a projekthez. Szóval a projekt állapotát adják válaszul ezek a parancsok.

Ezek a parancsok mind VSCode-ban is elérhetőek, csak ki kell őket keresni 🥀😘

# Royal-Delivery

## Fontos linkek:
### MySQL Adatbázis elérési útja:
### C:\xampp\mysql\data\royaldelivery_db\

### [Dokumentáció - Drive link (jogosultsággal szerkeszthető)](https://drive.google.com/drive/folders/1aNDvjjkcXUT5B-rJQAADJJ4zBr0tpsjz?usp=sharing)

### [Követelményspecifikáció - Google Docs (jogosultsággal szerkeszthető)](https://docs.google.com/document/d/1tTPFeNGFQoAREoPDqRaQL0v3-o-OPWzRQ847onGc3uE/edit?usp=sharing)

### [Részletes követelményleírás - Google Docs jogosultsággal (szerkeszthető)](https://docs.google.com/document/d/1zPlSvUvIQpHnXcfmNSJ8LxzYlk4Uv5YCd-s_0WlF-PM/edit?usp=sharing)

### [Desktop app](https://github.com/fabbernatvasvari/RoyalDelivery-desktop/)

### [Hosztolt backend link](https://unpartible-saliently-elena.ngrok-free.dev)

## Projekt generátor parancsok
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