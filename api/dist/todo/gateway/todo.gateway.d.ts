import { OnGatewayConnection } from '@nestjs/websockets';
import { UserService } from "../../user/services/user.service";
import { AuthService } from "../../auth/services/auth.service";
import { Socket } from "socket.io";
export declare class TodoGateway implements OnGatewayConnection {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    handleConnection(socket: Socket): Promise<void>;
    private disconnect;
}
