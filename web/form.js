import {server} from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

// Função que fica observando o clique do botão
form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  //recuperando URL do vídeo
  const videoURL = input.value

  //validando se é um vídeo shorts
  if (!videoURL.includes("/shorts")) {
    return content.textContent = "Esse vídeo não parece ser um short."
  }

  //tratamento para extrair o ID do vídeo
  const [_, params] = videoURL.split("/shorts/")
  const [videoID,] = params.split("?si")
  console.log(videoID)

  //atualiza mensagem no front
  content.textContent = "Obtendo o texto do aúdio..."

  //faz a requisição para o server no endereço especificado enviando o id do vídeo--
  // continuação da explicação do que o endereço faz em "server/index.js""
  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
