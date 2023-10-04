import { Pipeline } from "@xenova/transformers";

import { pipeline } from "@xenova/transformers";
import { transcriptionExample } from "./utils/transcription.js";

export async function transcribe(audio){
  try {
    // return transcriptionExample
    
    console.log("Realizando transcrição")
    const transcribe = await pipeline(
      //definindo o que queremos usar 
      "automatic-speech-recognition",
      //definindo modelo de IA a ser utilizado
       "Xenova/whisper-small"
      )

      const transcription = await transcribe(audio, {
        chunk_lenght_s: 30,
        stride_lenght_s: 5,
        language: "portuguese",
        task: "transcribe",
      })

      console.log("Transcrição finalizada com sucesso.")
      //replace vai substituir o item em questão pelo a seguir
      return transcription?.text.replace("[Música]", "")
  } catch (error) {
    throw new Error(error)
  }
}