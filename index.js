const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    const userId = generateUserId();
    const email = "john@xyz.com"; 
    const rollNumber = "ABCD123"; 
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];

    data.forEach((item) => {
      if (typeof item === "number") {
        if (item % 2 === 0) {
          evenNumbers.push(item.toString());
        } else {
          oddNumbers.push(item.toString());
        }
      } else if (typeof item === "string" && item.length === 1) {
        alphabets.push(item.toUpperCase());
      }
    });

    const response = {
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


function generateUserId() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `john_doe_${dd}${mm}${yyyy}`;
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
