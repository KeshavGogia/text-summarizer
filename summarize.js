import axios from 'axios';

// Function where API call is made and it returns the summarized text

async function summarizeText(text){
    let data = JSON.stringify({
    "inputs": text,
    "parameters": {
        "max_length": 100,
        "min_length": 30
    }
    });

    // A config object contains the instructions for API call
    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': process.env.ACCESS_TOKEN
    },
    data : data
    };

    // Capcturing request and catching errors if any
    try {
        const response = await axios.request(config);
        return response.data[0].summary_text;
    }
    catch (error) {
        console.log(error);
    }

}

// Allowing the summarize text function to be called outside this file
export default summarizeText;