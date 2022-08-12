import { computed } from "mobx"
import { userStore } from "./userStore";

class ChatStore {


    @computed
    get quickReplySample(): any {
        return {
            _id: -1,
            text: "",
            createdAt: null,
            quickReplies: {
                // type: "radio", // or 'checkbox',
                keepIt: true,
                values: [
                    {
                        title: "😋 Yes",
                        value: "yes",
                    },
                    {
                        title: "📷 Yes, let me show you with a picture!",
                        value: "yes_picture",
                    },
                    {
                        title: "😞 Nope. What?",
                        value: "no",
                    },
                ],
            },
            user: {
                _id: userStore.info.id,
                name: "React Native",
            },
        };
    }
}

const chatStore = new ChatStore

export { chatStore }