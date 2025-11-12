function addSurveyThumbs(chatResponseMessages) {
    // Find the last index where the user is not "user" and payload.type is not "suggestions"
    let insertIndex = -1;
    for (let i = chatResponseMessages.length - 1; i >= 0; i--) {
        if (chatResponseMessages[i].user !== "user" && chatResponseMessages[i].payload.type !== "suggestions") {
            insertIndex = i;
            break;
        }
    }

    if (insertIndex !== -1) {
        // Create the new object with the id of the previous message
        const newObject = {
            user: 'assistant',
            payload: {
                type: 'survey_thumbs',
                params: chatResponseMessages[insertIndex].id,
            },
        };

        // Insert the new object after the found index
        chatResponseMessages.splice(insertIndex + 1, 0, newObject);
    }
}

// Example usage
const chatResponseMessages = [
    {
        user: "user",
        payload: {
            type: "text",
            id: "1718916281521",
            text: "show me colors",
        },
        id: "001",
    },
    {
        user: "assistant",
        payload: {
            type: "text",
            id: "1718916286527",
            text: "The 2025 GV80 comes in a wide variety of classic or bold and distinctive colors to make sure you always arrive in style. Time to add a splash of color to your life with Genesis!",
        },
        id: "002",
    },
    {
        user: "assistant",
        payload: {
            type: "carousel_color",
            id: "gv80_carousel_of_exterior_colors",
            topEyebrow: "2025 GV80",
            title: "Exterior",
            cards: [],
        },
        id: "003",
    },
    {
        user: "assistant",
        payload: {
            type: "carousel_color",
            id: "gv80_carousel_of_interior_colors",
            topEyebrow: "2025 GV80",
            title: "Interior",
            cards: [],
        },
        id: "004",
    },
    {
        user: "assistant",
        payload: {
            type: "suggestions",
            id: "1718916288578",
            title: "Tell me more about",
            suggestions: [],
        },
        id: "005",
    },
];

addSurveyThumbs(chatResponseMessages);
console.log(chatResponseMessages);
