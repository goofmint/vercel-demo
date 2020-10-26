const { CustomersMailCloud } = require('customersmailcloud');

module.exports = async (req, res) => {
  const {email, name, body} = req.body;
  const client = new CustomersMailCloud(process.env.API_USER, process.env.API_KEY)
  client.trial();
  client
    .setFrom('Admin', process.env.FROM_ADDRESS)
    .addTo(name, email)
    .setSubject('お問い合わせがありました')
    .setText(`お問い合わせ内容\n${body}`)
  try {
    const res = await client.send()
    res.json({
      statusCode: 200,
      body: JSON.stringify(res)
    });
  } catch (e) {
    res.json({
      statusCode: 503,
      body: JSON.stringify(e)
    });
  }
}
