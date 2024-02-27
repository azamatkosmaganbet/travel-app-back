module.exports = class UserDto {
  email;
  name;
  surname;
  phone;
  id;
  isActivated;
  avatar;
  role;
  description;
  aboutMe;
  guests;
  registerDate;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.name = model.name;
    this.surname = model.surname;
    this.phone = model.phone;
    this.avatar = model.avatar;
    this.role = model.role;
    this.description = model.description;
    this.aboutMe = model.aboutMe;
    this.guests = model.guests;
    this.location = model.location;
    this.registerDate = model.registerDate;
  }
};
