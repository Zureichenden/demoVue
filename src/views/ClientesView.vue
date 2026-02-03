<script setup>
import { ref, onMounted } from 'vue'
import {
  getClientes,
  deleteCliente,
  exportClientesExcel
} from '../api/clientesApi'

import ClientesTable from '../components/ClientesTable.vue'
import ClienteModal from '../components/ClienteModal.vue'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'

const clientes = ref([])

const clienteModal = ref(null)
const deleteModal = ref(null)

/* =========================
   CARGAR CLIENTES
========================= */
const cargarClientes = async () => {
  const res = await getClientes()
  clientes.value = res.data
}

/* =========================
   CRUD
========================= */
const nuevoCliente = () => {
  clienteModal.value.abrir()
}

const editarCliente = (cliente) => {
  clienteModal.value.abrir(cliente)
}

const eliminarCliente = (cliente) => {
  deleteModal.value.abrir(async () => {
    await deleteCliente(cliente.id)
    cargarClientes()
  })
}

/* =========================
   EXPORTAR EXCEL
========================= */
const exportarExcel = async () => {
  const res = await exportClientesExcel()

  const blob = new Blob([res.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })

  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'clientes.xlsx'
  document.body.appendChild(link)
  link.click()

  link.remove()
  window.URL.revokeObjectURL(url)
}

onMounted(cargarClientes)
</script>

<template>
  <div class="container mt-4">
    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0">Clientes</h2>

      <div class="d-flex gap-2">
        <button
          class="btn btn-outline-success"
          @click="exportarExcel"
        >
          📥 Exportar Excel
        </button>

        <button
          class="btn btn-primary"
          @click="nuevoCliente"
        >
          + Nuevo cliente
        </button>
      </div>
    </div>

    <!-- TABLA -->
    <ClientesTable
      :clientes="clientes"
      @editar="editarCliente"
      @eliminar="eliminarCliente"
    />

    <!-- MODALES -->
    <ClienteModal
      ref="clienteModal"
      @guardado="cargarClientes"
    />

    <ConfirmDeleteModal ref="deleteModal" />
  </div>
</template>
