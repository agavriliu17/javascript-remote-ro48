/**
 * Promises in JavaScript
 *
 * A Promise is an object representing the eventual completion or failure of an asynchronous operation.
 * It has three states:
 * - pending: initial state, neither fulfilled nor rejected
 * - fulfilled: operation completed successfully
 * - rejected: operation failed
 */

// Basic Promise example
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ data: "John" });
    } else {
      reject("Operation failed");
    }
  }, 1000);
});

myPromise
  .then((result) => result.data)
  .then((result) => console.log(result))
  .catch((error) => console.log("Error", error));

// Function to fetch user data
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 12, name: "John" });
    }, 1000);
  });
};

// Function to fetch user posts
const fetchUserPosts = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve(["Post 1", "Post 2", "Post 3"]);
      } else {
        reject(new Error("Error 404"));
      }
    }, 1000);
  });
};

/**
 * Promise chaining
 * This shows how to chain multiple promises together
 */
fetchUserData()
  .then((user) => {
    console.log(user);
    return fetchUserPosts(user.id);
  })
  .then((posts) => {
    console.log(posts);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Task completed");
  });

/**
 * Async/await
 * Modern way to handle promises using async/await syntax
 * Makes asynchronous code look more like synchronous code
 */
async function fetchData() {
  try {
    const user = await fetchUserData();
    console.log(user);
    const posts = await fetchUserPosts(user.id);
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Promise.all
 * Executes multiple promises in parallel and waits for all to complete
 */
const promise1 = Promise.resolve(1);
const promise2 = new Promise((resolve) =>
  setTimeout(() => {
    resolve(2);
  }, 2000)
);
const promise3 = new Promise((resolve) =>
  setTimeout(() => {
    resolve(3);
  }, 1000)
);

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log("All promises resolved:", values);
  })
  .catch((err) => {
    console.log("One of the promises failed", err);
  });

/**
 * Promise.race example
 * Returns a promise that fulfills or rejects as soon as one of the promises
 * in the array fulfills or rejects
 */
Promise.race([promise2, promise3]).then((result) => {
  console.log("First promise to resolve:", result);
});

fetchData();

// Practice Exercise
// Fetch data from PokeAPI
// 1. Fetch a random pokemon
// 2. Log the name of the pokemon
// 3. Log the height of the pokemon
// 4. Log the information about the evolutions

async function fetchPokemonData() {
  const pokemonId = Math.floor(Math.random() * 30) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const pokemon = await response.json();

  console.log(`Pokemon name: ${pokemon.name}`);
  console.log(`Pokemon height: ${pokemon.height}`);

  const speciesResponse = await fetch(pokemon?.species?.url);
  const speciesData = await speciesResponse.json();

  const evolutionResponse = await fetch(speciesData?.evolution_chain?.url);
  const evolutionData = await evolutionResponse.json();

  console.log("\nEvolution chain:");
  let currentEvolution = evolutionData.chain;

  while (currentEvolution) {
    console.log(currentEvolution.species.name);
    if (currentEvolution.evolves_to.length > 0) {
      currentEvolution = currentEvolution.evolves_to[0];
    } else {
      break;
    }
  }
}

fetchPokemonData();
