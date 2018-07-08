
export class UserExistError extends Error {
  constructor(user) {
    super()
    this.type = 'UserExistError'
    this.message = `El usuario '${user}' ya existe`
  }
}
export class EmailExistError extends Error {
  constructor(email) {
    super()
    this.type = 'EmailExistError'
    this.message = `El email '${email}' ya existe`
  }
}
export class NoSessionError extends Error {
  constructor(email) {
    super()
    this.type = 'NoSessionError'
    this.message = 'No se ha encontrado una sesión activa'
  }
}
