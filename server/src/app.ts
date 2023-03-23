import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const PORT = 8000;

const app: Application = express();

app.use(cors({ origin: "*", credentials: false }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/test", (req, res) => {
  return res.status(200).json("Server is running")
})

app.get("/connect", async (req, res) => {
  try {
    const { email, name } = req.query
    const response = await fetch(`${process.env.TEKSTAI_BASE_URL}/mail/add?callback=http://localhost:8000/callback&type=outlook&email=${email}&state=${name}`, {
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
    return res.redirect(`http://localhost:3000`)
  } catch (err) {
    console.log(err)
    return res.status(500).json("something went wrong")
  }
})

app.post("/send/:id", async (req, res) => {
  try {
    console.log(req.body)
    const response = await fetch(`${process.env.TEKSTAI_BASE_URL}/mail/send?id=${req.params.id}`, {
      method: "POST",
      headers: {
        "x-api-key": `${process.env.TEKSTAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    })
    const data = await response.json()
    console.log(data)
    return res.status(200).json("success")
  } catch (err) {
    console.log(err)
    return res.status(500).json("something went wrong")
  }
})

app.get("/integrations", async (req, res) => {
  try {
    const response = await fetch(`${process.env.TEKSTAI_BASE_URL}/integrations/all`, {
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


app.listen(PORT, () => {
  console.log(`⚡️[server]: running on port ${PORT}`);
});

export default app;