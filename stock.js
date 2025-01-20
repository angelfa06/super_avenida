document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("addProductForm");
  const productTableBody = document.getElementById("productTableBody");

  // Función para actualizar fecha y hora
  function updateDateTime() {
      const now = new Date();
      document.getElementById('datetime').textContent = now.toLocaleString();
  }

  // Llama a updateDateTime cada segundo
  setInterval(updateDateTime, 1000);

  // Inicializar fecha y hora al cargar la página
  updateDateTime();

  // Cargar productos desde Local Storage
  let products = [];
  const savedProducts = localStorage.getItem("products");
  if (savedProducts) {
      products = JSON.parse(savedProducts);
      updateTable();
  }

  // Manejar el envío del formulario
  productForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const quantity = parseInt(document.getElementById("quantity").value);
      const price = parseFloat(document.getElementById("price").value);
      const category = document.getElementById("category").value;

      if (!name || quantity <= 0 || price <= 0) {
          alert("Por favor, ingrese valores válidos.");
          return;
      }

      products.push({ name, quantity, price, category });
      updateTable();
      productForm.reset();
  });

  // Actualizar la tabla con los productos
  function updateTable() {
      productTableBody.innerHTML = ""; // Limpiar tabla
      localStorage.setItem("products", JSON.stringify(products)); // Guardar productos

      let totalQuantity = 0;
      let totalValue = 0;

      products.forEach((product, index) => {
          totalQuantity += product.quantity;
          totalValue += product.quantity * product.price;

          const row = document.createElement("tr");

          const lowStockClass = product.quantity < 5 ? "low-stock" : "";

          row.innerHTML = `
              <td>${product.name}</td>
              <td>${product.category}</td>
              <td class="${lowStockClass}">${product.quantity}</td>
              <td>$${product.price.toFixed(2)}</td>
              <td>
                  <button onclick="reduceQuantity(${index})">-1</button>
                  <button onclick="increaseQuantity(${index})">+1</button>
                  <button onclick="deleteProduct(${index})">Eliminar</button>
              </td>
          `;

          productTableBody.appendChild(row);
      });

      // Agregar fila de totales al final de la tabla
      const totalsRow = `
          <tr>
              <td><strong>Totales:</strong></td>
              <td></td>
              <td>${totalQuantity}</td>
              <td>$${totalValue.toFixed(2)}</td>
              <td></td>
          </tr>
      `;
      productTableBody.insertAdjacentHTML("beforeend", totalsRow);
  }

  // Reducir la cantidad de un producto
  window.reduceQuantity = (index) => {
    if (products[index].quantity > 1) { // Cambiar de 0 a 1 para mantener siempre stock positivo
        products[index].quantity -= 1;
        updateTable();
    } else {
        alert("La cantidad no puede ser menor a 1");
    }
};

  // Incrementar la cantidad de un producto
  window.increaseQuantity = (index) => {
      products[index].quantity += 1;
      updateTable();
  };

  // Eliminar un producto
window.deleteProduct = (index) => {
    if (confirm('¿Está seguro de eliminar este producto?')) { // <- Agregar esta línea
        products.splice(index, 1);
        updateTable();
    }
};
  // Buscar productos
  window.searchProduct = () => {
      const searchValue = document.getElementById("searchBox").value.toLowerCase();

      const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(searchValue)
      );

      productTableBody.innerHTML = "";

      filteredProducts.forEach((product) => {
          const originalIndex = products.indexOf(product);

          const row = document.createElement("tr");

          row.innerHTML = `
              <td>${product.name}</td>
              <td>${product.category}</td>
              <td>${product.quantity}</td>
              <td>$${product.price.toFixed(2)}</td>
              <td>
                  <button onclick="reduceQuantity(${originalIndex})">-1</button>
                  <button onclick="increaseQuantity(${originalIndex})">+1</button>
                  <button onclick="deleteProduct(${originalIndex})">Eliminar</button>
              </td>
          `;

          productTableBody.appendChild(row);
      });
  };
});
