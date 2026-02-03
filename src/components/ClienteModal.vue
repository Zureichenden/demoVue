<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue'
import Cliente from '../models/cliente'
import { createCliente, updateCliente } from '../api/clientesApi'

const emit = defineEmits(['guardado'])

const visible = ref(false)
const isEdit = ref(false)

const form = reactive(new Cliente())
const errors = reactive({
  nombre: '',
  email: '',
  telefono: ''
})

function abrir(cliente = null) {
  limpiarErrores()

  if (cliente) {
    Object.assign(form, cliente)
    isEdit.value = true
  } else {
    Object.assign(form, new Cliente())
    isEdit.value = false
  }

  visible.value = true
}

function cerrar() {
  visible.value = false
}

function validar() {
  limpiarErrores()
  let valido = true

  if (!form.nombre || form.nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres'
    valido = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Email no válido'
    valido = false
  }

  if (form.telefono && form.telefono.length < 7) {
    errors.telefono = 'Teléfono demasiado corto'
    valido = false
  }

  return valido
}

async function guardar() {
  if (!validar()) return

  if (isEdit.value) {
    await updateCliente(form.id, form)
  } else {
    await createCliente(form)
  }

  cerrar()
  emit('guardado')
}

function limpiarErrores() {
  errors.nombre = ''
  errors.email = ''
  errors.telefono = ''
}

defineExpose({ abrir })
</script>

<template>
  <!-- BACKDROP -->
  <div v-if="visible" class="modal-backdrop fade show"></div>

  <!-- MODAL -->
  <div
    v-if="visible"
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">

        <!-- HEADER -->
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            {{ isEdit ? 'Editar cliente' : 'Nuevo cliente' }}
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="cerrar"></button>
        </div>

        <!-- BODY -->
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input
              v-model="form.nombre"
              class="form-control"
              :class="{ 'is-invalid': errors.nombre }"
            />
            <div class="invalid-feedback">{{ errors.nombre }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              v-model="form.email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
            />
            <div class="invalid-feedback">{{ errors.email }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Teléfono</label>
            <input
              v-model="form.telefono"
              class="form-control"
              :class="{ 'is-invalid': errors.telefono }"
            />
            <div class="invalid-feedback">{{ errors.telefono }}</div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="cerrar">
            Cancelar
          </button>
          <button class="btn btn-primary" @click="guardar">
            Guardar
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Asegura que el modal esté encima */
.modal {
  z-index: 1055;
}
.modal-backdrop {
  z-index: 1050;
}
</style>
