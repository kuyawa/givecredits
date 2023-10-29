export default async function ping(req, res) {
  res.status(200).json({ success: true });
}
