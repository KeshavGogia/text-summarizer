const textArea = document.getElementById("text_to_summarize");
const summarizedTextArea =document.getElementById("summary");
const submitButton = document.getElementById("submit-button");
const randomButton = document.getElementById("random");
const copyButton = document.getElementById("copy");

// Disabling the submit button unless length is not in correct range
submitButton.disabled = true;

// Adding event listeners
textArea.addEventListener("input", verifyLength);
submitButton.addEventListener("click",submitData);
randomButton.addEventListener("click",randomData);
copyButton.addEventListener("click",copyData);

// Calling the verifyLength function
function verifyLength(e){

    // e.target gives the inner HTML of the event that triggered it
    const text = e.target;

    if(text.value.length > 200 && text.value.length < 100000)
    {
        // If condition is satisfed then enabling the submit button
        submitButton.disabled = false;
    }
    else{
        // If condition is not met then disabling the submit button
        submitButton.disabled = true;
    }
}

// Calling the Submit function
function submitData(){

    // Adding animation to submit button 
    submitButton.classList.add("submit-button--loading");

    const text_to_summarize = textArea.value;


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer " + process.env.ACCESS_TOKEN);

    const raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("/summarize", requestOptions)
    .then((response) => response.text())
    .then(summary =>{

        // Update output text area
        summarizedTextArea.value = summary;

        // Remove the animation from Submit Button
        submitButton.classList.remove("submit-button--loading");

    })
    .catch((error) => console.error(error));
}

// Function calling the random Data genrator

const random_data_value = [ "Servers play a vital role in modern digital infrastructure. They are specialized computers designed to store, manage, and process data, applications, and services. Acting as central repositories, servers respond to requests from client devices like computers, smartphones, or other servers over a network, such as the internet. These robust machines handle a diverse range of tasks. Web servers host websites, serving web pages to users who access them through browsers. Application servers manage and run software applications, facilitating their execution and ensuring smooth performance. Database servers store and organize data, allowing efficient retrieval and manipulation of information for various applications.",
                           "Artificial Intelligence (AI) is revolutionizing industries and daily life, with applications ranging from healthcare diagnostics to personalized user experiences. Powered by machine learning, AI systems analyze data to make decisions, improving efficiency and accuracy. However, ethical concerns such as bias and societal impacts loom large. Careful consideration and collaboration are needed to ensure AI benefits society equitably. Despite challenges, the future of AI holds promise for further advancements, driving innovation and addressing complex problems across various domains. Embracing AI responsibly can lead to a brighter future for all.",
                            "Blockchain technology revolutionizes data management by creating decentralized, immutable ledgers. Each block contains a cryptographic hash of the previous block, ensuring data integrity and security. It enables transparent, tamper-proof transactions across various sectors like finance, supply chain, and healthcare. Smart contracts automate and enforce agreements, reducing reliance on intermediaries. Despite its potential, challenges such as scalability and energy consumption persist. However, ongoing research and development aim to overcome these limitations, paving the way for widespread adoption and innovative solutions. Blockchain promises to reshape industries, empower individuals, and foster trust in the digital age.",
                            "5G, the fifth generation of wireless technology, promises unprecedented speed, low latency, and connectivity for the Internet of Things (IoT). It enables faster data transmission, revolutionizing industries like healthcare, autonomous vehicles, and augmented reality. With speeds up to 100 times faster than 4G, 5G facilitates real-time communication and immersive experiences. However, concerns about security, privacy, and infrastructure remain. Its implementation requires extensive network infrastructure upgrades, raising questions about accessibility and affordability. Despite challenges, 5G's transformative potential is undeniable, driving innovation and shaping the future of connectivity and digital communication.",
                            "Robotics blends mechanical engineering, electronics, and computer science to create autonomous or semi-autonomous machines capable of performing tasks in diverse environments. From manufacturing to healthcare and exploration, robots enhance efficiency, safety, and precision. They automate repetitive tasks, handle hazardous materials, and assist in surgeries. Advanced sensors and algorithms enable robots to adapt to changing conditions and interact with their surroundings intelligently. However, ethical considerations like job displacement and accountability arise. Continued research focuses on enhancing robot capabilities, ensuring human-robot collaboration, and addressing societal implications. Robotics continues to redefine industries and daily life, promising exciting advancements and challenges ahead." ];

                        
function randomData(){
    
    textArea.value = random_data_value[Math.floor(Math.random()*random_data_value.length)];
    submitButton.disable = false;
    submitData();
}

// Calling Copy Data function
function copyData(){
    let copyText = summarizedTextArea;
    navigator.clipboard.writeText(copyText.value);
    
}