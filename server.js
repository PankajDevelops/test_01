const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      throw new Error(
        'Invalid input. Please provide an array under the key "data".'
      );
    }

    const user_id = "john_doe_17091999"; // Replace this with your user ID logic

    const evenNumbers = [];
    const oddNumbers = [];
    const uppercaseAlphabets = [];

    for (const item of data) {
      if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
        uppercaseAlphabets.push(item.toUpperCase());
      } else {
        const num = parseInt(item);
        if (!isNaN(num)) {
          if (num % 2 === 0) {
            evenNumbers.push(num);
          } else {
            oddNumbers.push(num);
          }
        }
      }
    }

    const response = {
      user_id,
      is_success: true,
      evenNumbers,
      oddNumbers,
      uppercaseAlphabets,
    };

    res.json(response);
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
