<script setup>
defineProps({
  clientes: Array
});
</script>

<template>
  <div class="card">
    <div class="table-responsive">
      <table class="table table-striped table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in clientes" :key="c.id">
            <td>{{ c.nombre }}</td>
            <td>{{ c.email }}</td>
            <td>{{ c.telefono }}</td>
          </tr>
          <tr v-if="!clientes.length">
            <td colspan="3" class="text-center text-muted">
              No hay clientes registrados
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
