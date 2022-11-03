## Lista de endpoints

# products

-   POST /api/products crea un producto
-   GET /api/products devuelve todos los productos
-   GET /api/products/{id} devuelve producto por id
-   PATCH /api/products/{id} modifica un producto por id
-   DELETE /api/products/{id} elimna un producto por id

# carts

-   GET /api/carts get cart by logged user
-   POST /api/carts add product to cart -- format= {productId: id, quantity: qty}
-   DELETE /api/carts/{id} delete product from cart
-   POST /api/cart/buy generates order

# auth

-   POST /auth/signup registra un usuario
-   POST /auth/signin loggea un usuario

# chat

-   GET /api/chat devuelve todos los mensajes
-   GET /api/chat/{email} devuelve los mensajes del email indicado

## Vistas

# app

-   GET /chat vista de chat con websockets
-   GET /serverinfo devuelve la info del servidor
