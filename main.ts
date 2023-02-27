import { ChatGPTAPI } from 'chatgpt'
// import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
import dotenv from 'dotenv-safe'
import fs from 'fs'
import { oraPromise } from 'ora'

import data from './data/test_prompts.json';
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
    apiKey: process.env.OPENAI_API_KEY 
  })

  // // PROXYAPI - NOT RECOMMENDED, CANNOT MAKE MUCH REQUEST
  // if (process.env.OPENAI_ACCESS_TOKEN == undefined)
  //   return -1;
  // const api = new ChatGPTUnofficialProxyAPI({
  //   accessToken: process.env.OPENAI_ACCESS_TOKEN,
  //   debug: false
  // })
  
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
        // case when there is error in the response (e.g.) too many requests error
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
        // case when the return value is not a json (rare)
        j--
        continue
      }

      fs.appendFileSync('./data/data_' + i + '.json', JSON.stringify(res_json) + ',\n')

      // delay for 1.5s before making the next request
      await delay(1500)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
