//comments
export const getComment = (marks) => {
  return marks < 52
    ? "HZ"
    : marks >= 52 && marks < 124
    ? "H"
    : marks >= 124 && marks < 184
    ? "WS"
    : marks >= 184 && marks < 244
    ? "VZ"
    : "VS";
};

export const getComment100 = (marks) => {
  if (marks < 20) return "HZ";
  else if (marks >= 20 && marks < 44) return "H";
  else if (marks >= 44 && marks < 64) return "WS";
  else if (marks >= 64 && marks < 84) return "VZ";
  else return "VS";
};

export const getComment40 = (marks) => {
  return getComment100(marksOutOf40(marks));
};

export const getComment24 = (marks) => {
  return getComment100(marksOutof24(marks));
};

export const getComment20 = (marks) => {
  return getComment100(marksOutof20(marks));
};

export const getComment16 = (marks) => {
  return getComment100(marksOutof16(marks));
};

export const getComment12 = (marks) => {
  return getComment100(marksOutof12(marks));
};

export const getComment8 = (marks) => {
  return getComment100(marksOutof8(marks));
};

//percentage conversion

export const marksOutOf40 = (marks) => {
  let per = (marks / 40).toPrecision(4) * 100;

  return per;
};

export const marksOutof24 = (marks) => {
  let per = (marks / 24).toPrecision(4) * 100;

  return per;
};

export const marksOutof20 = (marks) => {
  let per = (marks / 20).toPrecision(4) * 100;

  return per;
};

export const marksOutof16 = (marks) => {
  let per = (marks / 16).toPrecision(4) * 100;

  return per;
};

export const marksOutof12 = (marks) => {
  let per = (marks / 12).toPrecision(4) * 100;

  return per;
};

export const marksOutof8 = (marks) => {
  let per = (marks / 8).toPrecision(4) * 100;

  return per;
};

//counting boys and girls
export const boyCount = (item) => {
  let count = 0;
  item.forEach((r) => {
    if (r.jinsia === "Mvulana") {
      count = count + 1;
    }
  });

  return count;
};

export const girlCount = (item) => {
  let count = 0;
  item.forEach((r) => {
    if (r.jinsia === "Msichana") {
      count = count + 1;
    }
  });

  return count;
};

//pass cuounts

export const szhPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment100(marksOutOf40(r.szh)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

export const mykPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment100(marksOutOf40(r.myk)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

export const kkuPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment100(marksOutof20(r.kku)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

export const imlaPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (
      r.jinsia === gender &&
      getComment100(marksOutOf40(r.imla)) === comment
    ) {
      count = count + 1;
    }
  });

  return count;
};

export const ndogoPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment100(marksOutof20(r.hzm)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

export const azuPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment100(marksOutof16(r.uaf)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

export const vituPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (
      r.jinsia === gender &&
      getComment100(marksOutof24(r.vitu)) === comment
    ) {
      count = count + 1;
    }
  });

  return count;
};

export const utaPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment(marksOutof20(r.uta)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

export const jum1PassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment100(marksOutof8(r.jum1)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

export const jum2PassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (
      r.jinsia === gender &&
      getComment100(marksOutof12(r.jum2)) === comment
    ) {
      count = count + 1;
    }
  });

  return count;
};

export const kut1PassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment100(marksOutof8(r.kut1)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

export const kut2PassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (
      r.jinsia === gender &&
      getComment100(marksOutof12(r.kut2)) === comment
    ) {
      count = count + 1;
    }
  });

  return count;
};

export const nzPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment100(marksOutof24(r.nz)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

export const mafPassCount = (row, gender, comment) => {
  let count = 0;
  row.forEach((r) => {
    if (r.jinsia === gender && getComment100(marksOutof16(r.maf)) === comment) {
      count = count + 1;
    }
  });

  return count;
};

//counting overall grades

export const vizuriSanaCount = (data) => {
  let count = 0;
  data.forEach((item) => {
    if (getComment(item.jumla) === "VS") {
      count = count + 1;
    }
  });

  return count;
};

export const vizuriCount = (data) => {
  let count = 0;
  data.forEach((item) => {
    if (getComment(item.jumla) === "VZ") {
      count = count + 1;
    }
  });

  return count;
};

export const wastaniCount = (data) => {
  let count = 0;
  data.forEach((item) => {
    if (getComment(item.jumla) === "WS") {
      count = count + 1;
    }
  });

  return count;
};

export const dhaifuCount = (data) => {
  let count = 0;
  data.forEach((item) => {
    if (getComment(item.jumla) === "H") {
      count = count + 1;
    }
  });

  return count;
};

export const hajuiCount = (data) => {
  let count = 0;
  data.forEach((item) => {
    if (getComment(item.jumla) === "HZ") {
      count = count + 1;
    }
  });

  return count;
};

//averages

export const szhAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutOf40(item.szh);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const mykAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutOf40(item.myk);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const kkuAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof20(item.kku);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const imlaAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutOf40(item.imla);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const ndogoAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof20(item.hzm);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const uanAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof16(item.uaf);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const vituAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof24(item.picha);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const utaAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof20(item.uta);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const jum1Average = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof8(item.jum1);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const jum2Average = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof12(item.jum2);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const kut1Average = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof8(item.kut1);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const kut2Average = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof12(item.kut2);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const nzAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof24(item.nz);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const mafAverage = (data) => {
  let total = 0;
  data.forEach((item) => {
    total += marksOutof16(item.maf);
  });

  let average = (total / data.length).toPrecision(2);

  return average;
};

export const progressTowardsThreshold = (marks) =>
  ((marks / 300).toFixed(4) * 100).toFixed(2);

export const progressTowardsBenchMark = (marks) =>
  ((marks / 244).toFixed(4) * 100).toFixed(2);
