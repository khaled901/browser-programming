const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "data", "expenses.json");

function readData() {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get("/api/expenses", (req, res) => {
  res.json(readData());
});

app.post("/api/expenses", (req, res) => {
  const { amount, category, date, note } = req.body;

  if (!amount || !category || !date) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const data = readData();

  const newExpense = {
    id: Date.now().toString(),
    amount: Number(amount),
    category,
    date,
    note: note || "",
  };

  data.push(newExpense);
  writeData(data);

  res.json(newExpense);
});
app.delete("/api/expenses/:id", (req, res) => {
  const id = req.params.id;
  console.log("Delete request for id:", id);

  const data = readData();

  const itemExists = data.some((item) => String(item.id) === String(id));

  if (!itemExists) {
    return res.status(404).json({ message: "Expense not found" });
  }

  const newData = data.filter((item) => String(item.id) !== String(id));
  writeData(newData);

  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});