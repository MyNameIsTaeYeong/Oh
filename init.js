import dotenv from "dotenv";
import app from "./app";
import "./db";

dotenv.config();

const PORT = process.env.PORT;

const handleListening = () => {
    console.log(`💚 Listening on : http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);
