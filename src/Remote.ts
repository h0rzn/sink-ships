class RTC {
    localCon: RTCPeerConnection;
    sendChan: RTCDataChannel;

    remoteCon: RTCPeerConnection;

    constructor() {
        // local
        this.localCon = new RTCPeerConnection();
        this.sendChan = this.localCon.createDataChannel("sendChannel");
        this.sendChan.onopen = this.onSendChannelStatusChange;
        this.sendChan.onclose = this.onSendChannelStatusChange;

        // remote
        this.remoteCon = new RTCPeerConnection();
        this.remoteCon.ondatachannel = this.onReceiveChannel;


        // ice
    }

    offerConnection() {

    }

    onSendChannelStatusChange() {}

    onReceiveChannel() {}

    send() {}


}