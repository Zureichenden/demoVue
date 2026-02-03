<script setup>
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import Cliente from '../models/Cliente';
import { createCliente } from '../api/clientesApi';

const emit = defineEmits(['guardado']);

const modalElement = ref(null);
let modalInstance = null;

const cliente = ref(new Cliente());
const errores = ref({});

// ==========================
// Bootstrap Modal
// ==========================
onMounted(() => {
  modalInstance = new Modal(modalElement.value);
});

const abrir = () => {
  cliente.value = new Cliente();
  errores.value = {};
  modalInstance.show();
};

const cerrar = () => {
  modalInstance.hide();
};

// ==========================
// Validación
// ==========================
const validar = () => {
  errores.value = {};

  if (!cliente.value.nombre)
    errores.value.nombre = 'Nombre obligatorio';

  if (!/^\S+@\S+\.\S+$/.test(cliente.value.email))
    errores.value.email = 'Email inválido';

  if (!/^\d{7,15}$/.test(cliente.value.telefono))
    errores.value.telefono = 'Teléfono inválido';

  return Object.keys(errores.value).length === 0;
};

const guardar = async () => {
  if (!validar()) return;

  await createCliente(cliente.value);
  cerrar();
  emit('guardado');
};

// 👇 Exponemos métodos al padre
defineExpose({ abrir });
</script>

<template>
  <div class="modal fade" tabindex="-1" ref="modalElement">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">Nuevo Cliente</h5>
          <button type="button" class="btn-close" @click="cerrar"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input
              class="form-control"
              v-model="cliente.nombre"
              :class="{ 'is-invalid': errores.nombre }"
            />
            <div class="invalid-feedback">{{ errores.nombre }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              class="form-control"
              v-model="cliente.email"
              :class="{ 'is-invalid': errores.email }"
            />
            <div class="invalid-feedback">{{ errores.email }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Teléfono</label>
            <input
              class="form-control"
              v-model="cliente.telefono"
              :class="{ 'is-invalid': errores.telefono }"
            />
            <div class="invalid-feedback">{{ errores.telefono }}</div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="cerrar">
            Cancelar
          </button>
          <button class="btn btn-success" @click="guardar">
            Guardar
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
