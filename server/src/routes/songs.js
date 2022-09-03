const express = require("express");
const router = express.Router()
const multer  = require('multer');

// para almacenar files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/songs/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});  
const upload = multer({ storage: storage });

// ejecuta el script y crea la conecxion denyto de tal archivo
require('../db/mongoose')

/**
 * @swagger
 * definitions:
 *   Song:
 *     required:
 *       - title
 *       - artistName
 *       - genres
 *       - date
 *       - fileName
 *       - cover
 *     properties:
 *       title:
 *         type: string
 *       artistName:
 *         type: string
 *       genres:
 *         type: string
 *       date:
 *         type: string
 *       fileName:
 *         type: string
 *       cover:
 *         type: string
 */
const Song = require('../models/song')

/**
 * @swagger
 * /songs:
 *  post:
 *      description: Added a song.
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *       - in: formData
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: artistName
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: genres
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: song
 *         required: true
 *         schema:
 *           type: file
 *       - in: formData
 *         name: cover
 *         required: true
 *         schema:
 *           type: file
 *      responses:
 *          200:
 *              description: Operation was successful.
 *          500:
 *              description: Server error
 */
router.post('/', upload.fields([{ name: 'song', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), function (req, res, next) {
  const song = new Song({ 
      title: req.body.title,
      artistName: req.body.artistName,
      genres: req.body.genres,
      date: req.body.date,
      fileName:  req.files.song !== undefined ? req.files.song[0].filename : null,
      cover: req.files.cover !== undefined ? req.files.cover[0].filename : null
  });
  song.save().then(() => {
      res.send(song)
  }).catch((error) => {
      res.status(400).send(error)
  })
});

/**
 * @swagger
 * /songs:
 *   get:
 *     description: Retrieve a list of songs.
 *     responses:
 *        200:
 *          description: Operation was successful.
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/Song'
 *        500:
 *          description: Server error
 */
router.get('/', (req, res, next) => {
  Song.find({}).then((songs) => {
      res.send(songs)
  }).catch((error) => {
      res.status(500).send()
  })
})

/**
 * @swagger
 * /songs/{id}:
 *  get:
 *      description: Retrieve a song.
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the song to retrieve
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: Operation was successful.
 *              schema:
 *                type: object
 *                $ref: '#/definitions/Song'
 *          500:
 *              description: Server error
 */
router.get('/:id', (req, res, next) => {
  const _id = req.params.id 

  Song.findById(_id).then((song) => {
      if(!song) {
          return res.status(404).send()
      }
      
      res.send(song)
  }).catch((error) => {
      res.status(500).send()
  })
})

/**
 * @swagger
 * /songs/{id}:
 *  delete:
 *      description: Remove a song.
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the song to delete
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: Operation was successful.
 *          500:
 *              description: Server error
 */
router.delete('/:id', (req, res, next) => {
  const _id = req.params.id 

  Song.deleteOne(_id).then(() => {
      res.status(201).send()
  }).catch((error) => {
      res.status(500).send()
  })
})

module.exports = router;