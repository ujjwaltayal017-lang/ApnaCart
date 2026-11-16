
import ai from "../assets/ai.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";

function Ai() {

    const { setShowSearch } = useContext(shopDataContext);
    const navigate = useNavigate();

    // AI SPEAK FUNCTION
    function speak(message) {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "en-IN";

        window.speechSynthesis.speak(utterance);
    }

    // CHECK WORDS
    function hasWord(text, words) {
        return words.some(word => text.includes(word));
    }

    // START VOICE RECOGNITION
    function startListening() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            speak("Sorry, your browser does not support voice recognition.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            speak("Hello! Welcome to Apna Cart. How can I help you?");
        };

        recognition.onresult = (event) => {

            const transcript = event.results[0][0].transcript.toLowerCase().trim();

            // HOME PAGE
            if (hasWord(transcript, [
                "home",
                "homepage",
                "home page",
                "main page",
                "ghar",
                "ghar wala page",
                "main screen"
            ])) {

                speak("Opening home page");
                navigate("/");
            }

            // CART PAGE
            else if (hasWord(transcript, [
                "cart",
                "kart",
                "kaat",
                "car",
                "card",
                "my bag",
                "shopping bag",
                "basket",
                "add to cart",
                "open cart",
                "show cart",
                "go to cart",
                "my cart",
                "mera cart",
                "cart kholo",
                "cart dikhao",
                "bag kholo",
                "bag dikhao"
            ])) {

                speak("Opening your cart");
                navigate("/cart");
            }

            // COLLECTION PAGE
            else if (hasWord(transcript, [
                "collection",
                "collections",
                "product",
                "products",
                "shop",
                "shopping",
                "clothes",
                "items",
                "show products",
                "all products",
                "product dikhao",
                "samaan dikhao",
                "shopping karo"
            ])) {

                speak("Opening collection page");
                navigate("/collection");
            }

            // ORDERS PAGE
            else if (hasWord(transcript, [
                "order",
                "orders",
                "my order",
                "my orders",
                "order status",
                "track order",
                "tracking",
                "mera order",
                "mere orders",
                "order dikhao",
                "order status dikhao"
            ])) {

                speak("Opening your orders");
                navigate("/orders");
            }

            // LOGIN PAGE
            else if (hasWord(transcript, [
                "login",
                "log in",
                "sign in",
                "signin",
                "logon",
                "account",
                "login page",
                "account kholo"
            ])) {

                speak("Opening login page");
                navigate("/login");
            }

            // SIGNUP PAGE
            else if (hasWord(transcript, [
                "signup",
                "sign up",
                "register",
                "registration",
                "create account",
                "new account",
                "account banao"
            ])) {

                speak("Opening registration page");
                navigate("/signup");
            }

            // ABOUT PAGE
            else if (hasWord(transcript, [
                "about",
                "about us",
                "about page",
                "hamare bare mein"
            ])) {

                speak("Opening about page");
                navigate("/about");
            }

            // CONTACT PAGE
            else if (hasWord(transcript, [
                "contact",
                "contact us",
                "contact page",
                "help",
                "support",
                "sampark"
            ])) {

                speak("Opening contact page");
                navigate("/contact");
            }

            // SEARCH
            else if (hasWord(transcript, [
                "search",
                "find product",
                "search product",
                "find something",
                "kuch search",
                "product search"
            ])) {

                speak("Opening product search");

                setShowSearch(true);
                navigate("/collection");
            }

            // UNKNOWN COMMAND
            else {

                speak("Sorry, I did not understand. Please try another command.");
            }
        };

        recognition.onerror = (event) => {
            speak("Something went wrong. Please try again.");
        };

        recognition.onend = () => {
            console.log("Voice recognition stopped");
        };

        try {
            recognition.start();
        } catch (error) {
            console.log("Recognition error:", error);
        }
    }

    return (

        <div className="fixed bottom-6 right-6 z-50">

            <button
                onClick={startListening}
                className="rounded-full transition-transform duration-300 hover:scale-110"
                title="Speak with AI"
            >

                <img
                    src={ai}
                    alt="AI Voice Assistant"
                    className="h-16 w-16 cursor-pointer object-contain"
                />

            </button>

        </div>
    );
}

export default Ai;
