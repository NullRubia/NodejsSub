import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 모든 origin 허용
  res.setHeader("Access-Control-Allow-Methods", "GET, POST"); // 허용할 HTTP 메서드
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "login.html"), (err, data) => {
    if (err) {
      console.error("login.html 읽기 오류:", err.message);
      res.status(500);
      return res.send("파일 읽기 오류");
    }
    res.status(200).set({ "Content-Type": "text/html" });
    res.send(data);
  });
});

app.get("/login", (req, res) => {
  const userid = req.query.userid;
  const userpw = req.query.userpw;

  fs.readFile(path.join(__dirname, "result.html"), "utf-8", (err, data) => {
    if (err) {
      console.error("result.html 읽기 오류:", err.message);
      res.status(500);
      return res.send("파일 읽기 오류");
    }
    const resultPage = data.replace("userid", userid).replace("userpw", userpw);

    res.status(200).set({ "Content-Type": "text/html" });
    res.send(resultPage);
  });
});

app.listen(3000, () => {
  console.log("서버 실행중! http://localhost:3000/");
});
