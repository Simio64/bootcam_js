import multer from 'multer'

const storage = multer.diskStorage({
  destination: 'static/tiny/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
  fileFilter: '',
  limits: ''
})
const upload = multer({ storage })

export const savedFile = upload.single('myfile')

export const validateFile = (_req, res) => {
  res.send('OK')
}