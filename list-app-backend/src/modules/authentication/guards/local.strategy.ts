// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { AuthService } from "../auth.service";

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({ usernameField: 'email' });
//   }

// //   async validate(email: string, password: string): Promise<any> { // class is constructed but this method is never called
// //     const user: UserDto = await this.authService.login({
// //       email,
// //       password,
// //     });
    
// //     if (!user) {
// //       throw new UnauthorizedException();
// //     }
// //     return user;
// //   }
// }