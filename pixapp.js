const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const userMessage = [
  ["hi", "hey", "hello"],
  ["sure", "yes", "no"],
  ["are you genius", "are you nerd", "are you intelligent"],
  ["i hate you", "i don't like you"],
  ["how are you", "how is life", "how are things", "how are you doing"],
  ["how is corona", "how is covid 19", "how is covid19 situation"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you", "who is your creator"],
  ["your name please", "your name", "may i know your name", "what is your name", "what do you call yourself"],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "ok", "okay", "nice", "welcome"],
  ["thanks", "thank you"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["corona", "covid19", "coronavirus"],
  ["you are funny"],
  ["i don't know"],
  ["boring"],
  ["i'm tired"],
  ["who are the team members"],
  ["what is the time now"],
];

const botReply = [
  ["Hello!", "Hi!", "Hey!", "Hi there!"],
  ["Okay"],
  ["Yes I am!"],
  ["I'm sorry about that. But I like you."],
  ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
  ["Getting better. How about you?", "Somewhat okay!", "Yeah, fine. Better stay home!"],
  ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
  ["I am always young."],
  ["I am just a bot", "I am a bot. What about you?"],
  ["PixelPunksTeam"],
  ["I am nameless", "I don't have a name"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["You're welcome"],
  ["Biryani", "Burger", "Sushi", "Pizza"],
  ["Dude!"],
  ["Yes?"],
  ["Please stay home"],
  ["Glad to hear it"],
  ["Say something interesting"],
  ["Sorry for that. Let's chat!"],
  ["Take some rest, Dude!"],
  ["harivenkat,barath,kaniskha,gopal,sheba,tamilarasu"],
  ["buy a new watch to see time"],
];

const alternative = [
  "Same here, dude.",
  "That's cool! Go on...",
  "Dude...",
  "Ask something else...",
  "Hey, I'm listening...",
  ""
];

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    synth.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon...");
    } else {
        speak("Good Evening...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing PIXELPUNK...");
    wishMe();
});

function getBotReply(input) {
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "").trim();
    let response = compare(userMessage, botReply, text);
    return response ? response : alternative[Math.floor(Math.random() * alternative.length)];
}

function compare(userMessageArray, botReplyArray, string) {
    for (let i = 0; i < userMessageArray.length; i++) {
        if (userMessageArray[i].includes(string)) {
            let replies = botReplyArray[i];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }
    return null;
}

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open instagram")) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    } else if (message.includes("open whatsapp")) {
        window.open("https://whatsapp.com", "_blank");
        speak("Opening Whatsapp...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open linkedin")) {
        window.open("https://linkedin.com", "_blank");
        speak("Opening Linkedin...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///', "_blank");
        speak("Opening Calculator");
    } else if (message.includes('chrome')) {
        window.open('Google Chrome:///', "_blank");
        speak("Opening Chrome");
    } else {
        const botResponse = getBotReply(message);
        speak(botResponse);
        content.textContent = botResponse;
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
        const chatContainer = document.getElementById('chat-container');
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble blue';
        userBubble.textContent = messageText;
        chatContainer.appendChild(userBubble);
        messageInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;
        setTimeout(() => {
            const replyBubble = document.createElement('div');
            replyBubble.className = 'chat-bubble green';
            const botResponse = getBotReply(messageText);
            replyBubble.textContent = botResponse;
            chatContainer.appendChild(replyBubble);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            speak(botResponse);
        }, 1000);
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
