import { Resolver, Mutation, Query, Args, Context, ID } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { ObjectId } from "mongoose";

//Entites
import { SignupInfo } from "./entities/signup.entity";
import { SuccessInfo } from "./entities/sucess.entity";
import { RegisterSuccess } from "./entities/register.entity";
import { User } from "./entities/user.entity";

//Dto
import { SignupInput } from "./dto/signup.input";
import { VerifyInput } from "./dto/verify-otp.input";
import { LoginInput } from "./dto/login.input";
import { GoogleInput } from "./dto/google.input";
import { FacebookInput } from "./dto/facebook.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { EmailInput } from "./dto/email.input";
import { VerifyEmailInput } from "./dto/verify-email.input";
import { RoleInput } from "./dto/user-role.input";

//Service
import { UserService } from "./user.service";

//Guard
import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";

//Types
import { ReqUser } from "src/auth/types/user.types";

@Resolver()
export class UserResolver {
    //Contsructor
    constructor(private readonly userService: UserService) { }

    //Get Users
    @Query(() => [User], { name: "getUsers" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers() {
        return this.userService.users();
    }

    //Get sellers
    @Query(() => [User], { name: "getSellers" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getSellers() {
        return this.userService.sellers();
    }

    //Get Editor
    @Query(() => [User], { name: "getEditors" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getEditors() {
        return this.userService.editors();
    }

    //Get Admin
    @Query(() => [User], { name: "getAdmin" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getAdmin() {
        return this.userService.admin();
    }

    //Get Own Account
    @Query(() => User, { name: "getAccount" })
    @UseGuards(AuthGuard)
    getAccount(
        @Context("user") reqUser: ReqUser
    ) {
        return reqUser;
    }

    //Create user (Signup User)
    @Mutation(() => SignupInfo, { name: "signup" })
    signup(
        @Args("signupInput") signupInput: SignupInput
    ) {
        return this.userService.create(signupInput);
    }

    //Verify User with otp(One time Password)
    @Mutation(() => RegisterSuccess, { name: "verifyUser" })
    verifyUser(
        @Args("verifyInput") verifyInput: VerifyInput
    ) {
        return this.userService.verify(verifyInput)
    }

    //Login User
    @Mutation(() => RegisterSuccess, { name: "login" })
    loginUser(
        @Args("loginInput") loginInput: LoginInput
    ) {
        return this.userService.login(loginInput)
    }

    //Google Auth
    @Mutation(() => RegisterSuccess, { name: "googleAuth" })
    googleAuth(
        @Args("googleInput") googleInput: GoogleInput
    ) {
        return this.userService.google(googleInput)
    }

    //Facebook Auth
    @Mutation(() => RegisterSuccess, { name: "facebookAuth" })
    facebookAuth(
        @Args("facebookInput") facebookInput: FacebookInput
    ) {
        return this.userService.facebook(facebookInput);
    }

    //Update User
    @Mutation(() => SuccessInfo, { name: "updateUser" })
    @UseGuards(AuthGuard)
    updateUser(
        @Args("updateInput") updateInput: UpdateUserInput,
        @Context('user') reqUser: ReqUser
    ) {
        return this.userService.update(updateInput, reqUser);
    }

    //Check email is available
    @Mutation(() => SuccessInfo, { name: "checkEmailAvailability" })
    checkEmailIsAvailable(
        @Args("emailInput") emailInput: EmailInput
    ) {
        return this.userService.checkEmail(emailInput)
    }

    //Update Email
    @Mutation(() => SuccessInfo, { name: "updateEmail" })
    @UseGuards(AuthGuard)
    updateEmail(
        @Args('emailInput') emailInput: EmailInput,
        @Context('user') reqUser: ReqUser
    ) {
        return this.userService.updateEmail(emailInput, reqUser);
    }

    //Verify Email for Updating
    @Mutation(() => RegisterSuccess, { name: "verifyEmail" })
    @UseGuards(AuthGuard)
    verifyEmail(
        @Args("verifyEmailInput") verifyEmailInput: VerifyEmailInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.userService.verifyEmail(verifyEmailInput, reqUser);
    }

    //Update user role
    @Mutation(() => SuccessInfo, { name: "updateRole" })
    @UseGuards(AuthGuard)
    userRole(
        @Args("roleInput") roleInput: RoleInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.userService.role(roleInput, reqUser);
    }

    //Delete Any user
    @Mutation(() => SuccessInfo, { name: "deleteUser" })
    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    userDelete(
        @Args("id", { type: () => ID }) id: ObjectId,
        @Context("user") reqUser: ReqUser
    ) {
        return this.userService.deleteUser(id, reqUser);
    }

    //Delete Own Account
    @Mutation(() => SuccessInfo, { name: "deleteAccount" })
    @UseGuards(AuthGuard)
    accountDelete(
        @Context("user") reqUser: ReqUser
    ) {
        return this.userService.deleteAccount(reqUser)
    }
}