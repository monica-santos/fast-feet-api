require('dotenv/config')

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_NAME,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
