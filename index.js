const express = require('express');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  next();
});

app.options('/send', (req, res) => res.sendStatus(200));

app.post('/send', async (req, res) => {
  const { name, phone, date, guests, event_type, message } = req.body;

  const text = '🔔 Новая заявка с сайта!\n\n'
    + '👤 Имя: ' + (name || '—') + '\n'
    + '📞 Телефон: ' + (phone || '—') + '\n'
    + (date ? '📅 Дата: ' + date + '\n' : '')
    + (guests ? '👥 Гостей: ' + guests + '\n' : '')
    + (event_type ? '🎉 Тип: ' + event_type + '\n' : '')
    + (message ? '💬 Пожелания: ' + message + '\n' : '');

  const token = '8754314869:AAE5UpxJ9eCBDvV-7UBVDzzPs65YSx0yAUA';
  const ids = ['1434511966', '847489470', '488168564', '5097414297'];

  for (const chat_id of ids) {
    await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text })
    });
  }

  res.json({ ok: true });
});

app.get('/', (req, res) => res.send('OK'));

app.listen(process.env.PORT || 3000);
