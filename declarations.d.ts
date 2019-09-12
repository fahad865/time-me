declare module 'react-chat-widget' {
    import * as React from 'react';
    
    export interface WidgetProps {
        title?: string;        
        titleAvatar?: string;
        subtitle?: string;
        handleNewUserMessage: (value: string) => void;
        handleQuickButtonClicked?: (event: any, value: any) => void,
        senderPlaceHolder?: string,
        profileAvatar?: string,
        showCloseButton?: boolean,
        fullScreenMode?: boolean,
        badge?: number,
        autofocus?: boolean,
        launcher?: (onToggleConversatio: any) => any
    }
    
    export class Widget extends React.Component<WidgetProps>{
    }

    export function addResponseMessage(text: string) : void
    export function addUserMessage(text: string) : void
    export function addLinkSnippet(link: {
        title: string,
        link: string,
        target: string
    }) : void
}