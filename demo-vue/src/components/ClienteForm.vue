<script setup>
import { ref } from 'vue';
import Cliente from '../models/Cliente';
import { createCliente } from '../api/clientesApi';

const emit = defineEmits(['guardado', 'cancelar']);

const cliente = ref(new Cliente());
const errores = ref({});

const validar = () => {
  errores.value = {};

  if (!cliente.value.nombre)
    errores.value.nombre = 'El nombre es obligatorio';

  if (!/^\S+@\S+\.\S+$/.test(cliente.value.email))
    errores.value.email = 'Email inválido';

  if (!/^\d{7,15}$/.test(cliente.value.telefono))
    errores.value.telefono = 'Teléfono inválido';

  return Object.keys(errores.value).length === 0;
};

const guardar = async () => {
  if (!validar()) return;
  await createCliente(cliente.value);
  emit('guardado');
};
</script>

<template>
  <div class="card mb-4">
    <div class="card-header d-flex justify-content-between">
      <strong>Nuevo Cliente</strong>
      <button class="btn-close" @click="$emit('cancelar')"></button>
    </div>

    <div class="card-body">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input
          v-model="cliente.nombre"
          class="form-control"
          :class="{ 'is-invalid': errores.nombre }"
        />
        <div class="invalid-feedback">{{ errores.nombre }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model="cliente.email"
          class="form-control"
          :class="{ 'is-invalid': errores.email }"
        />
        <div class="invalid-feedback">{{ errores.email }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Teléfono</label>
        <input
          v-model="cliente.telefono"
          class="form-control"
          :class="{ 'is-invalid': errores.telefono }"
        />
        <div class="invalid-feedback">{{ errores.telefono }}</div>
      </div>

      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-secondary" @click="$emit('cancelar')">
          Cancelar
        </button>
        <button class="btn btn-success" @click="guardar">
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>
