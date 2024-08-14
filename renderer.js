var mainTextArea = document.getElementById("content")

function changePref(color, size, font) {
  mainTextArea.style.color = color
  mainTextArea.style.fontSize = size
  mainTextArea.style.fontFamily = font
}

changePref("red", "20px", "Arial")
