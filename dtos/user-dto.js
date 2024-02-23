module.exports = class UserDto {
  email;
  name;
  surname;
  phone;
  id;
  isActivated;
  avatar;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.name = model.name;
    this.surname = model.surname;
    this.phone = model.phone;
    this.avatar = model.avatar;
  }
};
