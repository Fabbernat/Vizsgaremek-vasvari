<script>
  import "./styles/app.css"
</script>

<template>
  <div class="app">
    <img src="./images/Royal_Delivery_Logo.png" alt="Logo" class="floating-logo-img">

    <nav class="navbar">
      <div class="logo-text">Royal Delivery</div>
      
      <div class="nav-items">
        <span>Étlap</span>
        <span>Kosár</span>
        <span>Profil</span>
      </div>
    </nav>

    <header class="hero">
      <h1>Mit ennél ma?</h1>
      <h2>Rendelj gyorsan és egyszerűen kedvenc ételeid közül</h2>
    </header>

    <main class="menu">
      <div class="card">
        <div class="card-header">
          <h2>Pizza Margherita</h2>
          <span class="price">2 490 Ft</span>
        </div>
        <p>Paradicsomszósz, mozzarella, bazsalikom</p>
        <div class="action">Kosárba teszem</div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Hamburger</h2>
          <span class="price">2 990 Ft</span>
        </div>
        <p>Marhahús, sajt, saláta, szósz</p>
        <div class="action">Kosárba teszem</div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Caesar saláta</h2>
          <span class="price">2 290 Ft</span>
        </div>
        <p>Csirkemell, parmezán, öntet</p>
        <div class="action secondary">Kosárba teszem</div>
      </div>
    </main>
  </div>
</template>