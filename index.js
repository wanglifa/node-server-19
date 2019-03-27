const express = require('express')
const multer = require('multer')
const cors = require('cors')
//把用户传来的文件存到我服务器的uploads目录下，没有这个目录它会自动创建
const upload = multer({dest: 'uploads/'})
const app = express()
app.get('/', (req, res) => {
    res.send('hello nodejs')
})
//options和post都得加cors()
app.options('/upload', cors())
app.post('/upload', cors(), upload.single('file'),(req,res)=>{
    let fileAttr = req.file
    let object = {id:fileAttr.filename}
    res.send(JSON.stringify(object))
})
app.get('/preview/:key', cors(), (req,res)=>{
    res.sendFile(`uploads/${req.params.key}`,{
        root: __dirname,
        headers: {
            'Content-Type': 'image/jpeg'
        }
    },(error)=>{
        console.log(error)
    })
})
let port = process.env.PORT || 3000
app.listen(port)