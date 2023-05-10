import { ChatGPTAPI } from 'chatgpt'
import dotenv from 'dotenv-safe'
import fs from 'fs'
import { oraPromise } from 'ora'

import data from './data/prompts.json';
import { GUIDANCE } from './constants'

dotenv.config()

/**
 * ref - https://github.com/transitive-bullshit/chatgpt-api/blob/main/demos/demo.ts
 */

function delay (ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) )
}

async function main () {
  // CHATGPTAPI - RECOMMENDED
  if (process.env.OPENAI_API_KEY == undefined)
    return -1
  const api = new ChatGPTAPI({ 
    apiKey: process.env.OPENAI_API_KEY,
    completionParams: {
      model: "text-davinci-003"
    }
  })
  
  // loop through prompts
  for (var i = 0; i < 1; i++) {

    const prompt = data[i].prompt + GUIDANCE
    data[i].result = []

    // create 5 queries
    for (var j = 0; j < 1; j++) {
      var res
      try {
        res = await oraPromise(api.sendMessage(prompt), {
          text: prompt
        })
      } catch (e) {
        // case when there is error in the response (e.g.) too many requests error
        console.log(e)
        await delay(10000)
        j--
        continue
      }

      console.log(res)

      let res_json
      try {
        res_json = JSON.parse(res.text)
      }
      catch (e) {
        // case when the return value is not a json (rare)
        j--
        continue
      }
      data[i].result.push(res_json)
      // await delay(10)
    }

    fs.appendFileSync('./data/test.json', JSON.stringify(data[i]) + ',\n')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
