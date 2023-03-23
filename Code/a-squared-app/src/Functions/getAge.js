export default function getAge(dob) {
  // TODO: fix this to work with new dob format like "1992-04-02"
  let dobParts = dob.split("-");
  let today = new Date();
  let dobDate = new Date(dobParts[0], dobParts[1] - 1, dobParts[2]);
  let diff = today - dobDate;
  let age = Math.floor(diff / 31557600000);
  return age;
}
