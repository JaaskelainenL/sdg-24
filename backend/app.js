const cors = require('cors');
const express = require('express')
const app = express()
const port = 3001

app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).json({message:"helloo frontend"});
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
 
