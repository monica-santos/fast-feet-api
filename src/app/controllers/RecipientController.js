import * as Yup from 'yup'
import Recipient from '../models/Recipient'

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll()
    res.json(recipients)
  }

  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      street: Yup.string().required(),
      street_number: Yup.string().required(),
      complement: Yup.string().notRequired(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .length(8)
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    const {
      name,
      street,
      street_number,
      complement,
      state,
      city,
      zip_code,
    } = req.body

    const recipient = await Recipient.create({
      name,
      street,
      street_number,
      complement,
      state,
      city,
      zip_code,
    })

    return res.json(recipient)
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      street: Yup.string(),
      street_number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string().length(8),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    const {
      params: { id },
      body,
    } = req
    const recipient = await Recipient.findByPk(id)
    if (!recipient) return res.status(404).json({ error: 'Resource not found' })
    const {
      name,
      street,
      street_number,
      complement,
      state,
      city,
      zip_code,
    } = await recipient.update(body)
    return res.send({
      name,
      street,
      street_number,
      complement,
      state,
      city,
      zip_code,
    })
  }
}

export default new RecipientController()
