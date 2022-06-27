import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { MailerService } from "@nestjs-modules/mailer";
import * as otpGenerator from "otp-generator";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { OAuth2Client, LoginTicket } from "google-auth-library";
import axios from "axios";

//StringBase
import { stringToBase64 } from "src/helpers/base";

//Schema and Model
import { User, UserDocument } from "./model/user.schema";

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

//Entities
import { SuccessInfo } from "./entities/sucess.entity";
import { RegisterSuccess } from "./entities/register.entity";

//Google oAuth Authentication
const client = new OAuth2Client(process.env.GOOGLE_ID);

//Types
import { ReqUser } from "src/auth/types/user.types";

@Injectable()
export class UserService {
    //Constructor
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private mailService: MailerService
    ) { }
    //Get users service
    async users() {
        const user = await this.userModel.find({
            role: "user"
        });
        return user;
    }
    //Get sellers service
    async sellers() {
        const seller = await this.userModel.find({
            role: "seller"
        });
        return seller;
    }
    //Get editor service
    async editors() {
        const editor = await this.userModel.find({
            role: "editor"
        });
        return editor;
    }
    //Get admin service
    async admin() {
        const admin = await this.userModel.find({
            role: "admin"
        });
        return admin;
    }
    //Create User Service(Signup)
    async create(signupInput: SignupInput): Promise<SuccessInfo> {
        const user = await this.userModel.findOne({
            email: signupInput.email
        })
        if (user) throw new NotFoundException("User already exist!");
        let otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        await this.mailService.sendMail({
            to: signupInput.email,
            from: "noreply@ebuy.com",
            subject: "Ebuy- One time password!",
            text: `Here is your otp(One time password) ${otp}`
        })
        const password = await bcrypt.hash(signupInput.password, 12);
        otp = await bcrypt.hash(otp, 12);
        await this.userModel.create({
            ...signupInput,
            password: password,
            otp
        })
        return {
            success: true,
            message: `Code sent to ${signupInput.email} successfully!`
        }
    }
    //Verify user service
    async verify(verifyInput: VerifyInput): Promise<RegisterSuccess> {
        const user = await this.userModel.findOne({
            email: verifyInput.email
        }).select("+otp");
        if (!user) throw new NotFoundException("You use an expired code!");
        const verifyOtp = await bcrypt.compare(verifyInput.otp, user.otp);
        if (!verifyOtp) throw new NotFoundException("You use wrong code!");
        user.verified = true;
        user.otp = "";
        await user.save();
        const token = jwt.sign({
            info: stringToBase64(verifyInput.email),
        }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
        let expire: any = new Date();
        expire.setDate(expire.getDate() + 30);
        return {
            success: true,
            message: "User registered successfully!",
            token,
            expire
        }
    }
    //Login user service
    async login(loginInput: LoginInput): Promise<RegisterSuccess> {
        const user = await this.userModel.findOne({
            email: loginInput.email
        }).select("+password");
        if (!user) throw new NotFoundException("Wrong email or password!");
        const verifyPass = await bcrypt.compare(loginInput.password, user.password);
        if (!verifyPass) throw new NotFoundException("Wrong email or password!");
        const token = jwt.sign({
            info: stringToBase64(loginInput.email),
        }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
        let expire: any = new Date();
        expire.setDate(expire.getDate() + 30);
        return {
            success: true,
            message: "User login successfully!",
            token,
            expire
        }
    }
    //Login with google service
    async google({ idToken }: GoogleInput): Promise<RegisterSuccess> {
        const clientId = process.env.GGOOGLE_ID;
        const ticket: LoginTicket = await client.verifyIdToken({ idToken: idToken, audience: clientId });
        const payload = ticket.getPayload();
        const user = await this.userModel.findOne({
            email: payload.email
        })
        let expire: any = new Date();
        expire.setDate(expire.getDate() + 30);
        const token = jwt.sign({
            info: stringToBase64(payload.email),
        }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
        if (!user) {
            await this.userModel.create({
                name: payload.name,
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
                verified: true,
                avatar: {
                    url: payload.picture
                },
                provider: {
                    name: payload.iss,
                    id: payload.sub
                }
            });
            return {
                success: true,
                message: "Authentication successfull!",
                token,
                expire
            }
        } else {
            return {
                success: true,
                message: "Authentication successfull!",
                token,
                expire
            }
        }
    }
    //Login with facebook service
    async facebook({ userId, accessToken }: FacebookInput): Promise<RegisterSuccess> {
        let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userId}/?fields=id,name,picture,email&access_token=${accessToken}`;
        const { data } = await axios.get(urlGraphFacebook);
        const user = await this.userModel.findOne({
            email: data.email
        })
        let expire: any = new Date();
        expire.setDate(expire.getDate() + 30);
        const token = jwt.sign({
            info: stringToBase64(data.email),
        }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
        if (!user) {
            const firstName = data.name.substr(0, data.name.indexOf(' '));
            const lastName = data.name.substr(data.name.indexOf(' ') + 1);
            await this.userModel.create({
                name: data.name,
                firstName,
                lastName,
                email: data.email,
                avatar: {
                    url: data.picture.data.url
                },
                verified: true,
                provider: {
                    name: "graph.facebook.com",
                    id: data.id
                }
            })
            return {
                success: true,
                message: "Authentication successfull!",
                token,
                expire
            }
        } else {
            return {
                success: true,
                message: "Authentication successfull!",
                token,
                expire
            }
        }
    }
    //Update user service
    async update(updateInput: UpdateUserInput, reqUser: ReqUser): Promise<SuccessInfo> {
        const password = await bcrypt.hash(updateInput.password, 10);
        const update = await this.userModel.findByIdAndUpdate(reqUser, {
            ...updateInput,
            password
        }, { new: true });
        if (!update) throw new NotFoundException("User update failed!");
        return {
            success: true,
            message: "User updated successfully!"
        }
    }
    // Check email availability
    async checkEmail(emailInput: EmailInput): Promise<SuccessInfo> {
        const user = await this.userModel.findOne({
            email: emailInput.email
        });
        if (user) return {
            success: false,
            message: "Email is not available!"
        }
        return {
            success: true,
            message: "Email is available!"
        }
    }
    //Update email
    async updateEmail(emailInput: EmailInput, reqUser: ReqUser): Promise<SuccessInfo> {
        const user = await this.userModel.findOne({
            email: emailInput.email
        });
        if (user) throw new NotFoundException("Email is already in use!");
        let otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        await this.mailService.sendMail({
            to: emailInput.email,
            from: "noreply@ebuy.com",
            subject: "Ebuy- One time password!",
            text: `Here is your otp(One time password) ${otp}`
        })
        otp = await bcrypt.hash(otp, 12);
        const update = await this.userModel.findByIdAndUpdate(reqUser._id, { otp }, { new: true })
        if (!update) throw new NotFoundException("User not found!");
        return {
            success: true,
            message: "Code to sent your email. Please verify your email!"
        }
    }
    //Update email for verify
    async verifyEmail(verifyEmailInput: VerifyEmailInput, reqUser: ReqUser): Promise<RegisterSuccess> {
        const user = await this.userModel.findOne({
            _id: reqUser._id
        }).select("+otp");
        const verify = await bcrypt.compare(verifyEmailInput.otp, user.otp);
        if (!verify) throw new NotFoundException("Your code is wrong!");
        user.email = verifyEmailInput.email;
        user.otp = "";
        const updateUser = await user.save();
        const token = jwt.sign({
            info: stringToBase64(updateUser.email),
        }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
        let expire: any = new Date();
        expire.setDate(expire.getDate() + 30);
        return {
            success: true,
            message: "Your email is updated successfully!",
            token,
            expire
        }
    }
    //Update user role
    async role(roleInput: RoleInput, reqUser: ReqUser): Promise<SuccessInfo> {
        const user = await this.userModel.findOne({
            _id: roleInput.id
        });
        if (!user) throw new NotFoundException("User not found!");
        if (reqUser.role === "editor") {
            if (roleInput.role === "user" || roleInput.role === "seller") {
                if (user.role !== "editor" && user.role !== "admin") {
                    user.role = roleInput.role
                } else {
                    throw new NotFoundException(`You can't make a ${user.role} to ${roleInput.role}`)
                }
            } else {
                throw new NotFoundException(`You can't make any user to ${roleInput.role}`);
            }
        } else if (reqUser.role === "admin") {
            if (user.role !== "admin") {
                user.role = roleInput.role
            } else {
                const count = await this.userModel.count({
                    role: "admin"
                })
                if (count > 1) {
                    user.role = roleInput.role
                } else {
                    throw new NotFoundException("You have to make a admin before downgrade your role");
                }
            }
        } else {
            throw new NotFoundException("You have no rights to change user role!");
        }
        await user.save();
        return {
            success: true,
            message: "You successfully changed user role!"
        }
    }
    //Delete user
    async deleteUser(id: ObjectId, reqUser: ReqUser): Promise<SuccessInfo> {
        const user = await this.userModel.findOne({
            _id: id
        });
        if (user.email === reqUser.email) throw new NotFoundException("You can't delete your own account!")
        if (user.role === "editor" || user.role === "admin") throw new NotFoundException(`You can't delete ${user.role} account!`)
        await this.userModel.findByIdAndDelete(id);
        return {
            success: true,
            message: "User deleted successfully!"
        }
    }
    //Delete own account
    async deleteAccount(reqUser: ReqUser): Promise<SuccessInfo> {
        if (reqUser.role === "admin" || reqUser.role === "editor") throw new NotFoundException("You can't delete your account!");
        const result = await this.userModel.findByIdAndDelete(reqUser._id);
        if (!result) throw new NotFoundException("User not found!")
        return {
            success: true,
            message: "Account deleted successfully!"
        }
    }
}