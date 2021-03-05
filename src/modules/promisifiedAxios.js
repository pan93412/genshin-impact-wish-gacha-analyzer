/**
 * Copyright © 2020-2021 原神情報站 Genshin Info
 * https://genshininfo.reh.tw/
 *
 * Developed by 旋風之音 GoneTone
 * https://www.facebook.com/GoneToneDY
 */

'use strict'

const axios = require('axios')

axios.defaults.adapter = require('axios/lib/adapters/http')

/**
 * @param {string} url 網址
 * @param {boolean} isReject
 *
 * @returns {Promise<axios.response>}
 */
const promisifiedAxios = (url, isReject = true) => {
  let options = {}

  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36'
  options = {
    headers: {
      'User-Agent': userAgent
    },
    timeout: 20000
  }

  return new Promise((resolve, reject) => {
    axios.get(url, options).then((response) => {
      return resolve(response)
    }).catch((e) => {
      if (isReject) {
        return reject(new Error(`網址 "${url}" 取得資源失敗：${e.message}`))
      }

      return resolve(new Error(`網址 "${url}" 取得資源失敗：${e.message}`))
    })
  })
}

module.exports = promisifiedAxios
