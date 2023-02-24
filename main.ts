import { ChatGPTAPI } from 'chatgpt'
import dotenv from 'dotenv-safe'
import fs from 'fs'
import { oraPromise } from 'ora'

import data from './data/test_prompts.json';
import { GUIDANCE } from './constants'

dotenv.config()

/**
 * ref - https://github.com/transitive-bullshit/chatgpt-api/blob/main/demos/demo.ts
 * run this command - npx tsx main.ts
 */

function delay (ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) )
}

async function main () {
  if (process.env.OPENAI_API_KEY == undefined)
    return -1

  // initialize chatgpt api
  const api = new ChatGPTAPI({ 
    apiKey: process.env.OPENAI_API_KEY 
  })
  
  // loop through prompts
  for (var i = 0; i < data.length; i++) {

    const prompt = data[i].prompt + GUIDANCE;

    // create 100 queries
    for (var j = 0; j < 100; j++) {
      var res;
      try {
        res = await oraPromise(api.sendMessage(prompt), {
          text: prompt
        })
      } catch (e) {
        console.log(e)
        await delay(100000)
        j--
        continue
      }

      console.log(res)

      let res_json;
      try {
        res_json = JSON.parse(res.text)
      }
      catch (e) {
        j--
        continue
      }

      fs.appendFileSync('./data/data_' + i + '.json', JSON.stringify(res_json) + ',\n')

      await delay(1500)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
