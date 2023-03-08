// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Generate Specimen Data

let specimenNum = Date.now() + Math.floor(Math.random() * 1000);
let dna = mockUpStrand();
let specimenNum2 = Math.floor(Math.random() * 70000000000);
let dna2 = mockUpStrand();

// generating apAequor specimen
function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      // setting variables for mutation
      let mutatedDna = this.dna;
      const baseNum = Math.floor(Math.random() * 15);
      let newMutation = returnRandBase();
      let attempts = 0;

      while (attempts < 5 && mutatedDna[baseNum] === this.dna[baseNum]) {
        mutatedDna[baseNum] = newMutation;
        attempts++;
        return mutatedDna;
      }
    },
    compareDNA(pAequor) {
      let matchingBases = 0;
      for (let base in this.dna) {
        if (this.dna[base] === pAequor.dna[base]) {
          matchingBases++;
        }
      }
      return `${Math.floor(
        (matchingBases / 15) * 100
      )}% Match (${matchingBases}/15 matching bases)`;
    },
    willLikelySurvive() {
      let strongBases = 0;
      for (let dnaBase in this.dna) {
        if (this.dna[dnaBase] === "C" || this.dna[dnaBase] === "G") {
          strongBases++;
        }
      }
      let percentageOfStrongBases = (strongBases / 15) * 100;
      return percentageOfStrongBases > 59;
    },
    complementStrand() {
      let complementaryDna = [];
      for (let compBase in this.dna) {
        if (this.dna[compBase] === "A" || this.dna[compBase] === "T") {
          if (this.dna[compBase] === "T") {
            complementaryDna.push("A");
          } else {
            complementaryDna.push("T");
          }
        } else if (this.dna[compBase] === "C" || this.dna[compBase] === "G") {
          if (this.dna[compBase] === "G") {
            complementaryDna.push("C");
          } else {
            complementaryDna.push("G");
          }
        }
      }
      return `DNA:${this.dna}\nComp. DNA:${complementaryDna}`;
    },
  };
}

// Variable containing specimen
function bulkSpecimenFactory(amount) {
  let healthySpecimen = [];
  let specimenNum = Date.now() + Math.floor(Math.random() * 1000);
  let dna = mockUpStrand();

  for (
    let specimenNumber = 1;
    specimenNumber < 100 && healthySpecimen.length < amount;
    specimenNumber++
  ) {
    pAequorFactory(specimenNum, dna);
    if (pAequorFactory(specimenNum, dna).willLikelySurvive() === true) {
      healthySpecimen.push(pAequorFactory(specimenNum, dna));
    }
  }
  return healthySpecimen;
}
console.log(
  pAequorFactory(specimenNum, dna).complementStrand(
    pAequorFactory(specimenNum2, dna2)
  )
);
