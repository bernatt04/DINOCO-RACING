// frontend/src/constants/chatIcons.tsx

import { IconType } from 'react-icons';
import { BsFillChatRightDotsFill, BsFillChatLeftFill, BsChatDots, BsFillChatFill } from 'react-icons/bs';
import { FiMessageSquare, FiMessageCircle } from 'react-icons/fi';
import { AiOutlineWechat, AiOutlineMessage } from 'react-icons/ai';
import { MdChatBubble } from 'react-icons/md';

export interface ChatIcon {
  name: string;
  component: IconType;
}

export const chatIcons: ChatIcon[] = [
  {
    name: 'Chat Dots',
    component: BsFillChatRightDotsFill,
  },
  {
    name: 'Chat Left',
    component: BsFillChatLeftFill,
  },
  {
    name: 'Chat Dots Simple',
    component: BsChatDots,
  },
  {
    name: 'Chat Fill',
    component: BsFillChatFill,
  },
  {
    name: 'Message Square',
    component: FiMessageSquare,
  },
  {
    name: 'Message Circle',
    component: FiMessageCircle,
  },
  {
    name: 'WeChat Outline',
    component: AiOutlineWechat,
  },
  {
    name: 'Message Outline',
    component: AiOutlineMessage,
  },
  {
    name: 'Chat Bubble',
    component: MdChatBubble,
  },
  {
    name: 'Custom Icon',
    component: BsFillChatRightDotsFill, // Puedes cambiar este icono por otro si lo deseas
  },
];
