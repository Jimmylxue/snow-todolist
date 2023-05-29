// 上传source-map
import axios from 'axios'
import { readFileSync, readFile } from 'fs'
import { resolve } from 'path'
import Http from 'http'
const __dirname = resolve()

const demoFile = readFileSync(
	// resolve(__dirname, './dist/assets/index.900144a6.js.map')
	resolve(__dirname, './dist/assets/a.txt')
)

function createHeader() {
	return {
		headers: {
			'Cache-Control': 'no-cache',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Postman-Token': Date.now(),
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
			'X-Forwarded-For': new Array(4)
				.fill(0)
				.map(() => parseInt(String(Math.random() * 255), 10))
				.join('.'), // 构造ip
		},
		// hostname: ['tinyjpg.com', 'tinypng.com'][randomNum(0, 1)], // 随机请求
		hostname: '127.0.0.1', // 随机请求
		method: 'POST',
		path: '/catch/uploadfile',
		port: 9999,
		rejectUnauthorized: false,
	}
}

function upload(file) {
	const header = createHeader()
	return new Promise((resolve, reject) => {
		const req = Http.request(header, res => {
			res.on('data', data => {
				try {
					const resp = JSON.parse(data.toString())
					if (resp.error) {
						reject(resp)
					} else {
						resolve(resp)
					}
				} catch (err) {
					reject(err)
				}
			})
		})
		req.write(file)
		req.on('error', err => reject(err))
		req.end()
	})
}

console.log('demofile', demoFile)

upload(demoFile)

// console.log(demoFile)
// const blobFile = new File([data]
// readFile(
// 	resolve(__dirname, './dist/assets/index.900144a6.js.map'),
// 	(err, data) => {
// 		if (err) throw err
// 		let blobFile = new File([data], 'de.map')
// 		console.log('bbb', blobFile)
// 	}
// )

// const chunkSize = 5 * 1024 * 1024

// const createChunkList = (file, chunkSize) => {
// 	const fileChunkList = []
// 	let cur = 0
// 	while (cur < file.size) {
// 		fileChunkList.push(file.slice(cur, cur + chunkSize))
// 		cur += chunkSize
// 	}
// 	return fileChunkList
// }

// let fileChunkList = createChunkList(demoFile, chunkSize)

// // console.log(demoFile.)
// console.log(fileChunkList)
