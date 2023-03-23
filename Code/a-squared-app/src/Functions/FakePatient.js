export function HeartRate() {
  let HR = Math.random() * (90 - 80) + 80;
  return Math.floor(HR);
}

export function BloodPressure(anesthesia) {
  let top = Math.random() * (130 - 120) + 120;
  let bottom = Math.random() * (82 - 80) + 80;

  // console.log(top, anesthesia);
  return { sys: Math.floor(top), dia: Math.floor(bottom) };
}

export function Respiration(secs) {
  return Math.sin(secs); // normal respiration loosely follows a sin wave
  //return 10;
}

// surgeryIntensity depends on how intense the surgery is so patient will need more anesthesia
export function surgeryAnesthesia(weight, surgeryHappening, surgeryIntensity) {
  if (surgeryHappening && surgeryIntensity > 0 && surgeryIntensity < 11) {
    let surgeryAnesthesia = weight * surgeryIntensity;
    return surgeryAnesthesia;
  } else {
    return 0;
  }
}

export function HourlyBaseAnesthesia(weight) {
  let RandomDancing = Math.random();
  let hourlyRate = 0;
  if (weight >= 10) {
    // if they are older than 10
    hourlyRate += 40; // calculating 4 ml x first 10kg
    if (weight >= 20) {
      // if they are older than 20
      hourlyRate += 20; // calculating 2 ml x second 10kg
      hourlyRate += weight - 20; // calculating 1 ml x kg
    } else {
      // in between 10-20
      let temp = weight - 10;
      hourlyRate += temp * 2; // 2 ml/kg
    }
  } else {
    // below 10
    hourlyRate += weight * 4; // 4 ml/kg
  }

  return hourlyRate + RandomDancing; // this is the hourly rate based off weight
}
