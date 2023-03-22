import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()

const PORT = 8000;

const app: Application = express();

app.get("/test", (req, res) => {
  return res.status(200).json("Server is running")
})

app.get("/connect", async (req, res) => {
  try {

    const response = await fetch(`${process.env.TEKSTAI_BASE_URL}/mail/add?callback=http://localhost:8000/callback`, {
      headers: {
        "x-api-key": `${process.env.TEKSTAI_API_KEY}`,
      }
    })
    const data = await response.json()
    return res.status(200).json(data)

  } catch (err) {
    console.log(err)
    return res.status(500).json("something went wrong")
  }
})

app.get("/callback", async (req, res) => {
  try {
    console.log(req.query)
    return res.redirect("https://www.google.com")
  } catch (err) {
    console.log(err)
    return res.status(500).json("something went wrong")
  }
})

app.get("/send/:id", async (req, res) => {
  try {
    const response = await fetch(`${process.env.TEKSTAI_BASE_URL}/mail/send?id=${req.params.id}`, {
      method: "POST",
      headers: {
        "x-api-key": `${process.env.TEKSTAI_API_KEY}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "to": ["julien.vanbeveren@gmail.com"],
        "subject": "demo email",
        "body": "this is a demo email"
      })
    })
    const data = await response.json()
    console.log(data)
    return res.status(200).json("success")
  } catch (err) {
    console.log(err)
    return res.status(500).json("something went wrong")
  }
})


app.listen(PORT, () => {
  console.log(`⚡️[server]: running on port ${PORT}`);
});

export default app;