/*
    patient.js

    patient class which is used to instantiate a patient object which can be used to easily access data on a specific patient
*/
class patient {
  constructor(fname, lname, sex, height, weight, dob, id) {
    this.firstName = fname;
    this.lastName = lname;
    this.sex = sex;
    this.height = height;
    this.weight = weight;
    this.dateOfBirth = dob;
    //this.id = id;
  }
}
