import { responseHandler } from './handler/responseHandler.js'
import { errorHandler } from './handler/errorHandler.js'
let stompClient = null;
connect();

function connect() {
    let socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/sendMessage', function (greeting) {
            show(greeting);
        });
    });
}

function socketSend(message) {
    stompClient.send("/app/hello", {}, JSON.stringify({'message': JSON.stringify(message)}));
}

function show(message) {
    let response = JSON.parse(message.body).content;
    response = new responseHandler(response.cmd, response.success, response.message, response.body);
    errorHandler(response.success, response.message)
    Reflect.apply(Reflect.get(response, response.cmd), undefined,
        [response.success, response.body])
}

export { socketSend }