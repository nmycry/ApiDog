document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "live_bAiksqoj9AWpLHFPtqtYIP8FS1EJiQeEn5mJWGuVE90fYkFi2oo8wF34PKmlVBiM";
    const dogImage = document.getElementById("dogImage");
    const getDogButton = document.getElementById("getDog");
    const saveFavoriteButton = document.getElementById("saveFavorite");
    const favoritesContainer = document.getElementById("favorites");

    let currentDogImageUrl = "";

    // Função para buscar uma imagem aleatória (GET)
    async function fetchDogImage() {
        try {
            const response = await fetch("https://api.thedogapi.com/v1/images/search", {
                headers: { "x-api-key": API_KEY }
            });
            const data = await response.json();
            dogImage.src = data[0].url;
            currentDogImageUrl = data[0].url;
        } catch (error) {
            console.error("Erro ao buscar imagem:", error);
        }
    }

    // Função para "salvar" a imagem favorita (POST)
    async function saveFavoriteDog() {
        if (!currentDogImageUrl) return;

        try {
            const response = await fetch("https://api.thedogapi.com/v1/favourites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
                },
                body: JSON.stringify({ image_id: currentDogImageUrl })
            });

            if (response.ok) {
                const imgElement = document.createElement("img");
                imgElement.src = currentDogImageUrl;
                favoritesContainer.appendChild(imgElement);
            } else {
                console.error("Erro ao salvar favorito:", await response.json());
            }
        } catch (error) {
            console.error("Erro ao salvar favorito:", error);
        }
    }

    // Event Listeners
    getDogButton.addEventListener("click", fetchDogImage);
    saveFavoriteButton.addEventListener("click", saveFavoriteDog);

    // Buscar uma imagem ao carregar a página
    fetchDogImage();
});
