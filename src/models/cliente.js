export default class Cliente {
  constructor(nombre = '', email = '', telefono = '') {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.status = 1;

  }
}
