<script setup>
import { ref, onMounted } from 'vue';
import { getClientes, deleteCliente } from '../api/clientesApi';

import ClientesTable from '../components/ClientesTable.vue';
import ClienteModal from '../components/ClienteModal.vue';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue';

const clientes = ref([]);

const clienteModal = ref(null);
const deleteModal = ref(null);

const cargarClientes = async () => {
  const res = await getClientes();
  clientes.value = res.data;
};

const nuevoCliente = () => {
  clienteModal.value.abrir();
};

const editarCliente = (cliente) => {
  clienteModal.value.abrir(cliente);
};

const eliminarCliente = (cliente) => {
  deleteModal.value.abrir(async () => {
    await deleteCliente(cliente.id);
    cargarClientes();
  });
};

onMounted(cargarClientes);
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h2>Clientes</h2>
      <button class="btn btn-primary" @click="nuevoCliente">
        + Nuevo cliente
      </button>
    </div>

    <ClientesTable
      :clientes="clientes"
      @editar="editarCliente"
      @eliminar="eliminarCliente"
    />

    <ClienteModal
      ref="clienteModal"
      @guardado="cargarClientes"
    />

    <ConfirmDeleteModal ref="deleteModal" />
  </div>
</template>
