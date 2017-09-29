module.exports = {
  getExp: function (sheet) {
    let atl = (sheet.ath * (sheet.ath + 1)) / 2
    let aff = (sheet.aff * (sheet.aff + 1)) / 2
    let per = (sheet.per * (sheet.per + 1)) / 2

    return atl + aff + per
  }
}
