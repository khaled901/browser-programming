import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "https://browser-programming.onrender.com/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = [
    "Food",
    "Transport",
    "Health",
    "Shopping",
    "Bills",
    "Entertainment",
    "Other",
  ];

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_URL);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert("Please fill amount, category, and date.");
      return;
    }

    try {
      await axios.post(API_URL, {
        amount,
        category,
        date,
        note,
      });

      setAmount("");
      setCategory("");
      setDate("");
      setNote("");
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting id:", id);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const filteredExpenses = useMemo(() => {
    if (filterCategory === "All") return expenses;
    return expenses.filter((expense) => expense.category === filterCategory);
  }, [expenses, filterCategory]);

  const totalSpending = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  }, [filteredExpenses]);

  const averageSpending = useMemo(() => {
    if (filteredExpenses.length === 0) return 0;
    return totalSpending / filteredExpenses.length;
  }, [filteredExpenses, totalSpending]);

  const chartData = useMemo(() => {
  const grouped = {};
  expenses.forEach((expense) => {
    grouped[expense.category] = (grouped[expense.category] || 0) + Number(expense.amount);
  });

  const colors = [
    "#2f9b84",
    "#b88e67",
    "#a7cb42",
    "#c7e9e1",
    "#7aa99d",
    "#4f8f82",
    "#b7d8cf",
  ];

  return Object.entries(grouped).map(([name, value], index) => ({
    name,
    value,
    color: colors[index % colors.length],
  }));
}, [expenses]);

const totalChart = chartData.reduce((sum, item) => sum + Number(item.value), 0);

const conicGradient =
  totalChart > 0
    ? (() => {
        let currentDeg = 0;
        return `conic-gradient(${chartData
          .map((item) => {
            const value = Number(item.value);
            const start = currentDeg;
            const end = currentDeg + (value / totalChart) * 360;
            currentDeg = end;
            return `${item.color} ${start}deg ${end}deg`;
          })
          .join(", ")})`;
      })()
    : "#2f9b84";

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f3", padding: "16px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          background: "#f7f6f3",
          border: "1px solid #ddd7cf",
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #ddd7cf",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              background: "#2f9b84",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            💼
          </div>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1f2937" }}>Expense Tracker</h1>
        </div>

        <div style={{ padding: "16px", display: "grid", gap: "18px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
            }}
          >
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={iconBox}>€</div>
                <div>
                  <div style={smallTitle}>This Month</div>
                  <div style={bigValue}>€{totalSpending.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={iconBox}>#</div>
                <div>
                  <div style={smallTitle}>Total Expenses</div>
                  <div style={bigValue}>{filteredExpenses.length}</div>
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={iconBox}>↗</div>
                <div>
                  <div style={smallTitle}>Average</div>
                  <div style={bigValue}>€{averageSpending.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitle}>Add Expense</h2>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "18px",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <label style={labelStyle}>Amount (€)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={{ minWidth: 0 }}>
                  <label style={labelStyle}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ minWidth: 0 }}>
                  <label style={labelStyle}>Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
                </div>

                <div style={{ minWidth: 0 }}>
                  <label style={labelStyle}>Note (optional)</label>
                  <input
                    type="text"
                    placeholder="Coffee, groceries..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <button type="submit" style={buttonStyle}>
                + Add Expense
              </button>
            </form>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitle}>Spending by Category</h2>

            {chartData.length === 0 ? (
              <p style={{ color: "#6b7280" }}>No data yet</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0" }}>
                <div
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    backgroundImage: conicGradient,
                    backgroundColor: "#2f9b84",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "50%",
                      background: "white",
                    }}
                  />
                </div>

                <div style={{ marginTop: "24px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                  {chartData.map((item) => (
                  <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2f9b84" }}>
                  <span style={{ width: "22px", height: "10px", background: item.color, display: "inline-block" }} />
                    {item.name}
                  </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={sectionStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              <h2 style={{ ...sectionTitle, marginBottom: 0 }}>Expenses</h2>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{ ...inputStyle, width: "240px", marginBottom: 0 }}
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {filteredExpenses.length === 0 ? (
              <p style={{ color: "#6b7280" }}>No expenses found.</p>
            ) : (
              filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  style={{
                    background: "#f7f5f2",
                    borderRadius: "16px",
                    padding: "16px",
                    marginBottom: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <strong style={{ fontSize: "18px", color: "#111827" }}>
                        €{Number(expense.amount).toFixed(2)}
                      </strong>
                      <span
                        style={{
                          background: "#dff1eb",
                          color: "#2f9b84",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "14px",
                        }}
                      >
                        {expense.category}
                      </span>
                    </div>
                    <div style={{ marginTop: "8px", color: "#6b7280" }}>{expense.date}</div>
                    {expense.note && <div style={{ marginTop: "6px", color: "#6b7280" }}>{expense.note}</div>}
                  </div>

                  <button
                    onClick={() => handleDelete(expense.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#6b7280",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    🗑
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #ddd7cf",
  borderRadius: "18px",
  padding: "18px",
  minHeight: "88px",
};

const iconBox = {
  width: "48px",
  height: "48px",
  borderRadius: "14px",
  background: "#e5f1ed",
  color: "#2f9b84",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  fontWeight: "bold",
};

const smallTitle = {
  color: "#6b7280",
  fontSize: "15px",
  marginBottom: "4px",
};

const bigValue = {
  color: "#111827",
  fontSize: "22px",
  fontWeight: "bold",
};

const sectionStyle = {
  background: "#ffffff",
  border: "1px solid #ddd7cf",
  borderRadius: "18px",
  padding: "24px",
};

const sectionTitle = {
  marginTop: 0,
  marginBottom: "24px",
  color: "#111827",
  fontSize: "22px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#111827",
  fontSize: "16px",
};

const inputStyle = {
  width: "100%",
  height: "48px",
  borderRadius: "14px",
  border: "1px solid #d6d3d1",
  padding: "0 14px",
  fontSize: "16px",
  marginBottom: "14px",
  background: "#fff",
  boxSizing: "border-box",
};

const buttonStyle = {
  marginTop: "8px",
  background: "#2f9b84",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  padding: "14px 20px",
  fontSize: "18px",
  cursor: "pointer",
};

export default App;