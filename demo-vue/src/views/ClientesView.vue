<script setup>
import { ref, onMounted } from 'vue';
import { getClientes } from '../api/clientesApi';
import ClienteModal from '../components/ClienteModal.vue';
import ClientesTable from '../components/ClientesTable.vue';

const clientes = ref([]);
const modalRef = ref(null);

const cargarClientes = async () => {
  const res = await getClientes();
  clientes.value = res.data;
};

const abrirModal = () => {
  modalRef.value.abrir();
};

onMounted(cargarClientes);
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Clientes</h2>
      <button class="btn btn-primary" @click="abrirModal">
        + Nuevo cliente
      </button>
    </div>

    <ClientesTable :clientes="clientes" />

    <ClienteModal
      ref="modalRef"
      @guardado="cargarClientes"
    />
  </div>
</template>
