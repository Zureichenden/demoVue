<script setup>
import { ref } from 'vue';

const visible = ref(false);
let onConfirm = null;

const abrir = (callback) => {
  onConfirm = callback;
  visible.value = true;
};

const cancelar = () => {
  visible.value = false;
};

const confirmar = () => {
  onConfirm && onConfirm();
  visible.value = false;
};

defineExpose({ abrir });
</script>

<template>
  <div v-if="visible" class="modal-backdrop-custom">
    <div class="modal-dialog-custom">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger">
            Confirmar eliminación
          </h5>
        </div>

        <div class="modal-body">
          ¿Seguro que deseas eliminar este cliente?
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="cancelar">
            Cancelar
          </button>
          <button class="btn btn-danger" @click="confirmar">
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-dialog-custom {
  width: 100%;
  max-width: 400px;
}
</style>
