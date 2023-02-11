import {OnGatewayConnection, WebSocketGateway} from '@nestjs/websockets';
import {UserService} from "../../user/services/user.service";
import {AuthService} from "../../auth/services/auth.service";
import {Socket} from "socket.io";
import {UnauthorizedException} from "@nestjs/common";
import {UserInterface} from "../../user/user.interface";

@WebSocketGateway({
    namespace: 'todos'
})
export class TodoGateway implements OnGatewayConnection {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {
    }

    async handleConnection(socket: Socket) {
        try {
            // if the token is not verified, this will throw and we can catch & disconnect the user
            const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
            // if the token is valid, we get the user by id from our database
            const user: UserInterface = await this.userService.getOneById(decodedToken.user.id);

            if (!user) {
                console.log('Disconnect user because user not found!');
                return this.disconnect(socket);
            } else {
                console.log('Do something :: => ', user);
            }
        } catch (error) {
            console.log('Disconnect user throw error :: => ', error.message);
            return this.disconnect(socket);
        }
    }

    private disconnect(socket: Socket) {
        socket.emit('Error', new UnauthorizedException());
        socket.disconnect();
    }
}
