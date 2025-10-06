<script setup lang="ts">
</script>

<template>
    <div class="d-flex">
        <nav class="sidebar bg-body-tertiary p-3">
            <h1 class="navbar-brand aurora fs-1 fw-bold mb-4" href="#">Aurora</h1>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class=" bi bi-house nav-link active fs-4 fw-bold " aria-current="page" href="#">  Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class=" bi bi-people nav-link fs-4 fw-bold" href="#">  Clientes</a>
                    </li>
                    <li class="nav-item">
                        <a class=" bi bi-graph-up nav-link fs-4 fw-bold" href="#">  Ventas</a> 
                    </li>
                    <li class="nav-item dropdown">
                    <a class=" bi bi-box nav-link dropdown-toggle fs-4 fw-bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Inventario </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item fs-5 fw-bold" href="#">Producto</a></li>
                            <li><a class="dropdown-item fs-5 fw-bold" href="#">Marca</a></li>
                            <li><a class="dropdown-item fs-5 fw-bold" href="#">Categoria</a></li>
                            <li><a class="dropdown-item fs-5 fw-bold" href="#">Lote</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
    </div>
</template>

<style scoped>
.aurora {
    font-size: 150%;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
}
.sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    overflow-y: auto;
}
main {
    margin-left: 250px;
}
</style>