import cors from "cors"
import express from "express"

import { convert } from "./convert.js"
import { download } from "./dowload.js"
import { transcribe } from "./transcribe.js"

import { summarize } from "./summarize.js"

const app = express()
app.use(express.json())
app.use(cors())

//recupera 'id' que é passado como um parametro
app.get("/summary/:id", async (request, response) => {
  try {
    //faz dowload do vídeo
    await download(request.params.id)
    //converte o vídeo
    const audioConverted = await convert()
    //passa o aúdio pra IA fazer a transcrição
    //cont da explicação em "transcribe.js"
    const result = await transcribe(audioConverted)

    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({error})
  }
})

app.post("/summary", async (request, response) => {
  try {
  const result = await summarize(request.body.text)
  return response.json({ result })
  }catch (error) {
    console.log(error)
    return response.json({error})
  }
})
/*Listen é o método que vai ficar "ouvindo as requisições, no parametro vai a porta q ele ficará ouvindo"*/
/*() => função sem nome autoexecutavel */
/*console.log escreve no terminal*/
app.listen(3333, () => console.log("Server is running on port 3333"))
