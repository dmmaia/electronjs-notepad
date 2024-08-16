var saveButton = document.getElementById("save-button")
var size = document.getElementById("f-size")
var font = document.getElementById("f-font")

saveButton.addEventListener('click', () => {
  window.electronAPI.changePreferences({ size: size.value, color: "black", font: font.value })
})

