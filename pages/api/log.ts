export default async function log(req, res) {
  console.log(req.body)
  res.status(204).end()
}
