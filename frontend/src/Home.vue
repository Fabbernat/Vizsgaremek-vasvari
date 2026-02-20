    <script setup>
    import pizza from './assets/pizza-margherita.jpg'
    import hamburger from './assets/hamburger.jpg'
    import salad from './assets/caesar-salad.jpg'

    const products = [
    {
        name: 'Pizza Margherita',
        price: 2490,
        img: pizza,
        description: 'Paradicsomszósz, mozzarella, bazsalikom'    },
    {
        name: 'Hamburger',
        price: 2990,
        img: hamburger,
        description: 'Marhahús, sajt, saláta, szósz'    },
    {
        name: 'Caesar saláta',
        price: 2290,
        img: salad,
        description: 'Csirkemell, parmezán, öntet'    }
    ]

    function addToCart(product) {
    alert(`Kosárba tettél egy ${product.name}-t!`)
    }
    </script>

    <template>  
    <div class="center">
        <h1>🍕 Royal Delivery</h1>
        <p>
        Üdvözlünk a Royal Delivery alkalmazásban!
        </p>
        <p>
        Rendelj gyorsan és egyszerűen a széles választékunkból👌
        </p>
    </div>
    <header class="hero">
    <h1>Mit ennél ma?</h1>
  </header>

  <main class="menu">
    <!-- termékek -->
  </main>
    </template>
