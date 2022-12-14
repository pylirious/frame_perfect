import {createContext, Dispatch, SetStateAction} from "react";
import {MessageType} from "../../types/MessageType";

type MessageContextType = {
    setMessage: Dispatch<SetStateAction<MessageType>>,
    message?: MessageType|undefined,
}

const MessageContext = createContext<MessageContextType>({
    setMessage(value: ((prevState: MessageType) => MessageType) | MessageType): void {
    }
});

export default MessageContext;
