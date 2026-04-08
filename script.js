const coins = [
  "bitcoin",
  "ethereum",
  "solana",
  "ripple",        // XRP
  "zcash",
  "cardano",
  "sui",
  "avalanche-2",   // AVAX
  "dogecoin"       // DOGE
];

const coinNames = {
  "bitcoin": "Bitcoin (BTC)",
  "ethereum": "Ethereum (ETH)",
  "solana": "Solana (SOL)",
  "ripple": "XRP",
  "zcash": "Zcash (ZEC)",
  "cardano": "Cardano (ADA)",
  "sui": "SUI",
  "avalanche-2": "Avalanche (AVAX)",
  "dogecoin": "Dogecoin (DOGE)"
};

async function fetchPrices() {
  const grid = document.getElementById("price-grid");
  grid.innerHTML = "<p>Loading latest prices...</p>";

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(",")}&vs_currencies=usd`);
    const data = await res.json();

    grid.innerHTML = "";

    coins.forEach(coinId => {
      const price = data[coinId].usd;
      const displayName = coinNames[coinId];

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${displayName}</h3>
        <div class="price">$${price.toLocaleString()}</div>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    grid.innerHTML = "<p>Error loading prices. Please try again.</p>";
  }
}

// Initial load + button functionality
fetchPrices();
document.getElementById("refresh-btn").addEventListener("click", fetchPrices);
