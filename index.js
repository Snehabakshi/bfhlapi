const express = require('express');
const app = express();
const cors=require('cors');
app.use(cors());

app.use(express.json());
app.get('/bfhl', (req, res) => {
  
  res.status(200).json({ operation_code: 1 });
});


app.post('/bfhl', (req, res) => {
  try {
   
    if (!req.body.data || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input. "data" must be an array.'
      });
    }

    const inputData = req.body.data;
    const numbers = [];
    const alphabets = [];

   
    inputData.forEach(item => {
     
      if (!isNaN(item)) {
        numbers.push(item);
      } else {
        
        if (item.length === 1 && /[a-zA-Z]/.test(item)) {
          // Convert to uppercase for uniformity
          alphabets.push(item);
        }
      }
    });

    let highest_alphabet = [];
    if (alphabets.length > 0) {
      
      const sortedAlphabets = [...alphabets].sort();
      highest_alphabet.push(sortedAlphabets[sortedAlphabets.length - 1]);
    }

    const response = {
      is_success: true,
      
      user_id: "sneha_bakshi_05062004",
      email: "2221346.aiml.coe@cgc.edu.in",
      roll_number: "ABCD123",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ is_success: false, error: 'Internal Server Error' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
