import { Widget as ChatWidget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import * as React from 'react';

export interface Props {
    handleChatMessage: (value: string) => any;
}

const Footer: React.SFC<Props> = (props: Props) => (
  <div>
    <ChatWidget handleNewUserMessage={props.handleChatMessage} />        
  </div>
);

export default Footer;