import { commentModel } from '../model/comments.js'
import { userModel } from '../model/users.js'

function catchError(error, res) {
  res.status(400).json({ code: 'FAIL', ...error }
  )
}

export const getAllComments = (req, res) => {
  commentModel.findAll()
    .then(async crud => {
      if (crud.length != 0) {
        crud.sort((a, b) => {
          return b.createdAt - a.createdAt
        });
        const new_crud = await Promise.all(crud.map(async element => {
          const user = await userModel.findByPk(element.UserId)
          return { ...element.dataValues, user: user.dataValues.name, imagen: user.dataValues.imagen }
        }))
        res.status(200).json(new_crud)
      }
      else res.status(400).json({ code: 'NO FOUND' })
    })
    .catch(error => catchError(error, res))
}
export const getUniqueComment = (req, res) => {
  commentModel.findOne({ where: { id_comment: req.params.id } })
    .then(crud => {
      if (crud.length != 0) res.status(200).json(crud)
      else res.status(400).json({ code: 'NO FOUND' })
    })
    .catch(error => catchError(error, res))
}
export const addComment = (req, res) => {
  const { title, note, id } = req.body
  if (title === '' || note === '') catchError({ error: 'MISSING DATA' }, res)
  else {
    commentModel.create({ title, note, UserId: id })
      .then(async crud => {
        const user = await userModel.findByPk(crud.UserId)
        res.status(200).json({ ...crud.dataValues, user: user.dataValues.name, imagen: user.dataValues.imagen })
      })
      .catch(error => catchError(error, res))
  }
}
export const updateComment = (req, res) => {
  const { id_comment, title, note } = req.body
  if (title === '' || note === '') catchError({ error: 'MISSING DATA' }, res)
  else {
    commentModel.update({ title, note }, { where: { id_comment } })
      .then(() => {
        req.params.id = id
        getUniqueComment(req, res)
      })
      .catch(error => catchError(error, res))
  }
}
export const deleteComment = (req, res) => {
  const { id_comment } = req.body
  commentModel.destroy({ where: { id_comment } })
    .then(crud => {
      if (crud != 0) res.status(200).json({ code: 'DELETED' })
      else res.status(400).json({ code: 'NO FOUND' })
    })
    .catch(error => catchError(error, res))
}

export const getAllCommentsUser = (req, res) => {
  commentModel.findAll({ where: { UserId: req.params.id } })
    .then(async crud => {
      if (crud.length != 0) {
        crud.sort((a, b) => {
          return b.createdAt - a.createdAt
        });
        const new_crud = await Promise.all(crud.map(async element => {
          const user = await userModel.findByPk(element.UserId)
          return { ...element.dataValues, user: user.dataValues.name, imagen: user.dataValues.imagen }
        }))
        res.status(200).json(new_crud)
      }
      else res.status(200).json([])
    })
    .catch(error => catchError(error, res))
}