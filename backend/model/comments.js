import { Sequelize } from 'sequelize'
import { sequelize } from '../config/db.js'
import { userModel } from './users.js'

const commentModel = sequelize.define('Comments', {
  id_comment: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  note: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

userModel.hasOne(commentModel, {
  onDelete: "cascade",
  foreignKey: {
    allowNull: false
  }
})

export { commentModel }