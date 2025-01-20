document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío del formulario
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Validar credenciales
    if (username === "Gonziviotty" && password === "123456789") {
      // Redirigir a la página de administración
      window.location.href = "stock.html"; // Reemplaza con la URL de tu panel de administración
    } else {
      // Mostrar mensaje de error
      document.getElementById("error-msg").style.display = "block";
    }
  });


