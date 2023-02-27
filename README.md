# how to run this project
1. make sure you are using `node >= 18`
2. install dependencies
```
npm install
```
3. get your own openAI API key (used for the more robust ChatGPTAPI) or chatgpt access token (used for ChatGPTUnofficialProxyAPI - NOT RECOMMENDED)
get your openAI API key on OpenAI platform - https://platform.openai.com/overview and get your chatgpt access token - https://chat.openai.com/api/auth/session

> Note - Access tokens last for ~8 hours. Using a reverse proxy will expose your access token to a third-party. There shouldn't be any adverse effects possible from this, but please consider the risks before using this method.

4. update `.env` and `.env.example` with your API/token information. Don't forget to remove them if you want to push to github

5. run main.ts
```
npx tsx main.ts
```
