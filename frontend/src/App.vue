<template>
  <div class="app">
    <header class="header">
      <h1>Royal Delivery</h1>
      <p>Gyors és kényelmes ételrendelés</p>
    </header>

    <main class="content">
      <div class="card">
        <h2>Pizza Margherita</h2>
        <p>Paradicsomszósz, mozzarella, bazsalikom</p>
        <div class="action">Rendelés</div>
      </div>

      <div class="card">
        <h2>Hamburger</h2>
        <p>Marhahús, sajt, saláta, szósz</p>
        <div class="action">Rendelés</div>
      </div>

      <div class="card">
        <h2>Caesar saláta</h2>
        <p>Csirkemell, parmezán, öntet</p>
        <div class="action">Rendelés</div>
      </div>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f5f5f5;
}

.app {
  max-width: 1000px;
  margin: auto;
}

.header {
  background-color: #ffffff;
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.action {
  margin-top: 1rem;
  text-align: center;
  padding: 0.75rem;
  background-color: #ff9800;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.action:hover {
  background-color: #e68900;
}
</style>
