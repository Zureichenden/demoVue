<script setup>
defineProps({
  clientes: Array
})

const emit = defineEmits(['editar', 'eliminar'])
</script>

<template>
  <div class="card shadow-sm">
    <table class="table table-hover mb-0 align-middle">
      <thead class="table-light">
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Status</th>
          <th class="text-end" style="width: 160px">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="c in clientes"
          :key="c.id"
          :class="{ 'table-secondary': c.status === 99 }"
        >
          <td class="fw-semibold">{{ c.nombre }}</td>
          <td class="text-muted">{{ c.email }}</td>
          <td>{{ c.telefono }}</td>

          <td>
            <span
              class="badge"
              :class="c.status === 99 ? 'bg-danger' : 'bg-success'"
            >
              {{ c.status === 99 ? 'Eliminado' : 'Activo' }}
            </span>
          </td>

          <td>
            <div class="d-flex justify-content-end gap-2 flex-nowrap">
              <button
                class="btn btn-sm btn-outline-primary"
                :disabled="c.status === 99"
                @click="emit('editar', c)"
              >
                Editar
              </button>

              <button
                class="btn btn-sm btn-outline-danger"
                :disabled="c.status === 99"
                @click="emit('eliminar', c)"
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>

        <tr v-if="!clientes.length">
          <td colspan="5" class="text-center text-muted py-4">
            Sin registros
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
button {
  white-space: nowrap;
}
</style>
